const inlineMath = (_label, mathml, visual) => `
  <span class="math-inline">
    <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics>${mathml}</semantics></math></span><span class="katex-html" aria-hidden="true">${visual}</span></span>
  </span>
`;

const displayMath = (_label, mathml, visual) => `
  <div class="equation-block">
    <span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics>${mathml}</semantics></math></span><span class="katex-html" aria-hidden="true">${visual}</span></span></span>
  </div>
`;

const psi = inlineMath(
  'ket psi',
  '<mrow><mo>|</mo><mi>ψ</mi><mo>⟩</mo></mrow>',
  '|ψ⟩',
);

const zeroKet = inlineMath(
  'ket cero',
  '<mrow><mo>|</mo><mn>0</mn><mo>⟩</mo></mrow>',
  '|0⟩',
);

const oneKet = inlineMath(
  'ket uno',
  '<mrow><mo>|</mo><mn>1</mn><mo>⟩</mo></mrow>',
  '|1⟩',
);

const alphaZero = inlineMath(
  'alfa ket cero',
  '<mrow><mi>α</mi><mo>|</mo><mn>0</mn><mo>⟩</mo></mrow>',
  'α|0⟩',
);

const betaOne = inlineMath(
  'beta ket uno',
  '<mrow><mi>β</mi><mo>|</mo><mn>1</mn><mo>⟩</mo></mrow>',
  'β|1⟩',
);

const qubitState = displayMath(
  'psi es igual a alfa ket cero más beta ket uno',
  '<mrow><mo>|</mo><mi>ψ</mi><mo>⟩</mo><mo>=</mo><mi>α</mi><mo>|</mo><mn>0</mn><mo>⟩</mo><mo>+</mo><mi>β</mi><mo>|</mo><mn>1</mn><mo>⟩</mo></mrow>',
  '|ψ⟩ = α|0⟩ + β|1⟩',
);

const probabilityEquations = displayMath(
  'P de cero es igual al módulo de alfa al cuadrado, y P de uno es igual al módulo de beta al cuadrado',
  '<mtable><mtr><mtd><mi>P</mi><mo>(</mo><mn>0</mn><mo>)</mo><mo>=</mo><msup><mrow><mo>|</mo><mi>α</mi><mo>|</mo></mrow><mn>2</mn></msup><mo>,</mo></mtd></mtr><mtr><mtd><mi>P</mi><mo>(</mo><mn>1</mn><mo>)</mo><mo>=</mo><msup><mrow><mo>|</mo><mi>β</mi><mo>|</mo></mrow><mn>2</mn></msup><mo>.</mo></mtd></mtr></mtable>',
  '<span class="math-lines">P(0) = |α|²,<br>P(1) = |β|².</span>',
);

const normalizationEquation = displayMath(
  'el módulo de alfa al cuadrado más el módulo de beta al cuadrado es igual a uno',
  '<mrow><msup><mrow><mo>|</mo><mi>α</mi><mo>|</mo></mrow><mn>2</mn></msup><mo>+</mo><msup><mrow><mo>|</mo><mi>β</mi><mo>|</mo></mrow><mn>2</mn></msup><mo>=</mo><mn>1</mn></mrow>',
  '|α|² + |β|² = 1',
);

const phaseExample = displayMath(
  'ket cero más ket uno sobre raíz de dos, y ket cero menos ket uno sobre raíz de dos',
  '<mrow><mfrac><mrow><mo>|</mo><mn>0</mn><mo>⟩</mo><mo>+</mo><mo>|</mo><mn>1</mn><mo>⟩</mo></mrow><msqrt><mn>2</mn></msqrt></mfrac><mspace width="2em"/><mtext>y</mtext><mspace width="2em"/><mfrac><mrow><mo>|</mo><mn>0</mn><mo>⟩</mo><mo>−</mo><mo>|</mo><mn>1</mn><mo>⟩</mo></mrow><msqrt><mn>2</mn></msqrt></mfrac></mrow>',
  '(|0⟩ + |1⟩) / √2 &nbsp;&nbsp; y &nbsp;&nbsp; (|0⟩ − |1⟩) / √2',
);

