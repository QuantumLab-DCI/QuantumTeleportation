# Independent notebook integration release review

Date: 2026-10-11. Scope: NB-01–NB-04, the bounded local notebook slice.

## Decision and platform blockers

**PASS for the checked bounded local notebook slice.** Original signature-only
PNG, context-anchor, corrupt-IDAT and supporting-documentation findings are now
corrected and independently retested/reviewed. No remaining local production
defect was found in these checks. QA has not changed production or weakened the
expected outcomes. This is not universal correctness, security, accessibility,
visual comprehension, or platform certification.

**NOT VERIFIED for Qollab delivery, and blocked.** There is no live Qollab access.
The browser harness replaces only the static Python import in `main.js` with a
local fake bridge. It proves neither Qollab module loading nor Python proxy
conversion, Aer installation, logging capture, or live project execution.
IonQ documents dynamic branches as unsupported even on the simulator; this slice
must continue to submit zero platform jobs. A working IonQ demonstration needs a
separately approved and verified representation, not a silent substitution.

## Inspected material and executed checks

Read AGENTS, the updated notebook specification and architecture, production
Python, code-panel presentation, result validator/renderer, main lifecycle,
index, styles, requirements, and existing quantum tests. Inspected the actual
tracked production/specification diff and the new renderer file directly.
On correction review, reread updated README, development guide and architecture.
README now correctly describes the implemented local notebook, zero platform
jobs, known-state verification, local reproduction and missing platform evidence.
The documented local package versions match independently inspected metadata.
An ordinary browser cannot resolve the production Python import; README now
explicitly says this. Final development guide correctly identifies Node/CDP and
Chromium rather than Playwright; lower architecture/spec skeleton decisions are
explicitly historical and superseded by the authoritative notebook extension.

Reproduction from the repository root:

```bash
/tmp/opencode/teleportation-notebook-research/bin/python -m unittest discover -s tests -p test_teleportation.py -v
node tests/test_notebook_ui.mjs
node --check tests/test_notebook_ui.mjs
node --check main.js
node --check frontend/execution_results.js
node --check frontend/code_tab.js
git diff --check
/tmp/opencode/teleportation-notebook-research/bin/python -c "import qiskit,qiskit_aer; print('Qiskit',qiskit.__version__,'Aer',qiskit_aer.__version__)"
```

Observed environment: Node 24.14.0, Chromium at `/snap/bin/chromium`, local
Qiskit 2.5.2 and Aer 0.17.2. UI test environment overrides are `NOTEBOOK_PYTHON`
and `CHROMIUM`. The test starts an ephemeral localhost server and headless
Chromium with debugging port 9333 and a disposable browser profile under
`/tmp/opencode/qa-notebook-browser`; that port must be available. The harness uses
the Node built-in WebSocket and zlib CRC APIs; Node 24.14.0 was exercised, not
every older Node version.

The independent UI test generates real success, one-stage figure-failure, and
missing-dependency envelopes from current Python production code. A backend
sentinel throws on any injected-backend submission. Only the exact Python
namespace import in the served `main.js` is replaced; other main behavior,
presentation modules, renderer and CSS execute unchanged. Chrome DevTools
Protocol drives keyboard events, measures layout and decodes the actual images.
Renderer failure tests reuse the actual envelope with individual mutations.
After the asynchronous decode correction, initialization checks retry observable
Partial status without fixed-delay sleeps. A new generation marker distinguishes
fresh page initialization from the old page. Figure-only and missing-dependency
envelopes are exercised through executeExample, including its decode boundary.
CRC-rejected mutation diagnostics are caught locally by the test rather than
incorrectly demanding pre-validation acceptance. End-to-end Error/reset/log and
proxy-release assertions are retained. A separate bit-depth mutation has its
IHDR checksum recomputed using independent Node zlib CRC32, so valid-CRC input
still exercises actual raster decode failure.

## Results

