# Quantum Teleportation

[Context](#context) · [Interface](#interface) · [Architecture](#architecture) · [Run](#run) · [Outputs](#outputs) · [Limits](#current-limits)

An educational, native web skeleton for exploring quantum teleportation on Qollab. It intentionally leaves the team's narrative, mathematics, notebook adaptation, fixed input state, and shot count clearly marked as pending.

This effort is supported by Qollab & IonQ.

## Context

The page introduces classical transmission, the quantum copying and measurement challenge, and teleportation before presenting Example, Math, and Code views. The five analogy labels are scaffolding only; the team will supply the explanation and its limits.

## Interface

- One vertically scrolling page with section links.
- One study box with three colored tabs: Example, Math, and Code.
- Catppuccin Mocha colors and responsive native CSS.
- Vertical explanation → code → output placeholders.
- A visible `Pending` execution state; no placeholder is presented as a computed result.

## Architecture

Static templates live in `frontend/`. `main.js` mounts them and owns browser interactions. `backend/teleportation.py` defines the future Qollab execution boundary. See [the architecture](docs/architecture.md) and [development guide](docs/development.md).

## Run

For a local interface preview, run:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>. This preview does not run Qiskit.

For Qollab, upload the project, select a backend, and press **Run**. Quantum execution is still pending until the notebook circuit is added.

## Outputs

The Code view reserves text-only containers for state preparation, entanglement, and execution. A future successful `run_teleportation(backend)` call will return those three string outputs in a plain dictionary. Until then, all containers remain `Pending`.

## Current limits

- The original educational narrative, equations, analogy mapping, and notebook excerpts are not included.
- The quantum job is deliberately not submitted and no result is fabricated.
- Qollab bridge behavior, controlled failure visibility, local simulator execution, and IonQ execution are **not verified for this project**.
- Dynamic-circuit compatibility with the selected IonQ backend needs an explicit platform probe.
- Learning outcomes require human review after the team adds the educational content.

## Dependencies and attribution

- Python: `qiskit>=2.5.2,<3.0.0`, as required by the project specification and documented Qollab runtime range.
- Browser: [KaTeX 0.16.22](https://katex.org/) CSS distributed by [jsDelivr](https://www.jsdelivr.com/) for server-rendered equation markup.
- Palette: [Catppuccin Mocha](https://github.com/catppuccin/catppuccin).
- Development assistance: OpenCode and AI-assisted implementation were used to create this skeleton; team-authored notebook material remains pending.

## License

Licensed under the [MIT License](LICENSE).
