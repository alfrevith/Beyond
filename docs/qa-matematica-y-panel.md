# Matemática y seguimiento en Mi espacio

## Compatibilidad del banco

Las 100 preguntas originales permanecen en `assets/js/data/math-questions.js` sin cambios. `assets/js/data/math-learning.js` crea un banco enriquecido mediante campos adicionales: IDs MAT-001–100, cuatro áreas, dificultad orientativa, modalidad, pasos, concepto, consejo, etiquetas y retroalimentación para cada opción incorrecta. No reordena ni sustituye enunciados, alternativas, índices correctos ni explicaciones originales. Las cinco preguntas de interpretación también muestran sus datos en tablas o barras.

`scripts/validate-math.cjs` comprueba la huella SHA-256 del banco original serializado antes del cambio (`7b68e49b8d3e48f28e4f92830d809f8f3f01f36d6a075765ce26f63b3a96fe37`). Además compara, pregunta por pregunta, cada campo original con su versión enriquecida. La validación no debe actualizarse silenciosamente si alguien modifica las claves: requiere revisar compatibilidad y migración.

| Área interna | Preguntas |
| --- | ---: |
| Números y proporcionalidad | 24 |
| Álgebra y funciones | 41 |
| Estadística y probabilidad | 15 |
| Geometría y patrones | 20 |

Las 22 guías se conservan. Dificultades y áreas son categorías de aprendizaje de Beyond, sin equivalencia con distribución oficial de AVANZO.

## Guardado antiguo y nuevo

- La práctica conserva `beyond_matematica_v1`. También se leen `avanzo_matematica_v1` y `esen_diagnostico_100_v1`, sin eliminar esas claves.
- Solo la revisión `matematica-1`, cuyo orden y claves originales se comprueban, admite los antiguos estados sin versión. Respuestas, tiempo e índice se normalizan conservando sus valores válidos.
- Antes del primer guardado versionado, se conserva el contenido del estado antiguo en `beyond_matematica_v1_respaldo_original`. Si ya existe, no se reemplaza. No se ofrece un reinicio silencioso del historial ni de otras materias.
- Sesiones, simulacro, repaso e historial usan `beyond_matematica_v1_sesiones`. El historial guarda las respuestas correctas y categorías de su propia revisión.
- Una futura revisión no debe heredar automáticamente respuestas sin versión. Los resultados anteriores siguen consultables; revisar preguntas exige IDs, versión y claves compatibles.
- Si el navegador bloquea el guardado, se conserva el comportamiento de sesión y su aviso. Un error de cuota no puede garantizar un respaldo persistido; no se promete sincronización entre navegadores.

## Sistema de estudio

Las tres materias usan `createLearningQuiz` y `createLearningUI`, manteniendo las funcionalidades de Ciencias y Ciudadanía. En Matemática se selecciona primero y se registra únicamente al pulsar **Confirmar respuesta**. La primera respuesta se conserva. El simulacro es independiente y oculta correcciones, pasos y guías hasta entregar; la revisión del resultado incluye preguntas pendientes y no permite editar el intento. El repaso registra aciertos posteriores por separado. Reiniciar práctica conserva simulacro e historial.

El motor original `quiz.js` permanece para compatibilidad y conserva sus pruebas, pero la interfaz principal de Matemática usa el motor compartido.

## Panel de seguimiento

`assets/js/dashboard.js` calcula un modelo a partir de resúmenes exclusivos de práctica. Leerlo no cambia el contexto de ningún simulacro o repaso.

- Avance sobre las 300 preguntas, aciertos iniciales, precisión ponderada entre respuestas, errores iniciales y pendientes. Sin respuestas se muestra ausencia de precisión, no una calificación de cero.
- Tiempo acumulado de las prácticas actuales y sus repasos. No suma otra vez los tiempos de sus archivos históricos ni los presenta como tiempo de todos los simulacros. Reiniciar práctica reinicia ese tiempo.
- Una propuesta por materia: prioriza temas con errores iniciales; si no hay errores, propone un tema pendiente. Las proporciones siempre se acompañan de conteos. Repasar no sustituye el diagnóstico inicial.
- Accesos a práctica, diagnóstico, guías e historial; continuar práctica busca una pregunta pendiente desde la posición guardada, recorriendo circularmente el banco si es necesario.
- Simulacros pendientes: cantidad respondida y tiempo, sin revelar aciertos. El botón retoma el intento existente.
- Últimos seis resultados guardados entre las tres materias, con fecha, cantidad respondida, puntuación sobre el total y etiqueta de incompleto cuando corresponde. Cada materia conserva hasta 20 resultados.
- Cambio en puntos entre los dos últimos simulacros completos, únicamente si pertenecen a la revisión actual y sus IDs y claves coinciden. Los intentos incompletos y las prácticas no se mezclan con esa comparación.

El panel y sus recomendaciones son orientación interna. No incluyen actividad inventada, metas supuestamente cumplidas, fechas de estudio reconstruidas ni predicciones de nota oficial.

## Archivos

Nuevos: `assets/js/data/math-learning.js`, `assets/js/dashboard.js`, `assets/css/dashboard.css`, `scripts/validate-math.cjs`, `tests/math-learning.test.cjs` y este documento.

Adaptados: `index.html`, `assets/js/data/subjects.js`, `assets/js/storage.js`, `assets/js/science-session.js`, `assets/js/science-ui.js`, `assets/js/app.js`, `scripts/check.cjs`, `tests/quiz.test.cjs`, `tests/science.test.cjs`, `tests/citizenship.test.cjs` y `README.md`.

## Verificación

- `npm run check`: sintaxis, recursos y validación de los tres bancos, incluida la huella del original matemático.
- `npm test`: 38 pruebas aprobadas. Se comprueban migración de las tres claves antiguas, respaldo conservado, versiones futuras, respuestas numéricas independientes, candidatos extraños de radicales, confirmación, primera respuesta inmutable, simulacro, recarga, repaso, historial, separación entre materias y bloqueos de almacenamiento. El panel se prueba sin alterar contextos, sin revelar un simulacro pendiente y sin comparar archivos incompatibles o incompletos.
- Navegador: recorrido de las 100 preguntas matemáticas con 100 IDs únicos y cuatro alternativas. Selección sin registro antes de confirmar, corrección y pasos específicos, persistencia tras recarga, guardado de diagnóstico, repaso desde el panel, simulacro independiente, reanudación desde Mi espacio, entrega y revisión de preguntas pendientes en modo de solo lectura.
- 54 comprobaciones responsive: siete pantallas a 320, 390, 540, 768, 1024 y 1440 px (Mi espacio, portada/práctica/resultados/historial de Matemática y prácticas de Ciencias/Ciudadanía), más barras y tabla de frecuencias matemáticas a esos mismos seis anchos. Sin desbordamiento horizontal de la página en esas vistas.

La emulación se realiza en Chromium integrado y no sustituye pruebas en dispositivos físicos ni una revisión del alineamiento curricular oficial.
