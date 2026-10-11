# Architecture

## Localhost loader correction

The entry now mounts before dynamically loading the relative qollab_bridge.js module. That module retains the documented static Python namespace import and returns the original callPromising(backend) proxy. Only loading failures receive QOLLAB_RUNTIME_UNAVAILABLE with the original cause; the existing rendering boundary logs once and shows fixed English feedback. Execution/validation errors retain their previous handling. Static hosting provides educational preview only, not Python execution. Independent QA approved this bounded design. Qollab discovery of dynamically loaded modules and their Python dependencies remains NOT VERIFIED; a live wrapper probe is required. This supersedes the earlier entry-static-import lifecycle description below.

## Content-preserving visual refinement

The reviewed VIS-01–03 change is CSS-only. Existing context markup owns all narrative, headings, five step labels and references. `main.css` supplies responsive readable typography, a bounded reading column, vertical step separation and subtly accented physics insets. The introductory article remains unboxed; existing study panel colors and notebook figure/error styles remain intact. No execution, plain-data, dependency or navigation contract changes are introduced. Missing context anchor targets are a pre-existing separate issue, not repaired by styling.

## Supplied notebook extension

The bounded notebook slice is READY for local implementation following independent QA review and the clarifications below; it supersedes the three-text-output placeholder contract below. This is not Qollab delivery readiness. The existing layout remains unchanged.

Python builds stage snapshots, executes the two supplied dynamic Aer experiments with basis_gates=['u','cx'], and encodes Matplotlib figures as in-memory PNGs. It exports the exact executed source excerpts so browser display cannot drift. No IPython display or notebook pip magic is needed in production. Dependencies are Qiskit visualization support and documented Aer 0.17.2; actual Qollab availability is NOT VERIFIED.

`run_teleportation(backend)` returns this plain-data envelope (no Python objects cross the boundary):

```text
{
  schema_version: 1,
  status: "partial" | "error",
  outputs: {stage: text},
  sources: {stage: text},
  figures: {stage: [{mime_type: "image/png", encoding: "base64", data: text,
                     alt: text, caption: text}]},
  local: {status: "completed" | "error", shots: 1024,
          alice_counts: object | null, bob_counts: object | null},
  platform: {status: "incompatible" | "not-verified", backend: text | null,
             submission_attempts: 0, message: text},
  errors: [{scope: "local" | "figure" | "platform", stage: stage | null, message: text}]
}
```

The exact seven keys in outputs/sources/figures are state-preparation, entanglement, measurement-preparation, measurement, classical-bits, correction, verification. Sources and outputs are strings; figures are arrays (empty if unavailable). Counts have binary keys and nonnegative integer values. Successful local results have total 1024. The renderer accepts bridge Maps or plain objects, uses textContent and validated PNG image data, and preserves local output alongside explicit platform failure. PNG validation includes base64, chunk/raster bounds, chunk CRC32 and actual browser decoding before computed insertion. Platform identification is informational only, never guessed capability detection. IonQ's documented lack of dynamic if branches prevents this protocol submission; zero platform jobs are attempted, and the UI explicitly marks Partial. Unknown backend compatibility remains not verified. No local fallback is represented as a platform run.

Python logs milestones and caught failures through its module logger; the JS boundary logs bridge failures once and displays English feedback. Live Python log capture is unverified. Figure failures are scoped recoverable errors. UI states are Pending -> Running -> Partial | Error; Completed is reserved for a future verified whole-platform implementation. Main uses the documented static namespace Python import, then mounts before invoking callPromising(backend) once, converts with toJs, and releases the result proxy when supported. The Python entry module must use only stdlib imports at module scope; optional scientific imports occur inside execution so dependency errors can reach the mounted UI. A platform loader failure before JS initialization remains a live-platform check, not locally handled proof. No navigation event calls Python.

### Contract invariants and provenance

Both local experiments succeed => status partial and local.status completed. A local experiment failure => status error and local.status error, null counts. Figure-only failure retains counts and partial status with a visible stage-specific error. Bridge/validation failure displays Error before any result is inserted. Alice counts have exactly two-bit keys in A Q order, Bob exactly one-bit keys after inverse preparation; each completed total is 1024. Zero injected-backend submissions apply to every backend in this bounded slice; identified IonQ is incompatible, unknown backends not-verified.

