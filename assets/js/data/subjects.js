/* Add future question banks and guides here. The lobby and engine read this registry. */
window.Beyond = window.Beyond || {};
window.Beyond.subjects = [
  {
    id: 'matematica', name: 'Matemática', shortName: 'Matemática', icon: 'math',
    color: 'amber', available: true, label: 'Piensa, resuelve y comprende.',
    description: 'De las fracciones a la geometría. Refuerza tus bases y descubre el porqué de cada respuesta.',
    questions: window.Beyond.mathLearningQuestions, guides: window.Beyond.mathGuides,
    advanced: true, sources: [], bankVersion: window.Beyond.mathBankVersion,
    legacyUnversionedBankVersion: 'matematica-1',
    study: {subtitle:'Resuelve con calma, confirma y comprende cada paso.',areas:'NÚMEROS · ÁLGEBRA · ESTADÍSTICA · GEOMETRÍA',title:'El resultado importa. Entenderlo, más.',areaLabel:'áreas matemáticas'},
    storageKey: 'beyond_matematica_v1', legacyKeys: ['avanzo_matematica_v1', 'esen_diagnostico_100_v1']
  },
  {
    id: 'ciencias', name: 'Ciencias Naturales', shortName: 'Ciencias', icon: 'science',
    color: 'green', available: true, label: 'Explora cómo funciona el mundo.',
    description: 'Un espacio para comprender la naturaleza, conectar conceptos y aprender con ejemplos.',
    questions: window.Beyond.scienceQuestions, guides: window.Beyond.scienceGuides,
    advanced: true, sources: window.Beyond.scienceSources,
    study: {subtitle:'Observa, plantea una explicación y compruébala.', areas:'FÍSICA · QUÍMICA · BIOLOGÍA · ECOLOGÍA', title:'Entiende cómo funciona tu mundo.', areaLabel:'áreas científicas'},
    bankVersion: window.Beyond.scienceBankVersion, storageKey: 'beyond_ciencias_v1', legacyKeys: ['avanzo_ciencias_v1']
  },
  {
    id: 'ciudadania', name: 'Ciudadanía y valores', shortName: 'Ciudadanía y valores', icon: 'community',
    color: 'orange', available: true, label: 'Aprende a construir comunidad.',
    description: 'Reflexiona sobre la convivencia, los derechos y las decisiones que compartimos como sociedad.',
    questions: window.Beyond.citizenshipQuestions, guides: window.Beyond.citizenshipGuides,
    advanced: true, sources: window.Beyond.citizenshipSources,
    study: {subtitle:'Comprende el pasado, piensa con criterio y participa.', areas:'SOCIEDAD · HISTORIA · DERECHOS · GLOBALIZACIÓN · TERRITORIO', title:'Comprende tu sociedad. Construye tu mañana.', areaLabel:'áreas sociales'},
    bankVersion: window.Beyond.citizenshipBankVersion,
    storageKey: 'beyond_ciudadania_v1', legacyKeys: ['avanzo_ciudadania_v1']
  }
];
