window.Beyond = window.Beyond || {};
window.Beyond.scienceGuides = {
  'Cinemática y dinámica': {
    idea:'Describe el movimiento con posición, velocidad y aceleración; después analiza las fuerzas que lo cambian. En MRU la velocidad es constante; en MRUA la aceleración es constante. La gravedad sigue actuando incluso en el punto más alto de un tiro vertical.',
    rule:'v = d/t en MRU; v = v₀ + at y Δx = v₀t + at²/2 en MRUA. Fnet = ma. Trabajo de fuerza constante: W = Fd cosθ; potencia: P = W/t. Ec = mv²/2; Ep = mgh.',
    example:'Una fuerza neta de 12 N sobre 4 kg produce 3 m/s². Al elevar una caja el mismo desnivel en menos tiempo se hace igual trabajo de elevación, pero con mayor potencia media.',
    tip:'Primera ley: fuerza neta cero implica velocidad constante. Segunda: usa la suma de fuerzas. Tercera: acción y reacción actúan sobre cuerpos distintos. Ec + Ep se conserva si no hay disipación ni aportes externos.'
  },
  'Fluidos y termodinámica': {
    idea:'Presión es fuerza normal por área. En un fluido en reposo aumenta con la profundidad. El empuje equivale al peso del fluido desplazado. Calor es energía transferida por diferencia de temperatura; temperatura no es cantidad de calor.',
    rule:'P = F/A; Pabs = Patm + ρgh; E = ρgV. Pascal: F₁/A₁ = F₂/A₂ en el modelo ideal. K = °C + 273.15; °F = 9°C/5 + 32. Sin cambio de fase: Q = mcΔT.',
    example:'Conducción: una cuchara metálica se calienta por contacto. Convección: el agua circula al calentarse. Radiación: la energía del Sol llega por ondas electromagnéticas, incluso a través del vacío.',
    tip:'Un objeto flotante en reposo tiene empuje igual a peso. Jeringas cerradas transmiten presión; una prensa puede aumentar fuerza a cambio de menor recorrido. No confundas presión manométrica con absoluta.'
  },
  'Electromagnetismo y circuitos': {
    idea:'Cargas iguales se repelen; opuestas se atraen. El campo señala la fuerza sobre una carga positiva de prueba. Voltaje es diferencia de potencial, corriente es flujo de carga y resistencia se opone a ese flujo.',
    rule:'Coulomb: F = k|q₁q₂|/r². Campo: E = F/q. Ohm: V = IR. Serie: Req = ΣR y corriente común. Paralelo: 1/Req = Σ(1/R) y voltaje común. Consumo: energía = potencia × tiempo.',
    example:'Dos resistores de 6 Ω en paralelo tienen Req = 3 Ω. Con fuente de 12 V, cada rama conduce 2 A y la fuente suministra 4 A. Si se abre una rama, la otra sigue recibiendo 12 V con una fuente ideal.',
    tip:'No mezcles W, medida de potencia, con Wh o kWh, medidas de energía. En las fórmulas identifica los voltajes de cada elemento y distingue corriente de rama y corriente total.'
  },
  'Ondas y óptica': {
    idea:'Las ondas transportan energía. El sonido necesita un medio material; la luz no. Frecuencia cuenta ciclos por segundo y período mide la duración de un ciclo. Longitud de onda es distancia entre puntos consecutivos en la misma fase.',
    rule:'v = λf; T = 1/f. En reflexión θincidente = θreflejado, medidos desde la normal. En una frontera estacionaria la frecuencia se conserva, mientras rapidez y longitud de onda pueden cambiar.',
    example:'Si la rapidez en una cuerda no cambia, duplicar f reduce λ a la mitad. Una convergente con objeto entre f y 2f forma imagen real, invertida y mayor; una divergente con objeto real forma imagen virtual, derecha y menor.',
    tip:'Mide ángulos desde la normal, no desde la superficie. Una convergente también puede formar imagen virtual y aumentada si el objeto está dentro de f.'
  },
  'Estructura atómica y tabla periódica': {
    idea:'El núcleo contiene protones y neutrones; electrones ocupan estados descritos por el modelo cuántico. Rutherford aportó evidencia de un núcleo pequeño; los modelos se modifican con nuevas observaciones.',
    rule:'Z = protones; A = protones + neutrones. Un átomo neutro tiene igual cantidad de protones y electrones. Los grupos son columnas y los períodos filas; la configuración electrónica ayuda a interpretar valencia y nivel externo.',
    example:'Na, Z = 11: 1s² 2s² 2p⁶ 3s¹, tercer período y un electrón de valencia. En un período, generalmente disminuye el radio y aumenta electronegatividad hacia la derecha; al bajar en un grupo suele aumentar el radio.',
    tip:'Isótopos difieren en neutrones; iones, en electrones. Enlace iónico: atracción de iones; covalente: pares compartidos; metálico: electrones deslocalizados. Las tendencias periódicas tienen excepciones.'
  },
  'Reacciones y estequiometría': {
    idea:'Una reacción reorganiza átomos. Síntesis combina sustancias; descomposición separa un compuesto; sustitución simple desplaza un elemento; combustión implica reacción con un oxidante y liberación de energía.',
    rule:'Balancea sin alterar subíndices. Un mol contiene exactamente 6.02214076 × 10²³ entidades; para cálculos escolares puede usarse 6.02 × 10²³. n = m/M; N = nNA. Los coeficientes balanceados establecen proporciones molares.',
    example:'2H₂ + O₂ → 2H₂O. Con 3 mol de H₂ y 1 mol de O₂, el O₂ limita la reacción: produce 2 mol de agua y sobra 1 mol de H₂.',
    tip:'Cuenta también los gases al comprobar conservación de masa. Identifica el reactivo limitante antes de calcular producto; “menor número de moles” no basta sin mirar los coeficientes.'
  },
  'Soluciones químicas': {
    idea:'El solvente disuelve al soluto y la mezcla homogénea es la solución. Una solución saturada está en el límite de solubilidad para las condiciones dadas; una insaturada puede disolver más.',
    rule:'% m/m = 100 × masa de soluto/masa de solución. % v/v = 100 × volumen de soluto/volumen final de solución. Molaridad C = n/V, con V en litros. En diluidas, pH ≈ −log₁₀[H₃O⁺].',
    example:'10 g de sal más 90 g de agua forman 100 g de solución al 10% m/m. A 25 °C, pH menor de 7 es ácido y mayor de 7 es básico; dos unidades de pH representan aproximadamente un factor 100 en H₃O⁺.',
    tip:'No uses masa o volumen del solvente como denominador de concentración. La neutralización de ácido fuerte y base fuerte en cantidades equivalentes da una solución aproximadamente neutra; no toda neutralización da pH 7.'
  },
  'Química orgánica': {
    idea:'El carbono forma cuatro enlaces covalentes y puede construir cadenas y anillos. Los grupos funcionales ayudan a relacionar estructuras con familias de compuestos.',
    rule:'En cadenas abiertas sencillas: alcanos, enlaces C–C simples; alquenos, C=C; alquinos, C≡C. Alcohol: –OH en carbono saturado; ácido carboxílico: –COOH; éster: –COO– entre grupos carbonados.',
    example:'CH₃CH₂OH es un alcohol; CH₃COOH, un ácido carboxílico; CH₃COOCH₂CH₃, un éster. Todos contienen oxígeno, pero su conectividad cambia.',
    tip:'Cuenta enlaces, incluidos dobles y triples, para verificar valencia. No clasifiques una molécula solo por contener un elemento o por su olor.'
  },
  'Célula y fisiología celular': {
    idea:'Procariotas y eucariotas tienen membrana, ADN y ribosomas; solo las eucariotas poseen núcleo membranoso. Vegetales fotosintéticas tienen cloroplastos y pared de celulosa; también tienen mitocondrias.',
    rule:'Membrana: transporte selectivo. Núcleo: almacena gran parte del ADN eucariota. Ribosomas: proteínas. Mitocondrias: etapas de respiración aeróbica. Cloroplastos: fotosíntesis. Ciclo celular: G1, S, G2 y división; S replica ADN.',
    example:'Mitosis mantiene normalmente el número de cromosomas y produce dos hijas. Meiosis reduce ploidía y forma productos haploides con variación. La célula puede duplicar ADN sin duplicar de inmediato su conteo de cromosomas por centrómeros.',
    tip:'Las plantas respiran también durante el día. En ósmosis importa la concentración de solutos no permeantes. En experimentos, distingue variable manipulada, variable medida y controles.'
  },
  'Genética y evolución': {
    idea:'ADN y ARN contienen nucleótidos. Genes son regiones de ADN en cromosomas; alelos son variantes. Genotipo es combinación de alelos y fenotipo su manifestación, influida también por el ambiente.',
    rule:'Transcripción: ADN → ARN. Traducción: ARNm → proteína. En Aa × Aa: AA, Aa, Aa, aa. En AaBb × aabb con genes independientes: AaBb, Aabb, aaBb, aabb, cada uno con 25%.',
    example:'Selección natural favorece variantes heredables con mayor éxito reproductivo en un ambiente. La síntesis evolutiva integra genética, variación y selección, además de mecanismos como deriva y flujo génico.',
    tip:'Dominante no significa más frecuente ni mejor. La segregación separa alelos; la distribución independiente exige condiciones como genes no ligados. Las probabilidades no garantizan resultados exactos en familias pequeñas.'
  },
  'Anatomía y fisiología humana': {
    idea:'Los sistemas funcionan integrados: nervioso coordina señales rápidas; endocrino usa hormonas; circulatorio transporta; respiratorio intercambia gases; digestivo transforma y absorbe nutrientes; inmunitario reconoce y responde.',
    rule:'Homeostasis: regulación dinámica de variables. Retroalimentación negativa contrarresta una desviación. Arterias llevan sangre desde el corazón y venas la devuelven; no se definen por oxigenación.',
    example:'Después de una comida, señales endocrinas ayudan a regular glucosa. Pulmones oxigenan sangre que luego llega a tejidos. La bilis emulsiona grasas y las lipasas las digieren. La memoria inmunitaria favorece respuesta posterior específica.',
    tip:'No confundas ventilación con respiración celular, antígeno con anticuerpo ni bilis con enzima. Estos ejemplos explican fisiología general y no sirven para diagnosticar personas.'
  },
  'Ecosistemas y dinámica ecológica': {
    idea:'Individuo → población de una especie → comunidad de poblaciones → ecosistema con componentes abióticos. Productores, consumidores y descomponedores conectan materia y energía.',
    rule:'Las flechas tróficas van de alimento a consumidor. Energía fluye y se disipa; nutrientes se reciclan. Agua: evaporación, transpiración, condensación, lluvia, infiltración y escorrentía. Carbono: fotosíntesis, respiración, descomposición y combustión.',
    example:'Ciertas bacterias fijan N₂; otras transforman compuestos nitrogenados por nitrificación y desnitrificación. El fósforo pasa de rocas a suelo, organismos y sedimentos, sin una fase gaseosa atmosférica importante.',
    tip:'La eficiencia entre niveles tróficos varía; 10% es una aproximación de algunos ejemplos, no una ley universal. No confundir flujo de energía con ciclo de materia.'
  },
  'Geología y fenómenos naturales': {
    idea:'Corteza, manto y núcleo son capas composicionales. La litosfera rígida incluye corteza y manto superior y se divide en placas. El manto no es globalmente líquido.',
    rule:'Límites divergentes separan placas; convergentes las acercan; transformantes producen deslizamiento lateral. La subducción introduce una placa bajo otra; la liberación de fluidos puede favorecer fusión parcial del manto suprayacente.',
    example:'La subducción de Cocos bajo la región del Caribe contribuye a sismos y volcanismo de El Salvador. También hay fallas corticales. Los sismos liberan energía acumulada y no todos están ligados a erupciones.',
    tip:'Riesgo combina amenaza, exposición y vulnerabilidad. Una sola estación no localiza por sí sola un epicentro. No se puede dar una predicción exacta general de fecha y magnitud del próximo sismo.'
  },
  'Medio ambiente y recursos naturales': {
    idea:'Las actividades humanas pueden alterar agua, aire, suelo y biodiversidad. La sostenibilidad integra necesidades sociales con conservación de funciones ecológicas y disponibilidad futura de recursos.',
    rule:'Exceso de nutrientes puede causar eutrofización. Cobertura vegetal limita erosión. Los gases de efecto invernadero interactúan con radiación infrarroja; su aumento altera el balance energético. Recursos renovables también pueden sobreexplotarse.',
    example:'Una comunidad puede combinar protección de riberas, manejo de fertilizantes, corredores biológicos y separación de residuos. Compostar orgánicos no implica mezclar pilas o residuos peligrosos con ellos.',
    tip:'No inventes datos nacionales para explicar un mecanismo. Distingue clima de tiempo diario, cambio climático de agotamiento de ozono y retirar un residuo de tratarlo apropiadamente.'
  }
};
window.Beyond.scienceSources = [
  {title:'OpenStax · Segunda ley de Newton',url:'https://openstax.org/books/college-physics-2e/pages/4-3-newtons-second-law-of-motion-concept-of-a-system'},
  {title:'OpenStax · Molaridad',url:'https://openstax.org/books/chemistry-2e/pages/3-3-molarity'},
  {title:'OpenStax · Estequiometría',url:'https://openstax.org/books/chemistry-2e/pages/4-3-reaction-stoichiometry'},
  {title:'OpenStax · Herencia mendeliana',url:'https://openstax.org/books/biology-2e/pages/12-3-laws-of-inheritance'},
  {title:'OpenStax · Meiosis',url:'https://openstax.org/books/biology-2e/pages/11-1-the-process-of-meiosis'},
  {title:'OpenStax · Ciclos biogeoquímicos',url:'https://openstax.org/books/biology-2e/pages/46-3-biogeochemical-cycles'},
  {title:'USGS · Sismicidad y tectónica de El Salvador',url:'https://www.usgs.gov/publications/seismicity-and-tectonics-el-salvador'}
];
