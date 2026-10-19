# Beyond

**Un esfuerzo para mañana.**

Aplicación estática de estudio en español para PC y celular. Incluye Matemática, Ciencias Naturales y Ciudadanía y valores disponibles, con 300 ejercicios en total.

## Abrir el proyecto

Abre `index.html` en un navegador. No necesita instalación, servicios externos ni compilación. Para desarrollo se recomienda usar siempre la misma dirección local:

```sh
npm run dev
```

Abre la dirección que imprime el servidor: `http://127.0.0.1:4173`.

`index.html` es la única entrada de la aplicación. Las preguntas y la lógica viven en `assets/`. La identidad visual usa el logo proporcionado, una paleta oscura y acentos cálidos.

## Organización

```text
index.html                         Entrada principal y estructura accesible
assets/
  css/styles.css                   Diseño y adaptación a distintos tamaños
  css/science.css                  Componentes compartidos de Ciencias y Ciudadanía
  images/beyond-logo.png            Logo e icono del navegador
  js/
    data/math-questions.js         100 preguntas originales, intactas
    data/math-guides.js            22 guías: concepto, regla, ejemplo y consejo
    data/science-bank.js           Constructor compartido y respuestas reproducibles
    data/science-physics.js        Física: 30 preguntas
    data/science-chemistry.js      Química: 25 preguntas
    data/science-biology.js        Biología: 25 preguntas
    data/science-ecology.js        Ecología, Tierra y Medio Ambiente: 20 preguntas
    data/science-guides.js         14 guías científicas y referencias
    data/citizenship-bank.js       Banco, versión y referencias de Ciudadanía
    data/citizenship-social.js     Investigación social: 15 preguntas
    data/citizenship-history.js    Historia: 25 preguntas
    data/citizenship-civic.js      Democracia y derechos humanos: 25 preguntas
    data/citizenship-global.js     Globalización: 15 preguntas
    data/citizenship-environment.js Ambiente y población: 20 preguntas
    data/citizenship-guides.js     14 guías sociales
    data/subjects.js               Registro de materias y disponibilidad
    storage.js                    Guardado, validación y lectura de progreso anterior
    quiz.js                       Motor de preguntas, estadísticas y repaso
    science-session.js            Motor compartido de práctica, simulacro, repaso e historial
    science-ui.js                 Interfaz compartida, fuentes y recursos HTML/SVG
    app.js                        Navegación e interfaz
scripts/                           Servidor, recursos y validadores de Ciencias y Ciudadanía
tests/                             Pruebas del banco, progreso y motor
```

## Funciones

- Lobby con tres materias y disponibilidad explícita.
- Guías rápidas por tema y práctica de un tema o del banco completo.
- Explicación inmediata en aciertos y errores, con ayudas durante el ejercicio.
- Primera respuesta conservada para el diagnóstico; repaso de errores independiente.
- Resultados por tema y recomendaciones basadas en errores realmente respondidos.
- Tiempo de estudio sin límite; se pausa al salir de la práctica o al ocultar la pestaña.
- Guardado local de respuestas, posición y tiempo. Reinicio con confirmación.
- Navegación por teclado, foco visible y menú de preguntas plegable en celular.

El almacenamiento pertenece al navegador y al origen. Cambiar de navegador, usar modo privado, borrar datos o pasar de `file://` al servidor local puede dar lugar a un progreso distinto. Las claves actuales usan el prefijo `beyond_`; se recuperan también los progresos de versiones anteriores cuando son accesibles desde el mismo origen, sin borrar esos registros.

## Ciencias Naturales

Las 100 preguntas originales incluyen identificador estable, área, subtema, dificultad, modalidad, cuatro alternativas, clave, explicación, concepto, consejo y etiquetas. Cada distractor tiene una explicación específica. Los cálculos incluyen procedimiento, fórmula y significado de variables cuando corresponde. Las posiciones correctas se distribuyen en 25 A, 25 B, 25 C y 25 D con un orden fijo mezclado; no cambian entre recargas.

