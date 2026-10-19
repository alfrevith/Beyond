# Simulacros personalizados · 18 de octubre de 2026

Las tres materias comparten el mismo selector: 10, 15, 20…100 preguntas u **Otra cantidad**, con un entero entre 1 y 100. La opción inicial es 20; después se muestra el tamaño del último intento. La interfaz presenta un selector, el campo opcional y un botón para comenzar o continuar.

## Selección, corrección y registros

- Fisher–Yates mezcla los índices del banco; se toman las primeras N preguntas. También se mezcla el intento de 100. No hay repeticiones dentro del intento ni cambios en alternativas o claves.
- La selección, posición, respuestas confirmadas y tiempo se guardan. Una recarga conserva el intento; un simulacro pendiente se retoma antes de preparar otro.
- La práctica sigue usando el banco completo y su guardado independiente. Iniciar o entregar un simulacro no cambia sus respuestas.
- La navegación muestra 1…N y mantiene internamente el identificador original. Antes de entregar se ocultan correcciones y explicaciones. Se admite entrega incompleta con confirmación.
- Puntuación, pendientes, precisión, áreas, temas y revisión usan las N preguntas seleccionadas. Los temas ausentes no se consideran evaluados. Una muestra corta no recibe una clasificación de dominio global.
- El historial conserva los últimos 20 resultados de cada materia. Cada archivo lleva sus propias preguntas, claves y respuestas. La revisión y el repaso de errores buscan los identificadores originales; el repaso conserva el diagnóstico inicial.
- Mi espacio muestra el último simulacro con su tamaño real, cuántas preguntas se respondieron y hasta dos temas con errores que reforzar. El resumen de práctica sigue siendo independiente. Las tendencias generales comparan solo simulacros de 100 preguntas completamente respondidos y compatibles.

## Compatibilidad

Se mantienen claves de almacenamiento y versiones de contenido. Los simulacros e historiales anteriores de 100 preguntas siguen funcionando. Los registros cortos almacenan únicamente las preguntas seleccionadas en su archivo, mientras que el intento activo conserva índices del banco para mantener la correspondencia de respuestas. Se validan tamaños, índices únicos, alternativas y pertenencia a la selección; un dato inválido no se interpreta como respuesta de otra pregunta.

Los bancos originales de Matemática, Ciencias y Ciudadanía no se modificaron. La compatibilidad de archivos exige versión, identificadores y claves coincidentes, con independencia del orden aleatorio. El resumen histórico puede consultarse con sus claves guardadas aunque la revisión de preguntas ya no sea compatible.

## Verificación

`npm run check` valida sintaxis y los tres bancos. `npm test` ejecuta 52 pruebas, incluidas las de simulacros personalizados: cantidades predefinidas y libres, mezcla, unicidad, claves intactas, corrección parcial, separación de sesiones, recargas, archivos antiguos, historial compacto, revisión por identificador, repaso, almacenamiento bloqueado, formularios y resúmenes del panel.

En el navegador se realizaron intentos de Matemática de 10 preguntas, Ciencias de 15 y Ciudadanía de 25; se verificaron confirmación, entrega incompleta, resultados, historial y temas del último intento. En Matemática también se inició un intento de 23 usando el campo libre y Enter; 101 se rechazó sin crear un intento. La recarga conservó preguntas y orden del intento de 10, y su revisión histórica mantuvo sus diez preguntas y respuestas.

Se comprobaron 54 combinaciones: nueve vistas en anchos de 320, 390, 540, 768, 1024 y 1440 px. Incluyen portadas de las tres materias, simulacro, historial, lobby y resultados cortos de las tres materias. No hubo desbordamiento horizontal ni imágenes rotas. Se inspeccionó visualmente el selector en PC y celular. Estas comprobaciones no sustituyen pruebas en dispositivos físicos y otros navegadores.

## Archivos principales

- `assets/js/science-session.js`: selección aleatoria, alcance de resultados, persistencia e historial.
- `assets/js/science-ui.js` y `assets/css/science.css`: selector, validación, navegación y resultados adaptables.
- `assets/js/dashboard.js` y `assets/css/dashboard.css`: seguimiento del último simulacro y tamaños reales.
- `tests/custom-exams.test.cjs`: pruebas del sistema compartido; las pruebas anteriores ahora seleccionan explícitamente una pregunta cuando necesitan verificar su contenido, puesto que el simulacro se mezcla.

Las revisiones anteriores documentan etapas previas del proyecto; este documento actualiza el comportamiento de los simulacros en las tres materias.