const hadamardEquations = displayMath(
  'Hadamard de ket cero y Hadamard de ket uno',
  '<mtable><mtr><mtd><mi>H</mi><mo>|</mo><mn>0</mn><mo>⟩</mo><mo>=</mo><mfrac><mrow><mo>|</mo><mn>0</mn><mo>⟩</mo><mo>+</mo><mo>|</mo><mn>1</mn><mo>⟩</mo></mrow><msqrt><mn>2</mn></msqrt></mfrac><mo>,</mo></mtd></mtr><mtr><mtd><mi>H</mi><mo>|</mo><mn>1</mn><mo>⟩</mo><mo>=</mo><mfrac><mrow><mo>|</mo><mn>0</mn><mo>⟩</mo><mo>−</mo><mo>|</mo><mn>1</mn><mo>⟩</mo></mrow><msqrt><mn>2</mn></msqrt></mfrac><mo>.</mo></mtd></mtr></mtable>',
  '<span class="math-lines">H|0⟩ = (|0⟩ + |1⟩) / √2,<br>H|1⟩ = (|0⟩ − |1⟩) / √2.</span>',
);

const cnotMapping = displayMath(
  'transformaciones de la puerta CNOT para cero cero, cero uno, uno cero y uno uno',
  '<mtable><mtr><mtd><mo>|</mo><mn>00</mn><mo>⟩</mo><mo>→</mo><mo>|</mo><mn>00</mn><mo>⟩</mo><mo>,</mo></mtd><mtd><mo>|</mo><mn>01</mn><mo>⟩</mo><mo>→</mo><mo>|</mo><mn>01</mn><mo>⟩</mo><mo>,</mo></mtd></mtr><mtr><mtd><mo>|</mo><mn>10</mn><mo>⟩</mo><mo>→</mo><mo>|</mo><mn>11</mn><mo>⟩</mo><mo>,</mo></mtd><mtd><mo>|</mo><mn>11</mn><mo>⟩</mo><mo>→</mo><mo>|</mo><mn>10</mn><mo>⟩</mo><mo>.</mo></mtd></mtr></mtable>',
  '<span class="math-grid"><span>|00⟩ → |00⟩,</span><span>|01⟩ → |01⟩,</span><span>|10⟩ → |11⟩,</span><span>|11⟩ → |10⟩.</span></span>',
);

const bellState = displayMath(
  'ket cero cero más ket uno uno sobre raíz de dos',
  '<mfrac><mrow><mo>|</mo><mn>00</mn><mo>⟩</mo><mo>+</mo><mo>|</mo><mn>11</mn><mo>⟩</mo></mrow><msqrt><mn>2</mn></msqrt></mfrac>',
  '(|00⟩ + |11⟩) / √2',
);

const measuredBasisStates = displayMath(
  'ket cero o ket uno',
  '<mrow><mo>|</mo><mn>0</mn><mo>⟩</mo><mspace width="2em"/><mtext>o</mtext><mspace width="2em"/><mo>|</mo><mn>1</mn><mo>⟩</mo></mrow>',
  '|0⟩ &nbsp;&nbsp; o &nbsp;&nbsp; |1⟩',
);

const negativePhaseState = displayMath(
  'alfa ket cero menos beta ket uno',
  '<mrow><mi>α</mi><mo>|</mo><mn>0</mn><mo>⟩</mo><mo>−</mo><mi>β</mi><mo>|</mo><mn>1</mn><mo>⟩</mo></mrow>',
  'α|0⟩ − β|1⟩',
);

