// Only trusted, fixed educational copy belongs here; executed source comes from Python.
const stages = [
  {
    id: 'state-preparation',
    title: 'Setup: Prepare the input state',
    explanation: 'Q = q0 is the input qubit, A = q1 is the granddaughter’s resource qubit, and B = q2 is the grandmother’s qubit. The supplied input amplitudes [0.6, 0.8] define the normalized state 0.6|0⟩ + 0.8|1⟩ on Q. Preparing this input is unnumbered setup, before the five supplied analogy steps.',
    provenance: 'The figure is a circuit-construction snapshot of state preparation, not an additional experiment or a measured intermediate state.',
  },
  {
    id: 'entanglement',
    title: 'Step 1: Connect the red thread',
    explanation: '“Connect the red thread” corresponds to entangling A and B, the granddaughter’s and grandmother’s resource qubits. Entanglement is a quantum resource, not a communication channel that can send a message on its own; the grandmother still needs the granddaughter’s two classical bits.',
    provenance: 'The figure is a circuit-construction snapshot of the shared resource. It does not come from another simulator run.',
  },
  {
    id: 'measurement-preparation',
    title: 'Step 2: Prepare the erasers',
    explanation: '“Prepare the erasers” corresponds to cx(Q, A), followed by h(Q). The granddaughter couples Q to A and changes Q’s measurement basis to prepare the Bell measurement. These operations arrange for the two measurement outcomes to identify which correction the grandmother will need; they do not copy the unknown input state.',
    provenance: 'The figure is the circuit snapshot before measurement, not an observation of the quantum state between gates.',
  },
  {
    id: 'measurement',
    title: 'Step 3: Get the letter ready',
    explanation: '“Get the letter ready” corresponds to measuring Q and A. The granddaughter measures Q into c0 and A into c1. These two classical outcomes are the information she must send to the grandmother. The measurement consumes the original input on Q: the protocol transfers its state to B rather than retaining a second copy on Q.',
    provenance: 'The figure shows where measurement enters the circuit. Counts belong to the first local experiment in the next block, not to an extra run for this snapshot.',
  },
  {
    id: 'classical-bits',
    title: 'Step 4: Send the letter',
    explanation: '“Send the letter” corresponds to the classical bits shown in the first histogram. The first ideal local Aer experiment samples the granddaughter’s outcomes over 1024 shots. Count labels are in A Q order: the left bit is c1 (A), and the right bit is c0 (Q); c2 is unused in this experiment. Thus “10” means A = 1 and Q = 0. The four outcomes are ideally equally likely, but finite-shot counts can differ. The granddaughter sends the two classical bits to the grandmother; they do not reveal the input amplitudes.',
    provenance: 'The histogram is supplied by the first experiment of the latest execution. No sample counts or precomputed histogram are shown while it is Pending.',
  },
  {
    id: 'correction',
    title: 'Step 5: Arrange the sheets',
    explanation: '“Arrange the sheets” corresponds to the conditional corrections. The grandmother applies X to B when c1 = 1, then Z to B when c0 = 1. The classical bits specify how to recover the input state on B, not how to learn unknown amplitudes from one qubit. The protocol uses actual classical conditions, not an undisclosed coherent-control substitute.',
    provenance: 'The figure is a snapshot of the conditional circuit used in the verification experiment, not a third experiment or a separate correction run.',
  },
  {
    id: 'verification',
    title: 'Verification: Apply inverse preparation',
    explanation: 'The second ideal local Aer experiment includes the conditional corrections, applies the inverse of the known input preparation to B, then measures B into c2 over 1024 shots. If B has recovered 0.6|0⟩ + 0.8|1⟩, inverse preparation maps it back to |0⟩. The ideal expected counts are {\'0\': 1024}; this is an expectation, not a precomputed output or a claim about the latest execution. Measuring B directly in the Z basis would not perform this verification.',
    provenance: 'The verification circuit and c2 histogram belong to the second experiment of the latest execution. This test uses a known prepared input; it is not a way to determine an arbitrary unknown state from a single measurement.',
  },
];

