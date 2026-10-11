// Independent local Chromium checks. The fake Python bridge is not Qollab evidence.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { spawn, spawnSync } from 'node:child_process';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { crc32, inflateSync } from 'node:zlib';

const root = fileURLToPath(new URL('../', import.meta.url));
const python = process.env.NOTEBOOK_PYTHON || '/tmp/opencode/teleportation-notebook-research/bin/python';
const generated = spawnSync(python, ['-c', `
import json
from unittest.mock import patch
from backend import teleportation as t
class Sentinel:
    name = 'unknown-local-test'
    def run(self, *args, **kwargs):
        raise AssertionError('injected backend submission forbidden')
success = t.run_teleportation(Sentinel())
original = t._stage_figures
def fail_one(stage, circuit, counts):
    if stage == 'correction':
        raise RuntimeError('QA controlled figure failure')
    return original(stage, circuit, counts)
with patch.object(t, '_stage_figures', fail_one):
    figure = t.run_teleportation(Sentinel())
with patch.dict(t.SOURCES, {'state-preparation': 'import qa_intentionally_missing_dependency'}):
    missing = t.run_teleportation(Sentinel())
print(json.dumps({'success': success, 'figure': figure, 'missing': missing}))
`], { cwd: root, encoding: 'utf8', maxBuffer: 20000000 });
assert.equal(generated.status, 0, generated.stderr);
const envelopes = JSON.parse(generated.stdout);
// An independent CRC implementation preserves coverage of actual decode failure.
envelopes.invalidBitDepth = structuredClone(envelopes.success);
const invalidDepth = Buffer.from(envelopes.success.figures.verification[0].data, 'base64');
invalidDepth[24] = 255;
invalidDepth.writeUInt32BE(crc32(invalidDepth.subarray(12, 29)), 29);
envelopes.invalidBitDepth.figures.verification[0].data = invalidDepth.toString('base64');
assert.match(generated.stderr, /QA controlled figure failure/);
assert.match(generated.stderr, /qa_intentionally_missing_dependency/);
// Independent proof that the corrupt-IDAT negative input is not a valid stream.
const invalidStream = Buffer.from(envelopes.success.figures.verification[0].data, 'base64');
for (let offset=8; offset+12<=invalidStream.length;) {
  const length=invalidStream.readUInt32BE(offset);
  if (invalidStream.toString('ascii', offset+4, offset+8)==='IDAT') {
    const compressed=Buffer.alloc(length);
    assert.throws(()=>inflateSync(compressed));
    break;
  }
  offset+=12+length;
}

