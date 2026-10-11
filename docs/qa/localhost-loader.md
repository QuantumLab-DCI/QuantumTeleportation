# Independent localhost loader checks

Date: 2026-10-11. Scope: mount-first bridge loading and inline favicon correction.

**PASS for the checked local correction; NOT VERIFIED for Qollab delivery.**
QA changed only `tests/test_notebook_ui.mjs` and this report. Reviewed the actual
main/index diff and current wrapper/renderer. No production edits or Git writes.

## Reproduction and observations

From the repository root, with Node 24.14.0, Chromium at `/snap/bin/chromium`
and the existing local Python environment:

```bash
node tests/test_notebook_ui.mjs
node --check tests/test_notebook_ui.mjs
git diff --check -- tests/test_notebook_ui.mjs docs/qa/localhost-loader.md
```

The harness accepts `NOTEBOOK_PYTHON` and `CHROMIUM` overrides. Default Python:
`/tmp/opencode/teleportation-notebook-research/bin/python`. It starts an ephemeral
localhost server and headless Chromium/CDP on port 9333, which must be available.

Final browser run: **27 groups passed, zero failures**. Syntax and scoped
whitespace checks passed.

| Criterion | Result | Method / observed evidence |
| --- | --- | --- |
| Real static serving at 1440px and 320px | PASS | Rewrite disabled; actual production files mount context and all three panels, default to Example, and show Error with the exact English bridge-unavailable explanation. All seven sources/outputs stay Pending; no result images appear. |
| Diagnostics and repeated navigation | PASS | Each static page logs one boundary error with `QOLLAB_RUNTIME_UNAVAILABLE` and original bare-import failure cause. Two keyboard/tab/six-anchor navigation cycles preserve Error/Pending, keep one visible panel, show no document overflow, and produce no additional wrapper requests or error logs. |
| Uncaught errors / rejections | PASS | CDP Runtime exception collection remains empty across the suite; static scenarios also capture zero unhandled promise rejections. |
| Favicon | PASS, headless Chromium only | Explicit SVG data favicon present; server request records contain no `/favicon.ico` request in either static viewport or missing-wrapper scenario. Visual browser-tab icon rendering was not assessed. |
| Missing wrapper | PASS | Server deliberately returns 404 for the wrapper. Mounted UI remains usable at 320px; same truthful Error, single boundary report and preserved fetch/import cause; no uncaught rejection or results. |
| Existing notebook regressions | PASS, local/fake bridge only | All previous groups retained: mount before one call, backend identity, proxy release, seven ordered source/output associations, nine decoded PNGs, keyboard/anchors/layout, malformed envelopes, missing dependency, bridge rejection, PNG negative paths, stale-result reset and figure-only recovery. |
| Entry unchanged by harness | PASS | Every served main response equals the production file byte-for-byte. Only the exact static Python import in the wrapper is substituted in fake mode; wrapper responses in static mode remain unchanged. |
| Live Qollab nested/dynamic discovery, backend injection, conversion, logs | NOT VERIFIED — delivery blocker | No live platform access. Official static-import/callPromising support does not establish dynamically loaded wrapper discovery. Local fake bridge and Python envelopes are not platform execution evidence. |

Initial runs exposed test-author issues: the wording assertion unnecessarily
required “runtime/unavailable,” and the navigation driver overlapped native
smooth scrolling. Tests now assert the exact clear production message and settle
the preceding study-link scroll before context navigation, retaining viewport
assertions and observable-state retries. Final full rerun passed; no production
correction was requested for these harness issues.

## Limits

These are automated local Chromium checks, including narrow CSS viewport
measurements, not physical-device or other-browser certification. Scientific
behavior was not changed; this task did not rerun the independent quantum
fidelity unittest suite. No Qollab/IonQ jobs were submitted. IonQ's documented
dynamic-branch incompatibility remains a separate delivery blocker. Team/user
comprehension, learning, universal accessibility and security are not certified.

This report supersedes the older notebook QA report's statement that the harness
rewrites the Python import in `main.js`; it now rewrites only the wrapper import.
