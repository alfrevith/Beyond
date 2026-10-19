(() => {
  const {question:Q,section:S}=window.Beyond.citizenshipBank, T=window.Beyond.citizenshipText;
  const area='Democracia, Estado de Derecho y Derechos Humanos';
  const C={sources:['constitucion','legalidad']}, D={sources:['dudh']};
  S('CIV',area,'Constitución e instituciones públicas',1,[
    Q('basico','conceptual','¿Qué función cumple la Constitución en el ordenamiento salvadoreño?','Establecer derechos, principios y organización del Estado como norma jurídica fundamental',[
      ['Ser únicamente un programa de un partido político','Su función jurídica no se reduce a una propuesta partidaria.'],
      ['Autorizar cualquier actuación de un funcionario sin límites','La actuación pública está sujeta a competencias y normas.'],
      ['Sustituir todas las leyes por preferencias personales','El ordenamiento incluye normas y procedimientos, no solo decisiones individuales.']
    ],'La Constitución estructura el poder público y reconoce derechos. Estudiarla exige distinguir su contenido de opiniones políticas y consultar las reformas aplicables.','Supremacía constitucional.','Comprueba si estás leyendo una norma, una propuesta o una opinión.',C),
    Q('basico','conceptual','¿Qué exige el principio de legalidad a una autoridad pública?','Actuar dentro de las facultades que el ordenamiento le atribuye',[
      ['Elegir sus competencias según su popularidad','La aceptación pública no reemplaza una atribución legal.'],
      ['Aplicar solo las normas que le resulten convenientes','La sujeción al derecho no depende de conveniencia personal.'],
      ['Prescindir de justificar sus actuaciones porque ocupa un cargo','El cargo no elimina responsabilidades ni controles.']
    ],'El artículo 86 vincula las facultades de los funcionarios con la ley. El Estado de Derecho requiere que el poder tenga límites jurídicos y controles.','Legalidad y límites del poder.','Pregunta qué norma atribuye la facultad que se pretende ejercer.',C),
    Q('basico','conceptual','¿Qué correspondencia identifica correctamente funciones de los órganos fundamentales del Estado?','Legislativo: decretar leyes; Ejecutivo: dirigir la administración en sus competencias; Judicial: juzgar y hacer ejecutar lo juzgado',[
      ['Legislativo: dictar todas las sentencias penales','La función jurisdiccional corresponde al Órgano Judicial.'],
      ['Judicial: decidir por sí solo todo programa de gobierno','Los programas de administración corresponden al ámbito ejecutivo y a sus competencias.'],
      ['Ejecutivo: ejercer sin controles todas las funciones estatales','La organización constitucional distribuye funciones y establece límites.']
    ],'Las funciones se distribuyen constitucionalmente y pueden existir relaciones de colaboración y control. Distinguirlas no significa que los órganos estén aislados.','Órganos Legislativo, Ejecutivo y Judicial.','Asocia ley, administración y jurisdicción, luego estudia sus controles.',C),
    Q('basico','conceptual','¿Cuál es un ejemplo de derecho político?','Participar en elecciones mediante el sufragio conforme al ordenamiento',[
      ['Recibir atención de salud','Es un derecho social, aunque tenga relación con decisiones públicas.'],
      ['Acceder a educación','Es un derecho social y cultural, no específicamente el derecho político solicitado.'],
      ['Recibir una remuneración por el trabajo','Se relaciona con derechos económicos y laborales.']
    ],'Los derechos políticos permiten intervenir en los asuntos públicos. Las categorías ayudan a estudiar derechos que en la práctica se relacionan entre sí.','Derechos políticos y participación.','Clasifica por el objeto protegido: participación, libertad, trabajo, educación o salud.',C),
    Q('basico','conceptual','¿Qué conducta expresa una responsabilidad ciudadana compatible con la convivencia democrática?','Respetar derechos ajenos y participar de manera informada conforme a las normas',[
      ['Exigir derechos propios y negar los de quienes discrepan','La dignidad y los derechos no dependen de compartir opiniones.'],
      ['Delegar toda responsabilidad pública y renunciar a informarse','La participación informada requiere atención y compromiso ciudadano.'],
      ['Usar amenazas para imponer una decisión comunitaria','La coacción vulnera el diálogo y la libertad de participación.']
    ],'La ciudadanía relaciona participación, responsabilidades y respeto recíproco. Ejercer un derecho no autoriza impedir que otras personas ejerzan los suyos.','Derechos y responsabilidades ciudadanas.','Evalúa si tu forma de participar respeta la libertad y dignidad de otras personas.',D),
    Q('basico','caso','Caso hipotético: una persona solicita que se investigue una posible vulneración de derechos humanos cometida por agentes públicos. ¿Qué institución tiene como función constitucional investigar esos casos y asistir a presuntas víctimas?','Procuraduría para la Defensa de los Derechos Humanos (PDDH)',[
      ['Tribunal Supremo Electoral','Su ámbito principal es electoral, no la función general descrita.'],
      ['Asamblea Legislativa como tribunal penal','La Asamblea no sustituye a los tribunales penales ni a la PDDH.'],
      ['Una empresa privada de publicidad','No posee la atribución constitucional descrita.']
    ],'El artículo 194 atribuye a la PDDH velar por los derechos humanos, investigar posibles violaciones y asistir a presuntas víctimas. Sus funciones no equivalen a dictar condenas penales.','Protección institucional de derechos humanos.','Distingue investigar y recomendar de juzgar penalmente.',{sources:['constitucion','pddh']}),
    Q('basico','caso','Caso hipotético: un centro escolar rechaza a una estudiante únicamente por su origen étnico. ¿Qué principio resulta directamente afectado?','Igualdad y no discriminación',[
      ['Libertad de discriminar por preferencias de la administración','Las preferencias institucionales no justifican excluir por origen étnico.'],
      ['Obligación de homogeneidad cultural','La diversidad no elimina la igualdad de derechos.'],
      ['Secreto del voto','Ese principio protege decisiones electorales; el caso trata de acceso educativo.']
    ],'La igualdad impide exclusiones arbitrarias por origen y se relaciona aquí con el derecho a la educación. Respetar la diversidad exige acceso sin discriminación.','Igualdad ante la ley y acceso educativo.','Identifica el motivo de la exclusión y el derecho cuyo ejercicio impide.',D),
    Q('basico','caso','Caso hipotético: una autoridad quiere castigar a alguien sin permitirle conocer la acusación ni defenderse. ¿Qué garantía debe protegerse?','El derecho de defensa dentro de un debido proceso',[
      ['La facultad de sancionar por rumores','Los rumores no sustituyen un procedimiento con garantías.'],
      ['La culpabilidad automática por ser investigado','Ser investigado no equivale a una condena.'],
      ['La prohibición de escuchar a la persona acusada','La oportunidad de defenderse es una garantía, no un obstáculo ilegítimo.']
    ],'Conocer lo que se atribuye y poder defenderse son garantías frente al ejercicio sancionador del poder. La investigación debe distinguirse de una declaración de culpabilidad.','Debido proceso y defensa.','Separa sospecha, investigación y decisión fundada.',{sources:['constitucion','dudh']}),
    Q('intermedio','caso','Caso hipotético: una institución intenta ordenar a un tribunal el contenido de una sentencia para favorecer a un conocido. ¿Qué principio se compromete?','La independencia judicial y la imparcialidad',[
      ['La colaboración legítima permite ordenar cualquier sentencia','Colaborar no equivale a sustituir el juicio independiente del tribunal.'],
      ['El parentesco concede prioridad frente a la ley','Una relación personal no justifica trato judicial favorable.'],
      ['La transparencia obliga a resolver según presiones externas','Informar y rendir cuentas no elimina la independencia para juzgar.']
    ],'La función de juzgar requiere aplicar el derecho con independencia e imparcialidad. Los controles institucionales deben ejercerse dentro de sus competencias.','Independencia judicial y controles constitucionales.','Distingue control legal de una instrucción sobre el resultado de un caso.',C)
  ]);
  S('CIV',area,'Democracia, participación y cultura de paz',10,[
    Q('intermedio','caso','Caso hipotético: una asociación elige representantes y además realiza consultas abiertas sobre el uso del parque. ¿Cómo se relacionan ambos mecanismos?','La representación y la participación directa pueden complementarse',[
      ['Consultar a vecinos elimina necesariamente toda representación','Una consulta puede aportar información sin suprimir representantes.'],
      ['Elegir representantes impide cualquier participación posterior','El control y la participación pueden continuar entre elecciones.'],
      ['La consulta obliga a excluir a quienes votaron distinto','La participación democrática admite desacuerdo y pluralidad.']
    ],'Elegir representantes es una forma de democracia representativa. Las consultas y espacios deliberativos amplían participación y pueden complementar la representación.','Democracia representativa y participativa.','Pregunta quién decide, cómo recibe propuestas y cómo rinde cuentas.'),
    Q('intermedio','caso','Caso hipotético: una campaña difunde instrucciones contradictorias para marcar la papeleta. ¿Qué acción es más responsable?','Consultar instrucciones oficiales del TSE para el proceso específico y verificar su fecha',[
      ['Usar instrucciones de cualquier elección anterior sin revisarlas','Las reglas y modalidades pueden cambiar entre procesos.'],
      ['Seguir una imagen reenviada sin procedencia','La difusión no garantiza autenticidad ni vigencia.'],
      ['Asumir que una promesa partidaria determina la validez de un voto','La validez depende de normas e instrucciones electorales aplicables.']
    ],'El TSE tiene atribuciones en la organización y aplicación de reglas electorales. Revisar la fuente y el proceso concreto evita presentar reglas históricas como instrucciones vigentes.','Información electoral y vigencia de procedimientos.','Verifica organismo, fecha y tipo de elección antes de seguir una instrucción.',{sources:['tse']}),
    Q('intermedio','caso','Caso hipotético: un grupo pide prohibir cualquier propuesta de un partido solo porque no coincide con sus ideas, sin señalar una infracción. ¿Qué principio debe orientar la discusión?','Pluralismo político y debate de propuestas dentro de las reglas democráticas',[
      ['La unanimidad obligatoria como condición para participar','La democracia admite diferentes proyectos y opiniones.'],
      ['La ventaja permanente del grupo más numeroso para excluir a los demás','Una mayoría no elimina por sí misma derechos de las minorías.'],
      ['El derecho de cada partido a impedir toda crítica','El pluralismo protege la participación, no la inmunidad frente a críticas.']
    ],'Los partidos canalizan propuestas y representación en un marco plural. El desacuerdo se responde con deliberación y procedimientos, sin suponer que una preferencia basta para excluir.','Pluralismo y partidos políticos.','Distingue crítica a una propuesta de negación del derecho a participar.',C),
    Q('intermedio','caso','Caso hipotético: una junta informa cuánto gastó, muestra comprobantes y responde preguntas sobre los resultados. ¿Qué práctica realiza?','Rendición de cuentas apoyada en transparencia',[
      ['Publicidad suficiente aunque no existan datos verificables','La publicidad por sí sola no permite examinar gastos y resultados.'],
      ['Secreto presupuestario','Aquí se exponen recursos y explicaciones al escrutinio.'],
      ['Delegación sin responsabilidad','Las personas responsables están dando explicaciones sobre su gestión.']
    ],'La transparencia facilita información; rendir cuentas también supone explicar decisiones y resultados y permitir su examen. Son prácticas relacionadas, pero no idénticas.','Transparencia y responsabilidad pública.','Busca datos, razones, resultados y posibilidad de preguntar.'),
    Q('intermedio','caso','Caso hipotético: dos grupos vecinales disputan el horario de una cancha. ¿Cuál mecanismo favorece una cultura de paz?','Dialogar con mediación aceptada por las partes, escuchar necesidades y acordar reglas de uso',[
      ['Amenazar al grupo con menos integrantes','El tamaño del grupo no legitima coacción.'],
      ['Difundir rumores para desacreditar a la otra parte','Los rumores deterioran confianza y no resuelven necesidades.'],
      ['Declarar que una parte no puede expresar su posición','Sin escucha no se construye un acuerdo participativo.']
    ],'La mediación ayuda a identificar intereses y opciones de beneficio compartido. Un acuerdo pacífico necesita participación voluntaria y compromisos verificables.','Diálogo, tolerancia y resolución pacífica.','Separa posiciones iniciales de necesidades que pueden compatibilizarse.'),
    Q('intermedio','fuente','¿Qué principio protege el mecanismo descrito en el texto electoral?','La libertad de decidir el voto sin coacción',[
      ['La obligación de revelar la elección al empleador','Revelar bajo presión contradice la decisión libre y el secreto.'],
      ['La compra del voto como intercambio ordinario','Un beneficio condicionado puede coaccionar la decisión electoral.'],
      ['La sustitución de la voluntad de la persona por la de su familia','El voto expresa la decisión individual de quien participa.']
    ],'La libertad y el secreto protegen al elector frente a presiones. Las instrucciones concretas para votar deben comprobarse en la información oficial de cada proceso.','Sufragio libre y secreto.','Distingue acompañamiento informativo de presión sobre la elección.',T('Paráfrasis educativa de principios de sufragio: la decisión electoral debe poder tomarse libremente y sin que otra persona exija conocer o controlar la opción elegida.',['constitucion','dudh'],'Paráfrasis didáctica de principios constitucionales y de la DUDH')),
    Q('intermedio','fuente','¿Qué falta para pasar de la divulgación de información a una rendición de cuentas más completa?','Explicar diferencias, responder preguntas y asumir responsabilidades sobre los resultados',[
      ['Reemplazar datos por un eslogan favorable','Un eslogan no aclara las diferencias entre metas y resultados.'],
      ['Impedir que se comparen cifras entre períodos','La comparación facilita evaluar gestión y explicaciones.'],
      ['Publicar únicamente los logros sin reconocer las limitaciones','La selección parcial dificulta el control informado.']
    ],'Publicar cifras es un punto de partida. La rendición de cuentas agrega explicación de decisiones, examen de resultados y mecanismos de responsabilidad.','Información pública y control ciudadano.','Pregunta no solo cuánto se gastó, sino por qué y con qué resultados.',T('Noticia simulada: una institución publica un cuadro de gastos y metas. En una reunión, la comunidad solicita explicar por qué un proyecto costó más y atendió a menos personas de las previstas.',[],'Noticia simulada para análisis')),
    Q('intermedio','fuente','¿Qué problema critica la representación y su texto de apoyo?','Una participación que recoge opiniones, pero impide que influyan o reciban respuesta',[
      ['El exceso de información comprensible para la comunidad','La escena no muestra abundancia informativa, sino una barrera a las propuestas.'],
      ['La imposibilidad de usar consultas junto con representantes','La crítica se dirige a cómo se procesa la participación, no a su coexistencia.'],
      ['La necesidad de que una sola opinión reemplace a todas las demás','Escuchar implica pluralidad, no imponer una voz única.']
    ],'La imagen contrapone una invitación a participar con una barrera que bloquea propuestas. Una consulta significativa necesita acceso, consideración y respuesta sobre lo planteado.','Participación efectiva frente a participación meramente formal.','Contrasta el mensaje anunciado con el mecanismo que realmente se ofrece.',{...T('Caricatura educativa original y neutral: se invita a presentar propuestas, pero una barrera impide que lleguen a la mesa de decisiones. No representa personas ni partidos reales.'),visual:{kind:'cartoon',caption:'Representación original: «Tu voz cuenta» frente a un buzón bloqueado'}})
  ]);
  S('CIV',area,'Derechos humanos, igualdad y protección',18,[
    Q('intermedio','fuente','¿Qué interpretación corresponde al principio de universalidad del texto?','Los derechos humanos corresponden a todas las personas por su dignidad',[
      ['Solo se reconocen a quienes comparten una ideología','La universalidad no depende de adhesión política.'],
      ['Se pierden automáticamente al pertenecer a una minoría','La pertenencia a una minoría no elimina derechos.'],
      ['Se conceden únicamente por nivel de ingreso','La capacidad económica no determina la dignidad humana.']
    ],'La DUDH reconoce dignidad y derechos sin distinciones arbitrarias. Las obligaciones del Estado no se reducen a favorecer a quienes tienen mayor influencia.','Universalidad y no discriminación.','Evita convertir una condición social en requisito para tener derechos.',T('Paráfrasis didáctica de los artículos 1 y 2 de la DUDH: todas las personas poseen igual dignidad y derechos, sin que su origen, creencias u otra condición justifiquen exclusión.',['dudh'],'Paráfrasis didáctica de la DUDH')),
    Q('intermedio','fuente','¿Qué dimensión del derecho a la salud está en juego en el caso descrito?','El acceso sin discriminación a servicios de atención',[
      ['El derecho exclusivo de la mayoría a recibir atención','La pertenencia a una minoría no justifica denegar un servicio.'],
      ['La obligación de renunciar a la propia identidad para ser atendido','Condicionar el acceso a abandonar una identidad es discriminatorio.'],
      ['El secreto del sufragio','El caso trata del acceso a salud, no de una decisión electoral.']
    ],'El acceso a servicios de salud se relaciona con igualdad y bienestar. El caso permite identificar la exclusión, sin diagnosticar una enfermedad ni indicar un tratamiento.','Salud, igualdad y derechos sociales.','Identifica la barrera de acceso antes de clasificar el derecho.',T('Caso didáctico hipotético: un servicio de salud disponible para la comunidad rechaza a una persona únicamente por su origen, sin valorar sus necesidades de atención.',['dudh'])),
    Q('avanzado','fuente','¿Qué relación entre derechos individuales y colectivos plantea el pasaje?','La protección ambiental compartida puede favorecer simultáneamente salud y condiciones de vida individuales',[
      ['Los derechos colectivos hacen innecesarios todos los derechos individuales','Son dimensiones que pueden complementarse, no sustituirse por completo.'],
      ['Un problema ambiental solo afecta a quien lo denuncia primero','La contaminación puede afectar a muchas personas y generaciones.'],
      ['Proteger una cuenca obliga a ignorar la participación de sus habitantes','Una protección sostenible necesita considerar a las personas afectadas.']
    ],'Los derechos se relacionan: un ambiente protegido favorece salud y bienestar. Las decisiones colectivas deben considerar acceso equitativo y participación, además de efectos futuros.','Interdependencia de derechos individuales y colectivos.','Busca cómo una condición compartida afecta vidas individuales.',T('Texto didáctico: proteger una cuenca no beneficia únicamente a una familia. Puede preservar agua, ecosistemas y condiciones de vida de varias comunidades y de generaciones futuras.',['dudh','riesgo'])),
    Q('avanzado','fuente','¿Qué conclusión sobre libertad de expresión y responsabilidad es más consistente con el texto?','El debate crítico debe protegerse y los límites deben tener fundamento jurídico y respetar derechos',[
      ['Toda crítica a una autoridad equivale a una amenaza','La crítica y la amenaza son conductas distintas que deben evaluarse por su contenido y contexto.'],
      ['La libertad de expresión elimina la privacidad de cualquier otra persona','Los derechos se relacionan y no autorizan ignorar automáticamente la privacidad ajena.'],
      ['Una autoridad puede prohibir opiniones solo porque le desagradan','El desacuerdo personal no basta para fundamentar una restricción.']
    ],'La expresión permite buscar, recibir y difundir información. Examinar responsabilidades exige distinguir crítica, información, amenazas y derechos de otras personas, con criterios jurídicos y no por afinidad política.','Libertad de expresión e interdependencia de derechos.','Clasifica la conducta y su contexto; no te guíes solo por quién habla.',T('Paráfrasis didáctica: la DUDH protege la expresión y el acceso a información. Su ejercicio convive con la dignidad y los derechos de otras personas y con límites jurídicos aplicables.',['dudh'],'Paráfrasis didáctica de los artículos 19 y 29 de la DUDH')),
    Q('avanzado','fuente','¿Qué diferencia institucional debe conservarse al interpretar el texto?','La PDDH protege e investiga derechos humanos, mientras la imposición de condenas corresponde a tribunales competentes',[
      ['Toda recomendación de la PDDH constituye automáticamente una condena penal','Una recomendación no es una sentencia penal.'],
      ['La PDDH reemplaza al TSE en organizar elecciones','Las competencias de protección y de administración electoral son diferentes.'],
      ['Investigar una posible violación prueba culpabilidad antes de un proceso','La investigación no sustituye la decisión con garantías.']
    ],'Las atribuciones del artículo 194 incluyen investigar, asistir y formular recomendaciones. Distinguir funciones protege tanto a las víctimas como las garantías de las personas investigadas.','Competencias de protección y función jurisdiccional.','No confundas denuncia, investigación, recomendación y sentencia.',T('Paráfrasis institucional: la PDDH puede investigar posibles violaciones, asistir a presuntas víctimas y formular recomendaciones. Los tribunales ejercen la función jurisdiccional dentro de sus competencias.',['constitucion','pddh'],'Paráfrasis didáctica de competencias institucionales')),
    Q('avanzado','relacion','¿Por qué mejorar el acceso educativo puede ampliar el ejercicio de otros derechos?','Fortalece capacidades para informarse, participar y acceder a oportunidades laborales',[
      ['Porque un título elimina automáticamente toda desigualdad','La educación contribuye, pero no suprime por sí sola todas las barreras sociales.'],
      ['Porque los derechos solo existen para quienes estudian','Los derechos corresponden también a quienes no tuvieron acceso a educación.'],
      ['Porque permite sustituir la participación por obediencia sin preguntas','La educación puede fortalecer pensamiento crítico y participación informada.']
    ],'Los derechos son interdependientes: la educación puede favorecer autonomía y oportunidades. Esto no convierte la escolaridad en condición para ser titular de derechos.','Educación, capacidades e interdependencia de derechos.','Distingue facilitar el ejercicio de un derecho de conceder su titularidad.',D),
    Q('avanzado','relacion','¿Por qué una decisión aprobada por mayoría todavía debe respetar la no discriminación?','La regla de mayoría opera dentro de un marco de derechos que protege también a minorías',[
      ['Porque la mayoría puede retirar cualquier derecho por simple preferencia','La popularidad de una medida no elimina el marco de derechos.'],
      ['Porque toda decisión debe recibir unanimidad para ser democrática','La unanimidad no es requisito general; sí importan procedimientos y garantías.'],
      ['Porque las minorías nunca pueden participar en una votación','Excluirlas contradice la participación y el pluralismo.']
    ],'La democracia combina decisiones colectivas con garantías de dignidad e igualdad. El número de votos no justifica por sí mismo una exclusión discriminatoria.','Mayorías, minorías y límites de derechos.','Evalúa procedimiento y contenido, no solo cuántas personas apoyan algo.',D),
    Q('avanzado','datos','¿Qué diagnóstico permite esta tabla sobre igualdad de acceso?','Hay una brecha de 30 puntos porcentuales que requiere investigar barreras de acceso',[
      ['La cobertura es igual porque ambos grupos tienen personas atendidas','80% y 50% no representan igual cobertura.'],
      ['La diferencia prueba por sí sola una intención discriminatoria específica','El resultado alerta sobre una brecha; establecer causas requiere más evidencia.'],
      ['Debe excluirse al grupo B de futuras mediciones','Eso ocultaría la brecha en lugar de investigarla.']
    ],'80% menos 50% son 30 puntos porcentuales. La tabla identifica una desigualdad de resultados y orienta preguntas sobre infraestructura, costos y trato, sin probar por sí sola cada causa.','Brechas de acceso y evaluación de igualdad.','Separa identificar una brecha de demostrar su causa.',{sources:['dudh'],visual:{kind:'table',caption:'Datos simulados: acceso a un servicio educativo en dos grupos de 100 personas',headers:['Grupo','Personas con acceso','Cobertura (%)'],rows:[['A',80,80],['B',50,50]]}})
  ]);
})();
