/* Add future question banks and guides here. The lobby and engine read this registry. */
window.Avanzo = window.Avanzo || {};
window.Avanzo.subjects = [
  {
    id: 'matematica', name: 'Matemática', shortName: 'Matemática', icon: 'math',
    color: 'purple', available: true, label: 'Piensa, resuelve y comprende.',
    description: 'De las fracciones a la geometría. Refuerza tus bases y descubre el porqué de cada respuesta.',
    questions: window.Avanzo.mathQuestions, guides: window.Avanzo.mathGuides,
    storageKey: 'avanzo_matematica_v1', legacyKey: 'esen_diagnostico_100_v1'
  },
  {
    id: 'ciencias', name: 'Ciencias', shortName: 'Ciencias', icon: 'science',
    color: 'green', available: false, label: 'Explora cómo funciona el mundo.',
    description: 'Un espacio para comprender la naturaleza, conectar conceptos y aprender con ejemplos.',
    questions: [], guides: {}, storageKey: 'avanzo_ciencias_v1'
  },
  {
    id: 'ciudadania', name: 'Ciudadanía y valores', shortName: 'Ciudadanía y valores', icon: 'community',
    color: 'orange', available: false, label: 'Aprende a construir comunidad.',
    description: 'Reflexiona sobre la convivencia, los derechos y las decisiones que compartimos como sociedad.',
    questions: [], guides: {}, storageKey: 'avanzo_ciudadania_v1'
  }
];
