/**
 * frontend/context_section.js
 * Módulo de Contexto Teórico y Conceptual para la Teleportación Cuántica.
 * 
 * Fuentes de referencia principales:
 * [1] M. A. Nielsen & I. L. Chuang, "Quantum Computation and Quantum Information", 
 *     Cambridge University Press, 2010.
 * [2] J. D. Hidary, "Quantum Computing: An Applied Approach", 2nd ed., Springer, 2021.
 */

export function renderContextSection() {
  return `
    <article id="context" class="context-container">
      <header class="context-header">
        <h2>¿Qué hay de cuántica detrás de esta historia?</h2>
        <p class="context-intro">
          La historia de Lucía y su abuela Elena nos ayuda a visualizar cómo viaja 
          la información fundamental de la naturaleza. Cada momento del relato 
          corresponde a una regla de la física cuántica.
        </p>
      </header>

      <div class="context-cards">

        <!-- 1. Entrelazamiento -->
        <section class="context-card">
          <div class="card-badge">1. Entrelazamiento</div>
          <h3>La Leyenda del Hilo Rojo: El Vínculo Cuántico Previo</h3>
          <p>
            <strong>En la historia:</strong> Lucía y Elena comparten un lazo rojo invisible 
            que cruza continentes y husos horarios. Antes de mandar cualquier palabra, 
            la cercanía y la conexión ya existen entre Chile e Italia.
          </p>
          <div class="quantum-insight">
            <p>
              <strong>La física detrás:</strong> En computación clásica necesitamos conectar 
              un cable o una antena para comunicar dos puntos. En física cuántica existe 
              el <em>entrelazamiento</em>: dos partículas nacen tan estrechamente ligadas que 
              comparten un mismo destino. No hay un cable físico flotando por el aire ni telepatía; 
              es un recurso previo de coordinación pura que ya está listo entre ambos extremos 
              antes de empezar el viaje.
            </p>
          </div>
        </section>

        <!-- 2. Preparar el mensaje -->
        <section id="quantum-challenge" class="context-card">
          <div class="card-badge">2. Preparar el mensaje</div>
          <h3>La Carta Hecha a Mano: Qubits y el Teorema de No Clonación</h3>
          <p>
            <strong>En la historia:</strong> Lucía vuelca el aroma del pan y sus recuerdos en 
            un papel único. No es una imagen digital de internet que se pueda reenviar a miles de 
            personas; es un pliego irrepetible que perdería su esencia si intentara fotocopiarse.
          </p>
          <div class="quantum-insight">
            <p>
              <strong>La física detrás:</strong> Los computadores normales usan <em>bits</em> 
              (ceros o unos), que se copian fácilmente con un simple «Copiar y Pegar» 
              manteniendo el original intacto. La información cuántica vive en <em>qubits</em>, 
              que pueden combinar posibilidades de forma muy delicada. La naturaleza tiene 
              una ley inquebrantable llamada <strong>Teorema de No Clonación</strong>: es físicamente 
              imposible duplicar un estado cuántico desconocido. Para que algo cuántico exista en un 
              nuevo destino, no podemos fotocopiarlo: la única vía es transferirlo.
            </p>
          </div>
        </section>

        <!-- 3. Dejar la carta lista -->
        <section class="context-card">
          <div class="card-badge">3. Dejar la carta lista</div>
          <h3>Numerar las Hojas: La Medición y la Pérdida del Original</h3>
          <p>
            <strong>En la historia:</strong> Lucía divide el relato en hojas separadas y anota 
            con cuidado números de orden en las esquinas. Al fijar el texto en páginas numeradas, 
            el mensaje queda listo para el viaje.
          </p>
          <div class="quantum-insight">
            <p>
              <strong>La física detrás:</strong> En el mundo cuántico, mirar o medir un sistema frágil 
              cambia las cosas de inmediato. Cuando medimos un qubit para enviarlo, su estado original 
              se desvanece de las manos de quien lo envía —respetando que no pueden coexistir dos copias 
              idénticas—. Al realizar esa medición conjunta, el emisor se queda únicamente con 
              <strong>números de orden clásicos</strong> (dos bits ordinarios), que son las pistas 
              necesarias para guiar al receptor.
            </p>
          </div>
        </section>

        <!-- 4. Enviar la carta -->
        <section class="context-card">
          <div class="card-badge">4. Enviar la carta</div>
          <h3>El Sobre en el Correo Postal: Nada Viaja Más Rápido que la Luz</h3>
          <p>
            <strong>En la historia:</strong> El sobre se entrega en la oficina de correos y 
            cruza el océano en un transporte regular, avanzando al ritmo pausado de las 
            rutas postales de siempre.
          </p>
          <div class="quantum-insight">
            <p>
              <strong>La física detrás:</strong> Mucha gente piensa que la teleportación cuántica 
              permite enviar mensajes instantáneos a través del espacio. Eso violaría la física. 
              El vínculo previo (el hilo rojo) no puede transmitir información por sí solo. 
              Para que la abuela entienda el mensaje, necesita obligatoriamente recibir los números 
              de referencia por un canal común (como un sobre, internet o fibra óptica). 
              Por eso, la teleportación está limitada por la velocidad normal de la luz.
            </p>
          </div>
        </section>

        <!-- 5. Ordenar y leer -->
        <section id="teleportation" class="context-card">
          <div class="card-badge">5. Ordenar y leer</div>
          <h3>Alinear las Páginas: La Reconstrucción Exacta</h3>
          <p>
            <strong>En la historia:</strong> Elena recibe el sobre bajo los olivos de Italia. 
            Mira los números en las esquinas, acomoda las hojas en ese orden exacto y solo 
            entonces lee la carta conmovida, sintiendo la calidez viva de su nieta.
          </p>
          <div class="quantum-insight">
            <p>
              <strong>La física detrás:</strong> Al otro lado del mundo, el sistema del receptor 
              tiene la energía del enlace cuántico, pero está desordenado. Al recibir los números 
              guía enviados desde el origen, el receptor sabe con exactitud cómo ordenar su 
              sistema. Con ese ajuste final, el estado cuántico original renace intacto en destino, 
              completando la teleportación sin haber viajado flotando físicamente por el aire.
            </p>
          </div>
        </section>

      </div>

      <!-- Dónde se aplica hoy -->
      <footer class="context-footer">
        <h3>¿Dónde se utiliza este concepto en la vida real?</h3>
        <ul>
          <li>
            <strong>Repetidores para la Internet Cuántica:</strong> La señal en cables de fibra 
            óptica se apaga con la distancia. Como no podemos fotocopiar los qubits para amplificarlos, 
            se usa la teleportación para trasladar la información de una ciudad a otra saltando de 
            nodo en nodo sin medirla ni perderla.
          </li>
          <li>
            <strong>Supercomputadores Cuánticos Modulares:</strong> Fabricar procesadores cuánticos 
            gigantes es muy difícil porque los qubits se interfieren entre sí. La solución actual es 
            unir varios chips pequeños a distancia usando teleportación de compuertas, haciéndolos 
            trabajar en equipo como una sola computadora masiva.
          </li>
        </ul>

        <div class="context-references">
          <h4>Fuentes de referencia</h4>
          <p>[1] M. A. Nielsen & I. L. Chuang, <em>Quantum Computation and Quantum Information</em>, Cambridge University Press, 2010.</p>
          <p>[2] J. D. Hidary, <em>Quantum Computing: An Applied Approach</em>, 2nd ed., Springer, 2021.</p>
        </div>
      </footer>
    </article>
  `;
}
