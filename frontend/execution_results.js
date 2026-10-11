// Validate the complete bridge payload before inserting any computed result.
export const stages = [
  'state-preparation', 'entanglement', 'measurement-preparation',
  'measurement', 'classical-bits', 'correction', 'verification',
];

export function normalizeBridge(value) {
  if (value instanceof Map) {
    return Object.fromEntries([...value].map(([key, item]) => [key, normalizeBridge(item)]));
  }
  if (Array.isArray(value)) return value.map(normalizeBridge);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, normalizeBridge(item)]));
  }
  return value;
}

function requireValue(condition) {
  if (!condition) throw new Error('Invalid teleportation result contract.');
}

function validateCounts(counts, width) {
  requireValue(counts && typeof counts === 'object' && !Array.isArray(counts));
  const entries = Object.entries(counts);
  requireValue(entries.length > 0);
  for (const [bits, count] of entries) {
    requireValue(bits.length === width && /^[01]+$/.test(bits));
    requireValue(Number.isSafeInteger(count) && count >= 0);
  }
  requireValue(entries.reduce((sum, [, count]) => sum + count, 0) === 1024);
}

// PNG chunks use the standard reflected CRC-32 polynomial over type and data.
const crcTable = Array.from({ length: 256 }, (_, value) => {
  let crc = value;
  for (let bit = 0; bit < 8; bit += 1) {
    crc = (crc & 1) ? 0xedb88320 ^ (crc >>> 1) : crc >>> 1;
  }
  return crc >>> 0;
});