const fake = `globalThis.qaPayloads = ${JSON.stringify(envelopes)};
globalThis.backend = {run(){throw new Error('No submission allowed')}};
globalThis.qa = {generation:crypto.randomUUID(), calls:0, destroyed:0, logs:[], mounted:false};
const originalError = console.error;
console.error = (...args) => {qa.logs.push(args.map(String).join(' ')); originalError(...args)};
export const run_teleportation = {async callPromising(value) {
  qa.calls++; qa.mounted = Boolean(document.getElementById('output-verification'));
  if (value !== backend) throw new Error('Wrong backend');
  await new Promise(resolve => {qa.release = resolve});
  return {toJs:()=>qaPayloads.success, destroy:()=>qa.destroyed++};
}};`;
let servingMode = 'fake';
const requests = [];
const servedMain = [];
const servedWrappers = [];
const server = createServer(async (req, res) => {
  try {
    const pathname = new URL(req.url, 'http://localhost').pathname;
    requests.push({mode: servingMode, pathname});
    if (servingMode === 'missing-wrapper' && pathname === '/qollab_bridge.js') {
      res.statusCode = 404; res.end('QA controlled missing wrapper'); return;
    }
    if (pathname === '/qa-fake-python.js') {
      res.setHeader('Content-Type', 'text/javascript'); res.end(fake); return;
    }
    const relative = pathname === '/' ? 'index.html' : pathname.slice(1);
    const filename = path.resolve(root, relative);
    assert(filename.startsWith(root));
    let content = await readFile(filename);
    if (relative === 'main.js') servedMain.push(content.toString());
    if (relative === 'qollab_bridge.js') servedWrappers.push({mode:servingMode, content:content.toString()});
    if (relative === 'qollab_bridge.js' && servingMode === 'fake') {
      const original = "import * as teleportation from 'backend.teleportation';";
      assert.equal(content.toString().split(original).length, 2);
      content = content.toString().replace(original,
        "import * as teleportation from './qa-fake-python.js';");
    }
    res.setHeader('Content-Type', relative.endsWith('.js') ? 'text/javascript' :
      relative.endsWith('.css') ? 'text/css' : 'text/html');
    res.end(content);
  } catch { res.statusCode = 404; res.end('Not found'); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${server.address().port}`;
const chrome = spawn(process.env.CHROMIUM || '/snap/bin/chromium', [
  '--headless', '--no-sandbox', '--disable-gpu', '--remote-debugging-port=9333',
  '--user-data-dir=/tmp/opencode/qa-notebook-browser', 'about:blank',
], { stdio: 'ignore' });
let socket;
let failures = 0;
try {
  let targets;
  for (let attempt = 0; attempt < 100; attempt++) {
    try { targets = await (await fetch('http://127.0.0.1:9333/json')).json(); break; }
    catch { await new Promise(resolve => setTimeout(resolve, 100)); }
  }
  assert(targets, 'Chromium debugging endpoint unavailable');
  socket = new WebSocket(targets.find(item => item.type === 'page').webSocketDebuggerUrl);
  await new Promise(resolve => socket.addEventListener('open', resolve, { once: true }));
  let sequence = 0;
  const pending = new Map();
  const exceptions = [];
  socket.addEventListener('message', event => {
    const message = JSON.parse(event.data);
    if (message.method === 'Runtime.exceptionThrown') exceptions.push(message.params);
    const request = pending.get(message.id);
    if (!request) return;
    pending.delete(message.id);
    if (message.error) request.reject(message.error); else request.resolve(message.result);
  });
  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = ++sequence; pending.set(id, {resolve, reject});
      socket.send(JSON.stringify({id, method, params}));
    });
  }
  async function evaluate(expression) {
    const result = await send('Runtime.evaluate', {expression, returnByValue:true, awaitPromise:true});
    assert(!result.exceptionDetails, JSON.stringify(result.exceptionDetails));
    return result.result.value;
  }
  async function check(name, action) {
    try { await action(); console.log(`PASS ${name}`); }
    catch (error) { failures++; console.error(`FAIL ${name}: ${error.stack || error.message}`); }
  }
  // Retry observable browser state; do not assume decoding completes in one turn.
  async function eventually(expression, expected, timeout = 10000) {
    const deadline = Date.now() + timeout;
    let actual;
    do {
      actual = await evaluate(expression);
      if (actual === expected) return;
    } while (Date.now() < deadline);
    assert.equal(actual, expected, `Timed out waiting for ${expression}`);
  }
  async function settleScroll() {
    // A preceding native smooth-scroll animation can outlive media changes.
    // Observe stable animation-frame positions instead of using a delay.
    await evaluate(`new Promise((resolve,reject)=>{
      const deadline=performance.now()+10000; let last=scrollY; let stable=0;
      function frame() {
        stable=Math.abs(scrollY-last)<0.01 ? stable+1 : 0; last=scrollY;
        if (stable>=6) {resolve(true); return}
        if (performance.now()>deadline) {reject(new Error('Scroll did not settle')); return}
        requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    })`);
  }
  async function key(key) {
    const code = {Enter:13, Home:36, End:35, ArrowLeft:37, ArrowRight:39}[key];
    for (const type of ['keyDown', 'keyUp'])
      await send('Input.dispatchKeyEvent', {type,key,code:key,windowsVirtualKeyCode:code});
  }
  await send('Runtime.enable'); await send('Page.enable');
  await send('Network.enable');
  await send('Network.setCacheDisabled', {cacheDisabled:true});
  // Observe failures without rewriting any production response in static mode.
  await send('Page.addScriptToEvaluateOnNewDocument', {source:`
    globalThis.qaLocal = {generation:crypto.randomUUID(), errors:[], rejections:[]};
    const qaOriginalError = console.error;
    console.error = (...args) => {
      qaLocal.errors.push(args.map(value => value instanceof Error
        ? {message:value.message, code:value.code, cause:String(value.cause)} : String(value)));
      qaOriginalError(...args);
    };
    addEventListener('unhandledrejection', event => qaLocal.rejections.push(String(event.reason)));
  `});
  await send('Page.navigate', {url:base});
  for (let attempt = 0; attempt < 100; attempt++) {
    if (await evaluate('Boolean(globalThis.qa?.release)')) break;
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  await evaluate("import('./frontend/execution_results.js').then(module => {globalThis.renderer = module; return true})");
  await check('mounted before sole call; Running; Example default; navigation during execution', async () => {
    assert.deepEqual(await evaluate('[qa.calls, qa.mounted, document.getElementById("execution-status").textContent, document.querySelector("[aria-selected=true]").id]'),
      [1,true,'Running','example-tab']);
    await evaluate("document.getElementById('code-tab').click(); document.getElementById('math-tab').click()");
    assert.equal(await evaluate('qa.calls'), 1);
    await evaluate('qa.release()');
    await eventually('document.getElementById("execution-status").textContent', 'Partial');
  });
  await check('actual envelope: seven ordered associations, nine decoded PNGs, Partial, proxy release', async () => {
    assert.equal(await evaluate('document.getElementById("execution-status").textContent'), 'Partial');
    assert.equal(await evaluate('qa.destroyed'), 1);
    assert(await evaluate(`renderer.stages.every(stage =>
      document.getElementById('source-'+stage).textContent === qaPayloads.success.sources[stage] &&
      document.getElementById('output-'+stage).textContent === qaPayloads.success.outputs[stage])`));
    assert.deepEqual(await evaluate('[...document.querySelectorAll("[data-output-id]")].map(e=>e.dataset.outputId)'), Object.keys(envelopes.success.outputs));
    assert.equal(await evaluate('document.querySelectorAll(".stage-figures img").length'), 9);
    assert(await evaluate(`Promise.all([...document.querySelectorAll('.stage-figures img')].map(async img => {
      await img.decode(); return img.naturalWidth > 0 && Boolean(img.alt) && Boolean(img.nextElementSibling.textContent);
    })).then(values => values.every(Boolean))`));
  });
  await check('keyboard selection, focus, header activation; results survive; no rerun', async () => {
    await evaluate("document.getElementById('example-tab').focus()");
    for (const [pressed, expected] of [['ArrowRight','math-tab'],['End','code-tab'],['ArrowRight','example-tab'],['ArrowLeft','code-tab'],['Home','example-tab']]) {
      await key(pressed);
      assert.equal(await evaluate('document.activeElement.id'), expected);
      assert.equal(await evaluate('document.querySelector("[aria-selected=true]").id'), expected);
    }
    assert.equal(await evaluate('getComputedStyle(document.activeElement).outlineWidth'), '3px');
    for (const panel of ['code','math','example']) {
      await evaluate(`document.querySelector('a[data-tab-target="${panel}-panel"]').focus()`);
      await key('Enter');
      assert.equal(await evaluate('document.querySelector("[aria-selected=true]").id'), `${panel}-tab`);
      assert.equal(await evaluate('location.hash'), '#study-box');
    }
    assert.equal(await evaluate('qa.calls'), 1);
    assert.equal(await evaluate('document.getElementById("output-verification").textContent'), envelopes.success.outputs.verification);
  });
  await check('all context header anchor destinations exist', async () => {
    const absent = await evaluate(`[...document.querySelectorAll('.site-header a:not([data-tab-target])')]
      .filter(a=>!document.querySelector(a.hash)).map(a=>a.hash)`);
    assert.deepEqual(absent, []);
    await settleScroll();
    for (const motion of ['reduce', 'no-preference']) {
      await send('Emulation.setEmulatedMedia', {features:[{name:'prefers-reduced-motion',value:motion}]});
      for (const target of ['context', 'quantum-challenge', 'teleportation']) {
        await evaluate(`document.querySelector('a[href="#${target}"]').focus()`);
        await key('Enter');
        assert.equal(await evaluate('location.hash'), `#${target}`);
        await settleScroll();
        try {
          await eventually(`document.getElementById('${target}').getBoundingClientRect().top >= -1 &&
            document.getElementById('${target}').getBoundingClientRect().top < innerHeight`, true);
        } catch (error) {
          console.log('Anchor diagnostics', await evaluate(`JSON.stringify({target:'${target}',hash:location.hash,
            top:document.getElementById('${target}').getBoundingClientRect().top,
            bottom:document.getElementById('${target}').getBoundingClientRect().bottom,
            headingTop:document.querySelector('#${target} h3, #${target} h2')?.getBoundingClientRect().top,
            scrollY,viewport:innerHeight,scrollBehavior:getComputedStyle(document.documentElement).scrollBehavior,
            active:document.activeElement.outerHTML})`));
          throw error;
        }
        console.log('Anchor position', motion, target, await evaluate(`document.getElementById('${target}').getBoundingClientRect().top`));
      }
    }
    assert.equal(await evaluate('qa.calls'), 1);
  });
  await check('320px and desktop: no document overflow, one panel, vertical stages and contained figures', async () => {
    for (const width of [320,1440]) {
      await send('Emulation.setDeviceMetricsOverride', {width,height:900,deviceScaleFactor:1,mobile:false});
      for (const panel of ['example','math','code']) {
        await evaluate(`document.getElementById('${panel}-tab').click()`);
        assert((await evaluate('document.documentElement.scrollWidth')) <= width);
        assert.equal(await evaluate('[...document.querySelectorAll("[role=tabpanel]")].filter(e=>!e.hidden).length'), 1);
      }
      assert(await evaluate(`[...document.querySelectorAll('.stage-figures img')].every(img=>
        img.getBoundingClientRect().width <= img.closest('.stage-figures').getBoundingClientRect().width)`));
      assert(await evaluate(`(() => {const boxes=[...document.querySelectorAll('.code-block-group')].map(e=>e.getBoundingClientRect());
        return boxes.every((box,i)=>!i || box.top >= boxes[i-1].bottom)})()`));
    }
  });
  await check('Map conversion and literal text, not HTML', async () => {
    assert(await evaluate(`(() => {
      const mapify = value => Array.isArray(value) ? value.map(mapify) : value && typeof value==='object'
        ? new Map(Object.entries(value).map(([k,v])=>[k,mapify(v)])) : value;
      const payload=structuredClone(qaPayloads.success);
      payload.outputs.verification='<img id="qa-injected" src=x onerror=alert(1)>';
      renderer.renderResult(mapify(payload));
      return !document.getElementById('qa-injected') && document.getElementById('output-verification').textContent===payload.outputs.verification;
    })()`));
  });
  await check('actual figure-only failure retains results, warnings and navigation', async () => {
    await evaluate('renderer.executeExample(async()=>({toJs:()=>qaPayloads.figure}))');
    assert.equal(await evaluate('document.getElementById("execution-status").textContent'), 'Partial');
    assert.equal(await evaluate('document.querySelectorAll("#figures-correction img").length'), 0);
    assert.match(await evaluate('document.getElementById("execution-errors").textContent'), /figure \(correction\)/);
    assert.equal(await evaluate('document.getElementById("output-verification").textContent'), envelopes.success.outputs.verification);
    await evaluate("document.getElementById('example-tab').click(); document.getElementById('code-tab').click()");
    assert.equal(await evaluate('qa.calls'), 1);
  });
  await check('actual missing dependency envelope is Error with visible local/platform diagnostics', async () => {
    await evaluate('renderer.executeExample(async()=>({toJs:()=>qaPayloads.missing}))');
    assert.equal(await evaluate('document.getElementById("execution-status").textContent'), 'Error');
    assert.match(await evaluate('document.getElementById("execution-errors").textContent'), /local \(state-preparation\)/);
    assert.match(await evaluate('document.getElementById("execution-message").textContent'), /not-verified/);
  });
  const mutations = [
    ['missing stage', 'delete payload.outputs.verification'],
    ['wrong count width', "payload.local.alice_counts={'0':1024}"],
    ['incorrect total', "payload.local.bob_counts={'0':1023}"],
    ['illegal completed state', "payload.status='completed'"],
    ['platform submission', 'payload.platform.submission_attempts=1'],
    ['invalid base64 PNG', "payload.figures.verification[0].data='not-base64!'"],
    ['non-PNG bytes', "payload.figures.verification[0].data=btoa('invalid bytes')"],
    ['truncated signature-only PNG', "payload.figures.verification[0].data=btoa('\\x89PNG\\r\\n\\x1a\\n')"],
    ['oversized raster PNG', `{
      const bytes=Uint8Array.from(atob(payload.figures.verification[0].data), c=>c.charCodeAt(0));
      new DataView(bytes.buffer).setUint32(16, 100000000);
      payload.figures.verification[0].data=btoa(String.fromCharCode(...bytes));
    }`],
    ['corrupt compressed image data', `{
      const bytes=Uint8Array.from(atob(payload.figures.verification[0].data), c=>c.charCodeAt(0));
      const view=new DataView(bytes.buffer); let offset=8;
      while (offset+12<=bytes.length) {
        const size=view.getUint32(offset);
        if (String.fromCharCode(...bytes.slice(offset+4,offset+8))==='IDAT') {
          bytes.fill(0,offset+8,offset+8+size); break;
        }
        offset+=12+size;
      }
      payload.figures.verification[0].data=btoa(String.fromCharCode(...bytes));
      try {renderer.validateResult(payload); qa.prevalidation='accepted'}
      catch {qa.prevalidation='rejected'}
    }`],
    ['invalid PNG bit depth', `{
      const bytes=Uint8Array.from(atob(payload.figures.verification[0].data), c=>c.charCodeAt(0));
      bytes[24]=255;
      payload.figures.verification[0].data=btoa(String.fromCharCode(...bytes));
      try {renderer.validateResult(payload); qa.prevalidation='accepted'}
      catch {qa.prevalidation='rejected'}
    }`],
    ['invalid bit depth with valid CRC', `{
      payload.figures.verification[0].data=qaPayloads.invalidBitDepth.figures.verification[0].data;
      renderer.validateResult(payload); // CRC passes; real decode must reject.
    }`],
  ];
  for (const [name, mutation] of mutations) {
    await check(`repeated run clears stale results: ${name}`, async () => {
      const outcome = await evaluate(`(async()=>{
        renderer.renderResult(qaPayloads.success);
        const payload=structuredClone(qaPayloads.success); ${mutation};
        const before=qa.logs.length; let destroyed=0;
        await renderer.executeExample(async()=>({toJs:()=>payload,destroy:()=>destroyed++}));
        return {state:document.getElementById('execution-status').textContent,
          pending:renderer.stages.every(s=>document.getElementById('output-'+s).textContent==='Pending' && document.getElementById('source-'+s).textContent==='Pending'),
          images:document.querySelectorAll('.stage-figures img').length, logs:qa.logs.length-before,destroyed};
      })()`);
      if (name === 'truncated signature-only PNG' && outcome.images) {
        const decodes = await evaluate(`document.querySelector('#figures-verification img').decode()
          .then(()=> 'decoded', ()=> 'decode rejected')`);
        console.log(`PNG reproduction: ${decodes}; UI state ${outcome.state}`);
      }
      if (name === 'corrupt compressed image data' && outcome.images) {
        const decodes = await evaluate(`document.querySelector('#figures-verification img').decode()
          .then(()=> 'decoded despite corrupt IDAT', ()=> 'decode rejected')`);
        console.log(`Corrupt IDAT reproduction: ${decodes}; UI state ${outcome.state}`);
      }
      assert.deepEqual(outcome, {state:'Error',pending:true,images:0,logs:1,destroyed:1});
      if (['corrupt compressed image data', 'invalid PNG bit depth'].includes(name)) {
        assert.equal(await evaluate('qa.prevalidation'), 'rejected');
      }
    });
  }
  await check('controlled bridge rejection resets old results, logs once, remains navigable', async () => {
    const result = await evaluate(`(async()=>{
      renderer.renderResult(qaPayloads.success); const before=qa.logs.length;
      await renderer.executeExample(async()=>{throw new Error('QA controlled bridge rejection')});
      document.getElementById('math-tab').click();
      return [document.getElementById('execution-status').textContent,qa.logs.length-before,
        document.getElementById('output-verification').textContent,qa.logs.at(-1),qa.calls];
    })()`);
    assert.deepEqual(result.slice(0,3), ['Error',1,'Pending']);
    assert.match(result[3], /QA controlled bridge rejection/); assert.equal(result[4],1);
  });
  await check('fresh initialization makes one call with Pending outputs while Running', async () => {
    const previousGeneration = await evaluate('qa.generation');
    await send('Page.navigate', {url:base});
    await eventually(`Boolean(globalThis.qa?.release) && qa.generation !== ${JSON.stringify(previousGeneration)}`, true);
    assert.deepEqual(await evaluate('[qa.calls,document.getElementById("output-verification").textContent,document.querySelectorAll(".stage-figures img").length]'), [1,'Pending',0]);
    await evaluate('qa.release()');
    await eventually('document.getElementById("execution-status").textContent', 'Partial');
  });
  async function staticScenario(mode, width) {
    servingMode = mode;
    const requestStart = requests.length;
    const previousGeneration = await evaluate('qaLocal.generation');
    await send('Emulation.setDeviceMetricsOverride', {width,height:900,deviceScaleFactor:1,mobile:false});
    await send('Page.navigate', {url:`${base}/?qa-static=${mode}-${width}`});
    await eventually(`qaLocal.generation !== ${JSON.stringify(previousGeneration)} &&
      document.getElementById('execution-status')?.textContent === 'Error'`, true);
    assert.deepEqual(await evaluate(`[
      document.querySelector('[aria-selected=true]').id,
      [...document.querySelectorAll('[role=tabpanel]')].filter(panel=>!panel.hidden).length,
      Boolean(document.querySelector('#context-mount h2, #context-mount h3')),
      ['example','math','code'].every(id=>document.getElementById(id+'-mount').children.length>0),
      typeof globalThis.qa
    ]`), ['example-tab',1,true,true,'undefined']);
    const message = await evaluate('document.getElementById("execution-message").textContent');
    assert.equal(message, 'Quantum execution requires the Qollab Python bridge, which could not be loaded. On a local static server, only the educational page is available. See the browser console for technical details.');
    const logs = await evaluate('qaLocal.errors');
    assert.equal(logs.length, 1);
    assert.equal(logs[0][0], 'Teleportation execution/bridge failure');
    assert.equal(logs[0][1].code, 'QOLLAB_RUNTIME_UNAVAILABLE');
    assert.match(logs[0][1].cause, mode === 'missing-wrapper'
      ? /fetch|import|module/i : /backend\.teleportation/);
    assert.equal(requests.slice(requestStart).filter(item=>item.pathname==='/qollab_bridge.js').length, 1);
    for (let repeat=0; repeat<2; repeat++) {
      await evaluate("document.getElementById('example-tab').focus()");
      for (const [pressed, expected] of [['ArrowRight','math-tab'],['End','code-tab'],['ArrowRight','example-tab'],['ArrowLeft','code-tab'],['Home','example-tab']]) {
        await key(pressed);
        assert.equal(await evaluate('document.activeElement.id'), expected);
        assert.equal(await evaluate('document.querySelector("[aria-selected=true]").id'), expected);
      }
      for (const panel of ['code','math','example']) {
        await evaluate(`document.querySelector('a[data-tab-target="${panel}-panel"]').focus()`);
        await key('Enter');
        assert.equal(await evaluate('document.querySelector("[aria-selected=true]").id'), `${panel}-tab`);
        assert.equal(await evaluate('location.hash'), '#study-box');
        assert((await evaluate('document.documentElement.scrollWidth')) <= width);
        assert.equal(await evaluate('[...document.querySelectorAll("[role=tabpanel]")].filter(panel=>!panel.hidden).length'), 1);
      }
      await settleScroll();
      for (const target of ['context','quantum-challenge','teleportation']) {
        await evaluate(`document.querySelector('a[href="#${target}"]').focus()`);
        await key('Enter');
        await settleScroll();
        assert.equal(await evaluate('location.hash'), `#${target}`);
        try {
          await eventually(`document.getElementById('${target}').getBoundingClientRect().top >= -1 &&
            document.getElementById('${target}').getBoundingClientRect().top < innerHeight`, true);
        } catch (error) {
          console.log('Static anchor diagnostics', mode, width, repeat, target,
            await evaluate(`({top:document.getElementById('${target}').getBoundingClientRect().top,
              scrollY,hash:location.hash,active:document.activeElement.outerHTML})`));
          throw error;
        }
      }
    }
    assert.deepEqual(await evaluate(`[
      document.getElementById('execution-status').textContent,
      document.getElementById('execution-message').textContent,
      ['state-preparation','entanglement','measurement-preparation','measurement','classical-bits','correction','verification']
        .every(stage=>document.getElementById('output-'+stage).textContent==='Pending'),
      ['state-preparation','entanglement','measurement-preparation','measurement','classical-bits','correction','verification']
        .every(stage=>document.getElementById('source-'+stage).textContent==='Pending'),
      document.querySelectorAll('.stage-figures img').length,
      qaLocal.errors.length, qaLocal.rejections
    ]`), ['Error',message,true,true,0,1,[]]);
    assert.equal(requests.slice(requestStart).filter(item=>item.pathname==='/qollab_bridge.js').length, 1);
    assert(!requests.slice(requestStart).some(item=>item.pathname==='/qa-fake-python.js'));
    assert(!requests.slice(requestStart).some(item=>item.pathname==='/favicon.ico'));
    assert.match(await evaluate('document.querySelector("link[rel=icon]").href'), /^data:image\/svg\+xml/);
  }
  for (const width of [1440,320]) {
    await check(`unmodified static localhost: mounted Error, navigation, diagnostics and favicon at ${width}px`,
      ()=>staticScenario('static', width));
  }
  await check('missing wrapper: handled loading rejection, usable mounted UI and preserved cause',
    ()=>staticScenario('missing-wrapper', 320));
  await check('main.js served byte-for-byte unchanged in every scenario', async () => {
    assert(servedMain.length >= 5);
    const original = await readFile(path.join(root, 'main.js'), 'utf8');
    assert(servedMain.every(content=>content===original));
    const wrapper = await readFile(path.join(root, 'qollab_bridge.js'), 'utf8');
    assert(servedWrappers.some(item=>item.mode==='fake'));
    assert.equal(servedWrappers.filter(item=>item.mode==='static').length, 2);
    assert(servedWrappers.every(item=>item.content===wrapper));
  });
  await check('no uncaught browser exceptions', async()=>assert.deepEqual(exceptions, []));
} finally {
  socket?.close(); chrome.kill(); await new Promise(resolve=>server.close(resolve));
}
console.log(`Independent local UI checks: ${failures} failure(s); no live Qollab/IonQ execution.`);
process.exitCode = failures ? 1 : 0;
