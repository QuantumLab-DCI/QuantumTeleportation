export const codeTabTemplate = `
  <section id="code-panel" class="study-panel code-panel" role="tabpanel" aria-labelledby="code-tab" tabindex="0" hidden>
    <p class="placeholder-label">Contenido del cuaderno pendiente</p>
    <h2 id="code-title">Código</h2>
    <p id="execution-status" class="execution-status" role="status"><strong>Estado:</strong> Pendiente</p>
    <p id="execution-message">La integración del cuaderno no se ha ejecutado. Los contenedores siguientes no muestran resultados calculados.</p>

    <article class="code-block-group">
      <h3>Preparación del estado</h3>
      <p>Explicación pendiente.</p>
      <pre><code class="language-python"># Notebook-derived state-preparation code pending.</code></pre>
      <h4>Salida de la ejecución más reciente</h4>
      <pre id="output-state-preparation" class="output-block" data-output-id="state-preparation" aria-live="polite">Pendiente</pre>
    </article>

    <article class="code-block-group">
      <h3>Entrelazamiento</h3>
      <p>Explicación pendiente.</p>
      <pre><code class="language-python"># Notebook-derived entanglement code pending.</code></pre>
      <h4>Salida de la ejecución más reciente</h4>
      <pre id="output-entanglement" class="output-block" data-output-id="entanglement" aria-live="polite">Pendiente</pre>
    </article>

    <article class="code-block-group">
      <h3>Ejecución</h3>
      <p>Explicación pendiente.</p>
      <pre><code class="language-python"># Notebook-derived execution code pending.</code></pre>
      <h4>Salida de la ejecución más reciente</h4>
      <pre id="output-execution" class="output-block" data-output-id="execution" aria-live="polite">Pendiente</pre>
    </article>
  </section>
`;
