# Teletransportación cuántica

**Proyecto web educativo nativo orientado a Qollab, con el ejemplo de teletransportación del equipo en Qiskit.**

[Interfaz](#interfaz) · [Ejecución](#ejecución) · [Resultados](#resultados) · [Comprobaciones](#comprobaciones) · [Limitaciones](#limitaciones) · [Atribución](#atribución)

> This effort is supported by Qollab & IonQ.

## Estado del proyecto

El proyecto quedó como un prototipo en desarrollo. Por falta de tiempo, no se alcanzó a revisar todo el código ni a integrar todo como se esperaba. Quedan mejoras y pruebas pendientes, pero el proceso sirvió al equipo para estudiar el algoritmo y acercarse a la computación cuántica.

## Desarrollo y aprendizaje

Se adaptaron apuntes y ejemplos de código previos de parte del equipo para organizar un recorrido que conectara la explicación conceptual, la analogía, las matemáticas y el código del algoritmo de teleportación. La explicación matemática se trabajó mediante iteraciones con apoyo de IA.

El desarrollo comenzó con Spec-Driven Development (SDD) e ingeniería de software agéntica, usando requisitos funcionales y especificaciones para orientar el trabajo con Codex y Claude mediante OpenCode. Después, por el tiempo disponible de los integrantes, se aceleró el trabajo con prompts directos y no se alcanzó a revisar todo el código generado.

Aunque ya se tenía un ejemplo sencillo en Qiskit, al adaptarlo e integrarlo en la página quedaron cambios que no eran los esperados, como partes del contenido en inglés, y la integración no se completó correctamente. Las adaptaciones para Qollab e IonQ también quedaron con pruebas pendientes.

Más que nada, fue una instancia de estudio del algoritmo y de conceptos de computación cuántica. Aunque el resultado no quedó tan pulido como se esperaba, el proceso sirvió al equipo para aprender y tener un acercamiento a esta disciplina.

## Vista previa local

Desde la carpeta del proyecto:

```python
python3 -m http.server 8000
```

Abrir `http://localhost:8000`. Esto permite consultar la interfaz educativa; no ejecuta el componente Python desde la página.

## Interfaz

Una página extensa presenta el contexto y la analogía del equipo, seguida de un panel de estudio con la paleta Catppuccin Mocha y las pestañas Example, Math y Code. Example está seleccionada inicialmente. Se conserva la narrativa existente en español escrita por el equipo; las explicaciones y el código fuente del notebook recién integrado están en inglés.

La pestaña Code presenta siete bloques verticales con la secuencia explicación → código fuente Python ejecutado → salida de texto → figura. No hay editor de celdas, ejecución por celda ni navegador de pasos. Las pestañas y los enlaces a las secciones no ejecutan Python ni descartan los resultados.

## Limitaciones

Se entrega el avance conseguido durante el hackathon como un prototipo en desarrollo. Quedan pendientes la revisión del código y del contenido educativo, mejoras de estructura y mantenibilidad, correcciones de integración y pruebas en Qollab e IonQ.

## Licencia y atribución

El código del equipo se distribuye bajo la licencia MIT. 
