export const codeTabTemplate = `
  <section id="code-panel" class="study-panel code-panel" role="tabpanel" aria-labelledby="code-tab" tabindex="0" hidden>
    <p class="placeholder-label">Notebook placeholders</p>
    <h2 id="code-title">Code</h2>
    <p id="execution-status" class="execution-status" role="status"><strong>Status:</strong> Pending</p>
    <p id="execution-message">Notebook integration has not run. The containers below do not show computed results.</p>

    <article class="code-block-group">
      <h3>State preparation</h3>
      <p>Explanation pending.</p>
      <pre><code class="language-python"># Notebook-derived state-preparation code pending.</code></pre>
      <h4>Latest execution output</h4>
      <pre id="output-state-preparation" class="output-block" data-output-id="state-preparation" aria-live="polite">Pending</pre>
    </article>

    <article class="code-block-group">
      <h3>Entanglement</h3>
      <p>Explanation pending.</p>
      <pre><code class="language-python"># Notebook-derived entanglement code pending.</code></pre>
      <h4>Latest execution output</h4>
      <pre id="output-entanglement" class="output-block" data-output-id="entanglement" aria-live="polite">Pending</pre>
    </article>

    <article class="code-block-group">
      <h3>Execution</h3>
      <p>Explanation pending.</p>
      <pre><code class="language-python"># Notebook-derived execution code pending.</code></pre>
      <h4>Latest execution output</h4>
      <pre id="output-execution" class="output-block" data-output-id="execution" aria-live="polite">Pending</pre>
    </article>
  </section>
`;
