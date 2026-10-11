---
name: plan-spec-driven-feature
description: "Plan behavior with a maintained spec and architecture before code. Use before a new feature, execution contract change, scope change or design review."
---

1. Read AGENTS.md, the actual project spec and docs/architecture.md. Preserve
   existing canonical docs; start with specs/project.md if the repo is empty.
2. Define need, scope, exclusions, requirement IDs and observable criteria. Keep
   team decisions distinct from event requirements, proposals and unknowns.
   Specify whole-example execution separately from notebook content presentation.
3. Define module responsibilities and dependency direction, verified runtime API,
   inputs/results/block mapping, errors/logs, dependencies and meaningful checks.
   Resolve essential platform unknowns using official docs or a disposable probe.
   Keep the design in DRAFT while the core execution contract is unverified.
4. Record compact tasks with requirement IDs, owner, allowed paths, interfaces,
   dependencies and check methods. Keep their canonical status in the current spec.
   Split spec/plan/tasks files only when size or independent work justifies it.
5. Obtain an independent QA review. QA returns evidence/findings; the coordinator
   records READY once essential blockers are resolved. Do not ask for routine
   human sign-off or interpret this instruction as a runtime-enforced approval gate.
6. Build one integrated slice. Compare spec/design/code/checks/docs, correct
   divergences, and update evidence with executed results and explicit gaps.
   Use existing documents for small fixes. Never change criteria to hide a bug.

Sources: https://github.com/github/spec-kit
https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html
https://c4model.com/diagrams
