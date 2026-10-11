---
name: write-conventional-commit
description: "Write or create English Conventional Commits grounded in the actual diff. Use when drafting a message, finishing a task or committing an integrated change."
---

1. Read AGENTS.md and existing Git conventions. Check branch, git status --short,
   git diff and git diff --cached. Identify owned changes and unrelated staging.
   Base the message on the actual intended commit diff rather than the initial plan.
2. Group one coherent intent with its code/spec/tests/docs. Preserve foreign
   staging. Avoid indiscriminate git add ., reset, stash or amend. If asked only
   for a message, do not stage or commit anything. Only the coordinator writes Git.
3. Choose a real type/scope: feat, fix, refactor, docs, test, build, ci, perf,
   chore or style. Use style for code formatting, not every visual UI change.
   Mark incompatible changes with ! or BREAKING CHANGE and describe migration.
4. Write English: type(scope): short imperative summary, blank line, brief
   purpose/result paragraph, blank line, proportional bullets of relevant changes.
   Do not invent tests or details. Keep the body useful even for a small change.
5. Run relevant checks, review the staged diff and existing hooks. Use a temporary
   message file with git commit --file to preserve real newlines. Verify the
   resulting commit and remaining staging. If foreign staging cannot be isolated
   safely, return the message and explain the concrete blocker instead of including it.
   Do not push, tag, publish or bump versions automatically.

Example:

    fix(code): align displayed outputs with the latest execution

    Keep the educational code blocks synchronized with the completed quantum
    run so readers can interpret each result in its corresponding context.

    - associate outputs with stable content block identifiers
    - clear outdated results when a new execution starts
    - document the result mapping contract

Sources: https://www.conventionalcommits.org/en/v1.0.0/
https://git-scm.com/docs/git-commit
