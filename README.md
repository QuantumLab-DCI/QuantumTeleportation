<div align="center">
  <h1>Teletransportación cuántica</h1>
  <p><strong>Un proyecto web educativo y nativo para explorar la teletransportación cuántica en Qollab.</strong></p>
  <p>
    <a href="https://qollab.xyz/"><img src="https://img.shields.io/badge/Qollab-Ejecuci%C3%B3n-89b4fa.svg?style=for-the-badge" alt="Qollab como plataforma de ejecución"></a>
    <a href="https://qiskit.org/"><img src="https://img.shields.io/badge/Qiskit-2.5.2%20a%20%3C3.0-6929C4.svg?style=for-the-badge&logo=qiskit&logoColor=white" alt="Qiskit 2.5.2 hasta una versión anterior a 3.0"></a>
    <a href="https://www.python.org/"><img src="https://img.shields.io/badge/Python-Runtime%20de%20Qollab-3776AB.svg?style=for-the-badge&logo=python&logoColor=white" alt="Python en el entorno de ejecución de Qollab"></a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"><img src="https://img.shields.io/badge/JavaScript-Nativo-F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript nativo"></a>
  </p>
  <p>
    <a href="#contexto">Contexto</a> ·
    <a href="#interfaz">Interfaz</a> ·
    <a href="#arquitectura">Arquitectura</a> ·
    <a href="#ejecución">Ejecución</a> ·
    <a href="#salidas">Salidas</a> ·
    <a href="#límites-actuales">Límites</a>
  </p>
</div>

> **Estado:** Esqueleto educativo<br>
> **Ejecución:** Integración con Qollab e IonQ aún no verificada<br>
> **Apoyo:** This effort is supported by Qollab & IonQ.

Un esqueleto web educativo y nativo para explorar la teletransportación cuántica en Qollab. Mantiene deliberadamente como pendientes la narrativa del equipo, las matemáticas, la adaptación del cuaderno, el estado de entrada fijo y la cantidad de ejecuciones.

This effort is supported by Qollab & IonQ.

---

### Contexto

La página introduce la transmisión clásica, el desafío de la copia y la medición cuánticas, y la teletransportación antes de presentar las vistas Ejemplo, Matemáticas y Código. Las cinco etiquetas de la analogía son solo una estructura inicial; el equipo aportará la explicación y sus límites.

---

### Interfaz

- Una página con desplazamiento vertical y enlaces a sus secciones.
- Un cuadro de estudio con tres pestañas de colores: Ejemplo, Matemáticas y Código.
- Colores Catppuccin Mocha y CSS nativo adaptable.
- Marcadores verticales para explicación → código → salida.
- Un estado de ejecución `Pendiente` visible; ningún marcador se presenta como un resultado calculado.

---

### Arquitectura

Las plantillas estáticas se encuentran en `frontend/`. `main.js` las monta y controla las interacciones del navegador. `backend/teleportation.py` define el futuro límite de ejecución con Qollab. Consulta [la arquitectura](docs/architecture.md) y [la guía de desarrollo](docs/development.md).

---

### Ejecución

Para obtener una vista previa local de la interfaz, ejecuta:

```bash
python3 -m http.server 8000
```

Después, abre <http://localhost:8000>. Esta vista previa no ejecuta Qiskit.

En Qollab, carga el proyecto, selecciona un backend y presiona **Ejecutar**. La ejecución cuántica seguirá pendiente hasta que se añada el circuito del cuaderno.

---

### Salidas

La vista Código reserva contenedores de texto para la preparación del estado, el entrelazamiento y la ejecución. Una futura llamada correcta a `run_teleportation(backend)` devolverá esas tres salidas de texto en un diccionario simple. Hasta entonces, todos los contenedores permanecerán como `Pendiente`.

---

### Límites actuales

- No se incluyen la narrativa educativa original, las ecuaciones, la correspondencia de la analogía ni los fragmentos del cuaderno.
- El trabajo cuántico no se envía deliberadamente y no se fabrica ningún resultado.
- El comportamiento del puente de Qollab, la visibilidad de fallos controlados y la ejecución en el simulador local y en IonQ **no están verificados para este proyecto**.
- La compatibilidad de los circuitos dinámicos con el backend de IonQ seleccionado requiere una prueba explícita en la plataforma.
- Los resultados de aprendizaje requieren una revisión humana después de que el equipo añada el contenido educativo.

---

### Dependencias y atribución

- Python: `qiskit>=2.5.2,<3.0.0`, según lo exige la especificación del proyecto y el intervalo documentado del entorno de ejecución de Qollab.
- Navegador: CSS de [KaTeX 0.16.22](https://katex.org/) distribuido por [jsDelivr](https://www.jsdelivr.com/) para el marcado de ecuaciones generado en el servidor.
- Paleta: [Catppuccin Mocha](https://github.com/catppuccin/catppuccin).
- Asistencia de desarrollo: se utilizaron OpenCode y desarrollo asistido por IA para crear este esqueleto; el material del cuaderno creado por el equipo sigue pendiente.

---

### Licencia

Distribuido bajo la [licencia MIT](LICENSE).