Preparation, entanglement, measurement-preparation, measurement and correction show circuit construction snapshots, not additional jobs or measured intermediate states. Classical-bits shows the first Aer experiment's A Q histogram (Q and A measured; c2 unused). Verification shows the second experiment's inverse-preparation circuit and c2 histogram. Excerpts are executable stage strings used by Python itself and returned unchanged, rather than duplicated JavaScript snippets.

## Historical skeleton architecture (superseded)

The sections below record the initial skeleton only, not current execution or contracts. The supplied notebook extension above is authoritative: seven-stage data, Partial/Error, local Aer execution, and documented IonQ incompatibility replace these historical decisions.

### Historical status

**READY for one tabbed study box with Spanish presentation.** Independent QA confirmed the localized presentation preserves accessibility, stable output IDs, and the no-rerun lifecycle. User-facing copy and accessible names are Spanish; source identifiers, filenames, comments, contract keys, and the Qollab bridge remain unchanged. Real Qollab and IonQ execution remain unverified.

## Components and dependency direction

1. `index.html` provides stable page mount points and browser dependencies.
2. `frontend/*.js` export markup templates only. They do not execute Python.
3. `main.js` mounts templates, owns the Example/Math/Code tab state and related anchors, and remains the only JavaScript integration boundary.
4. `backend/teleportation.py` owns Qiskit execution and returns display-safe plain data.

Dependencies point from `main.js` to presentation modules and the Python module. Python does not depend on browser code. The three output block IDs are the only shared presentation/execution identifiers.

## Page lifecycle

The complete interface is mounted before asynchronous work. Example is initially selected; changing tabs or following anchors never invokes Python or clears results. For this initial skeleton, integration remains `Pending` rather than submitting an incomplete circuit. When enabled, one project run makes one whole-example call and at most one `backend.run(...)` submission.

## Qollab interface

Official Qollab documentation establishes the bridge form:

```javascript
import * as teleportation from 'backend.teleportation';
const proxy = await teleportation.run_teleportation.callPromising(backend);
const result = proxy.toJs();
```

Qollab injects `backend`; production code must not construct a provider or embed credentials. Browser execution of this project and the selected IonQ backend remain **NOT VERIFIED**.

## Plain-data contract

`run_teleportation(backend)` returns exactly one bridge-convertible dictionary on success:

```python
{
    "outputs": {
        "state-preparation": "text",
        "entanglement": "text",
        "execution": "text",
    }
}
```

All keys are required and values are strings. JavaScript validates the converted object, ignores no unknown result shape, and inserts values with `textContent` in DOM order. Python objects, HTML, circuits, jobs, and provider results never cross the boundary.

## State and errors

The state machine is `Pending -> Running -> Completed | Error`. The skeleton remains at `Pending` and deliberately does not call the always-failing placeholder; this preserves the truthful product state rather than showing an integration error for missing team content. When execution is enabled, Python failures propagate. `main.js` then logs technical detail once with `console.error`, displays a short English error, keeps educational sections usable, and does not fabricate or retain computed output. A malformed success value is treated as an error.

Python modules use `logging.getLogger(__name__)`; runtime configuration belongs at the Qollab integration boundary once its behavior is observed.

## Quantum compatibility decision

Qiskit 2.5.2 locally supports the required construction and branch-correctness oracles. Qollab documents Qiskit `>=2.5.2,<3.0.0`, dotted Python imports, `callPromising`, and `toJs`. IonQ support for mid-circuit measurement and classical feed-forward is not established. Do not silently substitute a local-only circuit. If Qollab rejects dynamic control, use an explicitly disclosed deferred-measurement equivalent only after a platform probe and educational review.

## Checks

- Static DOM/module checks: local.
- Tabs, anchors, keyboard focus, narrow layout, and KaTeX rendering: local browser.
- Qiskit helpers and physical fidelity oracle: local after notebook logic exists.
- Bridge conversion, controlled failure, logs, one-job behavior, and IonQ compatibility: Qollab only.
