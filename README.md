# AVANZO · Mi espacio de estudio

Aplicación estática de estudio en español para PC y celular. Incluye un lobby con Matemática disponible y espacios reservados para Ciencias y Ciudadanía y valores.

## Abrir el proyecto

Abre `index.html` en un navegador. No necesita instalación, servicios externos ni compilación. Para desarrollo se recomienda usar siempre la misma dirección local:

```sh
npm run dev
```

Abre la dirección que imprime el servidor: `http://127.0.0.1:4173`.

La entrada anterior `diagnostico_esen_100_preguntas.html` también abre la aplicación. Ambos HTML contienen únicamente la estructura compartida; las preguntas y la lógica viven en `assets/`. Mantén las dos entradas iguales si cambias esa estructura.

## Organización

```text
index.html                         Entrada principal y estructura accesible
diagnostico_esen_100_preguntas.html Entrada anterior compatible
assets/
  css/styles.css                   Diseño y adaptación a distintos tamaños
  favicon.svg                      Identidad visual
  js/
    data/math-questions.js         100 preguntas originales, intactas
    data/math-guides.js            22 guías: concepto, regla, ejemplo y consejo
    data/subjects.js               Registro de materias y disponibilidad
    storage.js                    Guardado, validación y lectura de progreso anterior
    quiz.js                       Motor de preguntas, estadísticas y repaso
    app.js                        Navegación e interfaz
scripts/                           Servidor local y verificación de recursos
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

El almacenamiento pertenece al navegador y al origen. Cambiar de navegador, usar modo privado, borrar datos o pasar de `file://` al servidor local puede dar lugar a un progreso distinto. Se recupera la clave anterior `esen_diagnostico_100_v1` cuando es accesible desde el mismo origen. No se borra el registro anterior.

## Agregar Ciencias o Ciudadanía y valores

1. Crea su archivo de preguntas siguiendo el formato `{ cat, stem, opts, answer, explain }`. `answer` es el índice correcto, empezando en cero.
2. Crea las guías por categoría con `{ idea, rule, example, tip }`.
3. Carga ambos archivos en las dos entradas HTML, antes de `subjects.js`.
4. En `assets/js/data/subjects.js`, asigna los nuevos bancos a la materia y cambia `available` a `true`. Conserva su clave propia de almacenamiento.
5. Ejecuta las verificaciones y recorre la nueva materia en el navegador. El lobby, las preguntas y los resultados se generan desde el registro de materias y el tamaño del banco.

## Verificación

Requiere Node.js 18 o superior, sin dependencias:

```sh
npm run check
npm test
```

La revisión en navegador cubrió el lobby, la portada de Matemática, las preguntas y los resultados en anchos de 320, 390, 540, 768, 1024 y 1440 px, sin desbordamiento horizontal de la página. También se probaron respuestas, explicaciones, filtros, repaso, recomendaciones, recarga y confirmación de reinicio. Esto no sustituye pruebas en dispositivos físicos y otros navegadores.

## Alcance del contenido

Las 100 preguntas de Matemática se conservaron del diagnóstico original preparado para ESEN. Se añadieron guías breves y una interfaz orientada al nuevo espacio AVANZO. Aún hace falta revisar y ampliar ese banco contra el temario oficial de AVANZO; este proyecto no afirma cobertura completa ni es una prueba oficial. Ciencias y Ciudadanía y valores están preparadas en la estructura, sin preguntas publicadas todavía.
