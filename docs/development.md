# Development Guide

## Ownership

- Coordinator: specification, architecture, shared `main.js` contract, dependencies, documentation, integration, and Git.
- UX frontend: `index.html`, `main.css`, and `frontend/`.
- Quantum: `backend/`, quantum checks, and recommendations for the coordinator-owned integration boundary.
- QA: independent reviews and delivery evidence.

Only one author edits a file at a time. Preserve team-authored educational content and keep all product text and code in English.

## Local review

Run `python3 -m http.server 8000` from the project root for an educational preview. The page mounts before loading qollab_bridge.js; a plain static server cannot resolve its Python import, so Code displays an explicit execution Error while navigation remains available. The independent browser harness replaces only that wrapper's Python import with a fake bridge and uses real local Python envelopes. Run `node tests/test_notebook_ui.mjs` with Node and Chromium available (the harness uses Chromium's DevTools Protocol, not Playwright). See the harness constants for interpreter and browser overrides. This does not reproduce Qollab's loader or establish platform compatibility. Check all six header links, all three panels, document-wide overflow and visible focus. Live verification must additionally cover dynamic wrapper discovery and backend injection.

Install `requirements.txt` in a virtual environment and run `python3 -m unittest discover -s tests -p test_teleportation.py -v`. The suite checks the exact dynamic notebook, independent phase-sensitive branches and correction omissions, controlled failures, repeated runs and PNG figures. Zero injected-backend jobs are submitted.

## Qollab workflow

Upload the root project files and select a backend in Qollab. `index.html` and `main.js` must remain at the root; Qollab loads root `main.css` automatically. Run the whole project rather than individual content blocks.

The bounded notebook slice enables local Aer execution through the documented bridge without claiming platform readiness. Before platform delivery, record a disposable probe for static import, `callPromising`, `toJs`, dependency availability, backend identity, nested result conversion, PNG decoding, controlled failure visibility and repeated Run. Never report a local harness as Qollab evidence. IonQ documents dynamic branches as unsupported; do not submit this known-incompatible protocol or invent one-job success. Any alternative platform representation requires an explicit educational/architecture decision and a verified run, with at most one IonQ job per project Run.

## Diagnostics

The browser developer console is the JavaScript diagnostic surface. Python uses `logging.getLogger(__name__)` without adding handlers or assuming file persistence. Local caught failures include one traceback at the Python boundary; bridge/validation/decode failures produce one browser `console.error` and separate concise English UI feedback. Read the local interpreter's stderr for Python errors. Actual Qollab Python log capture remains NOT VERIFIED; inspect the platform console during the probe. Do not log credentials or complete payloads.

The UI validates the whole envelope before insertion and decodes all PNGs before presenting a successful local result. Error clears stale source/output/figures for the new run. Figure-generation failures preserve computed counts with stage-specific warnings. Repeated independent runs must not install duplicate logging handlers. Section navigation never invokes Python.

## Current limitations

The supplied fixed input, two 1024-shot experiments, dynamic corrections, circuit snapshots, histograms and verification are implemented locally. The other educational modules remain team-owned; evolving analogy/math content needs team review. Qollab loading/Aer/bridge/logs remain unverified, and IonQ dynamic execution is documented incompatible. Publication, repository URL and demo video remain pending.