| Distribución | Cantidades |
| --- | --- |
| Áreas | Física 30; Química 25; Biología 25; Ecología, Tierra y Medio Ambiente 20 |
| Dificultades | Básicas 30; intermedias 45; avanzadas 25 |
| Modalidades | Conceptuales 25; aplicación 25; casos 20; cálculos 15; datos 15 |

La práctica permite filtrar por área y tema, mezclar preguntas, confirmar la selección, leer la explicación y repasar errores. La primera respuesta permanece registrada. Los aciertos posteriores del repaso se cuentan aparte.

El simulacro usa un intento independiente de 100 preguntas, sin límite de tiempo ni pistas. Las respuestas confirmadas son definitivas y se ocultan las correcciones, estadísticas de aciertos y explicaciones hasta entregar. Puede entregarse incompleto con confirmación; las pendientes no cuentan como aciertos. La revisión posterior incluye las 100 preguntas, también las no respondidas.

Se guarda el simulacro en curso y, al entregar, su resultado. La práctica se archiva al completar las 100 preguntas o mediante **Guardar este resultado**. El historial conserva los últimos 20 resultados y permite volver a su diagnóstico y a sus preguntas. Reiniciar la práctica no borra Matemática, el historial ni el simulacro.

Las tablas, gráfica de movimiento, circuitos, red trófica y dos cuadros de Punnett son HTML/SVG locales. Los cuadros resueltos aparecen después de la corrección. Las tablas anchas tienen desplazamiento propio en celular.

Los resultados comparan cuatro áreas y 14 subtemas. Las recomendaciones se basan en errores del intento seleccionado. Los porcentajes entre respondidas se distinguen de la puntuación sobre 100; las áreas y temas incompletos no reciben una clasificación definitiva. La escala 0–39, 40–59, 60–74, 75–89 y 90–100 es una orientación interna.

### Persistencia y versiones del banco

- Práctica: `beyond_ciencias_v1`; sesiones, simulacro e historial: `beyond_ciencias_v1_sesiones`.
- `scienceBankVersion` identifica la revisión de contenido. Al cambiar enunciados, opciones, claves u orden del banco, aumenta esa versión.
- No se reinterpretan respuestas de un banco incompatible: se inicia una práctica nueva y se descarta un simulacro incompatible en curso. Los resultados archivados conservan sus claves y categorías para consultar el resumen.
- La revisión de preguntas de un resultado archivado exige una versión y claves compatibles. Un archivo anterior no recibe explicaciones de otra revisión del banco.
- La persistencia maneja datos inválidos y almacenamiento bloqueado; en este último caso se puede estudiar durante la sesión y la interfaz avisa de la limitación.

## Ciudadanía y valores

100 preguntas originales y 14 guías, integradas en el mismo sistema avanzado de Ciencias: práctica con confirmación y retroalimentación por alternativa, simulacro sin pistas hasta entregar, repaso con mejoras separadas, diagnóstico por área y tema e historial de los últimos 20 resultados.

| Área | Preguntas |
| --- | ---: |
| Ciencias Sociales e Investigación | 15 |
| Historia de El Salvador y Centroamérica | 25 |
| Democracia, Estado de Derecho y Derechos Humanos | 25 |
| Globalización, Economía y Tecnología | 15 |
| Medio Ambiente, Población y Urbanización | 20 |

Dificultad: **30 básicas, 45 intermedias y 25 avanzadas**. Modalidades: **15 conceptuales, 25 casos, 25 fuentes/textos, 20 relaciones y 15 datos**. Claves: **25 A, 25 B, 25 C y 25 D**, estables entre recargas.

Los textos y noticias simuladas están identificados como redacción didáctica original. Las tablas y gráficas usan datos simulados; los mapas son esquemas ficticios y presentan tabla equivalente y leyenda. Una caricatura original neutral permite contrastar una invitación a participar con una barrera real al buzón de propuestas. Los recursos se generan localmente, sin descargar imágenes ni depender de servicios externos. Las referencias por pregunta aparecen con la explicación, después de corregir.