function chunkChecksum(bytes, start, end) {
  let crc = 0xffffffff;
  for (let offset = start; offset < end; offset += 1) {
    crc = crcTable[(crc ^ bytes.charCodeAt(offset)) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function validateFigure(figure) {
  requireValue(figure && figure.mime_type === 'image/png' && figure.encoding === 'base64');
  requireValue(typeof figure.alt === 'string' && figure.alt.length > 0);
  requireValue(typeof figure.caption === 'string');
  requireValue(typeof figure.data === 'string' && figure.data.length <= 20000000);
  requireValue(/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(figure.data));
  const bytes = atob(figure.data);
  requireValue(bytes.startsWith('\x89PNG\r\n\x1a\n'));
  // Bound the raster size before browser decoding and reject truncated chunks.
  requireValue(bytes.length >= 45 && bytes.slice(12, 16) === 'IHDR');
  const uint32 = (offset) => (
    ((bytes.charCodeAt(offset) * 0x1000000)
      + (bytes.charCodeAt(offset + 1) << 16)
      + (bytes.charCodeAt(offset + 2) << 8)
      + bytes.charCodeAt(offset + 3)) >>> 0
  );
  requireValue(uint32(8) === 13);
  const width = uint32(16);
  const height = uint32(20);
  requireValue(width > 0 && height > 0 && width * height <= 25000000);
  let offset = 8;
  let hasImageData = false;
  let hasEnd = false;
  while (offset + 12 <= bytes.length) {
    const length = uint32(offset);
    requireValue(offset + 12 + length <= bytes.length);
    const kind = bytes.slice(offset + 4, offset + 8);
    requireValue(chunkChecksum(bytes, offset + 4, offset + 8 + length)
      === uint32(offset + 8 + length));
    if (kind === 'IDAT' && length > 0) hasImageData = true;
    offset += 12 + length;
    if (kind === 'IEND') {
      requireValue(length === 0 && offset === bytes.length);
      hasEnd = true;
      break;
    }
  }
  requireValue(hasImageData && hasEnd);
}

async function decodeFigures(result) {
  for (const stage of stages) {
    for (const figure of result.figures[stage]) {
      const image = new Image();
      image.src = `data:image/png;base64,${figure.data}`;
      // Structural bounds and CRC checks precede actual raster decoding.
      await image.decode();
    }
  }
}

export function validateResult(payload) {
  const result = normalizeBridge(payload);
  requireValue(result && result.schema_version === 1);
  requireValue(['partial', 'error'].includes(result.status));
  for (const field of ['outputs', 'sources', 'figures']) {
    requireValue(result[field] && typeof result[field] === 'object');
    requireValue(Object.keys(result[field]).length === stages.length);
  }
  for (const stage of stages) {
    requireValue(typeof result.outputs[stage] === 'string');
    requireValue(typeof result.sources[stage] === 'string');
    requireValue(Array.isArray(result.figures[stage]));
    result.figures[stage].forEach(validateFigure);
  }
  const local = result.local;
  requireValue(local && local.shots === 1024);
  if (result.status === 'partial') {
    requireValue(local.status === 'completed');
    validateCounts(local.alice_counts, 2);
    validateCounts(local.bob_counts, 1);
  } else {
    requireValue(local.status === 'error' && local.alice_counts === null && local.bob_counts === null);
  }
  const platform = result.platform;
  requireValue(platform && ['incompatible', 'not-verified'].includes(platform.status));
  requireValue(platform.submission_attempts === 0 && typeof platform.message === 'string');
  requireValue(platform.backend === null || typeof platform.backend === 'string');
  requireValue(Array.isArray(result.errors));
  for (const error of result.errors) {
    requireValue(error && ['local', 'figure', 'platform'].includes(error.scope));
    requireValue(error.stage === null || stages.includes(error.stage));
    requireValue(error.scope !== 'figure' || stages.includes(error.stage));
    requireValue(typeof error.message === 'string');
  }
  requireValue(result.errors.some((error) => error.scope === 'platform'));
  requireValue(result.status !== 'error' || result.errors.some((error) => error.scope === 'local'));
  return result;
}

export function setExecutionState(state, message) {
  document.getElementById('execution-status').textContent = state;
  document.getElementById('execution-message').textContent = message;
}

export function resetExecution() {
  for (const stage of stages) {
    document.getElementById(`source-${stage}`).textContent = 'Pending';
    document.getElementById(`output-${stage}`).textContent = 'Pending';
    document.getElementById(`figures-${stage}`).replaceChildren();
  }
  document.getElementById('execution-errors').replaceChildren();
}

export function renderResult(payload) {
  const result = validateResult(payload);
  for (const stage of stages) {
    document.getElementById(`source-${stage}`).textContent = result.sources[stage];
    document.getElementById(`output-${stage}`).textContent = result.outputs[stage];
    const container = document.getElementById(`figures-${stage}`);
    container.replaceChildren();
    for (const data of result.figures[stage]) {
      const figure = document.createElement('figure');
      const image = document.createElement('img');
      image.alt = data.alt;
      image.src = `data:image/png;base64,${data.data}`;
      const caption = document.createElement('figcaption');
      caption.textContent = data.caption;
      figure.append(image, caption);
      container.append(figure);
    }
  }
  const errors = document.getElementById('execution-errors');
  errors.replaceChildren();
  for (const error of result.errors) {
    const message = document.createElement('p');
    message.textContent = `${error.scope}${error.stage ? ` (${error.stage})` : ''}: ${error.message}`;
    errors.append(message);
  }
  setExecutionState(result.status === 'partial' ? 'Partial' : 'Error',
    `Local Aer: ${result.local.status}. Platform: ${result.platform.status}. ${result.platform.message}`);
}

// One invocation per mounted project Run. Navigation never calls this function.
export async function executeExample(run) {
  resetExecution();
  setExecutionState('Running', 'Running the whole example; no platform job will be submitted.');
  let proxy;
  try {
    proxy = await run();
    const result = validateResult(proxy.toJs());
    await decodeFigures(result);
    renderResult(result);
  } catch (error) {
    resetExecution();
    console.error('Teleportation execution/bridge failure', error);
    const message = error.code === 'QOLLAB_RUNTIME_UNAVAILABLE'
      ? 'Quantum execution requires the Qollab Python bridge, which could not be loaded. On a local static server, only the educational page is available. See the browser console for technical details.'
      : 'The example could not be executed or its results could not be displayed. See the browser console for technical details.';
    setExecutionState('Error', message);
  } finally {
    if (typeof proxy?.destroy === 'function') proxy.destroy();
  }
}