| Criterion | Result | Method and observed outcome |
| --- | --- | --- |
| NB-01 local protocol and whole-example execution | PASS, local only | Executed all 11 quantum unittests, including two 1024-shot Aer calls, dynamic X/Z conditions, inverse preparation, and zero sentinel submissions. Bob verification was `{'0': 1024}`. |
| Physical oracle and correction negative controls | PASS, local only | Executed the analytic all-four-branch fidelity oracle on 26 inputs (104 branches), threshold `1-1e-9`, six phase-sensitive dynamic inputs, and actual source mutations omitting X/Z which fail verification. These are finite ideal checks, not universal correctness. |
| NB-02 source/output association and figures | PASS | Real Python envelope rendered seven ordered, exactly matching source/output blocks and nine PNG images. Browser `decode()` succeeded for each normal image; captions and nonempty alt text are present. |
| NB-03 truthful platform boundary | PASS, local only | Python sentinel receives no jobs. Success renders Partial, explicit local provenance and not-verified platform diagnostics; identity tests cover identified IonQ incompatibility. No actual IonQ backend was exercised. |
| NB-04 mount/call lifecycle | PASS, fake bridge only | Main mounts before exactly one `callPromising` attempt, shows Running, defaults to Example, releases returned proxy once. Navigation during and after the pending call makes no additional attempts. |
| Map/plain normalization and text insertion | PASS | Recursively mapped real payload accepted; hostile HTML string displayed literally through textContent with no injected element. This is a focused insertion test, not security certification. |
| Missing dependencies and local failure | PASS, local only | Controlled missing import returns actual Error envelope with null counts and visible stage-specific local plus platform diagnostics. Existing quantum tests exercise second-experiment failure and a single technical traceback. |
| Malformed envelopes and invalid base64/non-PNG bytes | PASS | Missing stage, wrong bit width, wrong total, illegal Completed state, forbidden submission count, invalid base64 and non-PNG bytes all produce Error, clear prior source/output/images, log once and release the proxy. |
| Truncated PNG image | PASS after correction | Eight-byte signature-only PNG now produces Error, clears results/images, logs once and releases the proxy. Oversized-raster negative case also passes. See closed NB-QA-01. |
| PNG browser decode failure | PASS | Structurally accepted PNG with invalid bit depth and independently recomputed valid CRC is rejected by Image.decode; executeExample clears results and displays Error before insertion. |
| Corrupt PNG compressed data | PASS after CRC correction | First IDAT data replaced with zeros with retained original CRC now fails validation and end-to-end execution produces Error, Pending source/output, zero images, one log and one proxy release. Node zlib independently rejects the zero stream. See closed NB-QA-03. |
| Figure-only failure | PASS | Actual correction drawing failure retains counts/outputs and other figures, displays Partial with `figure (correction)` warning, and navigation does not rerun. |
| Repeated run / stale output | PASS | Success followed by rejected/malformed result clears computed content and images; fresh page initialization starts one call with Pending output and no images and reaches Partial after observable decode completion. No repeated Python logging handlers in quantum test. |
| Controlled bridge rejection / diagnostics | PASS, fake bridge only | Rejected run emits one console error including originating controlled exception, displays concise public Error, resets old results and leaves Math tab usable. |
| Keyboard tabs and study header links | PASS | Real dispatched Left/Right/Home/End keys select and focus expected tabs. Computed focus outline is 3px. Enter on each study header link selects its panel and targets `#study-box`; outputs survive and call count remains one. |
| Context header links | PASS after correction and synchronization investigation | Three destination IDs restored. Enter activation updates each expected hash and scrolls its destination into the viewport in reduced-motion and normal smooth-scroll modes; no rerun. Actual diff adds only the three IDs, preserving narrative. See closed NB-QA-02 and synchronization evidence below. |
| Narrow/desktop rendering | PASS, automated Chromium measurements | At 320 and 1440 CSS pixels, all three panels have no document-wide overflow, exactly one visible panel, vertically ordered stage articles and contained images. These measurements do not certify small circuit-label legibility or visual comprehension. |
| Browser uncaught exceptions | PASS | Runtime exception event collection empty during integrated checks, including deliberate handled failures. |
| JavaScript syntax / whitespace | PASS | Listed syntax commands and `git diff --check` exited zero. |
| README scope, versions, output interpretation and platform disclosure | PASS, documentation review | Updated instructions and descriptions match the inspected implementation and local package metadata; full platform delivery is explicitly blocked. A fresh dependency installation was not performed. |
| Development/architecture/spec consistency | PASS after correction | Final development guide correctly names Node/CDP and Chromium. Entire lower skeleton sections in architecture/spec are explicitly historical/superseded, with notebook extension authoritative. See closed NB-QA-04. |
| Live Qollab loader, dependencies, conversion, repeated Run, logs | NOT VERIFIED, delivery blocker | No live platform access. Fake import and local CPython are explicitly separate evidence. |
| Real IonQ execution | NOT VERIFIED, delivery blocker | No job submitted; preserved dynamic branches are documented incompatible. |
| Team/user comprehension, learning, general accessibility | NOT VERIFIED | Requires separate team/user review; automated keyboard and layout checks do not establish learning or universal accessibility. |

## Defects assigned to owners

### NB-QA-01 — PNG signature is not image validity (original case CLOSED)

Owner: coordinator (`frontend/execution_results.js`). Original reproduction
corrected and independently retested; further corrupt-IDAT case tracked below.

Historical reproduction before correction: `validateFigure` validated base64
and an eight-byte signature only. To reproduce,
clone a real valid envelope and replace
`figures.verification[0].data` with
`btoa('\x89PNG\r\n\x1a\n')`, then execute it through `executeExample` after a
successful result. Expected: Error before computed insertion, old results reset,
one useful diagnostic. Observed: Partial, old-success-shaped outputs and nine
figure elements, zero failure logs; malformed image decoding rejects.

Correction inspected: synchronous signature/IHDR/chunk/raster bounds plus async
Image.decode in executeExample before renderResult. The exact original
reproduction now produces Error, no images, Pending source/output, one log and
one proxy release. Full browser regression run confirms original fix rather than
accepting the author's report. Asynchronous decode timing required the test to
retry observable completion, not demand synchronous Partial.

### NB-QA-02 — Missing context anchors (CLOSED)

Owner: coordinator to assign the UI/content owner (`index.html` and/or
`frontend/context_section.js`). Pre-existing, also noted in the current spec;
not caused by notebook execution.

