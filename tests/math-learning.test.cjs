const test=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {loadMath,validateMath}=require('../scripts/validate-math.cjs');
const plain=v=>JSON.parse(JSON.stringify(v));
function setup(initial={},blocked=false){
  const values=new Map(Object.entries(initial)),main={innerHTML:'',querySelector:()=>null},routes=[];
  const c=vm.createContext({window:{matchMedia:()=>({matches:true}),scrollTo:()=>{}},location:{hash:'#matematica/practica'},document:{getElementById:()=>null},localStorage:{getItem:k=>{if(blocked)throw Error('blocked');return values.get(k)??null;},setItem:(k,v)=>{if(blocked)throw Error('blocked');values.set(k,v);}}});
  const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
  for(const [,file]of html.matchAll(/<script defer src="(assets\/js\/[^"]+)"/g)){
    if(/\/(app|welcome)\.js$/.test(file))continue;
    vm.runInContext(fs.readFileSync(path.join(__dirname,'..',file),'utf8'),c,{filename:file});
  }
  const app=c.window.Beyond,quizzes=app.subjects.map(s=>app.createLearningQuiz(s)),math=quizzes[0];
  const ui=app.createLearningUI({quiz:math,main,navigate:route=>routes.push(route),notify:()=>{},flush:()=>{}});
  return {app,quizzes,math,ui,main,c,values,routes};
}
test('Enriquecer Matemática conserva exactamente enunciados, opciones, claves y orden de las 100 preguntas',()=>{
  assert.equal(validateMath().questions,100);
  const altered=loadMath();altered.mathLearningQuestions[2].answer=0;assert.throws(()=>validateMath(altered));
  const missing=loadMath();missing.mathLearningQuestions[0].feedback[1]='';assert.throws(()=>validateMath(missing));
});
test('Las respuestas numéricas y los candidatos con radicales se contrastan de forma independiente',()=>{
  const qs=loadMath().mathLearningQuestions;
  const expected={2:-8+3*4,3:Math.abs(-13)-Math.abs(5),4:(-3)**2-2**3,9:250*.12,11:(50-40)/40*100+'%',12:.6*.05,14:6*8/12+' días',16:450/3*5+' g',17:30/5*2,19:14/2*5,20:180/3+' km/h',21:12,22:36,23:24+' min',24:15,29:3*(-2)**2-4*(-2),30:2*3-5*(-1),31:(4-1)**2,32:2**2+2*5,33:(18+7)/5,34:15/3+2,35:(15-3)/(4-2),36:9-2,37:(25-4)/3,38:36/3,39:(17-3)/2,40:30/2-5,46:2*4-3,56:4**2-5,57:(3**2-1)/2,58:4,59:5,66:(4+8+10+14)/4,67:5,68:3,69:(4+6)/2,70:8*3-6-10,72:12-5,73:360*.25+'°',75:'11/6',76:'2/5',77:'1/2',78:'1/4',79:'1/4',80:'3/10',82:180-125+'°',83:180-40-65+'°',86:Math.sqrt(6**2+8**2),87:Math.sqrt(13**2-5**2),88:Math.sqrt(10**2-8**2)+' m',91:12*7/2,92:2*(9+4),95:(5**2-3**2)+'π',98:5**2,100:3+3*2};
  for(const [n,value]of Object.entries(expected)){const q=qs[n-1];assert.equal(q.opts[q.answer],String(value),q.id);}
  assert.equal(Math.sqrt(4),4-2);assert.notEqual(Math.sqrt(1),1-2);
  assert.equal(Math.sqrt(5-1),5-3);assert.notEqual(Math.sqrt(2-1),2-3);
});
test('Migración de las tres claves antiguas conserva respuestas, índice y tiempo y guarda un respaldo inmutable',()=>{
  for(const key of ['beyond_matematica_v1','avanzo_matematica_v1','esen_diagnostico_100_v1']){
    const answers=Array(100).fill(null);answers[0]=0;answers[57]=2;
    const raw={answers,elapsed:91,index:57,mode:'review'},encoded=JSON.stringify(raw),initial={[key]:encoded};
    const s=setup(initial);assert.deepEqual(plain(s.math.state.answers),answers);assert.equal(s.math.state.elapsed,91);assert.equal(s.math.state.index,57);
    const backup='beyond_matematica_v1_respaldo_original';assert.equal(s.values.get(backup),encoded);
    s.math.save();assert.equal(JSON.parse(s.values.get('beyond_matematica_v1')).bankVersion,'matematica-1');
    const restored=setup(Object.fromEntries(s.values));assert.deepEqual(plain(restored.math.state.answers),answers);assert.equal(restored.math.state.elapsed,91);assert.equal(restored.math.state.index,57);assert.equal(restored.values.get(backup),encoded);
    restored.math.reset();assert.equal(restored.values.get(backup),encoded);if(key!=='beyond_matematica_v1')assert.equal(restored.values.get(key),encoded);
  }
});
test('Una versión matemática futura rechaza guardados sin versión y los archivos conservan su resultado',()=>{
  const s=setup();s.math.answer(0);s.math.savePractice();const id=s.math.history[0].id;
  const subject={...s.math.subject,bankVersion:'matematica-2'};
  const newer=s.app.createLearningQuiz(subject);assert.equal(newer.practiceStats().done,0);assert.equal(newer.openHistory(id),true);assert.equal(newer.historyCompatible,false);assert.equal(newer.review(),false);
  const old=Array(100).fill(null);old[0]=0;s.values.set(subject.storageKey,JSON.stringify({answers:old,elapsed:40,index:0}));
  assert.equal(s.app.createLearningQuiz(subject).practiceStats().done,0);
});
test('Seleccionar no registra la respuesta matemática hasta confirmar, y la primera respuesta no cambia',()=>{
  const {math,ui,main}=setup();ui.render('practica');
  ui.handle({disabled:false,dataset:{scienceAction:'choose',choice:'1'}});assert.equal(math.stats().done,0);assert.ok(!main.innerHTML.includes('id="feedback"'));
  ui.handle({disabled:false,dataset:{scienceAction:'confirm'}});assert.equal(math.stats().wrong,1);assert.ok(main.innerHTML.includes('−7 es un entero'));assert.ok(main.innerHTML.includes('Paso a paso'));
  assert.equal(math.answer(0),false);assert.equal(math.currentAnswer(),1);
});
test('El simulacro matemático es independiente, persiste, oculta pistas y permite repaso del resultado archivado',()=>{
  const {math,quizzes,values}=setup();math.answer(0);math.tick(20);math.save();quizzes[1].answer(0);quizzes[2].answer(0);
  math.startExam();math.select(0);math.answer(1);math.tick(7);math.save();assert.equal(math.stats().hidden,true);
  const fresh=setup(Object.fromEntries(values));fresh.math.enter('simulacro');assert.equal(fresh.math.state.elapsed,7);assert.equal(fresh.math.stats().done,1);assert.equal(fresh.math.practiceStats().correct,1);
  fresh.ui.render('simulacro');assert.ok(!fresh.main.innerHTML.includes('id="feedback"'));assert.ok(!fresh.main.innerHTML.includes('Paso a paso'));
  fresh.math.submitExam();const record=plain(fresh.math.history[0]);fresh.math.openHistory(record.id);assert.equal(fresh.math.review(),true);fresh.math.answer(0);assert.equal(fresh.math.reviewStats.correct,1);assert.deepEqual(plain(fresh.math.history[0]),record);fresh.math.start();assert.equal(fresh.math.practiceStats().correct,1);
  fresh.math.reset();assert.equal(fresh.math.history.length,1);assert.equal(fresh.quizzes[1].practiceStats().done,1);assert.equal(fresh.quizzes[2].practiceStats().done,1);
});
test('Las 100 preguntas matemáticas se renderizan y la continuación busca una pendiente sin cambiar las respuestas',()=>{
  const {math,ui,main}=setup();
  for(let i=0;i<100;i++){math.start();math.select(i);ui.render('practica');assert.ok(main.innerHTML.includes(math.questions[i].id));assert.ok(!main.innerHTML.includes('undefined'));assert.ok(!main.innerHTML.includes('#ciencias'));}
  math.start();math.select(99);math.answer(math.questions[99].answer);math.continuePractice();assert.equal(math.state.index,0);assert.equal(math.stats().done,1);
});
test('El panel usa práctica real, distingue sin empezar y no cambia el contexto ni filtra aciertos del simulacro',()=>{
  const {app,quizzes,math}=setup();let m=app.buildStudyDashboard(quizzes);assert.equal(m.accuracy,null);assert.equal(m.totals.done,0);assert.equal(m.recommendations.length,3);
  math.answer(1);math.select(1);math.answer(1);math.tick(31);math.save();math.startExam();math.select(0);math.answer(0);
  const before=math.context;m=app.buildStudyDashboard(quizzes);assert.equal(math.context,before);assert.equal(m.totals.done,2);assert.equal(m.totals.correct,1);assert.equal(m.accuracy,50);assert.equal(m.cards[0].exam.done,1);assert.equal(m.cards[0].next.name,'Conjuntos y operaciones');assert.equal(m.cards[0].practice.elapsed,31);assert.equal(m.cards[0].exam.correct,undefined);
  const html=app.renderStudyDashboard(m);assert.ok(html.summary.includes('50%'));assert.ok(html.plan.includes('Repasar estos errores'));assert.ok(html.cardDetails('matematica').includes('Simulacro pendiente'));
});
test('El panel conserva errores iniciales al repasar y las tendencias comparan solo simulacros completos y compatibles',()=>{
  const {app,quizzes,math}=setup();math.answer(1);math.review();math.answer(0);let m=app.buildStudyDashboard(quizzes);assert.equal(m.totals.wrong,1);assert.equal(m.cards[0].review.correct,1);
  for(const wrong of [2,1]){math.startExam();math.select(0);for(let i=0;i<100;i++){math.select(i);math.answer(i<wrong?(math.questions[i].answer+1)%4:math.questions[i].answer);}math.submitExam();}
  math.startExam();math.select(0);math.answer(0);math.submitExam();m=app.buildStudyDashboard(quizzes);assert.equal(m.cards[0].trend.change,1);assert.equal(m.cards[0].trend.latest,99);assert.equal(m.cards[0].trend.previous,98);assert.equal(m.recent[0].done,1);
  assert.equal(m.totals.done,1);assert.equal(m.totals.wrong,1);
});
test('El panel y Matemática siguen disponibles con almacenamiento bloqueado',()=>{
  const {app,quizzes,math}=setup({},true);math.answer(0);const m=app.buildStudyDashboard(quizzes);assert.equal(m.totals.correct,1);assert.equal(app.storage.isAvailable(),false);assert.ok(app.renderStudyDashboard(m).history.includes('Tu recorrido aparecerá aquí'));
});
