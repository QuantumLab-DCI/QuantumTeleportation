// frontend/example_tab.js

export const exampleTabHTML = `
<div class="example-panel-container p-3 p-md-4">
  
  <!-- Prólogo y Enlace al Juego -->
  <header class="narrative-header mb-5 text-center">
    <h2 class="h3 fw-bold text-danger mb-3">El Hilo Rojo: Una Historia de Entrelazamiento</h2>
    <p class="lead text-light-subtle mx-auto mb-4" style="max-width: 750px;">
      Elena, la abuela de Lucía, tomó hace unos meses la decisión de volver a su pueblo natal en el sur de Italia para cuidar la vieja huerta familiar. No hay tragedia en su partida, solo la distancia cotidiana que impone la geografía: doce horas de diferencia de vuelo, un océano de por medio y una rutina compartida que de pronto se redujo a llamadas entrecortadas por videollamada.
    </p>
    
    <!-- Este es el botón donde luego pondrás el link reemplazando el "#" -->
    <a href="#" target="_blank" class="btn btn-outline-danger px-4 py-2 fw-bold rounded-pill shadow-sm">
      <i class="bi bi-play-circle-fill me-2"></i> Ver Historia Interactiva
    </a>
  </header>

  <!-- Los 5 Pasos Verticales (Cumple FR-06) -->
  <section class="analogy-steps-vertical mx-auto" style="max-width: 800px;">
    
    <!-- Paso 1 -->
    <article class="step-card card mb-4" style="background-color: #1e1e2e; border: 1px solid #313244;">
      <div class="card-body p-4">
        <h4 class="card-title h5 text-danger fw-bold mb-3">1. Entrelazamiento</h4>
        <p class="card-text text-light">
          A pesar de los miles de kilómetros, ambas están tan profundamente unidas que es como si estuvieran conectadas por un hilo rojo invisible. Como cuenta la antigua leyenda oriental, dos personas destinadas a encontrarse y acompañarse comparten un lazo rojo intangible que puede estirarse, tensarse o cruzar continentes enteros, pero jamás romperse. Mucho antes de enviar cualquier palabra, ese vínculo compartido ya existe entre Chile e Italia: un puente silencioso y previo a cualquier distancia física.
        </p>
        <p class="card-text text-secondary mb-0">
          Una imagen enviada por internet siempre es un duplicado: la misma cuadrícula de píxeles fría en ambos teléfonos. Lucía busca algo que la tecnología ordinaria no permite: hacerle llegar a Elena la calidez exacta de una memoria compartida sin convertirla en una copia estéril. Un recuerdo vivo, un estado que solo pueda existir en un lugar a la vez.
        </p>
      </div>
    </article>

    <!-- Paso 2 -->
    <article class="step-card card mb-4" style="background-color: #1e1e2e; border: 1px solid #313244;">
      <div class="card-body p-4">
        <h4 class="card-title h5 text-warning fw-bold mb-3">2. Preparar el mensaje</h4>
        <p class="card-text text-light">
          Sola en su habitación en Chile, Lucía decide escribirle una carta a mano a su abuela para su cumpleaños. No anota frases comunes ni fórmulas vacías: vuelca en el papel la textura viva de aquella tarde horneando pan juntas. Cuida cada trazo de tinta para capturar el aroma a harina en la cocina, las risas y la paciencia compartida.
        </p>
        <p class="card-text text-secondary mb-0">
          Ese pliego no es un archivo digital ni un texto que admita borradores. Es un objeto único, un estado frágil que reside únicamente sobre su mesa y que perdería su autenticidad si alguien intentara transcribirlo mecánicamente.
        </p>
      </div>
    </article>

    <!-- Paso 3 -->
    <article class="step-card card mb-4" style="background-color: #1e1e2e; border: 1px solid #313244;">
      <div class="card-body p-4">
        <h4 class="card-title h5 text-info fw-bold mb-3">3. Dejar la carta lista</h4>
        <p class="card-text text-light mb-0">
          A partir del borrador definitivo, Lucía transcribe el texto final distribuyéndolo en hojas separadas. Para no perder la estructura del relato, anota con cuidado un número de orden en la esquina de cada página. Al numerar y separar las hojas, el contenido queda fijado en una versión concreta y lista para el viaje, sin que el acto de numerarlas cambie lo que Lucía siente en su interior.
        </p>
      </div>
    </article>

    <!-- Paso 4 -->
    <article class="step-card card mb-4" style="background-color: #1e1e2e; border: 1px solid #313244;">
      <div class="card-body p-4">
        <h4 class="card-title h5 text-danger fw-bold mb-3">4. Enviar la carta</h4>
        <p class="card-text text-light mb-0">
          Lucía guarda las hojas numeradas dentro de un sobre, anota los datos postales de la casa de campo de Elena y lo deposita en la oficina de correos. El sobre emprende su viaje físico en un transporte regular, cruzando continentes y husos horarios al ritmo habitual y limitado de las rutas postales convencionales.
        </p>
      </div>
    </article>

    <!-- Paso 5 -->
    <article class="step-card card mb-4" style="background-color: #1e1e2e; border: 1px solid #313244;">
      <div class="card-body p-4">
        <h4 class="card-title h5 text-success fw-bold mb-3">5. Ordenar y leer</h4>
        <p class="card-text text-light mb-0">
          Semanas después, el sobre llega a la huerta en el sur de Italia y Elena lo recibe en sus manos. Al abrirlo, extrae las páginas sueltas, observa los números anotados en las esquinas y acomoda las hojas siguiendo esa numeración exacta. Con las páginas alineadas en su orden correcto, Elena se sienta bajo los olivos y comienza a leerlas profundamente conmovida, reviviendo con nitidez cada uno de los momentos que pasaron juntas y sintiendo de vuelta la cercanía de su nieta a través de la distancia.
        </p>
      </div>
    </article>

  </section>
</div>
`;

export function initExampleTab() {
  // Sin la interactividad compleja, esta función se mantiene vacía o con interacciones mínimas.
  // El contenido ya está formateado y listo para leerse verticalmente.
}
