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
- `main.js`: mount sections and coordinate one Python execution. Native links handle section navigation.
- `main.css`: shared styles, divided by descriptive comments.
- Each frontend module contains its section's HTML as a JavaScript template string and any simple interactions it needs.
- `backend/teleportation.py`: notebook-derived Python logic and returned outputs. This folder is a logical separation; Qollab runs Python in the browser.
- One teammate owns `context_section.js`; the other owns `example_tab.js`; other owns math, code presentation, Python, and integration. Coordinate edits to the three root frontend files.

## 3. Page and navigation requirements

- **FR-01:** Render one long page with normal vertical scrolling.
- **FR-02:** Start with the centered title `Quantum Teleportation` and ordinary anchor links: `Context`, `Quantum Challenge`, `Teleportation`, `Example`, `Math`, and `Code`.
- **FR-03:** Present classical copying/transmission, the quantum copying/measurement problem, and the introduction to teleportation, in that order.
- **FR-04:** End with one study box containing exactly three tabs: `Example`, `Math`, and `Code`. Select `Example` initially and show one colored panel at a time.
- **FR-05:** Context links use browser-native same-page navigation. Links to `Example`, `Math`, or `Code` select that tab and scroll to the shared study box.
- **FR-06:** Show the five analogy steps vertically in `Example`: establish the connection, prepare the message, finalize the letter, send the letter, and reorder/read. All five are visible together.
- **FR-07:** Present mathematical explanations and equations vertically in `Math`; use KaTeX for LaTeX rendering.
- **FR-08:** Present repeated explanation → Python code → output blocks vertically in `Code`. Start with placeholder blocks for state preparation, entanglement, and execution. The team can add blocks following the same pattern.
- **FR-09:** Tab and anchor navigation never runs Python or clears execution results. Step navigation buttons are outside this version's scope.

The skeleton uses short, clearly marked content placeholders. The team writes the final narrative and notebook explanation. Preserve the relationship between the five analogy steps and the six protocol steps; explain the analogy's limits when adding the final content.

## 4. Styling requirements

Use Catppuccin Mocha with system fonts, readable spacing, and a restrained single-column study-notes layout. Keep all shared CSS in `main.css`.

- Page background: Base `#1e1e2e`.
- Use one centered reading column. Keep the introductory sections simple, then place Example/Math/Code in one bordered study box with a three-tab strip.
- Example uses Base `#1e1e2e`, Math uses Surface0 `#313244`, and Code uses Surface1 `#45475a`.
- Main text: Text `#cdd6f4`.
- Native links have visible keyboard focus; respect reduced-motion preferences for smooth scrolling.
- Wrap prose and equations appropriately; allow horizontal scrolling inside long code/output blocks without making the whole page overflow.

Organize CSS with these comments:

```css
/* Catppuccin Mocha palette */
/* Base styles and typography */
/* Page layout */
/* Header and section links */
/* Shared elements */
/* Context section */
/* Tab buttons and study box */
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
- [ ] The six header links navigate correctly, including selecting Example, Math, or Code.
- [ ] Context, Quantum Challenge, and Teleportation appear before one tabbed study box.
- [ ] Exactly three accessible tabs exist, with Example initially selected and one panel visible at a time.
- [ ] Each panel uses its assigned Catppuccin color without turning every introductory section into a card.
- [ ] Five example placeholders, mathematical placeholders, and code/output placeholders are present.
- [ ] A sample equation renders and Python text preserves its formatting.
- [ ] Tabs and links work by keyboard and the page remains readable on a narrow screen.
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

## 9. Initial skeleton implementation plan

### Design status

**READY for one tabbed study box (2026-10-11).** The user clarified that only the final Example/Math/Code area should be one colored tabbed box; the introductory page remains a simple notes layout. Independent QA confirmed the requirements, accessibility model, stable output IDs, and no-rerun lifecycle are sufficient for implementation. Qollab/IonQ execution remains explicitly **NOT VERIFIED**.

### Tasks and traceability

| ID | Requirements | Owner | Allowed files | Inputs / outputs | Dependencies | Acceptance and checks |
| --- | --- | --- | --- | --- | --- | --- |
| T-01 | FR-01–FR-09 | ux-frontend | `index.html`, `main.css`, `frontend/*.js` | Tab panels and stable mount/output IDs | This spec and architecture | DOM inspection; keyboard tabs; narrow viewport; sample KaTeX equation |
| T-02 | Execution contract, AC execution wiring | quantum | `backend/*.py` | `backend` input; required plain-data dictionary when implemented | Verified bridge form; team notebook content | Python syntax/import checks; pending implementation must raise clearly rather than fabricate output |
| T-03 | FR-05, FR-09, execution states | coordinator | `main.js` | Templates, tab events, and future Python result | T-01 and T-02 interfaces | Syntax/static checks; no execution from navigation; pending state visible |
| T-04 | Dependencies and delivery docs | coordinator | `requirements.txt`, `README.md`, `LICENSE`, `docs/*`, `specs/project.md` | Verified project decisions | T-01–T-03 | Links/content review; exact dependency range; MIT text and required attribution |
| T-05 | All skeleton acceptance criteria | qa | `tests/*`, `docs/qa/*` if needed | Integrated tree | T-01–T-04 | Independent PASS/FAIL/NOT VERIFIED release review |

### Additional observable checks

- Tabs use the ARIA tab pattern with visible focus and Left/Right/Home/End keyboard selection.
- Review at a 320 CSS-pixel viewport; only code/output containers may scroll horizontally.
- Output insertion is text-only and follows the DOM's three block IDs.
- Once notebook execution is enabled, bridge rejection or malformed data produces `Error`, one technical console report, and a concise user message while navigation remains usable. The pending-first skeleton does not invoke its deliberately incomplete Python function.
- Project initialization owns the only execution attempt; tab and anchor events cannot rerun it.

### Skeleton verification evidence (2026-10-11)

- **PASS:** `git diff --check`; Python compilation and controlled pending `RuntimeError`; JavaScript syntax checks for `main.js` and every frontend module.
- **PASS (superseded skeleton evidence):** the earlier tabbed skeleton passed its static structure checks before the continuous-layout redesign. This is historical evidence, not evidence for the current interface.
- **NOT VERIFIED:** rendered browser behavior at 320 CSS pixels, Qollab project recognition/module loading, bridge conversion and diagnostics, the Qollab local simulator, IonQ execution, quantum correctness, and human learning outcomes.

### Superseded continuous layout evidence (2026-10-11)

- **Historical only:** QA reviewed and checked the intermediate all-sections-visible design. The later user clarification superseded that presentation; these results are not current release evidence.
- **NOT VERIFIED:** rendered behavior at 320 CSS pixels, live anchor/keyboard/KaTeX behavior, Qollab loading and bridge conversion, controlled platform failure diagnostics, the Qollab local simulator, IonQ execution, dynamic-circuit compatibility, quantum correctness, and human learning outcomes.

### Tabbed study-box evidence (2026-10-11)

- **PASS (independent static review):** one study box, exactly three reciprocally associated ARIA tabs and panels, Example initially visible, exact panel colors, keyboard selection logic, header link selection, five analogy steps, and preserved pending output IDs.
- **PASS:** JavaScript syntax, Python compilation, and `git diff --check`.
- **NOT VERIFIED:** rendered browser behavior, 320 CSS-pixel layout, live keyboard/focus/scroll behavior, Qollab bridge behavior, local simulator and IonQ execution, dynamic-circuit compatibility, quantum correctness, and human learning outcomes.
