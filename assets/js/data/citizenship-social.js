(() => {
  const {question:Q,section:S}=window.Beyond.citizenshipBank;
  const T=window.Beyond.citizenshipText;
  const area='Ciencias Sociales e Investigación';
  S('SOC',area,'Fundamentos de Ciencias Sociales',1,[
    Q('basico','conceptual','¿Qué pregunta estudia principalmente una relación social?','¿Cómo influye la organización familiar en el cuidado de personas mayores?',[
      ['¿A qué temperatura hierve agua pura a presión fija?','Se refiere a una propiedad física, sin estudiar relaciones entre personas.'],
      ['¿Qué mineral compone una roca?','La composición de una roca corresponde a ciencias naturales.'],
      ['¿Cómo se reproduce una bacteria?','La reproducción bacteriana es un proceso biológico.']
    ],'Las ciencias sociales investigan acciones, instituciones y relaciones humanas con evidencia. Pueden colaborar con las naturales, pero su objeto aquí es la organización del cuidado.','Objeto de las ciencias sociales.','Identifica si el centro de la pregunta es una relación humana o un proceso natural.'),
    Q('basico','conceptual','Una investigación compara normas de convivencia y redes de apoyo en varios barrios. ¿Qué disciplina aporta el enfoque más directo?','Sociología',[
      ['Astronomía','Estudia cuerpos y fenómenos celestes, no redes de apoyo vecinal.'],
      ['Química','Analiza composición y transformación de sustancias.'],
      ['Anatomía','Estudia estructuras de los seres vivos, no normas comunitarias.']
    ],'La sociología analiza grupos, instituciones y relaciones sociales. Las redes de apoyo y las normas compartidas forman parte de ese campo.','Grupos e instituciones sociales.','Relaciona sociología con patrones de convivencia, organización y desigualdad.'),
    Q('basico','conceptual','¿Qué relación entre disciplina y objeto de estudio es adecuada?','Antropología: significados y prácticas culturales de una comunidad',[
      ['Historia: únicamente predicciones de precios futuros','La historia investiga cambios y continuidades del pasado mediante fuentes.'],
      ['Economía: exclusivamente rituales y parentesco','La economía estudia producción, distribución y uso de recursos; los rituales son un objeto antropológico.'],
      ['Ciencia Política: composición mineral de los suelos','La Ciencia Política analiza poder, instituciones y participación, no minerales.']
    ],'La antropología busca comprender culturas y formas de vida en su contexto, evitando juzgarlas como inferiores por ser distintas.','Diversidad de disciplinas y enfoques.','Asocia cada disciplina con su pregunta central: cultura, tiempo, recursos, territorio o poder.'),
    Q('basico','caso','Caso hipotético: una alcaldía combina datos sobre trayectos, ingresos y decisiones de transporte para mejorar rutas. ¿Qué aporta integrar Geografía, Economía y Ciencia Política?','Analizar juntos distribución territorial, recursos y decisiones públicas',[
      ['Convertir automáticamente una preferencia en evidencia','La colaboración disciplinaria no sustituye la recolección y evaluación de datos.'],
      ['Explicar todos los trayectos solo por el clima','Eso elimina los factores económicos e institucionales del caso.'],
      ['Garantizar que todos los grupos usarán la misma ruta','Distintos horarios, necesidades y lugares impiden deducir esa uniformidad.']
    ],'El enfoque interdisciplinario relaciona localización de la población, costos y formas de decisión. Así permite evaluar alternativas con mayor contexto.','Comprensión interdisciplinaria de problemas sociales.','Busca qué dimensión distinta aporta cada disciplina.'),
    Q('basico','fuente','Según el texto, ¿qué distingue la investigación histórica de una simple lista de fechas?','Explicar cambios y continuidades mediante fuentes contextualizadas',[
      ['Sustituir documentos por recuerdos sin contrastar','El texto pide comparar y contextualizar evidencias.'],
      ['Considerar toda narración del pasado igualmente comprobada','La calidad y procedencia de cada fuente deben evaluarse.'],
      ['Ordenar fechas sin relacionarlas con procesos','El orden temporal es útil, pero no basta para explicar un proceso.']
    ],'La historia interpreta evidencias del pasado, atiende quién las produjo y contrasta sus versiones. Una cronología organiza hechos, pero requiere explicación.','Fuentes y explicación histórica.','Pregunta quién produjo una fuente, cuándo y con qué propósito.',T('Una historiadora compara actas municipales, periódicos y testimonios para explicar cómo cambió el acceso al agua. Las fechas ordenan los sucesos; contrastar fuentes permite interpretar sus relaciones.')),
    Q('intermedio','conceptual','¿Qué diferencia metodológica es válida al comparar ciencias sociales y naturales?','Ambas contrastan evidencia, pero las sociales deben considerar los significados y contextos de la acción humana',[
      ['Solo las ciencias naturales pueden utilizar números','Las ciencias sociales emplean censos, encuestas y análisis estadísticos.'],
      ['Las ciencias sociales no necesitan contrastar interpretaciones','Una interpretación social también requiere evidencia y revisión crítica.'],
      ['Toda investigación social debe realizar un experimento de laboratorio','Las preguntas y límites éticos permiten diseños observacionales y cualitativos.']
    ],'La evidencia y la revisión crítica son comunes a ambos campos. En el social, interpretar significados y reconocer límites éticos y contextuales es esencial.','Métodos rigurosos y diversidad de evidencias.','Evita definir una ciencia por usar exclusivamente números o exclusivamente relatos.')
  ]);
  S('SOC',area,'Métodos e interpretación de investigación social',7,[
    Q('intermedio','caso','Caso hipotético: un equipo quiere estudiar ausentismo escolar. ¿Cuál es el planteamiento del problema más investigable?','¿Qué relación hay entre tiempo de traslado y días de ausencia en bachillerato del centro X durante el primer trimestre?',[
      ['¿Por qué todos los estudiantes son irresponsables?','Presupone una culpa universal sin comprobarla y no delimita población ni período.'],
      ['¿Es mala la educación?','La valoración es demasiado amplia y no define indicadores observables.'],
      ['¿Cómo eliminar para siempre cualquier ausencia?','Promete un resultado absoluto antes de investigar el fenómeno.']
    ],'La pregunta delimita variables, población, lugar y tiempo sin dar por cierta la respuesta. Permite seleccionar datos pertinentes para contrastar una hipótesis.','Delimitación de un problema investigable.','Busca población, período y variables observables antes de recoger datos.'),
    Q('intermedio','caso','Un estudio hipotetiza: a mayor tiempo diario de traslado, mayor número de ausencias. ¿Qué clasificación de variables corresponde a esa hipótesis?','Tiempo de traslado: independiente; número de ausencias: dependiente',[
      ['Tiempo de traslado: dependiente; ausencias: independiente','Invierte la dirección explicativa propuesta, aunque otra investigación podría plantear otra relación.'],
      ['Ambas son la población','Las variables son características medidas; la población es el conjunto de personas estudiadas.'],
      ['Ambas son el marco teórico','El marco teórico organiza conceptos y estudios previos, no reemplaza las mediciones.']
    ],'La hipótesis propone el traslado como factor explicativo y las ausencias como resultado. Una asociación observada aún no demuestra causalidad.','Hipótesis y variables independiente y dependiente.','Lee primero qué factor se propone como explicación y cuál como resultado.'),
    Q('intermedio','fuente','¿Qué función cumple el marco teórico en el diseño descrito?','Definir conceptos y orientar hipótesis con investigaciones previas',[
      ['Registrar respuestas de participantes antes de entrevistarlos','Los datos no pueden anticiparse a su recolección.'],
      ['Hacer innecesario contrastar la hipótesis','Los antecedentes orientan; la hipótesis sigue necesitando contraste.'],
      ['Elegir solo publicaciones que confirmen la opinión inicial','Eso introduce sesgo de confirmación y excluye evidencia relevante.']
    ],'El marco teórico vincula el problema con conceptos y antecedentes. Debe incorporar estudios pertinentes, incluso si cuestionan la explicación inicial.','Relación entre teoría e investigación empírica.','Separa antecedentes, hipótesis y resultados: cumplen funciones distintas.',T('Antes de encuestar, un equipo revisa estudios sobre abandono escolar, define qué entenderá por apoyo familiar y formula una hipótesis que después contrastará con datos.')),
    Q('intermedio','relacion','Una encuesta voluntaria por internet concluye que todas las familias tienen conexión estable. ¿Qué relación explica mejor el posible error?','El medio de convocatoria excluye a parte de la población que se quiere describir',[
      ['La encuesta transforma su muestra en un censo','Responder voluntariamente no asegura cubrir a toda la población.'],
      ['Una muestra grande siempre elimina el sesgo de selección','Muchos casos del mismo grupo no compensan grupos excluidos.'],
      ['Una correlación demuestra que internet causa estabilidad económica','El enunciado ni establece esa correlación ni permite inferir causalidad.']
    ],'La población objetivo incluye familias sin conexión que tienen menos probabilidad de participar. Ese sesgo limita la generalización, aunque haya muchas respuestas.','Población, muestra y sesgo de cobertura.','Revisa quién pudo quedar fuera antes de generalizar.'),
    Q('intermedio','datos','En esta muestra hipotética, ¿qué conclusión está respaldada por la tabla?','El grupo de trayecto largo tiene mayor proporción de ausencias frecuentes',[
      ['Ambos grupos tienen la misma proporción porque presentan 10 casos','Debes dividir casos entre integrantes: 10/50 difiere de 10/20.'],
      ['Los trayectos largos causan por sí solos todas las ausencias','La tabla muestra asociación, sin controlar otros factores.'],
      ['El 50% de todos los estudiantes del país falta frecuentemente','Es una muestra hipotética de dos grupos, no una estimación nacional.']
    ],'Trayecto corto: 10/50 = 20%; trayecto largo: 10/20 = 50%. Comparar proporciones considera los diferentes tamaños de grupo.','Frecuencias absolutas y relativas.','Cuando los grupos tienen distinto tamaño, compara porcentajes.',{visual:{kind:'table',caption:'Datos simulados: muestra escolar; ausencias frecuentes = 3 o más al mes',headers:['Trayecto','Estudiantes','Ausencias frecuentes'],rows:[['Corto',50,10],['Largo',20,10]]}}),
    Q('intermedio','datos','¿Qué describe correctamente la gráfica simulada de preferencias para recibir información escolar?','Mensajería reúne 20 de 40 respuestas: el 50% de la muestra',[
      ['Cartelera reúne el 40% de la muestra','Cartelera tiene 8/40 = 20%, no 40%.'],
      ['Correo reúne más respuestas que mensajería','Correo tiene 12 y mensajería 20.'],
      ['La gráfica mide la eficacia real de cada medio','Mide preferencias declaradas, no resultados de una intervención.']
    ],'Las categorías suman 40 y mensajería tiene 20: 20/40 = 0.5. La preferencia declarada no demuestra cuál medio mejora más el aprendizaje.','Lectura de gráfica de barras y alcance de datos.','Lee título, unidad y total antes de interpretar una barra.',{visual:{kind:'bars',caption:'Datos simulados: medio preferido por 40 estudiantes',unit:'respuestas',rows:[['Mensajería',20],['Correo',12],['Cartelera',8]]}}),
    Q('avanzado','datos','El mapa esquemático muestra tasas de asistencia. ¿Qué comparación evita confundir población con porcentaje?','Sur supera a Norte en tasa, aunque tiene menos asistentes en números absolutos',[
      ['Norte tiene mejor tasa porque tiene 900 asistentes','900/1200 = 75%, menor que 180/200 = 90%.'],
      ['Sur tiene más asistentes porque su tasa es mayor','Una proporción mayor no implica un total mayor: 180 es menor que 900.'],
      ['La ubicación en el mapa demuestra que el clima determina la asistencia','El esquema no contiene variables climáticas ni prueba causalidad.']
    ],'Norte: 900/1200 = 75%; Sur: 180/200 = 90%. Una tasa compara la parte con su población de referencia, no solo el tamaño de la parte.','Mapas temáticos, denominadores y comparación territorial.','Calcula la tasa de cada territorio con su propio denominador.',{visual:{kind:'map',caption:'Mapa esquemático ficticio: asistencia a una consulta vecinal; no representa municipios reales',unit:'asistentes / convocados',cells:[['Norte','900 / 1200',75],['Sur','180 / 200',90]],legend:'Color más intenso: mayor porcentaje de asistencia.'}}),
    Q('avanzado','datos','Dos encuestas hipotéticas usan preguntas diferentes. ¿Qué impide atribuir todo el cambio a la opinión pública?','Cambian simultáneamente la redacción y la composición de la muestra',[
      ['El porcentaje siempre es comparable aunque cambie la pregunta','La redacción valorativa puede inducir respuestas distintas.'],
      ['Una muestra de voluntarios representa necesariamente a quienes no responden','La autoselección puede producir diferencias de cobertura.'],
      ['La segunda encuesta prueba un cambio individual de todos los participantes','No se siguió a las mismas personas bajo condiciones comparables.']
    ],'No se mantuvieron ni la pregunta ni el método de selección. El cambio porcentual puede reflejar diferencias de medición y selección, además de posibles cambios de opinión.','Comparabilidad y límites de inferencia.','Antes de comparar porcentajes, revisa pregunta, muestra y fecha.',{visual:{kind:'table',caption:'Datos simulados: apoyo a una propuesta de transporte',headers:['Encuesta','Pregunta','Selección','Apoyo'],rows:[['A','¿Apoya la propuesta?','Muestra aleatoria',55],['B','¿Apoya la excelente propuesta?','Voluntarios en línea',78]]}}),
    Q('avanzado','caso','Caso hipotético: se desea comprender experiencias de discriminación y también observar barreras de acceso. ¿Qué diseño es más adecuado y ético?','Entrevistas voluntarias y confidenciales, observación de accesos y un grupo focal consentido con reglas de respeto',[
      ['Publicar nombres e historias sin permiso para aumentar el impacto','Expone a participantes y vulnera confidencialidad y consentimiento.'],
      ['Usar únicamente una encuesta cerrada y afirmar que explica todas las experiencias','Puede medir frecuencias, pero limita la comprensión profunda solicitada.'],
      ['Ocultar el propósito y obligar a participar a quienes denuncian','La coerción y el engaño innecesario impiden una participación informada.']
    ],'Las entrevistas profundizan experiencias, la observación registra condiciones y el grupo focal explora intercambios. Su combinación exige consentimiento, confidencialidad y reconocer que lo dicho en grupo puede circular.','Triangulación de técnicas y ética de investigación.','Elige la técnica según la pregunta y protege siempre a las personas participantes.')
  ]);
})();
