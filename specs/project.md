# Quantum Teleportation — Project Specification

## Localhost loader correction (2026-10-11)

**READY for bounded implementation following independent QA design review.** LOAD-01: mount the page before attempting the Qollab bridge; ordinary static hosting must show navigable content and an explicit execution Error, never fabricated results. LOAD-02: supply an inline favicon. Preserve notebook content and whole-example/proxy contracts.

Task LOAD-I (coordinator): main.js, qollab_bridge.js, frontend/execution_results.js, index.html and existing docs. Task LOAD-QA (QA): tests/test_notebook_ui.mjs and focused QA evidence. Check real unmodified static hosting, no uncaught rejection, navigation after failure, no favicon.ico request, and existing fake-bridge regressions. Qollab dynamic wrapper discovery remains NOT VERIFIED and requires a live probe before platform delivery.

**Delivered locally:** independent Node/Chromium QA passed 27 groups with zero failures, including unmodified static hosting at 1440/320px, handled bridge/missing-wrapper failure, preserved cause, navigation without rerun, no uncaught errors and no favicon.ico request. Syntax and whitespace checks passed. See [focused QA evidence](../docs/qa/localhost-loader.md). Live Qollab wrapper discovery/execution remains NOT VERIFIED; next task is the platform probe, not a local fallback.

## Content-preserving visual refinement (2026-10-11)

**READY for CSS-only implementation.** Independent QA approved the design with conditions: preserve dirty notebook styling, wrap long headings/badges, retain unboxed vertical context, and check narrow-screen reflow. The user requests larger, more attractive typography, especially in context and the five numbered steps, with no educational content changes.

- **VIS-01:** Preserve every existing text, source, output ID, section order, tab and execution behavior. CSS-only change; no new dependencies or runtime contract.
- **VIS-02:** Use a readable responsive body size (at least 17px at default browser settings), a bounded reading column, larger context headings, prominent existing step badges and generous vertical separation. Keep the introduction unboxed; distinguish the physics explanation with a subtle inset accent, not a grid of cards.
- **VIS-03:** Retain Catppuccin Mocha and assigned panel backgrounds, visible keyboard focus, reduced-motion support and vertical steps. At 320px, prose must fit without document overflow; code may scroll internally.

| Task | Requirements | Owner / allowed files | Inputs / outputs | Dependencies | Checks |
| --- | --- | --- | --- | --- | --- |
| VIS-D | VIS-01–03 | coordinator: specs/project.md, docs/architecture.md | CSS-only design and review outcome | Independent QA design review | No content/runtime changes |
| VIS-U | VIS-01–03 | ux-frontend: main.css only | Existing context classes → responsive typography, badges and spacing | Reviewed design | CSS review, content preservation, desktop/320px browser when available |
| VIS-QA | VIS-01–03 | qa: review only | Integrated CSS and unchanged templates | VIS-U | Independent release checks; explicit gaps |

Existing uncommitted notebook and CSS work must be preserved. Qollab/IonQ compatibility and execution are unchanged and remain outside this styling fix.

QA also found a pre-existing unrelated defect: context header links target IDs absent from the current context template. Track this separately; do not claim all six links work or expand the CSS task to alter team markup.

### VIS verification evidence

**Delivered — bounded CSS refinement.** VIS-D, VIS-U and VIS-QA completed. Independent QA reviewed CSS blob `887d7c3b9efd4ba1d20c7185051f04662cdeeb6e` with Node/Chromium CDP against a local presentation fixture using current workspace templates/CSS and navigation, excluding the Qollab Python execution import. Concurrent unrelated notebook changes were preserved; this is not a live-platform test.

- **PASS:** all panels at 1440/768/320px; body 19/17.984/17px, five prominent step badges, wrapped headings, bounded 60rem page and 70ch context, no document overflow, exact assigned panel colors.
- **PASS:** initial Example, one visible panel, study links, tab ArrowLeft/Right/Home/End, visible 3px focus, Space on math disclosure, reduced-motion behavior and internal long-code scrolling.
- **PASS:** synthetic large figure, long caption/error and doubled-root-font reflow at 320px. This is layout stress evidence, not result-renderer validation or browser-zoom certification.
- **PASS:** existing dirty notebook CSS retained; context/example/math templates and index unchanged; content remains identical through navigation. `git diff --check -- main.css` passed independently.
- **FAIL (pre-existing/out of scope):** three missing context anchor targets noted above.
- **NOT VERIFIED:** live Qollab/IonQ execution, human visual/learning validation, exhaustive accessibility and other browser engines. No platform or quantum behavior changed in this task.

## Notebook integration (2026-10-11)