// This helper accepts only the fixed stage definitions above, never bridge data.
function stageTemplate(stage) {
  return `
    <article class="code-block-group" aria-labelledby="stage-${stage.id}-title">
      <h3 id="stage-${stage.id}-title">${stage.title}</h3>
      <p>${stage.explanation}</p>
      <h4 id="source-${stage.id}-title">Executed Python source</h4>
      <pre tabindex="0" aria-labelledby="source-${stage.id}-title"><code id="source-${stage.id}" class="language-python">Pending</code></pre>
      <h4 id="output-${stage.id}-title">Output of the latest execution</h4>
      <pre id="output-${stage.id}" class="output-block" data-output-id="${stage.id}" tabindex="0" aria-labelledby="output-${stage.id}-title">Pending</pre>
      <h4 id="figures-${stage.id}-title">Figures of the latest execution</h4>
      <p class="figure-provenance">${stage.provenance}</p>
      <div id="figures-${stage.id}" class="stage-figures" role="group" aria-labelledby="figures-${stage.id}-title"></div>
    </article>
  `;
}

export const codeTabTemplate = `
  <section id="code-panel" class="study-panel code-panel" lang="en" role="tabpanel" aria-labelledby="code-tab" tabindex="0" hidden>
    <h2 id="code-title">Code</h2>
    <p id="execution-status" class="execution-status" role="status" aria-live="polite">Pending</p>
    <p id="execution-message" aria-live="polite">The whole-example execution has not returned results. Source and output blocks remain Pending; no figures have been supplied.</p>
    <div id="execution-errors" class="execution-errors" role="status" aria-live="polite" aria-label="Execution errors and warnings"></div>

    <section class="notebook-overview" aria-labelledby="notebook-scope-title">
      <h3 id="notebook-scope-title">One example, two local experiments</h3>
      <p>The notebook runs as a whole: two ideal local Aer experiments of 1024 shots each, one for the granddaughter’s classical bits and one for the grandmother’s inverse-preparation verification. The seven blocks below explain construction and results; they are not independently executable cells. Exact executed Python source, text outputs, and figures are supplied by the execution renderer, not duplicated here.</p>
      <p><strong>Local and platform status are separate.</strong> Successful local Aer experiments yield <strong>Partial</strong>, not a completed Qollab/IonQ demonstration. IonQ’s documented lack of dynamic classical branches prevents submission of this protocol; this bounded slice attempts no injected-backend jobs. Qollab loading and dependency availability remain not verified. Errors and platform limitations remain visible alongside any available local results.</p>
      <p><strong>Supplied analogy correspondence:</strong> Input preparation is unnumbered setup. Step 1, “connect the red thread,” corresponds to entangling A and B. Step 2, “prepare the erasers,” corresponds to cx(Q, A) followed by h(Q). Step 3, “get the letter ready,” corresponds to measuring Q and A. Step 4, “send the letter,” corresponds to the first histogram of classical bits. Step 5, “arrange the sheets,” corresponds to the conditional corrections. Inverse-preparation verification follows these five steps.</p>
      <p><strong>Analogy limits:</strong> These are analogy labels, not literal quantum operations: no physical object is transported, no unknown state is copied, and no faster-than-light message is sent.</p>
      <p>Construction snapshots are not additional runs or measured intermediate states. Any supplied simulator-only state information describes the ideal model, not information available from observing one qubit in the physical protocol.</p>
    </section>

    <section class="notebook-dependencies" aria-labelledby="notebook-dependencies-title">
      <h3 id="notebook-dependencies-title">Dependency preparation</h3>
      <p>The Python environment needs Qiskit visualization support and Aer for local simulation. These dependency declarations are setup information, not executed notebook cells; this page runs no pip commands. Actual installation in Qollab must be verified separately.</p>
      <pre tabindex="0" aria-label="Required Python dependencies"><code>qiskit[visualization]&gt;=2.5.2,&lt;3.0.0
qiskit-aer==0.17.2</code></pre>
      <p>PNG figures use Matplotlib through the Python execution. The renderer supplies descriptive image alt text and captions with each available figure. Empty figure containers mean no figures have been returned, not that an experiment succeeded.</p>
    </section>

    ${stages.map(stageTemplate).join('')}
  </section>
`;
