---
name: diagnose-qollab-runtime
description: "Diagnose browser and Python/Qiskit execution in Qollab. Use when loading, execution, result rendering, errors, logs or runtime configuration change."
---

1. Inspect real runtime facilities and existing logging before adding infrastructure.
   Identify useful events: loading, run start/completion, result formatting/rendering
   and failures. Choose a run ID/operation context when needed for correlation.
2. Reuse browser console methods and Python stdlib loggers. Configure Python logging
   once at the integration boundary and preserve platform handlers. Confirm how
   Python stdout/stderr/logging reach the UI or developer console in the actual
   platform; generic Pyodide documentation does not prove Qollab's capture behavior.
3. Use INFO for milestones, DEBUG for details, WARNING for recoverable degradation
   and ERROR for failures. Log a traceback where an active exception is handled;
   preserve causes and avoid duplicate traces in every layer. Avoid per-line logs.
4. Keep public English messages distinct from internal detail. Avoid secrets and
   whole payloads. Reuse the team's logger only after adapting imports, settings,
   supported Python version and lifecycle. Do not bring rotating files or queue
   listeners into the browser runtime without a verified need and compatibility.
5. Exercise a controlled failure and a repeated run. Verify identifiable origin,
   useful detail, no duplicate handlers/messages, public feedback, and absence of
   stale outputs presented as fresh. Document real log access in development docs.
   Keep failures observed only locally separate from platform-verified diagnostics.

Sources: https://docs.python.org/3/howto/logging.html
https://docs.python.org/3/howto/logging-cookbook.html
https://developer.mozilla.org/en-US/docs/Web/API/console
https://pyodide.org/en/stable/usage/quickstart.html
