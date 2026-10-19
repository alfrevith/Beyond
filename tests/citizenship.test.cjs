const test=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {DATA_FILES:SCIENCE}=require('../scripts/validate-science.cjs');
const {DATA_FILES,loadCitizenship,validateCitizenship}=require('../scripts/validate-citizenship.cjs');
const plain=v=>JSON.parse(JSON.stringify(v));
function setup(initial={},blocked=false,version){
  const values=new Map(Object.entries(initial));
  const main={innerHTML:'',querySelector:()=>null};
  const c=vm.createContext({window:{matchMedia:()=>({matches:true}),scrollTo:()=>{}},location:{hash:'#ciudadania/practica'},document:{getElementById:()=>null},localStorage:{getItem:k=>{if(blocked)throw Error('blocked');return values.get(k)??null;},setItem:(k,v)=>{if(blocked)throw Error('blocked');values.set(k,v);}}});
  for(const name of ['data/math-questions','data/math-guides','data/math-learning',...[...SCIENCE,...DATA_FILES].map(f=>'data/'+f),'data/subjects','storage','quiz','science-session','science-ui'])vm.runInContext(fs.readFileSync(path.join(__dirname,'../assets/js',name+'.js'),'utf8'),c,{filename:name});
  const app=c.window.Beyond,subject=app.subjects[2];if(version)subject.bankVersion=version;
  const quiz=app.createLearningQuiz(subject),science=app.createLearningQuiz(app.subjects[1]),math=app.createQuiz(app.subjects[0]);
  const ui=app.createLearningUI({quiz,main,navigate:()=>{},notify:()=>{},flush:()=>{}});
  return {app,subject,quiz,science,math,values,ui,main,c};
}
test('Ciudadanía contiene 100 preguntas, 14 guías y todas las distribuciones y coberturas exigidas',()=>{
  const result=validateCitizenship();assert.equal(result.questions,100);assert.equal(result.topics,14);assert.equal(result.dataResources,15);
});
test('El validador rechaza duplicados, fuente vacía, metadatos y recursos incoherentes',()=>{
  for(const mutate of [a=>a.citizenshipQuestions[0].id='SOC-002',a=>a.citizenshipQuestions[4].context.text='',a=>a.citizenshipQuestions[0].feedback[0]='',a=>a.citizenshipQuestions.find(q=>q.visual?.kind==='bars').visual.rows[0][1]=-1,a=>a.citizenshipQuestions[0].sources=['inventada'],a=>a.citizenshipQuestions[0].difficulty='avanzado']){
    const app=loadCitizenship();mutate(app);assert.throws(()=>validateCitizenship(app));
  }
});
test('Claves de interpretación numérica contrastadas con datos, sin depender del índice de respuesta',()=>{
  const qs=loadCitizenship().citizenshipQuestions,get=id=>qs.find(q=>q.id===id);
  const answer=id=>get(id).opts[get(id).answer];
  const counts=get('SOC-012').visual.rows;assert.equal(counts[0][1]/counts.reduce((a,r)=>a+r[1],0),.5);assert.match(answer('SOC-012'),/50%/);
  assert.match(answer('SOC-011'),/trayecto largo/);assert.equal(10/20>10/50,true);
  const attendance=get('SOC-013').visual.cells;assert.deepEqual(plain(attendance.map(r=>r[2])),[900/1200*100,180/200*100]);assert.match(answer('SOC-013'),/Sur supera a Norte en tasa/);
  assert.match(answer('SOC-014'),/redacción y la composición/);assert.equal(get('SOC-014').visual.rows[0][2],'Muestra aleatoria');assert.equal(get('SOC-014').visual.rows[1][2],'Voluntarios en línea');
  assert.match(answer('HIS-021'),/no se conoce cómo se reparte/);assert.equal((120-80)/80,.5);
  const human=get('HIS-024').visual.rows;assert.equal(human[0][2]>human[0][1],true);assert.equal(human[1][2]<human[1][1],true);assert.equal(human[2][2],human[2][1]);assert.match(answer('HIS-024'),/persiste un desafío/);
  assert.match(answer('CIV-025'),new RegExp(String(80-50)+' puntos'));
  assert.match(answer('GLO-011'),/B: 40\/200 = 20%/);
  assert.match(answer('GLO-013'),/no permite saber/);
  assert.equal(get('GLO-015').visual.rows.reduce((a,r)=>a+r[1],0),100);assert.match(answer('GLO-015'),/formatos sin conexión/);
  const access=get('AMB-016').visual.cells;assert.equal(access[1][2]>access[0][2],true);assert.match(answer('AMB-016'),/carencia de Este/);
  assert.match(answer('AMB-017'),new RegExp(String(120-80+60-50)+' habitantes'));
  assert.match(answer('AMB-018'),new RegExp(String(10000/20)+' habitantes/km²'));
  assert.match(answer('AMB-019'),/falta la población total/);
  assert.deepEqual(plain(get('AMB-020').visual.cells.map(r=>r[2])),[90,90,20]);assert.match(answer('AMB-020'),/alternativas seguras/);
});
test('Práctica, simulacro y progresos de las tres materias permanecen separados tras recarga',()=>{
  const {quiz,science,math,values}=setup();
  quiz.answer(quiz.questions[0].answer);quiz.tick(12);assert.equal(quiz.answer(2),false);
  science.answer((science.questions[0].answer+1)%4);math.answer(math.questions[0].answer);
  quiz.startExam();quiz.select(0);quiz.answer((quiz.questions[0].answer+1)%4);quiz.tick(7);quiz.save();
  assert.equal(quiz.stats().hidden,true);assert.equal(quiz.stats().correct,0);assert.equal(quiz.reveal,false);
  const fresh=setup(Object.fromEntries(values));fresh.quiz.enter('simulacro');
  assert.equal(fresh.quiz.stats().done,1);assert.equal(fresh.quiz.state.elapsed,7);assert.equal(fresh.quiz.practiceStats().correct,1);
  assert.equal(fresh.science.practiceStats().wrong,1);assert.equal(fresh.math.stats().correct,1);
  fresh.quiz.submitExam();assert.equal(fresh.quiz.reveal,true);assert.equal(fresh.quiz.stats().wrong,1);assert.equal(fresh.quiz.stats().pending,99);
});
test('Repaso del simulacro y de su archivo registra mejora sin reescribir práctica ni historial',()=>{
  const {quiz}=setup();quiz.answer(quiz.questions[0].answer);const practice=plain(quiz.state.answers);
  quiz.startExam();quiz.select(0);quiz.answer((quiz.questions[0].answer+1)%4);quiz.submitExam();const record=plain(quiz.history[0]);
  assert.equal(quiz.openHistory(record.id),true);assert.equal(quiz.review(),true);quiz.answer(quiz.questions[0].answer);
  assert.equal(quiz.reviewStats.correct,1);assert.deepEqual(plain(quiz.history[0]),record);quiz.start();assert.deepEqual(plain(quiz.state.answers),practice);
});
test('Áreas, temas, mezcla y recorrido completo conservan exactamente los cien identificadores',()=>{
  const {quiz}=setup();assert.equal(quiz.areas.length,5);
  for(const area of quiz.areas){quiz.start('',area);assert.equal(quiz.ids().length,quiz.questions.filter(q=>q.area===area).length);}
  for(const topic of quiz.topics){quiz.start(topic);assert.ok(quiz.ids().every(i=>quiz.questions[i].cat===topic));}
  quiz.start('','',true);assert.equal(new Set(quiz.ids()).size,100);
  for(const i of quiz.ids()){quiz.select(i);quiz.answer(quiz.questions[i].answer);}
  assert.equal(quiz.stats().correct,100);assert.equal(quiz.history.length,1);assert.equal(quiz.history[0].kind,'practica');
});
test('Historial, guardas de versión, reinicio y almacenamiento bloqueado son seguros en Ciudadanía',()=>{
  const {quiz,values}=setup();quiz.answer(0);quiz.savePractice();quiz.startExam();quiz.select(0);quiz.answer(1);quiz.submitExam();
  const history=plain(quiz.history);quiz.reset();assert.equal(quiz.stats().done,0);assert.deepEqual(plain(quiz.history),history);assert.equal(quiz.exam.submitted,true);
  const newer=setup(Object.fromEntries(values),false,'ciudadania-2');assert.equal(newer.quiz.practiceStats().done,0);assert.equal(newer.quiz.exam,null);assert.equal(newer.quiz.history.length,2);
  newer.quiz.openHistory(history[0].id);assert.equal(newer.quiz.historyCompatible,false);assert.equal(newer.quiz.review(),false);
  const blocked=setup({},true);assert.equal(blocked.quiz.answer(0),true);assert.equal(blocked.app.storage.isAvailable(),false);
  const corrupt=setup({beyond_ciudadania_v1:'{broken',beyond_ciudadania_v1_sesiones:'null'});assert.equal(corrupt.quiz.stats().done,0);assert.equal(corrupt.quiz.history.length,0);
});
test('La interfaz compartida renderiza las 100 preguntas y oculta correcciones y fuentes auxiliares en simulacro',()=>{
  const {quiz,ui,main}=setup();
  for(let i=0;i<100;i++){
    quiz.start();quiz.select(i);ui.render('practica');const q=quiz.questions[i];
    assert.ok(main.innerHTML.includes(q.id));assert.ok(main.innerHTML.includes('Ciudadanía y valores'));
    if(q.context)assert.ok(main.innerHTML.includes(q.context.text));
    if(q.visual)assert.ok(main.innerHTML.includes(q.visual.caption.replaceAll('&','&amp;')));
    assert.ok(!main.innerHTML.includes('#ciencias'));assert.ok(!main.innerHTML.includes('undefined'));
  }
  quiz.startExam();quiz.select(0);quiz.select(15);quiz.answer(0);ui.render('simulacro');assert.ok(!main.innerHTML.includes('id="feedback"'));assert.ok(!main.innerHTML.includes('Consultar fuentes y contexto'));assert.ok(!main.innerHTML.includes('class="choice science-choice correct'));
  quiz.submitExam();ui.render('simulacro');assert.ok(main.innerHTML.includes('id="feedback"'));assert.ok(main.innerHTML.includes('Consultar fuentes y contexto'));
});
test('Resultados y enlaces profundos del historial de Ciudadanía apuntan solo a su materia',()=>{
  const {quiz,ui,main,c}=setup();quiz.startExam();quiz.select(0);quiz.answer(0);quiz.submitExam();const id=quiz.history[0].id;
  c.location.hash='#ciudadania/resultados/'+id;ui.render('resultados');assert.ok(main.innerHTML.includes('#ciudadania/revision/'+id));assert.ok(!main.innerHTML.includes('#ciencias'));assert.ok(main.innerHTML.includes('Tu rendimiento por área'));
  c.location.hash='#ciudadania/revision/'+id;ui.render('revision');assert.equal(quiz.context,'history');assert.equal(quiz.answer(0),false);
});