Guardado propio: `beyond_ciudadania_v1` y `beyond_ciudadania_v1_sesiones`. Versión: `citizenshipBankVersion`. Cambiar contenido, opciones, claves u orden requiere aumentarla, igual que en Ciencias. Reiniciar su práctica conserva su simulacro e historial y las otras materias. El lobby muestra siempre el avance de práctica, aunque se haya consultado otro intento.

El motor `createLearningQuiz` y la interfaz `createLearningUI` usan el registro de materias. Permanecen en los archivos `science-session.js` y `science-ui.js` y mantienen sus alias originales para compatibilidad. Los componentes CSS también se comparten; no hay una copia del sistema para Ciudadanía.

Consulta [la revisión de contenido, fuentes y pruebas de Ciudadanía](docs/qa-ciudadania.md).

## Verificación

Requiere Node.js 18 o superior, sin dependencias:

```sh
npm run check
npm test
```

La revisión en navegador cubrió el lobby, la portada de Matemática, las preguntas y los resultados en anchos de 320, 390, 540, 768, 1024 y 1440 px, sin desbordamiento horizontal de la página. También se probaron respuestas, explicaciones, filtros, repaso, recomendaciones, recarga y confirmación de reinicio. Esto no sustituye pruebas en dispositivos físicos y otros navegadores.

`npm run check` ejecuta también `scripts/validate-science.cjs`: verifica las 100 preguntas, rangos de identificadores, 14 subtemas, distribuciones exactas, alternativas, explicaciones específicas, metadatos, guías, recursos de datos, duplicados y alta similitud textual. Recalcula la aritmética de problemas numéricos y cuenta átomos de las ecuaciones registradas para verificación. Las pruebas independientes comparan además las claves de las 15 preguntas de cálculo con resultados esperados y ejercitan la separación de sesiones, el ocultamiento del simulacro, las recargas, el historial y la compatibilidad de versiones.

El validador de Ciudadanía comprueba también rangos de IDs, cobertura de contenidos, recursos coherentes, referencias conocidas, guías, distribución de claves y duplicados. Las pruebas ejercitan la separación de las tres materias, guardado y recarga, simulacro, repaso, historial, versiones y renderizado de las 100 preguntas. La revisión visual específica se documenta en `docs/qa-ciudadania.md`.

Estas verificaciones automáticas detectan fallos de estructura y operaciones; no sustituyen una revisión pedagógica, histórica o normativa de contenido nuevo.

## Alcance del contenido

Las 100 preguntas de Matemática se conservaron del diagnóstico original y todavía requieren revisar su alineación con el temario oficial de AVANZO. Las 100 preguntas de Ciencias siguen el alcance y distribución solicitados para esta plataforma; no se presentan como oficiales ni como una reproducción de la distribución real de AVANZO. Ciudadanía y valores sigue las competencias y distribución solicitadas por el usuario, con contenido original y referencias oficiales para contexto; tampoco representa una prueba oficial.

Los casos ambientales con cifras son hipotéticos. La referencia regional sobre subducción de Cocos y Caribe se contrastó con [USGS](https://www.usgs.gov/publications/seismicity-and-tectonics-el-salvador). Los conceptos se apoyan, entre otras fuentes, en [Newton — OpenStax](https://openstax.org/books/college-physics-2e/pages/4-3-newtons-second-law-of-motion-concept-of-a-system), [estequiometría — OpenStax](https://openstax.org/books/chemistry-2e/pages/4-3-reaction-stoichiometry), [herencia — OpenStax](https://openstax.org/books/biology-2e/pages/12-3-laws-of-inheritance) y [ciclos biogeoquímicos — OpenStax](https://openstax.org/books/biology-2e/pages/46-3-biogeochemical-cycles). Las guías ofrecen los enlaces para ampliar el estudio.
