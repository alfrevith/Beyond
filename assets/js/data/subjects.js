/* Add future question banks and guides here. The lobby and engine read this registry. */
window.Beyond = window.Beyond || {};
window.Beyond.subjects = [
  {
    id: 'matematica', name: 'Matemática', shortName: 'Matemática', icon: 'math',
    color: 'amber', available: true, label: 'Piensa, resuelve y comprende.',
    description: 'De las fracciones a la geometría. Refuerza tus bases y descubre el porqué de cada respuesta.',
    questions: window.Beyond.mathQuestions, guides: window.Beyond.mathGuides,
    storageKey: 'beyond_matematica_v1', legacyKeys: ['avanzo_matematica_v1', 'esen_diagnostico_100_v1']
  },
  {
    id: 'ciencias', name: 'Ciencias', shortName: 'Ciencias', icon: 'science',
    color: 'green', available: false, label: 'Explora cómo funciona el mundo.',
    description: 'Un espacio para comprender la naturaleza, conectar conceptos y aprender con ejemplos.',
    questions: [], guides: {}, storageKey: 'beyond_ciencias_v1', legacyKeys: ['avanzo_ciencias_v1']
  },
  {
    id: 'ciudadania', name: 'Ciudadanía y valores', shortName: 'Ciudadanía y valores', icon: 'community',
    color: 'orange', available: false, label: 'Aprende a construir comunidad.',
    description: 'Reflexiona sobre la convivencia, los derechos y las decisiones que compartimos como sociedad.',
    questions: [], guides: {}, storageKey: 'beyond_ciudadania_v1', legacyKeys: ['avanzo_ciudadania_v1']
  }
];
