# Development Guide

## Ownership

- Coordinator: specification, architecture, shared `main.js` contract, dependencies, documentation, integration, and Git.
- UX frontend: `index.html`, `main.css`, and `frontend/`.
- Quantum: `backend/`, quantum checks, and recommendations for the coordinator-owned integration boundary.
- QA: independent reviews and delivery evidence.

Only one author edits a file at a time. Preserve team-authored educational content and keep all product text and code in English.

## Local review

Serve the repository with any simple static-file server and open `index.html` to review the notes layout and final tabbed study box. This does not reproduce Qollab's Python bridge or establish Qollab compatibility. Check all six header links, all three tab panels, document-wide overflow, and visible keyboard focus.

Python syntax can be checked without submitting a quantum job. Quantum correctness requires dedicated Qiskit oracles once the notebook-derived implementation exists.

## Qollab workflow

Upload the root project files and select a backend in Qollab. `index.html` and `main.js` must remain at the root; Qollab loads root `main.css` automatically. Run the whole project rather than individual content blocks.

Before enabling execution, record a disposable platform probe for bridge import, `callPromising`, `toJs`, backend identity, result shape, controlled failure visibility, dynamic-circuit compatibility, and one IonQ submission. Never report a local static preview as Qollab evidence.

## Diagnostics

The browser console is the JavaScript diagnostic surface. Python uses module loggers without assuming file persistence. At the JavaScript boundary, record one technical failure and show a separate concise English message in the page. Do not log credentials, complete provider payloads, or duplicate tracebacks.

## Current limitations

The educational narrative, analogy limits, equations, fixed input state, shot count, notebook-derived circuit, and real outputs are team-owned content and remain pending. Qollab, its local simulator, and IonQ execution are not yet verified.