**READY for the bounded local notebook slice, not Qollab/IonQ delivery.** Independent QA reviewed the design; coordinator resolved static bridge import, cross-field invariants, stage provenance and check ordering in architecture. The supplied notebook replaces the missing state, shot count and code placeholders. New material uses English as required by AGENTS.md; existing team presentation is preserved.

- **NB-01:** Execute the supplied dynamic protocol as a whole with Q,A,B=0,1,2, amplitudes [0.6,0.8], two ideal Aer experiments of 1024 shots, X conditioned on c1 then Z conditioned on c0. Preserve inverse-preparation verification, not merely a Z-basis measurement.
- **NB-02:** Present explanations, corresponding source, seven stage outputs and PNG circuit/histogram figures vertically. Stages: state-preparation, entanglement, measurement-preparation, measurement, classical-bits, correction, verification. Explain A Q count order and the verification operation.
- **NB-03:** Keep the Qollab-injected backend boundary. IonQ documents dynamic if branches as unsupported even on its simulator (https://docs.ionq.com/api-reference/v0.4/openqasm3.md). Do not submit known-unsupported circuits, invent successful platform counts, or silently use coherent controls. Local Aer success plus platform incompatibility is Partial, never a completed Qollab/IonQ demonstration. An approved and verified alternate representation is a separate future task.
- **NB-04:** Initialize UI before one asynchronous whole-example call. Preserve results across navigation. Render text safely and validate base64 PNGs. Errors remain visible, including platform incompatibility, missing dependencies and bridge rejection.

Quantum research observed the exact notebook locally with Qiskit 2.5.2/Aer 0.17.2: verification {'0':1024}; 104 independent branch fidelity checks passed. Official Qollab docs establish dotted imports, callPromising, toJs and one IonQ job per Run; Qollab's library list references Aer 0.17.2 but project installation and execution remain NOT VERIFIED. No live platform access is available. This bounded implementation does not claim platform readiness; do not wait for unavailable platform evidence to conceal the missing integration.

| Task | Requirements | Owner / allowed files | Contract / dependencies | Checks |
| --- | --- | --- | --- | --- |
| NB-Q | NB-01, NB-03 | quantum: backend/*.py, tests/test_teleportation.py | Seven-stage contract in architecture; source export matches execution | Dynamic Aer, independent phase-sensitive oracle, PNG decode, explicit platform incompatibility |
| NB-U | NB-02, NB-04 | ux-frontend: frontend/code_tab.js, main.css | Seven stable output/figure IDs; source delivered by Python, not duplicated | Syntax, accessible figures, vertical stages, no execution handlers |
| NB-I | NB-03, NB-04 | coordinator: main.js, frontend/execution_results.js, requirements.txt, README.md, docs/architecture.md, docs/development.md, specs/project.md | Validated plain data, injected backend, exactly one bridge attempt | Bridge fake/controlled failure, result validation, syntax and diff checks |
| NB-QA | NB-01–NB-04 | qa: tests/test_notebook_ui.mjs, docs/qa/notebook-integration.md | Independent design then integrated release | PASS/FAIL/NOT VERIFIED, no local evidence disguised as Qollab |

Quantum and UI implementation may proceed on disjoint files using the settled architecture; coordinator integrates only after both. Acceptance: exact two local experiments/one bridge call/zero injected-backend submissions; all four branches with phase-sensitive independent fidelity tolerance 1e-9 and missing-X/Z negative controls; PNG decode; missing dependencies, rejected bridge, malformed envelope and invalid PNG produce Error before insertion; figure-only failure preserves counts and shows warning; repeated Run and navigation do not retain stale results or rerun; keyboard tabs/header links and 320px layout checked separately from static syntax. Live Qollab loader, Aer installation, conversion, logs and IonQ remain NOT VERIFIED until platform access is available.

### Notebook slice completion and evidence

**NB-Q, NB-U, NB-I and NB-QA completed for the bounded local scope.** Coordinator additionally restored the three missing context anchor IDs without changing team narrative. Independent QA found and retested invalid-PNG defects; the renderer now checks raster/chunk bounds and CRC32, then actual browser decoding before displaying computed results.

- **PASS:** 11 local quantum tests, including 104 independent branch checks (26 inputs × 4 outcomes, fidelity >= 1-1e-9), phase-sensitive dynamic runs, omitted-X/Z negative controls, controlled failures and logging-handler isolation. Supplied input verification returned `{'0': 1024}`. Circuit barriers, preparation label and copied verification circuit preserved.
- **PASS:** 23 independent Chromium groups; final two runs passed in normal/reduced-motion modes. Actual Python envelope gives seven exact executed source/output associations and nine decoded PNGs. Mount precedes one fake bridge attempt; navigation does not rerun. Missing dependencies/bridge rejection/malformed contract/truncated or corrupt PNG reset old results and show Error; figure-only failure preserves counts with warning. Keyboard and 320px/1440px layout checked.
- **PASS:** JavaScript syntax checks and `git diff --check`; README/development/architecture reviewed independently. Reproduction, interpreter/browser overrides and check limitations are in [the QA report](../docs/qa/notebook-integration.md).
- **NOT VERIFIED:** live Qollab loader, dependencies, Aer browser execution, proxy conversion, PNG transport and Python logging capture. No platform job submitted. IonQ dynamic branches are documented incompatible; no full-platform acceptance claimed. Human learning, publication, public repository URL, demo and event submission remain pending.

**Next task NB-P (quantum; disposable probe only):** use live Qollab access to record runtime versions, imports, whole Aer execution, nested data/PNG conversion, controlled failure/log access and repeated Run. Dependencies: platform access and this envelope. Acceptance: reproducible observed PASS/FAIL evidence, never static-browser evidence. Separately obtain the team's decision on an explicitly labeled IonQ-compatible representation; do not replace the classical-feed-forward lesson or submit this known-incompatible circuit to satisfy a check.

## Initial skeleton specification (historical)

The supplied notebook integration above supersedes the pending execution, three-output contract and dependency decisions below. Earlier localization evidence describes preserved existing team copy, not a requirement to translate newly integrated notebook material. Keep these sections as historical traceability rather than current notebook acceptance.

## 1. Purpose and scope

Build a simple educational application for Qollab. The first implementation is a working skeleton that the team can fill progressively with explanations, the letter analogy, mathematics, and content adapted from an existing Python notebook created by one of the authors.

Use plain HTML, CSS, JavaScript, and Python with Qiskit. Use English filenames, function names, variables, and source comments. Use Spanish for the README and user-facing interface labels. Keep functions small and straightforward.

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
- **FR-02:** Start with the centered title `Teletransportación cuántica` and ordinary anchor links: `Contexto`, `Desafío cuántico`, `Teletransportación`, `Ejemplo`, `Matemáticas`, and `Código`.
- **FR-03:** Present classical copying/transmission, the quantum copying/measurement problem, and the introduction to teleportation, in that order.
- **FR-04:** End with one study box containing exactly three tabs: `Ejemplo`, `Matemáticas`, and `Código`. Select `Ejemplo` initially and show one colored panel at a time.
- **FR-05:** Context links use browser-native same-page navigation. Links to `Ejemplo`, `Matemáticas`, or `Código` select that tab and scroll to the shared study box.
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

**READY for one tabbed study box and Spanish presentation (2026-10-11).** The user clarified that only the final Example/Math/Code area should be one colored tabbed box; the introductory page remains a simple notes layout. The later localization request supersedes the initial English presentation requirement: README prose and user-facing frontend copy are Spanish, while code identifiers, filenames, source comments, contract keys, and the required attribution remain unchanged. Independent QA confirmed this localization is bounded and preserves accessibility, stable output IDs, and the no-rerun lifecycle. Qollab/IonQ execution remains explicitly **NOT VERIFIED**.

### Tasks and traceability

| ID | Requirements | Owner | Allowed files | Inputs / outputs | Dependencies | Acceptance and checks |
| --- | --- | --- | --- | --- | --- | --- |
| T-01 | FR-01–FR-09 | ux-frontend | `index.html`, `main.css`, `frontend/*.js` | Tab panels and stable mount/output IDs | This spec and architecture | DOM inspection; keyboard tabs; narrow viewport; sample KaTeX equation |
| T-02 | Execution contract, AC execution wiring | quantum | `backend/*.py` | `backend` input; required plain-data dictionary when implemented | Verified bridge form; team notebook content | Python syntax/import checks; pending implementation must raise clearly rather than fabricate output |
| T-03 | FR-05, FR-09, execution states | coordinator | `main.js` | Templates, tab events, and future Python result | T-01 and T-02 interfaces | Syntax/static checks; no execution from navigation; pending state visible |
| T-04 | Dependencies and delivery docs | coordinator | `requirements.txt`, `README.md`, `LICENSE`, `docs/*`, `specs/project.md` | Verified project decisions | T-01–T-03 | Links/content review; exact dependency range; MIT text and required attribution |
| T-05 | All skeleton acceptance criteria | qa | `tests/*`, `docs/qa/*` if needed | Integrated tree | T-01–T-04 | Independent PASS/FAIL/NOT VERIFIED release review |

### Additional observable checks

- README prose, visible interface copy, and accessible names are Spanish; source identifiers, DOM IDs, output keys, filenames, Python snippets, and CSS comments remain unchanged.
- The exact attribution `This effort is supported by Qollab & IonQ.` remains visible.
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