const measurementOutcomes = displayMath(
  'los cuatro resultados posibles de la medición y el estado correspondiente',
  '<mtable><mtr><mtd><mn>00</mn><mo>:</mo></mtd><mtd><mi>α</mi><mo>|</mo><mn>0</mn><mo>⟩</mo><mo>+</mo><mi>β</mi><mo>|</mo><mn>1</mn><mo>⟩</mo><mo>,</mo></mtd></mtr><mtr><mtd><mn>01</mn><mo>:</mo></mtd><mtd><mi>β</mi><mo>|</mo><mn>0</mn><mo>⟩</mo><mo>+</mo><mi>α</mi><mo>|</mo><mn>1</mn><mo>⟩</mo><mo>,</mo></mtd></mtr><mtr><mtd><mn>10</mn><mo>:</mo></mtd><mtd><mi>α</mi><mo>|</mo><mn>0</mn><mo>⟩</mo><mo>−</mo><mi>β</mi><mo>|</mo><mn>1</mn><mo>⟩</mo><mo>,</mo></mtd></mtr><mtr><mtd><mn>11</mn><mo>:</mo></mtd><mtd><mo>−</mo><mi>β</mi><mo>|</mo><mn>0</mn><mo>⟩</mo><mo>+</mo><mi>α</mi><mo>|</mo><mn>1</mn><mo>⟩</mo><mo>.</mo></mtd></mtr></mtable>',
  '<span class="math-lines math-outcomes">00: α|0⟩ + β|1⟩,<br>01: β|0⟩ + α|1⟩,<br>10: α|0⟩ − β|1⟩,<br>11: −β|0⟩ + α|1⟩.</span>',
);

const xGate = displayMath(
  'X de ket cero es ket uno, y X de ket uno es ket cero',
  '<mtable><mtr><mtd><mi>X</mi><mo>|</mo><mn>0</mn><mo>⟩</mo><mo>=</mo><mo>|</mo><mn>1</mn><mo>⟩</mo><mo>,</mo></mtd></mtr><mtr><mtd><mi>X</mi><mo>|</mo><mn>1</mn><mo>⟩</mo><mo>=</mo><mo>|</mo><mn>0</mn><mo>⟩</mo><mo>.</mo></mtd></mtr></mtable>',
  '<span class="math-lines">X|0⟩ = |1⟩,<br>X|1⟩ = |0⟩.</span>',
);

const zGate = displayMath(
  'Z de ket cero es ket cero, y Z de ket uno es menos ket uno',
  '<mtable><mtr><mtd><mi>Z</mi><mo>|</mo><mn>0</mn><mo>⟩</mo><mo>=</mo><mo>|</mo><mn>0</mn><mo>⟩</mo><mo>,</mo></mtd></mtr><mtr><mtd><mi>Z</mi><mo>|</mo><mn>1</mn><mo>⟩</mo><mo>=</mo><mo>−</mo><mo>|</mo><mn>1</mn><mo>⟩</mo><mo>.</mo></mtd></mtr></mtable>',
  '<span class="math-lines">Z|0⟩ = |0⟩,<br>Z|1⟩ = −|1⟩.</span>',
);

const xCorrection = displayMath(
  'beta ket cero más alfa ket uno se transforma en alfa ket cero más beta ket uno',
  '<mrow><mi>β</mi><mo>|</mo><mn>0</mn><mo>⟩</mo><mo>+</mo><mi>α</mi><mo>|</mo><mn>1</mn><mo>⟩</mo><mo>→</mo><mi>α</mi><mo>|</mo><mn>0</mn><mo>⟩</mo><mo>+</mo><mi>β</mi><mo>|</mo><mn>1</mn><mo>⟩</mo></mrow>',
  'β|0⟩ + α|1⟩ → α|0⟩ + β|1⟩',
);

const finalState = displayMath(
  'psi sub B es igual a alfa ket cero más beta ket uno',
  '<mrow><mo>|</mo><msub><mi>ψ</mi><mi>B</mi></msub><mo>⟩</mo><mo>=</mo><mi>α</mi><mo>|</mo><mn>0</mn><mo>⟩</mo><mo>+</mo><mi>β</mi><mo>|</mo><mn>1</mn><mo>⟩</mo></mrow>',
  '|ψ<sub>B</sub>⟩ = α|0⟩ + β|1⟩',
);

