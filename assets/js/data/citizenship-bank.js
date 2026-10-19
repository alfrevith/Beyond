window.Beyond.citizenshipQuestions = [];
window.Beyond.citizenshipBankVersion = 'ciudadania-1';
window.Beyond.citizenshipBank = window.Beyond.createQuestionBank(window.Beyond.citizenshipQuestions, 479321);
/* All passages are our own educational writing. References support the underlying
   facts and principles, not the fictional speakers, places or numerical data. */
window.Beyond.citizenshipText = (text, sources = [], label = 'Texto didáctico original') => ({
  context: { text, label }, sources
});
window.Beyond.citizenshipSources = [
  {id:'constitucion',title:'Asamblea Legislativa: Constitución de la República y reformas',url:'https://www.asamblea.gob.sv/leyes-y-decretos/constitucion'},
  {id:'legalidad',title:'Documentación Judicial: competencias y principio de legalidad constitucional (2025)',url:'https://www.jurisprudencia.gob.sv/DocumentosBoveda/E/1/2020-2029/2025/10/10F83C.HTML?embedded=true'},
  {id:'historia',title:'MINED: Historia de El Salvador, tomo II (contexto histórico)',url:'https://www.mined.gob.sv/descarga/cipotes/historia_ESA_TomoII_0_.pdf'},
  {id:'paz',title:'Naciones Unidas: ONUSAL y el proceso de paz (registro histórico)',url:'https://peacekeeping.un.org/sites/default/files/past/onusalbackgr2.html'},
  {id:'dudh',title:'Naciones Unidas: Declaración Universal de Derechos Humanos',url:'https://www.un.org/es/about-us/universal-declaration-of-human-rights'},
  {id:'tse',title:'TSE: obligaciones y atribuciones institucionales',url:'https://tse.gob.sv/publico/obligaciones-atribuciones'},
  {id:'pddh',title:'PDDH: Plan estratégico institucional 2024–2026 y atribuciones del art. 194',url:'https://www.pddh.gob.sv/portal/wp-content/uploads/2024/07/plan-estrategico-institucional-2024-2026.pdf'},
  {id:'ambiente',title:'MARN: Sistema de Evaluación Ambiental (consultar requisitos vigentes)',url:'https://www.ambiente.gob.sv/servicios/sistemadeevaluacionambiental/'},
  {id:'clima',title:'NASA Ciencia: causas del cambio climático',url:'https://ciencia.nasa.gov/cambio-climatico/causas/'},
  {id:'riesgo',title:'MARN: Informe nacional de riesgos y vulnerabilidades 2017 (marco conceptual)',url:'https://rcc.marn.gob.sv/bitstream/handle/123456789/9/Informe%20Nacional%20del%20Estado%20de%20los%20Riesgos%20y%20Vulnerabilidad%202017.pdf?isAllowed=y&sequence=1'}
];
