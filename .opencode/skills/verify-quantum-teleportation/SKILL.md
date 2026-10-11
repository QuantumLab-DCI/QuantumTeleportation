---
name: verify-quantum-teleportation
description: "Build or review Qiskit teleportation and its Qollab execution bridge. Use for circuits, backend compatibility, corrections, bit ordering, relative phase or result contracts."
---

1. Verify the actual Qollab execution interface, selected IonQ simulator, Python/
   Qiskit versions and available dependencies from platform docs or a minimal probe.
   Record observed signatures, loading and result behavior in the design. Do not
   infer a platform API from generic Pyodide examples or local CPython success.
2. Define the execution function, fixed example inputs, result fields/block IDs,
   errors and log boundary before production. Separate quantum logic, integration
   and formatting. Return plain data supported by the actual JS/Python bridge;
   encode complex numbers explicitly if JSON is chosen. Execute the example as a
   whole. Confirm dependency manifests accepted by the platform; keep uv local only
   when useful. Do not pin unobserved runtime versions or add a separate IonQ server.
3. Define q0 as input, q1 as Alice's entangled qubit, q2 as Bob, m0 as the q0
   measurement and m1 as q1, or document an equivalent convention. Prepare the
   Bell pair, then CX(q0,q1) and H(q0). Correct Bob with X for m1=1 and Z for m0=1.
   Map named bits to displayed strings explicitly; avoid endianness assumptions.
4. Confirm intermediate measurement/classical-control support on the target.
   If unsupported, specify and justify a compatible representation, its teaching
   meaning and limitations. Never claim coherent controls are literal classical
   feed-forward, or silently replace the demonstrated protocol.
5. Use an independent mathematical or quantum_info oracle. Exercise 0, 1, +, -, +i
   and all four nonzero-probability branches; add seeded normalized random states
   when helpful. Compare Bob with the input by state_fidelity, allowing global phase.
   Choose a documented ideal tolerance, such as F >= 1-1e-9. Ensure omission of a
   necessary correction fails. Z-basis histogram agreement alone does not test phase.
6. Run the integrated example through Qollab's required IonQ simulator pathway.
   Distinguish that evidence from local ideal checks. For sampled data use justified
   statistical checks, not exact histogram equality. Label noise/sampling and any
   simulator-only information; do not fabricate amplitudes unavailable from results.
7. Check explanations: quantum information rather than matter, one entangled
   resource, two classical bits and no cloning. Return evidence and unresolved
   compatibility blockers; never promote a local-only run to platform success.

Sources: https://quantum.cloud.ibm.com/learning/en/courses/basics-of-quantum-information/entanglement-in-action/quantum-teleportation
https://qiskit.qotlabs.org/docs/guides/bit-ordering
https://qiskit.qotlabs.org/docs/api/qiskit/quantum_info
https://qollab.xyz/programs/hackathon
