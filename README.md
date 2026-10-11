# Quantum Teleportation

**Native educational web project targeting Qollab, with the team's Qiskit teleportation example.**

[Interface](#interface) · [Execution](#execution) · [Outputs](#outputs) · [Checks](#checks) · [Limits](#limits) · [Attribution](#attribution)

> **Status:** Local dynamic notebook implemented and tested. Live Qollab execution is **NOT VERIFIED**. IonQ does not support this notebook's dynamic conditions; local success is displayed as **Partial**, not a completed platform demonstration.
>
> This effort is supported by Qollab & IonQ.

## Interface

One long page introduces the team's context and analogy, followed by one Catppuccin Mocha study box with Example, Math and Code tabs. Example is selected initially. Existing team-authored Spanish narrative is preserved; the newly integrated notebook explanations and source use English.

The Code tab presents seven vertical explanation → executed Python source → text output → figure blocks. There is no cell editor, per-cell execution or step navigator. Tabs and section links neither run Python nor discard results.

## Architecture

- `index.html`, `main.css`, `frontend/`: page, educational material and display-safe rendering.
- `main.js`: mounting, native navigation/tab interaction and one Qollab bridge call.
- `backend/teleportation.py`: circuit construction, two ideal Aer experiments, executable source excerpts and in-memory PNG formatting.
- `requirements.txt`: Python runtime dependencies.

See the canonical [architecture and data contract](docs/architecture.md), [requirements and evidence](specs/project.md), [development guide](docs/development.md), and [independent review](docs/qa/notebook-integration.md).

## Execution

### Qollab target — verification still required

Upload the root files together with `frontend/`, `backend/` and `requirements.txt` to Qollab, select a backend, and Run the whole project. The integration uses the documented static Python namespace import and `run_teleportation.callPromising(backend)`, followed by `toJs()`.

The entry mounts the page before asynchronously loading `qollab_bridge.js`, which retains the documented Python import and whole-example call. **Dynamic wrapper discovery, project loading, dependency installation, Aer browser execution, conversion and log capture have not been exercised on Qollab.** Loading failures are caught for local preview; Qollab's own preprocessing behavior remains unverified.

The injected backend is retained but receives **zero jobs in this bounded slice**. [IonQ documents that dynamic branches are unsupported on all its targets, including its simulator](https://docs.ionq.com/api-reference/v0.4/openqasm3.md). The UI keeps this limitation visible. Unknown backends remain not verified; they are not assumed compatible. No local result is an IonQ result, and no coherent-control circuit is silently substituted.

### Local Python reproduction

In a Python virtual environment:

```bash
python3 -m pip install -r requirements.txt
python3 -m unittest discover -s tests -p test_teleportation.py -v
python3 -c "from backend.teleportation import run_teleportation; r = run_teleportation(None); print(r['outputs']['classical-bits']); print(r['outputs']['verification']); print(r['platform']['message'])"
```

The test suite was executed with Python 3.12.3, Qiskit 2.5.2, Aer 0.17.2, Matplotlib 3.11.1 and pylatexenc 2.11. These are observed local versions, not promised Qollab versions. The simulator seed is fixed for reproducible screenshots/counts; it does not change the physical protocol.

Run `python3 -m http.server 8000` from the project root and open `http://localhost:8000` for an educational preview. A plain static server does **not** understand the Python import in `qollab_bridge.js`: the page remains usable and Code displays an explicit execution Error. No quantum results are fabricated. Use the independent browser harness described in the development guide for local integration checks; its fake bridge is not platform evidence.

## Outputs

Q = q0 contains `0.6|0⟩ + 0.8|1⟩`; A = q1 is the granddaughter's resource qubit; B = q2 is the grandmother's qubit. Circuit snapshots retain the supplied barriers and show the protocol growing stage by stage. They are construction diagrams, not extra executions or measured intermediate states.

1. The first Aer experiment measures Q into c0 and A into c1 over **1024 shots**. Its histogram displays **A Q**, so the four combinations are approximately equally frequent.
2. The second experiment applies **X if c1=1, then Z if c0=1**, applies the inverse known preparation to B, and measures B into c2 over **1024 shots**. Ideal verification yields `{'0': 1024}`.

The final bar at zero is **after inverse preparation**; before it, B contains the transferred input state. This is a known-state verification, not tomography of an arbitrary unknown state. Separate experiments need not have identical samples. Actual outputs are inserted as text, never executable HTML; validated PNGs carry alt text and provenance captions.

## Checks

Local evidence includes independent branch/phase oracles, dynamic Aer runs, negative controls for missing corrections, PNG decoding, failure envelopes and browser checks. Reproduction and PASS/FAIL/NOT VERIFIED details are maintained in the [QA report](docs/qa/notebook-integration.md) and [spec](specs/project.md), rather than duplicated here.

## Limits

- Full Qollab execution remains unverified; the required IonQ demonstration is blocked by dynamic-branch incompatibility. A separately approved and explicitly labeled platform representation needs design and live verification.
- The team's other narrative and math modules are preserved. Remaining educational content, consistency between evolving analogy versions and human learning validation need team review.
- Python diagnostics use a module logger; browser bridge errors use the developer console. Live platform logging access is unverified.
- MIT licensing is included, but public Qollab publication, public repository URL, final dependency disclosures, 2–3 minute demo video and event submission remain delivery tasks. Do not treat this slice as published or hackathon-complete.

## Attribution

- Algorithm and analogy: notebook content supplied by the team, integrated without replacing the dynamic correction protocol.
- Quantum construction/simulation/plots: [Qiskit](https://qiskit.org/) and [Aer](https://qiskit.github.io/qiskit-aer/); Python requires `qiskit[visualization]>=2.5.2,<3.0.0` and `qiskit-aer==0.17.2`. The visualization extra brings Matplotlib/pylatexenc and other transitive dependencies; see installed package metadata for their licenses. Qollab project availability remains unverified.
- Equation styling: [KaTeX 0.16.22](https://katex.org/), loaded as CSS from jsDelivr for existing equation markup.
- Palette: [Catppuccin Mocha](https://github.com/catppuccin/catppuccin).
- Development assistance: OpenCode and AI-assisted implementation/review; educational ownership remains with the team.

This effort is supported by Qollab & IonQ.

## License

Project code is distributed under the [MIT license](LICENSE). Third-party packages retain their own licenses.
