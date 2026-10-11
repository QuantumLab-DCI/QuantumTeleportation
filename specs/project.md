# Quantum Teleportation — Project Specification

## 1. Purpose and scope

Build a simple educational application for Qollab. The first implementation is a working skeleton that the team can fill progressively with explanations, the letter analogy, mathematics, and content adapted from an existing Python notebook created by one of the authors.

Use plain HTML, CSS, JavaScript, and Python with Qiskit. Use English filenames, function names, variables, comments, documentation, and initial interface labels. Keep functions small and straightforward.

## 2. Project structure and ownership

```text
quantum-teleportation/
├── index.html
├── main.js
├── main.css
├── frontend/
│   ├── context_section.js
│   ├── example_tab.js
│   ├── math_tab.js
│   └── code_tab.js
├── backend/
│   ├── __init__.py
│   └── teleportation.py
├── specs/
│   └── project.md
├── README.md
├── LICENSE
└── requirements.txt
```

- `index.html`: page shell, centered header, navigation links, and section containers.
- `main.js`: mount sections, select tabs, navigate to anchors, and coordinate one Python execution.
- `main.css`: shared styles, divided by descriptive comments.
- Each frontend module contains its section's HTML as a JavaScript template string and any simple interactions it needs.
- `backend/teleportation.py`: notebook-derived Python logic and returned outputs. This folder is a logical separation; Qollab runs Python in the browser.
- One teammate owns `context_section.js`; the other owns `example_tab.js`; other owns math, code presentation, Python, and integration. Coordinate edits to the three root frontend files.

## 3. Page and navigation requirements

- **FR-01:** Render one long page with normal vertical scrolling.
- **FR-02:** Start with the centered title `Quantum Teleportation` and links: `Context`, `Quantum Challenge`, `Teleportation`, `Example`, `Math`, and `Code`. The header contains only the title and these links.
- **FR-03:** Present classical copying/transmission, the quantum copying/measurement problem, and the introduction to teleportation, in that order.
- **FR-04:** End with exactly three tab buttons: `Example`, `Math`, and `Code`. Select `Example` initially and show one panel at a time.
- **FR-05:** Navigation links scroll to their section. Links to a tab select that tab before scrolling to its panel.
- **FR-06:** Show the five analogy steps vertically in `Example`: establish the connection, prepare the message, finalize the letter, send the letter, and reorder/read. All five are visible together within the selected panel.
- **FR-07:** Present mathematical explanations and equations vertically in `Math`; use KaTeX for LaTeX rendering.
- **FR-08:** Present repeated explanation → Python code → output blocks vertically in `Code`. Start with placeholder blocks for state preparation, entanglement, and execution. The team can add blocks following the same pattern.
- **FR-09:** Selecting tabs preserves results and does not rerun Python. Step navigation buttons are outside this version's scope.

The skeleton uses short, clearly marked content placeholders. The team writes the final narrative and notebook explanation. Preserve the relationship between the five analogy steps and the six protocol steps; explain the analogy's limits when adding the final content.

## 4. Styling requirements

Use Catppuccin Mocha with system fonts, readable spacing, simple buttons, and a single-column layout. Keep all shared CSS in `main.css`.

- Page background: Base `#1e1e2e`.
- Example panel: Base `#1e1e2e`; Math panel: Surface0 `#313244`; Code panel: Surface1 `#45475a`.
- Main text: Text `#cdd6f4`.
- Tab selection has a visible indicator as well as its label. Provide keyboard operation and visible focus; respect reduced-motion preferences if animation is added.
- Wrap prose and equations appropriately; allow horizontal scrolling inside long code/output blocks without making the whole page overflow.

Organize CSS with these comments:

```css
/* Catppuccin Mocha palette */
/* Base styles and typography */
/* Page layout */
/* Header and section links */
/* Shared elements */
/* Context section */
/* Tab buttons and panels */
/* Example tab */
/* Math tab */
/* Code tab */
/* Responsive styles */
/* Accessibility and keyboard focus */
```

## 5. Execution contract

Qollab's `Run` initializes the page and triggers one complete Python execution. Render the interface before awaiting execution. The initial state and shot count are fixed in Python and are supplied by one author while adapting and modifying the existing notebook; the skeleton has no input selectors.

Use the function `run_teleportation(backend)`. JavaScript calls it through Qollab's asynchronous Python bridge (`callPromising`) and converts returned Python values for display.

The initial return contract is a dictionary of text outputs keyed by block ID:

```python
{
    "outputs": {
        "state-preparation": "...",
        "entanglement": "...",
        "execution": "..."
    }
}
```

The displayed code excerpts live in `code_tab.js` and must match the corresponding Python implementation. Explain each excerpt and reserve an output container with its block ID. Render code and text outputs as text. Figures may be added later with a small, explicit extension to the contract.

Use the quantum `backend` provided by Qollab. Submit at most one quantum job per project run on IonQ; building circuits and producing intermediate outputs can happen within the same execution. Changing views must leave that execution untouched.

The code panel shows `Pending`, `Running`, `Completed`, or `Error`. An execution error leaves the educational sections usable. In the skeleton, unfinished integration remains visibly pending; do not present placeholder outputs as computed results.

## 6. Dependencies and runtime rules

Initial `requirements.txt`:

```text
qiskit>=2.5.2,<3.0.0
```

KaTeX is a frontend dependency, loaded using a fixed browser-compatible URL at implementation time. Show Python with ordinary `<pre><code>` blocks. Add further Python packages only when the notebook actually needs them and they work in Qollab.

Qollab requires `index.html` and `main.js` at the project root; it automatically loads the optional root `main.css`. Write body content in `index.html` and put executable JavaScript in `.js` files. The project uses `requirements.txt` for Python dependencies.

## 7. Acceptance criteria

The skeleton is ready for team development when:

- [ ] Qollab recognizes the project and renders the page.
- [ ] The header links navigate correctly, including selecting the destination tab.
- [ ] Context appears before the final interactive section.
- [ ] Exactly three tabs exist, with Example initially selected.
- [ ] Each panel is vertical and uses its assigned background.
- [ ] Five example placeholders, mathematical placeholders, and code/output placeholders are present.
- [ ] A sample equation renders and Python text preserves its formatting.
- [ ] Tabs work by keyboard and the page remains readable on a narrow screen.
- [ ] Execution states and output containers are wired without fabricating results.
- [ ] Each contributor can edit their assigned module independently.

Before hackathon submission:

- [ ] Port the actual notebook and verify the returned outputs against its explanations.
- [ ] Verify execution on Qollab's free local and IonQ simulators; document any circuit adaptations.
- [ ] Complete the original educational content and disclose reused code, templates, sources, and AI assistance.
- [ ] Provide an MIT license, reproducible instructions, and the attribution `This effort is supported by Qollab & IonQ`.
- [ ] Publish a public default version, provide a public 2–3 minute demo video, and have the team captain submit it through the hackathon registration page. Keep the project available for 12 months.

## 8. Reference sources

- [Hackathon rules](https://qollab.xyz/programs/hackathon/terms)
- [Submission process](https://qollab.xyz/programs/hackathon/how-it-works)
- [Qollab runtime](https://qollab.xyz/learn/docs/runtime-environment)
- [JS / Qiskit projects](https://qollab.xyz/learn/docs/js-qiskit-projects)
- [Upload project files](https://qollab.xyz/learn/docs/upload-your-files)
- [Publish a version](https://qollab.xyz/learn/docs/publish)
- [Catppuccin palette](https://github.com/catppuccin/catppuccin)
- [KaTeX browser usage](https://katex.org/docs/browser.html)
