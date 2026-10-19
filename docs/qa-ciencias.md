# Revisión de Ciencias Naturales

Integración sobre Beyond sin reemplazar el motor ni el banco de Matemática.

## Verificación automatizada

```sh
npm run check
npm test
```

- Banco de 100 preguntas: 30 Física, 25 Química, 25 Biología y 20 Ecología, Tierra y Medio Ambiente.
- 14 subtemas y rangos FIS-001…030, QUI-001…025, BIO-001…025 y ECO-001…020.
- 30 básicas, 45 intermedias y 25 avanzadas; modalidades 25/25/20/15/15.
- 25 claves A, 25 B, 25 C y 25 D; cuatro alternativas diferentes por pregunta.
- Explicación, concepto, consejo, etiquetas y retroalimentación diferente para cada distractor.
- Procedimientos y fórmulas; resultados independientes para las 15 preguntas de cálculo.
- Conservación de átomos en ecuaciones que incluyen estructura verificable.
- Validación de recursos, guías, duplicados y alta similitud de enunciados.
- Pruebas negativas: se rechazan identificadores repetidos, explicaciones ausentes, resultados alterados y ecuaciones desbalanceadas.
- Independencia de Matemática, práctica, simulacro y repaso; persistencia, datos corruptos, historial y cambios de banco.

## Revisión manual en navegador

- Lobby: dos materias disponibles; Ciudadanía y valores sigue reservada.
- Portada de Ciencias: accesos a práctica, mezcla, cuatro áreas, 14 guías, simulacro, referencias e historial.
- Práctica: seleccionar no registra ni revela todavía; confirmar bloquea cambios y muestra la explicación del distractor elegido.
- Dos distractores del mismo ejercicio muestran explicaciones diferentes.
- Repaso: conserva la respuesta inicial y cuenta aparte los aciertos posteriores.
- Simulacro: sin corrección, marcas de acierto, guías de pregunta ni pistas durante el intento; la recarga conserva la respuesta confirmada.
- Entrega incompleta con confirmación; se muestra el resultado y se registra el intento.
- Recarga de un resultado por su enlace de historial; revisión de las 100 preguntas, incluidas las pendientes, sin modificar respuestas.
- Recorrido de las 100 preguntas renderizadas: cuatro opciones, una clave visual y explicación disponible en la revisión, sin texto `undefined` ni errores de consola.
- Recursos representativos: gráfica velocidad-tiempo, tablas, circuito en serie y cuadros de Punnett con solución posterior.
- Matemática: entrada, cuatro opciones, cambio al tema Fracciones y diagnóstico siguen funcionando.
- 48 combinaciones: ocho vistas de Ciencias, Matemática y lobby en anchos de 320, 390, 540, 768, 1024 y 1440 px. Sin desbordamiento horizontal de la página; tablas anchas con desplazamiento interno.

La revisión se hizo con el navegador disponible en el entorno de desarrollo. No equivale a pruebas en todos los navegadores o dispositivos físicos ni certifica equivalencia con la prueba oficial AVANZO.
