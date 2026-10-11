# Architecture

## Status

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
