<div align="center">
  <h1>Quantum Teleportation</h1>
  <p><strong>An educational native web project for exploring quantum teleportation on Qollab.</strong></p>
  <p>
    <a href="https://qollab.xyz/"><img src="https://img.shields.io/badge/Qollab-Execution-89b4fa?style=for-the-badge" alt="Qollab execution target"></a>
    <a href="https://qiskit.org/"><img src="https://img.shields.io/badge/Qiskit-2.5.2%20to%20%3C3.0-6929C4?style=for-the-badge&logo=qiskit&logoColor=white" alt="Qiskit 2.5.2 to below 3.0"></a>
    <a href="https://www.python.org/"><img src="https://img.shields.io/badge/Python-Qollab_Runtime-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python in the Qollab runtime"></a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"><img src="https://img.shields.io/badge/JavaScript-Native-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="Native JavaScript"></a>
  </p>
  <p>
    <a href="#context">Context</a> ·
    <a href="#interface">Interface</a> ·
    <a href="#architecture">Architecture</a> ·
    <a href="#run">Run</a> ·
    <a href="#outputs">Outputs</a> ·
    <a href="#current-limits">Limits</a>
  </p>
</div>

> **Status:** Educational skeleton<br>
> **Execution:** Qollab and IonQ integration not yet verified<br>
> **Support:** This effort is supported by Qollab & IonQ.

An educational, native web skeleton for exploring quantum teleportation on Qollab. It intentionally leaves the team's narrative, mathematics, notebook adaptation, fixed input state, and shot count clearly marked as pending.

This effort is supported by Qollab & IonQ.

---

### Context

The page introduces classical transmission, the quantum copying and measurement challenge, and teleportation before presenting Example, Math, and Code views. The five analogy labels are scaffolding only; the team will supply the explanation and its limits.

---

### Interface

- One vertically scrolling page with section links.
- One study box with three colored tabs: Example, Math, and Code.
- Catppuccin Mocha colors and responsive native CSS.
- Vertical explanation → code → output placeholders.
- A visible `Pending` execution state; no placeholder is presented as a computed result.

---

### Architecture

Static templates live in `frontend/`. `main.js` mounts them and owns browser interactions. `backend/teleportation.py` defines the future Qollab execution boundary. See [the architecture](docs/architecture.md) and [development guide](docs/development.md).

---

### Run

For a local interface preview, run:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>. This preview does not run Qiskit.

For Qollab, upload the project, select a backend, and press **Run**. Quantum execution is still pending until the notebook circuit is added.

---

### Outputs

The Code view reserves text-only containers for state preparation, entanglement, and execution. A future successful `run_teleportation(backend)` call will return those three string outputs in a plain dictionary. Until then, all containers remain `Pending`.

---

### Current limits

- The original educational narrative, equations, analogy mapping, and notebook excerpts are not included.
- The quantum job is deliberately not submitted and no result is fabricated.
- Qollab bridge behavior, controlled failure visibility, local simulator execution, and IonQ execution are **not verified for this project**.
- Dynamic-circuit compatibility with the selected IonQ backend needs an explicit platform probe.
- Learning outcomes require human review after the team adds the educational content.

---

### Dependencies and attribution

- Python: `qiskit>=2.5.2,<3.0.0`, as required by the project specification and documented Qollab runtime range.
- Browser: [KaTeX 0.16.22](https://katex.org/) CSS distributed by [jsDelivr](https://www.jsdelivr.com/) for server-rendered equation markup.
- Palette: [Catppuccin Mocha](https://github.com/catppuccin/catppuccin).
- Development assistance: OpenCode and AI-assisted implementation were used to create this skeleton; team-authored notebook material remains pending.

---

### License

Licensed under the [MIT License](LICENSE).