Historical reproduction before correction: use the context header links or inspect
`document.querySelector('#context')`, `'#quantum-challenge'`, and
`'#teleportation'`: all absent. Expected native same-page destinations exist.
Recommend restoring intended destination IDs without changing team narrative.
Correction inspected: exactly three ID attributes added without narrative
changes. Destination existence, keyboard activation, hash and viewport position
checks now pass; whole browser regression confirms navigation does not rerun.

### NB-QA-03 — Chromium tolerates corrupt PNG IDAT (CLOSED for reproduction)

Owner: coordinator (`frontend/execution_results.js`). This was the remaining
invalid-PNG acceptance defect; now closed for the recorded reproduction, not a
claim about security or all decoder implementations.

Historical reproduction before CRC correction: use the
`corrupt compressed image data` mutation in the independent
test: decode a valid verification figure into bytes, find its first IDAT chunk,
replace every byte of that chunk's compressed data with zero, retain chunk lengths
and the original CRC, and base64-encode it into the envelope. Node inflateSync
rejects a zero stream; this is invalid compressed PNG data. validateResult passes,
then actual executeExample returns Partial. Chromium Image.decode also resolves
on the inserted image. The browser decoder is tolerant, so it is not a strict PNG
integrity validator. Expected invalid-PNG Error, reset and diagnostic do not occur.

Correction independently inspected: standard reflected CRC32 polynomial checks
every chunk's type+data against the stored checksum, prior to browser decode.
Decoder comment is narrowed to the actual division of responsibilities. Original
mutation now rejects during validation and reaches the intended executeExample
Error boundary. Tests catch pre-validation diagnostics and still assert the
complete Error/reset/log/release behavior. A valid-CRC invalid-bit-depth fixture
separately proves decode failure is handled, so the check is not bypassed merely
because CRC rejection moved earlier. Full UI regression passes. This closes the
observed reproduction, not every conceivable malformed PNG case.

### NB-QA-04 — Supporting documentation inaccuracies (CLOSED)

Owner: coordinator. README is materially accurate on reviewed notebook scope and
platform limits. Originally found inaccuracies:

- `docs/development.md:14`: there is no Playwright dependency. State actual Node
  WebSocket/CDP, Chromium and Python prerequisites, preferably linking this report.
- `docs/architecture.md:43,52,56,88,94`: current-looking text still says all visible
  copy is Spanish, only three IDs are shared, integration remains Pending with an
  always-failing placeholder, and IonQ feed-forward support is unestablished.
  These do not describe the actual seven-stage, mixed-language, active local
  implementation or documented incompatibility. The extension explicitly
  supersedes the three-output contract but not all those other current-looking
  sections. Label the lower skeleton description historical/superseded or update
  it; retain a single unambiguous current lifecycle and compatibility contract.

Final reread: development guide names Node/CDP and Chromium with interpreter and
browser overrides. Architecture explicitly marks all lower sections historical
and makes the notebook extension authoritative; spec likewise marks lower
skeleton decisions historical. These corrections close the documented issues.

## Anchor synchronization investigation

A reported quantum-challenge timeout was investigated rather than raising the
viewport tolerance. The `top >= -1` threshold is unchanged. The earlier test
could change reduced-motion media while an existing native smooth-scroll
animation from study-link keyboard tests was still in flight. Instrumentation
observed positions changing after an initially passing assertion, including
quantum-challenge at -36.140625 pixels after transient visibility. A transient
position was not proof of a broken target or a settled navigation result.

The harness now observes six stable requestAnimationFrame scroll positions
before the motion change and after each native anchor activation, then checks
the original viewport predicate. This is observable synchronization, not a
fixed-delay sleep or a relaxed expectation. Failure diagnostics retain target,
hash, top/bottom, heading position, scrollY, viewport, scroll behavior and focus.

Repeated final full-suite runs in both `reduce` and `no-preference` modes have
settled top positions: context 0.4375, quantum-challenge -0.140625, teleportation
-0.5 CSS pixels. This is normal subpixel alignment within the original one-pixel
tolerance. All expected hashes and the sole bridge-call count remain correct.
No production navigation correction is indicated by these observed retests;
the synchronization issue originated in the local harness sequencing.

## Correction rerun summary

Commands above executed again after inspecting corrections: all **11 quantum
tests PASS**. The final expanded **23 browser groups PASS / 0 FAIL**, including
corrected anchors in both motion modes, truncation, corrupt IDAT CRC, valid-CRC
real decode-failure handling, oversized raster, initial/fresh async completion,
figure-only degradation, repeated-run cleanup, keyboard and 320px layout. Final
dual-motion browser suite executed twice consecutively successfully after the
scroll investigation; an earlier reduced-motion-only version also passed three
consecutive runs. Syntax and whitespace checks pass.

## Handoff

No production changes by QA. Tests and this evidence are the only workspace
edits made for this review. Current UI suite exits zero with strict original
invalid-PNG and anchor expectations retained. Full platform delivery remains
blocked even after local fixes. Human comprehension and general accessibility
remain separate, unverified review activities.
