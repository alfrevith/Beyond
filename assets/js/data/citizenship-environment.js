(() => {
  const {question:Q,section:S}=window.Beyond.citizenshipBank, T=window.Beyond.citizenshipText;
  const area='Medio Ambiente, Población y Urbanización', R={sources:['riesgo']};
  S('AMB',area,'Ambiente, recursos y sostenibilidad',1,[
    Q('basico','conceptual','¿Qué diferencia el efecto invernadero natural de su intensificación por actividades humanas?','El primero contribuye a una temperatura habitable; el aumento de ciertos gases altera el balance energético y favorece calentamiento adicional',[
      ['El efecto natural y el calentamiento adicional significan que el Sol dejó de emitir energía','La energía solar sigue siendo parte del balance terrestre.'],
      ['Todos los gases atmosféricos tienen idéntica capacidad de absorber radiación infrarroja','Distintos gases presentan propiedades radiativas diferentes.'],
      ['El cambio climático se define por cualquier tarde calurosa aislada','El clima se analiza mediante patrones y tendencias de largo plazo.']
    ],'El efecto invernadero natural retiene parte del calor. Su intensificación por mayores concentraciones de gases como CO₂ contribuye al cambio climático; un día aislado no define una tendencia.','Efecto invernadero, clima y tiempo atmosférico.','Distingue un mecanismo natural de su alteración y del tiempo de un día.',{sources:['clima']}),
    Q('basico','conceptual','¿Qué expresa el desarrollo sostenible?','Satisfacer necesidades actuales considerando equidad y capacidad de las generaciones futuras',[
      ['Agotar recursos si produce una ganancia inmediata','Ignora la continuidad de recursos y bienestar futuros.'],
      ['Considerar solo crecimiento monetario y excluir impactos sociales','La sostenibilidad integra dimensiones sociales, ambientales y económicas.'],
      ['Prohibir cualquier uso humano de todo recurso','La gestión sostenible trata de condiciones de uso y conservación, no de una prohibición universal.']
    ],'La sostenibilidad relaciona bienestar presente y futuro con límites ambientales. Evaluar una alternativa exige considerar a quién beneficia, qué costos genera y cuánto puede mantenerse.','Equidad y sostenibilidad intergeneracional.','Compara impactos económicos, sociales y ambientales a lo largo del tiempo.'),
    Q('basico','conceptual','¿Qué diferencia escasez física de agua y dificultades de acceso?','Puede existir agua en una zona y aun faltar infraestructura o distribución equitativa para llegar a los hogares',[
      ['Si existe un río, todos los hogares tienen automáticamente agua segura','La presencia de agua no garantiza tratamiento, continuidad ni acceso.'],
      ['La escasez solo puede depender del número de habitantes','También influyen oferta, calidad, usos, infraestructura y gestión.'],
      ['El acceso se resuelve únicamente anunciando una obra','Se requieren funcionamiento, mantenimiento y condiciones de distribución.']
    ],'La disponibilidad, la calidad y el acceso son dimensiones distintas. Una solución debe identificar si la barrera es ambiental, técnica, económica o institucional.','Gestión del agua y acceso equitativo.','Pregunta si falta agua, calidad, infraestructura o capacidad de acceso.'),
    Q('basico','caso','Caso hipotético: una comunidad identifica residuos y descargas sin tratamiento en un río. ¿Qué respuesta atiende mejor el origen del problema?','Reducir y controlar vertidos, gestionar residuos y verificar la calidad del agua con seguimiento',[
      ['Retirar basura visible una vez y dar por terminado el problema','La limpieza puntual no detiene descargas ni previene nuevos residuos.'],
      ['Trasladar todos los residuos a la ribera de otra comunidad','Desplaza el daño sin resolver su generación y manejo.'],
      ['Suponer que el agua es segura porque no tiene mal olor','La apariencia no identifica todos los contaminantes.']
    ],'La gestión debe combinar prevención en la fuente, tratamiento y monitoreo. Una acción aislada sobre efectos visibles puede dejar intacta la causa.','Contaminación de ríos y prevención en la fuente.','Separa retirar residuos, detener descargas y comprobar resultados.'),
    Q('basico','caso','Caso hipotético: una comunidad quiere reducir residuos enviados al sitio de disposición final. ¿Qué estrategia es más integral?','Prevenir residuos, reutilizar, separar y aprovechar materiales con disposición segura de lo restante',[
      ['Quemar cualquier residuo cerca de las viviendas','Puede generar contaminación y riesgos para la salud.'],
      ['Comprar más envases de un solo uso porque luego pueden separarse','Separar ayuda, pero no sustituye prevenir generación innecesaria.'],
      ['Mezclar residuos peligrosos con materiales reciclables','La mezcla aumenta riesgos y dificulta el aprovechamiento seguro.']
    ],'La gestión prioriza reducir generación y aprovechar materiales antes de disponer lo restante. El reciclaje es una parte, no la solución completa.','Jerarquía de manejo de residuos.','Piensa en prevenir antes de desechar y en seguridad al separar.'),
    Q('basico','caso','Caso hipotético: se propone extraer más agua de una cuenca de la que se repone de manera sostenida. ¿Qué revisión es necesaria?','Evaluar recarga, demanda, ecosistemas y necesidades de las comunidades antes de ampliar la extracción',[
      ['Aumentar indefinidamente la extracción porque hay agua hoy','La existencia actual no garantiza reposición futura.'],
      ['Considerar solo a la persona que controla la bomba','El uso afecta a otros usuarios y a ecosistemas compartidos.'],
      ['Suponer que una tubería nueva crea agua adicional','La infraestructura transporta agua, pero no aumenta por sí sola la recarga.']
    ],'La gestión de recursos debe considerar el balance entre extracción y reposición y sus efectos distribuidos. La eficiencia técnica no reemplaza evaluar la sostenibilidad de la fuente.','Uso del agua y límites de renovación.','Compara entradas, salidas y necesidades antes de proponer expansión.'),
    Q('intermedio','caso','Caso hipotético: un proyecto promete empleo, pero removería bosque de una ladera próxima a viviendas. ¿Qué evaluación es más completa?','Comparar beneficios, riesgos, alternativas de ubicación y medidas preventivas con participación de las personas afectadas',[
      ['Aprobarlo considerando únicamente el número de empleos anunciado','Ese indicador no incluye impactos ambientales ni distribución de riesgos.'],
      ['Concluir sin estudiar que toda actividad económica tiene el mismo impacto','Las alternativas pueden tener impactos diferentes.'],
      ['Evaluarlo solo después de que ocurra un deslizamiento','La prevención requiere estudiar riesgos antes del daño.']
    ],'Una evaluación integral incorpora seguridad, empleo, ecosistemas y alternativas. La deforestación puede alterar estabilidad e infiltración; el riesgo concreto requiere estudio del sitio.','Uso del suelo y evaluación sostenible.','Compara alternativas antes de presentar una decisión como inevitable.',{sources:['riesgo','ambiente']})
  ]);
  S('AMB',area,'Gestión del riesgo y ordenamiento territorial',8,[
    Q('intermedio','caso','Caso hipotético: dos escuelas sienten el mismo sismo; una tiene construcción reforzada y rutas despejadas, la otra presenta daños estructurales previos. ¿Qué explica diferencias de riesgo?','La vulnerabilidad y las condiciones de exposición, además de la amenaza sísmica',[
      ['La amenaza por sí sola determina un daño idéntico','Edificaciones y capacidades distintas pueden producir impactos diferentes.'],
      ['Preparar rutas impide físicamente que ocurra un sismo','La preparación reduce efectos, no detiene el fenómeno tectónico.'],
      ['Una construcción reforzada elimina cualquier posibilidad de daño','Reduce vulnerabilidad, pero no garantiza riesgo nulo.']
    ],'El riesgo depende de la amenaza y de quiénes o qué están expuestos, su vulnerabilidad y capacidades. Mejorar construcción y preparación reduce posibles consecuencias.','Amenaza, exposición, vulnerabilidad y capacidad.','Distingue el fenómeno de las condiciones que favorecen el daño.',R),
    Q('intermedio','fuente','¿Qué propósito de la evaluación ambiental refleja el texto?','Anticipar impactos para prevenir o reducir daños antes de ejecutar un proyecto',[
      ['Garantizar que toda obra carece de cualquier riesgo','Evaluar no equivale a demostrar riesgo nulo.'],
      ['Sustituir el análisis técnico por una promesa de buena intención','La prevención requiere información y examen de alternativas.'],
      ['Considerar los efectos únicamente después de finalizar la obra','El texto enfatiza la evaluación previa.']
    ],'La legislación ambiental incorpora instrumentos de evaluación y prevención. Los procedimientos específicos y sus requisitos deben consultarse en las disposiciones oficiales aplicables al proyecto.','Prevención y evaluación de impacto ambiental.','No confundas evaluar un proyecto con aprobarlo automáticamente.',T('Paráfrasis educativa de la finalidad preventiva de la evaluación ambiental: examinar impactos antes de ejecutar una actividad permite valorar alternativas y medidas para evitar o reducir efectos negativos.',['ambiente'],'Paráfrasis didáctica del enfoque de evaluación ambiental')),
    Q('intermedio','fuente','¿Qué distinción sobre inundaciones permite el pasaje?','La lluvia es una amenaza; ocupar zonas inundables y tener drenajes deficientes puede aumentar el riesgo',[
      ['La presencia de lluvia prueba que no influyen decisiones territoriales','La localización y la infraestructura modifican exposición y vulnerabilidad.'],
      ['Toda inundación tiene idénticos efectos en cualquier comunidad','Importan ubicación, construcciones, capacidades y condiciones locales.'],
      ['Limpiar un drenaje elimina para siempre cualquier inundación','Es una medida útil, pero no suprime todas las amenazas ni condiciones de riesgo.']
    ],'El riesgo de desastre no se explica solo por el evento natural. La ocupación del territorio, la infraestructura y la preparación pueden aumentar o reducir consecuencias.','Construcción social del riesgo de inundación.','Relaciona evento, lugar, infraestructura y población expuesta.',T('Noticia simulada de una localidad salvadoreña ficticia: una lluvia intensa desborda una quebrada. Los daños son mayores donde se construyó sobre una planicie inundable y los drenajes presentan obstrucciones.',['riesgo'],'Noticia simulada para análisis')),
    Q('intermedio','fuente','¿Qué decisión preventiva es consistente con el texto sobre deslizamientos?','Estudiar la ladera, conservar cobertura adecuada y evitar ocupación insegura según la evaluación técnica',[
      ['Asumir estabilidad porque la pendiente se ve seca hoy','Las condiciones pueden cambiar con lluvias y saturación.'],
      ['Retirar vegetación de toda ladera para impedir la lluvia','Eliminar cobertura no impide precipitaciones y puede agravar erosión.'],
      ['Usar solo rumores de vecinos como sustituto de un estudio','El conocimiento local aporta información, pero no reemplaza la evaluación técnica.']
    ],'La pendiente, materiales, agua, cobertura y obras influyen en la estabilidad. Las medidas deben ajustarse al sitio y acompañarse de vigilancia y planificación.','Prevención de deslizamientos.','Evita soluciones universales sin revisar condiciones del terreno.',T('Texto didáctico: en una ladera, lluvias prolongadas pueden saturar el suelo. Cortes sin diseño adecuado y pérdida de cobertura pueden alterar su estabilidad y aumentar la exposición de viviendas.',['riesgo'])),
    Q('intermedio','relacion','¿Qué cadena causal explica un efecto posible de la deforestación en una cuenca?','Menor cobertura y protección del suelo pueden favorecer erosión y arrastre de sedimentos hacia ríos',[
      ['Quitar árboles elimina necesariamente la escorrentía','La pérdida de cobertura puede aumentar escorrentía y erosión según condiciones locales.'],
      ['Más sedimento significa siempre mejor agua para consumo','El sedimento no garantiza calidad sanitaria y puede dificultar tratamiento.'],
      ['La cobertura vegetal no tiene ninguna relación con el suelo','Raíces y cobertura participan en protección y dinámica del suelo.']
    ],'La vegetación ayuda a proteger el suelo y regular flujos de agua. Los efectos dependen del terreno y de los usos posteriores, por lo que se habla de mecanismos posibles, no de resultados idénticos en todo sitio.','Deforestación, erosión y cuencas.','Sigue el recorrido del agua y del suelo desde la parte alta hasta el río.',R),
    Q('intermedio','relacion','¿Cómo se complementan mitigación del cambio climático y adaptación?','Reducir emisiones actúa sobre causas; preparar infraestructura y servicios resilientes reduce impactos de cambios climáticos',[
      ['Adaptarse significa aumentar emisiones para calentar más rápido','La adaptación busca disminuir daños y vulnerabilidad.'],
      ['Mitigar consiste únicamente en evacuar durante una tormenta','La evacuación es una medida de respuesta y preparación, no reducción de emisiones.'],
      ['Una medida de adaptación elimina toda necesidad de mitigar','Son respuestas complementarias a causas y efectos.']
    ],'Mitigación climática y adaptación atienden dimensiones distintas. Una ciudad puede reducir consumo fósil y a la vez mejorar drenajes y proteger fuentes de agua.','Causas e impactos del cambio climático.','En contexto climático, pregunta si la medida reduce emisiones o reduce impactos.',{sources:['clima','riesgo']})
  ]);
  S('AMB',area,'Demografía, población y urbanización',14,[
    Q('intermedio','relacion','¿Qué factores determinan el cambio del número de habitantes durante un período?','Nacimientos menos defunciones, más llegadas menos salidas migratorias',[
      ['Solo los nacimientos, sin considerar otras variaciones','Defunciones y migración también modifican el total.'],
      ['El área del territorio multiplicada por su temperatura','No expresa los componentes del cambio poblacional.'],
      ['Solo el número de nuevas construcciones','Las viviendas no equivalen automáticamente a personas residentes.']
    ],'El cambio poblacional combina crecimiento natural y saldo migratorio. Para interpretarlo deben usarse el mismo territorio, período y unidad de población.','Natalidad, mortalidad y migración.','Ordena entradas y salidas antes de sumar.'),
    Q('intermedio','relacion','¿Por qué la expansión urbana sin planificación puede agravar desigualdades de acceso?','Las viviendas pueden crecer más rápido que las redes de agua, transporte y equipamientos',[
      ['Porque toda ciudad grande carece necesariamente de servicios','El tamaño no determina por sí solo la cobertura; también importa la planificación.'],
      ['Porque construir viviendas crea automáticamente hospitales y tuberías','Son infraestructuras distintas que requieren inversión y coordinación.'],
      ['Porque el acceso depende exclusivamente de decisiones individuales','La localización, las redes y los costos también condicionan oportunidades.']
    ],'Cuando la infraestructura no acompaña el crecimiento, aumentan trayectos, costos y riesgos. El ordenamiento puede coordinar vivienda, servicios, protección ambiental y seguridad.','Urbanización no planificada e infraestructura.','Compara dónde crecen las viviendas y dónde llegan los servicios.'),
    Q('avanzado','datos','Según el mapa ficticio, ¿qué criterio es más justo para priorizar mejoras de acceso al agua?','Estudiar primero la alta carencia de Este sin asumir que densidad alta equivale a buena cobertura',[
      ['Elegir solo Norte porque su densidad es mayor','Norte tiene mayor densidad, pero menor porcentaje sin acceso.'],
      ['Descartar Este porque tiene menos habitantes por km²','La menor densidad no elimina la necesidad ni la brecha de acceso.'],
      ['Afirmar que el mapa identifica la causa exacta de cada carencia','Los indicadores localizan diferencias, pero no prueban todas sus causas.']
    ],'Este presenta 45% sin acceso y Norte 10%. Densidad y cobertura describen dimensiones distintas; la priorización también requiere conocer personas afectadas, costos y condiciones técnicas.','Distribución territorial y brechas de servicios.','No uses densidad como sustituto de un indicador de acceso.',{visual:{kind:'map',caption:'Mapa esquemático ficticio de acceso al agua; no representa el territorio real de El Salvador',unit:'personas/km²; porcentaje sin acceso',cells:[['Norte','800 hab/km² · 10% sin acceso',10],['Este','200 hab/km² · 45% sin acceso',45],['Sur','400 hab/km² · 20% sin acceso',20]],legend:'Color más intenso: mayor porcentaje sin acceso al agua.'}}),
    Q('avanzado','datos','¿Qué balance poblacional corresponde a los datos simulados?','Aumento de 50 habitantes: (120 − 80) + (60 − 50)',[
      ['Aumento de 120 habitantes','Eso cuenta solo nacimientos e ignora defunciones y migración.'],
      ['Disminución de 50 habitantes','Los saldos natural y migratorio son positivos: 40 y 10.'],
      ['Aumento de 310 habitantes','Sumar todos los flujos como entradas ignora que defunciones y salidas restan.']
    ],'El crecimiento natural es 40 y el saldo migratorio 10. Su suma da 50; no es una tasa porque no se proporcionó población inicial.','Balance demográfico y unidades.','Identifica qué valores suman residentes y cuáles los restan.',{visual:{kind:'table',caption:'Datos simulados: cambios de una localidad durante un año',headers:['Componente','Personas'],rows:[['Nacimientos',120],['Defunciones',80],['Llegadas',60],['Salidas',50]]}}),
    Q('avanzado','datos','¿Qué comparación de densidad es correcta?','A tiene 500 habitantes/km² y B 200 habitantes/km², aunque B posee más habitantes',[
      ['B tiene mayor densidad porque su población es mayor','Debe dividirse población entre superficie, no comparar solo habitantes.'],
      ['A tiene 20 habitantes/km²','10 000/20 = 500; se invirtió o alteró la operación.'],
      ['La densidad permite concluir cuántos hogares tienen agua segura','No mide directamente cobertura ni calidad del servicio.']
    ],'Densidad = población/superficie: A = 10 000/20 = 500 y B = 20 000/100 = 200. Una mayor población total puede distribuirse en un territorio mucho más grande.','Densidad y distribución poblacional.','Escribe las unidades: habitantes divididos entre km².',{visual:{kind:'table',caption:'Datos simulados: dos territorios ficticios',headers:['Territorio','Habitantes','Superficie (km²)'],rows:[['A',10000,20],['B',20000,100]]}}),
    Q('avanzado','datos','¿Qué lectura de la gráfica de urbanización evita confundir porcentaje con cantidad absoluta?','La proporción urbana aumenta, pero falta la población total para saber cuántas personas viven en ciudades',[
      ['La población urbana aumentó exactamente en 20 personas','Son 20 puntos porcentuales, no 20 personas.'],
      ['La proporción rural es 80% en el período 3','Si urbana es 80%, rural es 20% en esta clasificación de dos categorías.'],
      ['El aumento prueba que todos los barrios tienen servicios completos','La distribución urbana no informa sobre cobertura de servicios.']
    ],'La proporción urbana pasa de 60% a 80%, un aumento de 20 puntos porcentuales. Sin totales no se calcula el aumento absoluto ni la calidad de vida urbana.','Urbanización y lectura de porcentajes.','Separa porcentaje urbano, número de habitantes y acceso a servicios.',{visual:{kind:'bars',caption:'Datos simulados: proporción urbana de una población ficticia; rural = complemento a 100%',unit:'% de población urbana',rows:[['Período 1',60],['Período 2',70],['Período 3',80]]}}),
    Q('avanzado','datos','¿Qué medida responde a la representación ficticia de riesgo sin trasladar el problema a otra zona vulnerable?','Evaluar alternativas seguras de localización y mejorar preparación, drenajes e infraestructura según cada zona',[
      ['Trasladar viviendas de A a B solo porque B tiene menos residentes','B también presenta amenaza alta; menos habitantes no equivale a seguridad.'],
      ['Construir más viviendas en A porque la población ya se acostumbró','La costumbre no elimina la amenaza ni la vulnerabilidad.'],
      ['Declarar riesgo nulo en C porque aparece amenaza baja','Amenaza baja no significa ausencia absoluta de riesgo.']
    ],'El mapa combina localización de población y niveles relativos de amenaza. Una decisión requiere estudios de vulnerabilidad, infraestructura y participación; el esquema no sustituye un mapa oficial.','Ordenamiento, exposición y evaluación de alternativas.','No reduzcas el riesgo a una sola cifra ni confundas baja amenaza con seguridad absoluta.',{sources:['riesgo'],visual:{kind:'map',caption:'Mapa de riesgo didáctico y ficticio: zonas de una ciudad imaginaria; no usar para decisiones reales de seguridad',unit:'residentes; amenaza de inundación',cells:[['A','600 residentes · amenaza alta',90],['B','100 residentes · amenaza alta',90],['C','300 residentes · amenaza baja',20]],legend:'Color ámbar más intenso: mayor nivel relativo de amenaza. No representa probabilidad numérica.'}})
  ]);
})();