export const mathTabTemplate = `
  <section id="math-panel" class="study-panel math-panel" role="tabpanel" aria-labelledby="math-tab" tabindex="0" hidden>
    <h2 id="math-title">Matemáticas</h2>

    <div class="math-introduction">
      <p class="math-lead"><strong>La teleportación cuántica permite transferir el estado de un qubit a otro que está lejos, sin tener que conocer ese estado.</strong></p>

      <p>En la analogía, la nieta tiene algo que comunicarle a la abuela sobre su estado actual. En computación cuántica, esto corresponde a tener un qubit en un estado concreto, con sus respectivas amplitudes y fases. Este estado se representa matemáticamente como:</p>
      ${qubitState}

      <p>Los símbolos ${zeroKet} y ${oneKet} representan los dos estados base del qubit. Las amplitudes α y β indican cómo participa cada componente en la superposición e incluyen información sobre sus fases.</p>

      <details class="math-note">
        <summary>Amplitud</summary>
        <p>Es un número asociado a cada componente del estado. Su magnitud al cuadrado determina la probabilidad de obtener esa componente al medir:</p>
        ${probabilityEquations}
        <p>Estas probabilidades se calculan mediante la <strong>regla de Born</strong> y suman 1:</p>
        ${normalizationEquation}
      </details>

      <details class="math-note">
        <summary>Fase</summary>
        <p>Es un ángulo que indica la orientación de una amplitud, como la dirección hacia la que apunta una flecha. La diferencia de fase entre las componentes influye en cómo se refuerzan o cancelan durante las operaciones cuánticas.</p>
      </details>

      <p>La nieta busca transferir el estado completo, con sus amplitudes y su fase relativa, para que la abuela termine con ese mismo estado en su propio qubit.</p>

      <p>El problema es que, al medir directamente el qubit en la base 0 y 1, se obtiene solamente uno de esos resultados y el qubit queda en el estado correspondiente. <strong>Ese resultado no describe la superposición anterior</strong>, por lo que la abuela no puede reconstruir el estado original.</p>

      <details class="math-note math-example">
        <summary>Ejemplo: misma probabilidad, distinta fase</summary>
        <p>Los siguientes estados tienen las mismas probabilidades, pero distinta fase:</p>
        ${phaseExample}
        <p>Ambos producen 0 o 1 con un 50 % de probabilidad. Conocer esas probabilidades no permite distinguirlos, porque falta la información de fase, que influye en las operaciones posteriores.</p>
      </details>

      <p>La teleportación cuántica permite resolver este problema mediante tres qubits:</p>
      <ul>
        <li><strong>Q:</strong> el qubit original de la nieta, con el estado ${psi}.</li>
        <li><strong>A:</strong> un qubit auxiliar de la nieta.</li>
        <li><strong>B:</strong> el qubit de la abuela, donde se busca recuperar el estado.</li>
      </ul>

      <p>El procedimiento se organiza en cinco pasos, siguiendo el recorrido de la carta de la analogía.</p>
    </div>

    <article class="math-step">
      <p class="step-number">Paso 1</p>
      <h3>Conexión del hilo rojo <span aria-hidden="true">→</span> Entrelazamiento</h3>

      <h4>Qué se necesita</h4>
      <p>En la analogía, el hilo rojo representa una conexión previa entre la nieta y la abuela. En computación cuántica, esta conexión corresponde a un recurso cuántico compartido, necesario para transferir el estado. Este recurso se obtiene entrelazando A y B.</p>

      <h4>Cómo se prepara</h4>
      <p>Ambos qubits comienzan en 0. Primero se aplica Hadamard a A.</p>

      <details class="math-note">
        <summary>Puerta Hadamard, H</summary>
        <p>Transforma los estados base en superposiciones:</p>
        ${hadamardEquations}
        <p>En este paso se utiliza la primera transformación, porque A comienza en 0.</p>
      </details>

      <p>Después se aplica CNOT de A hacia B, utilizando A como control y B como objetivo.</p>

      <details class="math-note">
        <summary>Puerta CNOT</summary>
        <p>Invierte el objetivo cuando el control vale 1. No mide el control, sino que actúa sobre las componentes de la superposición.</p>
        <p>El primer lugar representa el control y el segundo, el objetivo:</p>
        ${cnotMapping}
      </details>

      <h4>Cómo quedan A y B</h4>
      <p>Los qubits quedan en el siguiente estado conjunto:</p>
      ${bellState}

      <details class="math-note">
        <summary>Significado de 00 y 11</summary>
        <p>El primer lugar corresponde a A y el segundo a B:</p>
        <ul>
          <li><strong>00:</strong> ambos corresponden a 0.</li>
          <li><strong>11:</strong> ambos corresponden a 1.</li>
        </ul>
        <p>Estas son las dos componentes del estado compartido. Cada una tiene amplitud 1/√2. Por tanto, si ambos qubits se miden en este momento, se obtiene 00 o 11 con un 50 % de probabilidad cada uno.</p>
        <p>Antes de medir, el par se encuentra en esa superposición. No tiene uno de esos resultados simplemente oculto.</p>
      </details>

      <details class="math-note">
        <summary>Entrelazamiento</summary>
        <p>A y B tienen un estado conjunto que no puede separarse en dos estados independientes. Los qubits pueden estar físicamente lejos, pero esta relación no permite enviar mensajes instantáneos.</p>
      </details>

      <h4>Conexión con el siguiente paso</h4>
      <p>La nieta conserva A y la abuela recibe B. Como ocurre con el hilo rojo, ya existe una conexión previa.</p>
      <p>Ahora falta incorporar el estado de Q. En la analogía, este estado corresponde al contenido de la carta que describe el estado actual de la nieta y que se busca hacer llegar completo a la abuela.</p>
    </article>

    <article class="math-step">
      <p class="step-number">Paso 2</p>
      <h3>Preparar los borradores <span aria-hidden="true">→</span> Incorporar Q y preparar la medición</h3>

      <h4>Por qué se incorpora Q</h4>
      <p>Hasta este momento, A y B están entrelazados, pero Q todavía no ha interactuado con ellos. La conexión está preparada, mientras que el estado que se busca transferir permanece separado de ella.</p>
      <p>Como en la analogía, disponer del hilo rojo no significa que la carta ya esté preparada.</p>
      <p>Para utilizar esa conexión, Q debe interactuar con A, que es la parte del recurso compartido que tiene la nieta. Esto se realiza mediante una CNOT de Q hacia A.</p>

      <h4>Qué hace esta CNOT</h4>
      <p>Q se utiliza como control y A como objetivo. La CNOT deja el objetivo igual cuando el control es 0 y lo invierte cuando es 1. Por tanto:</p>
      <ul>
        <li><strong>En la parte ${alphaZero}:</strong> el control es 0, por lo que A queda igual.</li>
        <li><strong>En la parte ${betaOne}:</strong> el control es 1, por lo que A se invierte: cambia 0 por 1 o 1 por 0.</li>
      </ul>
      <p>Así, A cambia de una manera que depende del qubit original. Como A ya estaba entrelazado con B, esta interacción incorpora Q al recurso que permite realizar la transferencia.</p>

      <h4>Por qué todavía no se mide Q</h4>
      <p>El estado que se busca transferir es:</p>
      ${qubitState}
      <p>Este estado contiene las amplitudes y la fase relativa que la abuela debe recuperar.</p>
      <p>La CNOT de Q hacia A permite relacionar el qubit original con el recurso compartido. Para ello, utiliza Q como control y modifica A.</p>
      <p>Sin embargo, <strong>esta operación todavía no resuelve el problema de medir directamente Q</strong>. Si se mide en este momento, se obtiene 0 o 1 y Q queda en:</p>
      ${measuredBasisStates}
      <p>Ese resultado no conserva la superposición original ni permite conocer sus amplitudes y su fase relativa. Además, en este punto del circuito, la medición elimina la relación entre las dos partes originales que se necesita para recuperar el estado completo en B.</p>
      <p><strong>Por eso se aplica Hadamard antes de medir:</strong> falta preparar el sistema para que la medición entregue instrucciones de corrección y permita recuperar el estado completo en el qubit de la abuela.</p>

      <h4>Dónde se aplica Hadamard</h4>
      <p>Primero conviene distinguir dos estados:</p>
      <ul>
        <li><strong>El estado que se quiere transferir está inicialmente en Q.</strong></li>
      </ul>
      ${qubitState}
      <ul>
        <li><strong>El recurso compartido está inicialmente en A y B.</strong></li>
      </ul>
      ${bellState}
      <p>En este paso, <strong>Hadamard se aplica a Q</strong>, después de que la CNOT lo haya relacionado con A. No se aplica directamente al par A–B.</p>

      <h4>Qué debe conservarse</h4>
      <p>La nieta mide Q, pero el estado completo debe quedar en B. Son qubits distintos: <strong>que Q termine en 0 no significa que B también deba terminar en 0</strong>.</p>
      <p>Para explicar la diferencia, se considera el caso en que el auxiliar A da 0:</p>
      <ul>
        <li><strong>Antes de Hadamard:</strong> Q y B tienen sus valores relacionados. Si se mide Q y sale 0, B queda en 0. Si sale 1, B queda en 1. B pierde la superposición que se quería transferir.</li>
        <li><strong>Después de Hadamard:</strong> esa relación cambia. Aunque al medir Q salga 0, B puede conservar la superposición completa, con sus amplitudes y su fase relativa.</li>
      </ul>

      <h4>Por qué cambia esa relación</h4>
      <p>Hadamard permite que <strong>el 0 original de Q produzca 0 o 1 al medir</strong>, y que <strong>el 1 original también produzca 0 o 1</strong>.</p>
      <p>Por eso, después de Hadamard, obtener 0 ya no permite distinguir entre el 0 original y el 1 original: <strong>ambas partes del estado pueden producir ese resultado</strong>.</p>

      <h4>Qué ocurre entonces al medir</h4>
      <p>La medición ya no obliga a conservar solamente una de las partes originales. El estado de B puede mantener ambas:</p>
      ${qubitState}
      <p><strong>Q termina en 0, pero B conserva el estado completo.</strong> Esto es posible porque son qubits distintos y las operaciones anteriores prepararon esa relación entre ellos.</p>
      <p>Si Q da 1, también se mantienen ambas partes en B, pero aparece un signo cambiado:</p>
      ${negativePhaseState}
      <p>La abuela puede corregir ese signo después.</p>

      <details class="math-note">
        <summary>Caso A = 0</summary>
        <p>Este ejemplo considera <strong>A = 0</strong>. Lo esencial es que el resultado de medir Q ya no selecciona una sola parte del estado original: B conserva ambas, aunque pueda necesitar una corrección.</p>
      </details>

      <p>La CNOT y Hadamard permiten que la medición produzca las instrucciones necesarias para deshacer un posible intercambio y un posible cambio de fase, sin descubrir las amplitudes y fases originales.</p>

      <h4>Conexión con el siguiente paso</h4>
      <p>Como al preparar los borradores, el sistema queda organizado para obtener un resultado útil. El siguiente paso consiste en medir para determinar qué instrucciones corresponden.</p>
    </article>

    <article class="math-step">
      <p class="step-number">Paso 3</p>
      <h3>Dejar la carta lista <span aria-hidden="true">→</span> Medir y obtener dos bits</h3>

      <h4>Por qué se mide</h4>
      <p>El sistema está preparado, pero la nieta todavía no tiene instrucciones concretas que pueda comunicar. Para obtenerlas, mide Q y A.</p>

      <h4>Por qué aparecen bits clásicos</h4>
      <p>Cada medición devuelve un resultado concreto: 0 o 1. Este resultado puede guardarse y enviarse como un dato ordinario, por lo que se denomina bit clásico.</p>
      <p>Los bits aparecen en este paso porque se necesitan resultados que puedan comunicarse a la abuela. Como se miden dos qubits, se obtienen dos bits: el primero corresponde a Q y el segundo a A.</p>

      <h4>Qué indica cada resultado</h4>
      <p>Gracias a las operaciones anteriores, cada resultado deja en B la siguiente versión normalizada y condicionada del estado original:</p>
      ${measurementOutcomes}

      <details class="math-note">
        <summary>Por qué existen cuatro posibilidades</summary>
        <p>El circuito combina dos posibilidades de posición, con o sin intercambio, y dos de signo, con o sin cambio de fase. La medición selecciona una de las cuatro.</p>
        <p>Estos cambios forman parte del procedimiento, incluso cuando todas las operaciones funcionan correctamente.</p>
      </details>

      <h4>Conexión con el siguiente paso</h4>
      <p>Como al dejar la carta lista, ya existen indicaciones concretas para ordenarla. La nieta conoce los dos bits, pero la abuela todavía no. Por ello, debe enviárselos.</p>
    </article>

    <article class="math-step">
      <p class="step-number">Paso 4</p>
      <h3>Enviar la carta <span aria-hidden="true">→</span> Comunicar los dos bits</h3>

      <h4>Qué se envía</h4>
      <p>La nieta envía los dos bits a la abuela mediante un canal clásico, como una conexión de red.</p>

      <h4>Para qué sirven</h4>
      <p>Estos bits no describen las amplitudes y fases. Indican cuál de las cuatro situaciones ocurrió y qué corrección corresponde.</p>

      <h4>Conexión con el siguiente paso</h4>
      <p>En la analogía, este paso corresponde al envío por correo. Cuando la abuela recibe las instrucciones, puede completar la recuperación del estado.</p>
    </article>

    <article class="math-step">
      <p class="step-number">Paso 5</p>
      <h3>Ordenar las hojas <span aria-hidden="true">→</span> Corregir y recuperar el estado</h3>

      <h4>Cómo se determina si es necesario corregir</h4>
      <p>La carta no siempre necesita reordenarse: algunas veces está bien y otras requiere ajustes. Lo mismo ocurre con el qubit de la abuela.</p>
      <p>Para determinar qué corresponde hacer, la abuela consulta los dos bits recibidos. Si son 00, su qubit ya tiene el estado original y no realiza ningún cambio. Los otros resultados indican qué modificación debe deshacer.</p>
      <p>No necesita medir su qubit para comprobarlo. <strong>Los bits de la nieta indican si debe dejarlo como está o corregirlo.</strong></p>

      <h4>Qué operaciones se utilizan</h4>
      <p>Cuando corresponde corregir, se utilizan las siguientes puertas:</p>

      <details class="math-note">
        <summary>Puerta X</summary>
        <p>Intercambia las componentes:</p>
        ${xGate}
        <p>Un segundo intercambio deshace el anterior.</p>
      </details>

      <details class="math-note">
        <summary>Puerta Z</summary>
        <p>Cambia el signo de la componente 1:</p>
        ${zGate}
        <p>Un segundo cambio de signo deshace el anterior.</p>
      </details>

      <h4>Cómo se aplican las correcciones</h4>
      <p>Si el segundo bit vale 1, la abuela aplica X. Después, si el primero vale 1, aplica Z.</p>
      <p>Por ejemplo, si recibe 01, su qubit tiene las componentes intercambiadas. Al aplicar X:</p>
      ${xCorrection}

      <h4>Resultado final</h4>
      <p>Como al ordenar las hojas, la abuela recupera lo que debía recibir:</p>
      ${finalState}
      <p><strong>La abuela termina con el estado completo sin necesitar conocerlo.</strong> El qubit original de la nieta ya no conserva ese estado y el recurso entrelazado se ha consumido.</p>
    </article>
  </section>
`;
