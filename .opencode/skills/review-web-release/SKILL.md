---
name: review-web-release
description: "Evaluate a feature or Qollab delivery against observable criteria. Use for independent QA, regression, runtime integration, documentation or demo checks."
---

1. Read the current spec, design, task and diff. Review design before READY;
   after implementation trace each criterion to an actual check or explicit gap.
2. Run relevant existing checks. Test physical correctness using an independent
   oracle, then exercise whole-example Qollab/IonQ execution and output rendering.
   Do not require HTTP tests or a frontend build pipeline that the product lacks.
3. Check initial Example tab, other tabs, top anchors, vertical content, mobile,
   keyboard and output association. If Playwright is used, prefer role/label
   locators, isolated tests and retrying assertions; avoid synchronization sleeps.
4. Exercise one meaningful failure: locate its originating operation from logs
   and confirm a clear public error. Review nesting, SRP, proportional docs,
   dependency compatibility and consistency of explanations with actual results.
5. Check runnable publication preparation, repository link, MIT license,
   attribution, third-party disclosures and reproducible documentation. Apply
   the current event rules; prepare publishing artifacts without treating a
   commit request as authorization to publish. Check demo material when in scope.
6. Report PASS / FAIL / NOT VERIFIED, method, expected/observed behavior and
   reproduction per criterion. Report blockers to their owners and repeat only
   affected checks after fixes. Distinguish technical checks from human learning
   validation; leave unavailable platform evidence explicitly NOT VERIFIED.

Sources: https://playwright.dev/docs/best-practices
https://www.w3.org/WAI/test-evaluate/tools/selecting/
https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents
https://www.labset.exa.unicen.edu.ar/qollab_hackathon
