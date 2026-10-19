const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const {DATA_FILES,loadScience,validateScience}=require('../scripts/validate-science.cjs');
const {DATA_FILES:CITIZENSHIP_FILES}=require('../scripts/validate-citizenship.cjs');
function setup(initial={},blocked=false,version){
  const values=new Map(Object.entries(initial));
  const context=vm.createContext({window:{},localStorage:{getItem(key){if(blocked)throw Error('blocked');return values.get(key)??null;},setItem(key,value){if(blocked)throw Error('blocked');values.set(key,value);}}});
  const scripts=['data/math-questions','data/math-guides','data/math-learning',...[...DATA_FILES,...CITIZENSHIP_FILES].map(n=>'data/'+n),'data/subjects','storage','quiz','science-session'];
  for(const file of scripts)vm.runInContext(fs.readFileSync(path.join(__dirname,'../assets/js',file+'.js'),'utf8'),context,{filename:file});
  const app=context.window.Beyond,subject=app.subjects.find(s=>s.id==='ciencias');
  if(version)subject.bankVersion=version;
  return {app,subject,values,quiz:app.createScienceQuiz(subject),math:app.createQuiz(app.subjects[0])};
}
test('Ciencias cumple todas las distribuciones, metadatos, distractores y recursos',()=>{
  const result=validateScience();assert.equal(result.questions,100);assert.equal(result.topics,14);
});
test('El validador rechaza claves duplicadas, distractores sin explicación y cálculos alterados',()=>{
  const duplicate=loadScience();duplicate.scienceQuestions[1].id=duplicate.scienceQuestions[0].id;assert.throws(()=>validateScience(duplicate));
  const feedback=loadScience();const q=feedback.scienceQuestions[0];q.feedback[(q.answer+1)%4]='';assert.throws(()=>validateScience(feedback));
  const numeric=loadScience();numeric.scienceQuestions[0].numeric.result=999;assert.throws(()=>validateScience(numeric));
  const equation=loadScience();equation.scienceQuestions.find(q=>q.equation).equation.reactants[0].coefficient=1;assert.throws(()=>validateScience(equation));
});
test('Los resultados numéricos correctos se comprueban independientemente de la clave del banco',()=>{
  const qs=loadScience().scienceQuestions;
  const expected={
    'FIS-001':`${150/3} km/h`,'FIS-003':`${10*2**2/2} m`,'FIS-004':`${20**2/(2*10)} m`,
    'FIS-006':`${12/4} m/s²`,'FIS-011':`${100/0.02} Pa`,'FIS-016':`${25+273.15} K y ${25*9/5+32} °F`,'FIS-019':'Se multiplica por 2/9',
    'QUI-010':'4, 3, 2','QUI-012':'3.01 × 10²³ moléculas','QUI-013':`${40+2*(16+1)} g/mol`,'QUI-014':`${Math.min(3/2,1)*2} mol`,
    'QUI-018':`${100*10/(10+90)} %`,'QUI-019':`${(5.85/58.5/0.5).toFixed(3)} mol/L`,
    'BIO-014':`${100*(1/2)*(1/2)} %`,'BIO-015':`${100*(1/4)*1} %`
  };
  for(const q of qs.filter(q=>q.type==='calculo'))assert.equal(q.opts[q.answer],expected[q.id],q.id);
});
test('Práctica y Matemática conservan primeras respuestas y guardados independientes',()=>{
  const {quiz,math,values}=setup();
  math.answer(math.questions[0].answer);quiz.start();
  assert.equal(quiz.answer(quiz.questions[0].answer),true);assert.equal(quiz.answer(2),false);
  quiz.tick(12);quiz.save();
  const restored=setup(Object.fromEntries(values));
  assert.equal(restored.quiz.practiceStats().correct,1);assert.equal(restored.quiz.state.elapsed,12);assert.equal(restored.math.stats().correct,1);
  restored.quiz.reset();assert.equal(restored.math.stats().correct,1);
});
test('El simulacro no expone puntuaciones, persiste al recargar y solo revela después de entregar',()=>{
  const {quiz,values}=setup();quiz.startExam();quiz.select(0);quiz.answer(quiz.questions[0].answer);quiz.tick(35);quiz.save();
  assert.equal(quiz.reveal,false);assert.equal(quiz.stats().hidden,true);assert.equal(quiz.stats().correct,0);assert.equal(quiz.areaStats('Física').correct,0);
  const restored=setup(Object.fromEntries(values)).quiz;restored.enter('entrega');assert.equal(restored.stats().done,1);assert.equal(restored.reveal,false);
  assert.equal(restored.submitExam(),true);assert.equal(restored.submitExam(),false);assert.equal(restored.stats().correct,1);assert.equal(restored.reveal,true);
  assert.equal(restored.history.length,1);assert.equal(restored.history[0].elapsed,35);
  restored.select(1);assert.equal(restored.answer(0),false);assert.equal(restored.practiceStats().done,0);
});
test('Repasar errores de un simulacro cambia solo los aciertos posteriores',()=>{
  const {quiz}=setup();quiz.startExam();quiz.select(0);const wrong=(quiz.questions[0].answer+1)%4;quiz.answer(wrong);quiz.submitExam();
  assert.equal(quiz.review(),true);assert.equal(quiz.ids().length,1);assert.equal(quiz.reviewOrigin,'simulacro');
  quiz.answer(quiz.questions[0].answer);assert.equal(quiz.reviewStats.correct,1);assert.equal(quiz.stats().wrong,1);
  assert.equal(quiz.history[0].answers[quiz.history[0].questions.findIndex(q=>q.id===quiz.questions[0].id)],wrong);assert.equal(quiz.practiceStats().done,0);
});
test('Filtros por área y tema, mezcla y recorrido completo conservan todos los identificadores',()=>{
  const {quiz}=setup();quiz.start('','Química');assert.equal(quiz.ids().length,25);
  quiz.start('Genética y evolución');assert.equal(quiz.ids().length,9);
  quiz.start('','',true);assert.equal(new Set(quiz.ids()).size,100);
  quiz.start();quiz.questions.forEach((q,i)=>{quiz.select(i);quiz.answer(q.answer);});
  assert.equal(quiz.stats().correct,100);assert.equal(quiz.history.length,1);
  assert.equal(quiz.areas.reduce((sum,a)=>sum+quiz.areaStats(a).correct,0),100);
});
test('Historial se conserva tras reiniciar práctica, permite revisar y no mezcla bancos de otra versión',()=>{
  const {quiz,values}=setup();quiz.startExam();quiz.select(0);quiz.answer(quiz.questions[0].answer);quiz.submitExam();const record=quiz.history[0];
  quiz.reset();assert.equal(quiz.history.length,1);quiz.openHistory(record.id);assert.equal(quiz.stats().correct,1);
  quiz.select(2);assert.equal(quiz.state.index,2);assert.equal(quiz.answer(0),false);
  const newer=setup(Object.fromEntries(values),false,'ciencias-2').quiz;
  assert.equal(newer.practiceStats().done,0);assert.equal(newer.exam,null);assert.equal(newer.history.length,1);
  newer.openHistory(record.id);assert.equal(newer.historyCompatible,false);assert.equal(newer.review(),false);
});
test('Sesiones corruptas y almacenamiento bloqueado permiten seguir estudiando',()=>{
  const bad=setup({beyond_ciencias_v1_sesiones:JSON.stringify({bankVersion:'ciencias-1',exam:{answers:[],order:[]},history:[{},null],reviewAnswers:{'FIS-001':99}})});
  assert.equal(bad.quiz.exam,null);assert.equal(bad.quiz.history.length,0);
  const blocked=setup({},true);blocked.quiz.startExam();blocked.quiz.select(0);assert.equal(blocked.quiz.answer(0),true);assert.equal(blocked.app.storage.isAvailable(),false);
});

test('Historial limita tamaño y los intentos nuevos no reemplazan resultados anteriores',()=>{
  const {quiz}=setup();
  for(let i=0;i<22;i++){quiz.startExam();quiz.select(0);quiz.answer(i%4);quiz.submitExam();}
  assert.equal(quiz.history.length,20);
  assert.equal(new Set(quiz.history.map(record=>record.id)).size,20);
  assert.equal(quiz.practiceStats().done,0);
});

test('Un cambio de orden en la persistencia no reasigna respuestas a otras preguntas',()=>{
  const {quiz,values}=setup();quiz.startExam();quiz.select(0);quiz.answer(0);quiz.submitExam();quiz.startExam();quiz.select(0);quiz.answer(1);quiz.save();
  const key='beyond_ciencias_v1_sesiones';
  const data=JSON.parse(values.get(key));data.questionIds.reverse();values.set(key,JSON.stringify(data));
  const restored=setup(Object.fromEntries(values)).quiz;
  assert.equal(restored.exam,null);assert.equal(restored.history.length,1);
});
