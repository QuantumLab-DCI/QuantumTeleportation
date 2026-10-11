# Development factory: quantum teleportation on Qollab

## Product and scope
Build the educational web project specified in specs/project.md. Use English
for product content, code, comments, docstrings, README, docs, and Git messages.
Use native HTML, CSS, JavaScript and Python/Qiskit integrated with Qollab.
Keep OpenCode as the development tool; Qollab is the product execution target.
Consult docs/architecture.md and docs/development.md; reuse actual project files.
Keep the approved long page, top title and section anchors, Catppuccin Mocha,
and bottom Example/Math/Code tabs. Default to Example and vertical content.
Execute the quantum example as a whole; render explanatory text, source blocks,
and associated outputs. Preserve material the team adds progressively.
Do not add a cell editor, per-cell execution, Previous/Next navigation, or
Open Editor action. Do not reintroduce React, Vite, or an HTTP API by default.

## SDD and architecture before implementation
Keep specs/project.md as the initial source of product requirements, criteria,
plan, tasks, and evidence. Keep shared module decisions in docs/architecture.md.
Reuse equivalent existing documents rather than creating duplicate sources.
Define responsibilities, dependency direction, execution/data contracts,
dependencies, diagnostics, and meaningful checks before production code.
Ask quantum to establish runtime compatibility and domain oracles. A small,
disposable platform probe may resolve unknown APIs before READY; label it as
a probe, keep it outside production, and record only observed evidence.
Obtain an independent QA design review. The coordinator records READY once
essential design decisions are resolved. This is a workflow rule, not an
automatic runtime gate or a routine human approval requirement.
Keep requirement -> task -> check traceability. Update the existing spec for
small fixes; split feature documents only when the project outgrows one spec.
Correct code that violates an agreed requirement; do not rewrite acceptance
criteria to conceal a defect. Update changed intent only when agreed.

## Engineering rules
Apply SRP and information hiding. Group coherent responsibilities and changes.
Separate presentation, Qollab integration, quantum logic, and result formatting.
Keep entry files small and place cohesive helpers in modules when needed.
Prefer clear names, small methods, guard clauses, and maintained libraries.
Avoid deep control nesting, nested try blocks, dense comprehensions, chained
ternaries, broad exception swallowing, and speculative layers. A simple if
inside a loop is normal; judge comprehension rather than banning syntax.
Do not impose an arbitrary line count or create a file for every function.
Use proportional docstrings/JSDoc: purpose when enough; contract, parameters,
return values, effects, and failures when they clarify real behavior.
Add inline comments for non-obvious reasons and delicate quantum conventions.
Keep English CSS section comments describing purpose and palette tokens.
Reuse stdlib and compatible libraries. Justify each dependency with a need;
verify availability in Qollab before choosing versions or installation commands.

## Documentation and diagnostics
Maintain an attractive, accurate README with a title, navigation, purpose,
architecture, real execution steps, output interpretation, docs, and limits.
Use badges, screenshots, versions, and URLs only when verified. Keep one source
of truth per topic and link to it. Review documentation in each functional change.
Reuse browser console facilities and Python logging.getLogger(__name__).
Configure logging once at the integration boundary compatible with the runtime.
Record meaningful operations, run context, failures and tracebacks at the boundary
handling the error; avoid duplicate traces, secrets and entire payloads.
Distinguish technical logs from clear English errors displayed to the user.
Adapt existing logger resources only when compatible. Do not assume rotating
files, queue listeners, server settings, or persistence exist in Qollab.
Document actual log access and exercise a controlled failure.

## Four roles and ownership
- coordinator: spec, architecture, shared contracts, dependencies, integration,
  README/docs, Git, and delivery preparation.
- ux-frontend: index.html, main.css, frontend/, and focused UI tests.
- quantum: backend/ Python logic, main.js integration, and quantum tests.
- qa: independent design/release reviews, tests/, and docs/qa/ evidence.
Adjust ownership to the actual tree before assigning work. The integration
contract in main.js is shared; the coordinator controls changes affecting UI.
Specialists do not delegate. Default to sequential work; use at most two
disjoint implementation tasks in parallel after settling their interfaces.
The concurrency preference is an instruction, not an OpenCode semaphore.
Avoid overlapping edits, lockfile changes, and concurrent Git writes.
For each task record ID, requirement IDs, owner, allowed files, inputs/outputs,
dependencies, acceptance criteria, and relevant checks in the current spec.

## Verification and Git
Each implementer runs checks for their change. Quantum supplies independent
physical oracles; QA reviews actual behavior and integrated Qollab execution.
Report PASS / FAIL / NOT VERIFIED with method, observed result and reproduction.
Do not claim checks passed without execution, or weaken tests for a green result.
QA reports defects; their responsible implementer fixes production. Edit-path
permissions help coordination but do not sandbox shell commands or tests.
Keep quantum correctness, runnable platform integration, and human educational
validation distinct. Browser checks do not establish that users learned.
The coordinator is the only Git writer. Use write-conventional-commit; preserve
foreign staging and keep code/spec/tests/docs for one intent together.
Never push, tag, release, or publish merely because a commit was requested.
If Qollab execution cannot be exercised, report NOT VERIFIED and its concrete
blocker. Do not present local simulation or a static page as platform evidence.
Read relevant context and official docs for installed versions. Activate only
needed skills/agents. Resolve routine reversible choices without repeated
permission questions; consult the team for genuinely blocking intent changes.
