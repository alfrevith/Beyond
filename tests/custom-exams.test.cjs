const test=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const plain=v=>JSON.parse(JSON.stringify(v));
function setup(initial={},seed=9175,blocked=false){
  const values=new Map(Object.entries(initial)),main={innerHTML:'',querySelector:()=>null},controls={},routes=[],messages=[];
  const rng=Object.create(Math);rng.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
  const c=vm.createContext({Math:rng,window:{matchMedia:()=>({matches:true}),scrollTo:()=>{}},location:{hash:'#matematica'},document:{getElementById:id=>controls[id]||null},localStorage:{getItem:k=>{if(blocked)throw Error('blocked');return values.get(k)??null;},setItem:(k,v)=>{if(blocked)throw Error('blocked');values.set(k,v);}}});
  const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
  for(const [,file]of html.matchAll(/<script defer src="(assets\/js\/[^"]+)"/g))if(!/\/(app|welcome)\.js$/.test(file))vm.runInContext(fs.readFileSync(path.join(__dirname,'..',file),'utf8'),c,{filename:file});
  const app=c.window.Beyond,quizzes=app.subjects.map(s=>app.createLearningQuiz(s));
  const ui=quiz=>app.createLearningUI({quiz,main,navigate:r=>routes.push(r),notify:m=>messages.push(m),flush:()=>{}});
  return {app,quizzes,values,main,c,ui,controls,routes,messages};
}
function answerAt(quiz,index,correct=true){quiz.select(index);quiz.answer(correct?quiz.questions[index].answer:(quiz.questions[index].answer+1)%4);}
test('Las tres materias admiten 10,15,20…100 y cantidades personalizadas sin duplicados ni opciones alteradas',()=>{
  const {quizzes}=setup();
  for(const quiz of quizzes){
    const core=JSON.stringify(quiz.questions.map(q=>[q.id,q.opts,q.answer]));
    for(const size of [...Array.from({length:19},(_,i)=>10+5*i),1,7,23,99]){
      assert.equal(quiz.startExam(size),true);assert.equal(quiz.ids().length,size);assert.equal(new Set(quiz.ids()).size,size);
      assert.ok(quiz.ids().every(i=>i>=0&&i<100));assert.equal(quiz.stats().total,size);assert.equal(quiz.stats().pending,size);
      quiz.submitExam();assert.equal(quiz.history[0].questions.length,size);assert.equal(quiz.history[0].answers.length,size);
    }
    assert.equal(JSON.stringify(quiz.questions.map(q=>[q.id,q.opts,q.answer])),core);
  }
});
test('El muestreo mezcla también los intentos de cien preguntas y produce nuevas selecciones',()=>{
  const {quizzes:[q]}=setup();q.startExam(100);const first=plain(q.ids());assert.notDeepEqual(first,Array.from({length:100},(_,i)=>i));q.submitExam();q.startExam(100);assert.notDeepEqual(plain(q.ids()),first);
  q.submitExam();q.startExam(10);const sample=plain(q.ids());q.submitExam();q.startExam(10);assert.notDeepEqual(plain(q.ids()),sample);assert.ok(q.ids().some(i=>i>=10));
});
test('Las selecciones cortas, posición y respuestas sobreviven la recarga; continuar nunca reemplaza el intento pendiente',()=>{
  const {quizzes,values}=setup();for(const q of quizzes){q.startExam(15);answerAt(q,q.ids()[3]);q.tick(32);q.save();}
  const restored=setup(Object.fromEntries(values));
  restored.quizzes.forEach((q,i)=>{q.enter('simulacro');assert.deepEqual(plain(q.ids()),plain(quizzes[i].ids()));assert.equal(q.state.index,quizzes[i].state.index);assert.equal(q.state.elapsed,32);assert.equal(q.currentAnswer(),q.questions[q.state.index].answer);const id=q.exam.id;assert.equal(q.startExam(35),false);assert.equal(q.exam.id,id);assert.equal(q.ids().length,15);});
});
test('La puntuación y pendientes se calculan solo sobre la muestra y no revelan correcciones antes de entregar',()=>{
  const {quizzes}=setup();for(const q of quizzes){q.startExam(20);const scope=plain(q.ids());scope.slice(0,10).forEach((i,k)=>answerAt(q,i,k<7));assert.equal(q.stats().hidden,true);assert.equal(q.stats().correct,0);assert.equal(q.stats().wrong,0);assert.equal(q.stats().pending,10);q.submitExam();assert.deepEqual(plain(q.stats()),{total:20,done:10,correct:7,wrong:3,pending:10});assert.equal(q.areas.reduce((n,a)=>n+q.areaStats(a).total,0),20);assert.equal(q.topics.reduce((n,t)=>n+q.topicStats(t).pending,0),10);assert.equal(q.practiceStats().done,0);}
});
test('El historial alinea claves por ID aunque la selección sea no consecutiva y tenga otro orden',()=>{
  const {quizzes:[q],values}=setup();q.startExam(25);const order=plain(q.ids());order.forEach((i,k)=>answerAt(q,i,k%3!==0));q.submitExam();const r=q.history[0];
  assert.deepEqual(plain(r.questions.map(q=>q.id)),order.map(i=>q.questions[i].id));assert.equal(r.answers.length,25);assert.equal(q.openHistory(r.id),true);assert.equal(q.historyCompatible,true);assert.deepEqual(plain(q.ids()),order);
  order.forEach((i,k)=>{q.select(i);assert.equal(q.currentAnswer(),r.answers[k]);assert.equal(q.answer(0),false);});
  const fresh=setup(Object.fromEntries(values)).quizzes[0];fresh.openHistory(r.id);assert.equal(fresh.stats().correct,16);assert.deepEqual(plain(fresh.ids()),order);
});
test('Repasar errores de un archivo corto respeta la muestra, el diagnóstico y la práctica original',()=>{
  const {quizzes:[q]}=setup();q.answer(0);const original=plain(q.state.answers);q.startExam(10);const scope=plain(q.ids());scope.slice(0,5).forEach((i,k)=>answerAt(q,i,k>=2));q.submitExam();const archive=plain(q.history[0]);q.openHistory(archive.id);
  assert.equal(q.review(),true);assert.deepEqual(plain(q.ids()),scope.slice(0,2));assert.equal(q.stats().total,10);assert.equal(q.stats().pending,5);q.ids().forEach(i=>answerAt(q,i));assert.equal(q.reviewStats.correct,2);assert.equal(q.stats().wrong,2);assert.deepEqual(plain(q.history[0]),archive);q.start();assert.deepEqual(plain(q.state.answers),original);
});
test('El análisis por tema excluye temas no seleccionados y el repaso puede limitarse a uno de la muestra',()=>{
  const {quizzes:[q]}=setup();q.startExam(10);q.ids().forEach(i=>answerAt(q,i,false));q.submitExam();const selected=new Set(q.resultQuestions.map(q=>q.cat));const absent=q.topics.find(t=>!selected.has(t));assert.equal(q.topicStats(absent).total,0);const topic=q.resultQuestions[0].cat;assert.equal(q.review(topic),true);assert.ok(q.ids().every(i=>q.questions[i].cat===topic));assert.equal(q.stats().total,10);
});
test('Guardados y archivos históricos de cien preguntas siguen siendo legibles sin reinterpretar respuestas',()=>{
  const s=setup(),q=s.quizzes[1],all=q.questions.map((_,i)=>i),answers=Array(100).fill(null);answers[0]=q.questions[0].answer;
  const record={id:'legacy',attemptId:'legacy-exam',bankVersion:q.subject.bankVersion,kind:'simulacro',date:'2026-10-18T20:00:00Z',elapsed:60,answers,questions:q.questions.map(({id,cat,area,answer})=>({id,cat,area,answer}))};
  s.values.set(q.subject.storageKey+'_sesiones',JSON.stringify({bankVersion:q.subject.bankVersion,questionIds:q.questions.map(q=>q.id),answerKey:q.questions.map(q=>q.answer),exam:{id:'old-live',answers,index:0,elapsed:12,order:all,submitted:false},history:[record]}));
  const fresh=setup(Object.fromEntries(s.values)).quizzes[1];assert.equal(fresh.exam.order.length,100);assert.equal(fresh.openHistory('legacy'),true);assert.equal(fresh.stats().correct,1);assert.equal(fresh.historyCompatible,true);fresh.select(0);assert.equal(fresh.currentAnswer(),answers[0]);fresh.enter('simulacro');fresh.startExam(10);assert.equal(fresh.exam.id,'old-live');
});
test('Tamaños inválidos y selecciones guardadas corruptas no producen intentos incoherentes',()=>{
  const s=setup(),q=s.quizzes[0];for(const n of [0,-1,101,1.5,NaN,Infinity,'10',null]){assert.equal(q.startExam(n),false);assert.equal(q.exam,null);}
  q.startExam(10);q.submitExam();q.startExam(15);q.save();const key=q.subject.storageKey+'_sesiones',raw=JSON.parse(s.values.get(key));raw.exam.order[1]=raw.exam.order[0];s.values.set(key,JSON.stringify(raw));const fresh=setup(Object.fromEntries(s.values)).quizzes[0];assert.equal(fresh.exam,null);assert.equal(fresh.history.length,1);
});
test('La interfaz usa denominadores y navegación de diez preguntas, con explicaciones solo tras entregar',()=>{
  const s=setup();for(const q of s.quizzes){const ui=s.ui(q);q.startExam(10);const i=q.ids()[0];answerAt(q,i,false);s.c.location.hash='#'+q.subject.id+'/simulacro';ui.render('simulacro');assert.ok(s.main.innerHTML.includes('1/10 respuestas iniciales'));assert.ok(!s.main.innerHTML.includes('id="feedback"'));assert.equal((s.main.innerHTML.match(/data-science-action="jump"/g)||[]).length,10);ui.render('entrega');assert.ok(s.main.innerHTML.includes('1 de 10 respondidas'));q.submitExam();const r=q.history[0];s.c.location.hash='#'+q.subject.id+'/resultados/'+r.id;ui.render('resultados');assert.ok(s.main.innerHTML.includes('<small>/10</small>'));assert.ok(s.main.innerHTML.includes('Revisar las 10 preguntas'));assert.ok(!s.main.innerHTML.includes('Revisar las 100 preguntas'));assert.ok(s.main.innerHTML.includes('no fueron evaluados'));s.c.location.hash='#'+q.subject.id+'/revision/'+r.id;ui.render('revision');assert.ok(s.main.innerHTML.includes('id="feedback"'));assert.equal((s.main.innerHTML.match(/data-science-action="jump"/g)||[]).length,10);}
});
test('El selector ofrece pasos de cinco y el campo personalizado valida antes de crear el intento',()=>{
  const s=setup(),q=s.quizzes[0],ui=s.ui(q);ui.render('inicio');for(const n of [10,15,20,25,30,35,95,100])assert.ok(s.main.innerHTML.includes('value="'+n+'"'));assert.ok(s.main.innerHTML.includes('Otra cantidad'));
  s.controls['science-exam-count']={value:'custom'};s.controls['science-exam-custom']={value:'23',reportValidity:()=>true};ui.handle({disabled:false,dataset:{scienceAction:'exam'}});assert.equal(q.ids().length,23);
  q.submitExam();s.controls['science-exam-custom'].value='101';ui.handle({disabled:false,dataset:{scienceAction:'exam'}});assert.equal(q.exam.submitted,true);assert.equal(s.messages.length,1);
});
test('Mi espacio muestra tamaños reales y no compara muestras distintas como simulacros del banco completo',()=>{
  const s=setup(),q=s.quizzes[0];q.startExam(10);answerAt(q,q.ids()[0]);let model=s.app.buildStudyDashboard(s.quizzes);assert.equal(model.cards[0].exam.total,10);assert.equal(model.cards[0].exam.done,1);assert.equal(model.totals.done,0);q.submitExam();q.startExam(15);q.ids().forEach(i=>answerAt(q,i));q.submitExam();model=s.app.buildStudyDashboard(s.quizzes);assert.equal(model.cards[0].trend,null);assert.equal(model.recent[0].total,15);const html=s.app.renderStudyDashboard(model).history;assert.ok(html.includes('/15</small>'));assert.ok(!html.includes('/100</small>'));
});
test('Guardar, reintentar y reiniciar muestras no afecta otras materias ni los archivos; funciona sin almacenamiento',()=>{
  const s=setup();s.quizzes.forEach((q,i)=>{q.answer(q.questions[0].answer);q.startExam(10+i*5);answerAt(q,q.ids()[0]);q.submitExam();});s.quizzes[0].reset();assert.equal(s.quizzes[0].history.length,1);assert.equal(s.quizzes[1].practiceStats().done,1);assert.equal(s.quizzes[2].practiceStats().done,1);assert.equal(s.quizzes[1].history[0].questions.length,15);
  const b=setup({},1,true).quizzes[0];assert.equal(b.startExam(5),true);answerAt(b,b.ids()[0]);assert.equal(b.submitExam(),true);assert.equal(b.stats().correct,1);
});
test('El resumen del último simulacro identifica errores de sus temas sin atribuirlos a la práctica',()=>{
  const s=setup(),q=s.quizzes[2];q.startExam(35);const first=q.ids()[0];answerAt(q,first,false);q.submitExam();const model=s.app.buildStudyDashboard(s.quizzes),card=model.cards[2];
  assert.equal(card.lastExam.total,35);assert.equal(card.lastExam.done,1);assert.equal(card.lastExam.weakTopics[0].name,q.questions[first].cat);assert.equal(card.lastExam.weakTopics[0].wrong,1);assert.equal(card.practice.done,0);assert.ok(s.app.renderStudyDashboard(model).cardDetails(q.subject.id).includes('0/35 aciertos'));
});
