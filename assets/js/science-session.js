window.Beyond = window.Beyond || {};
/* Each attempt owns its selected indices. Practice uses the complete bank;
   archives store only their selected questions and their own answer keys. */
window.Beyond.createLearningQuiz = subject => {
  const storage=window.Beyond.storage,questions=subject.questions,count=questions.length;
  const all=questions.map((_,i)=>i),topics=[...new Set(questions.map(q=>q.cat))],areas=[...new Set(questions.map(q=>q.area))];
  const indexById=new Map(questions.map((q,i)=>[q.id,i]));
  const extraKey=subject.storageKey+'_sesiones';
  const uid=()=>Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,10);
  let practice=storage.load(subject);
  const loaded=storage.read(extraKey,{}),raw=loaded&&typeof loaded==='object'&&!Array.isArray(loaded)?loaded:{};
  let practiceId=typeof raw.practiceId==='string'?raw.practiceId:uid();
  const validChoice=a=>a===null||Number.isInteger(a)&&a>=0&&a<4;
  const validAnswers=(values,length=count)=>Array.isArray(values)&&values.length===length&&values.every(validChoice);
  const validOrder=values=>Array.isArray(values)&&values.length>=1&&values.length<=count&&new Set(values).size===values.length&&values.every(i=>Number.isInteger(i)&&i>=0&&i<count);
  const validTime=value=>Number.isFinite(value)&&value>=0;
  const questionIds=questions.map(q=>q.id),answerKey=questions.map(q=>q.answer);
  const compatible=raw.bankVersion===subject.bankVersion&&JSON.stringify(raw.questionIds)===JSON.stringify(questionIds)&&JSON.stringify(raw.answerKey)===JSON.stringify(answerKey);
  const validExam=e=>e&&validAnswers(e.answers)&&validOrder(e.order)&&validTime(e.elapsed)&&e.order.includes(e.index)&&e.answers.every((a,i)=>a===null||e.order.includes(i));
  let exam=compatible&&validExam(raw.exam)?{...raw.exam,order:[...raw.exam.order],answers:[...raw.exam.answers],submitted:raw.exam.submitted===true}:null;
  const validRecord=r=>r&&typeof r.id==='string'&&typeof r.bankVersion==='string'&&['practica','simulacro'].includes(r.kind)&&Array.isArray(r.questions)&&r.questions.length>=1&&r.questions.length<=count&&(r.kind!=='practica'||r.questions.length===count)&&validAnswers(r.answers,r.questions.length)&&validTime(r.elapsed)&&r.questions.every(q=>q&&typeof q.id==='string'&&typeof q.cat==='string'&&typeof q.area==='string'&&Number.isInteger(q.answer)&&q.answer>=0&&q.answer<4)&&new Set(r.questions.map(q=>q.id)).size===r.questions.length;
  let history=Array.isArray(raw.history)?raw.history.filter(validRecord).slice(-20):[];
  let reviewAnswers=compatible&&raw.reviewAnswers&&typeof raw.reviewAnswers==='object'?Object.fromEntries(Object.entries(raw.reviewAnswers).filter(([id,a])=>indexById.has(id)&&Number.isInteger(a)&&a>=0&&a<4)):{};
  let context='practice',reviewMode=false,topic='',area='',order=[...all],selectedHistory=null,reviewBase=null,reviewScope=[...all];
  let reviewOrigin=raw.reviewOrigin==='simulacro'?'simulacro':'practica';
  function save(){storage.save(subject,practice);return storage.write(extraKey,{bankVersion:subject.bankVersion,questionIds,answerKey,practiceId,exam,history,reviewAnswers,reviewOrigin});}
  function summarize(answers,bank=questions){const done=answers.filter(a=>a!==null).length,correct=answers.filter((a,i)=>a===bank[i].answer).length;return {total:bank.length,done,correct,wrong:done-correct,pending:bank.length-done};}
  function state(){return context==='exam'&&exam?exam:context==='history'&&selectedHistory?selectedHistory:practice;}
  function resultData(){
    if(context==='history')return {answers:selectedHistory.answers,bank:selectedHistory.questions};
    const scope=context==='exam'?exam.order:reviewMode?reviewScope:all;
    const answers=context==='practice'&&reviewMode?reviewBase:state().answers;
    return {answers:scope.map(i=>answers[i]),bank:scope.map(i=>questions[i])};
  }
  function stats(){
    const d=resultData();
    if(context==='exam'&&!exam.submitted){const done=d.answers.filter(a=>a!==null).length;return {total:d.bank.length,done,pending:d.bank.length-done,correct:0,wrong:0,hidden:true};}
    return summarize(d.answers,d.bank);
  }
  function breakdown(field,name){
    const d=resultData(),indices=d.bank.flatMap((q,i)=>q[field]===name?[i]:[]);
    const done=indices.filter(i=>d.answers[i]!==null).length,hidden=context==='exam'&&!exam.submitted;
    const correct=hidden?0:indices.filter(i=>d.answers[i]===d.bank[i].answer).length;
    return {name,total:indices.length,done,correct,wrong:hidden?0:done-correct,pending:indices.length-done};
  }
  function ids(){
    if(context==='exam')return exam.order;
    if(context==='history')return selectedHistory.questions.map(q=>indexById.get(q.id)).filter(i=>i!==undefined);
    return (reviewMode?reviewScope:order).filter(i=>(!topic||questions[i].cat===topic)&&(!area||questions[i].area===area)&&(!reviewMode||reviewBase[i]!==null&&reviewBase[i]!==questions[i].answer));
  }
  function currentAnswer(i=state().index){
    if(context==='history'){const position=selectedHistory.questions.findIndex(q=>q.id===questions[i]?.id);return position<0?null:selectedHistory.answers[position];}
    return context==='practice'&&reviewMode?reviewAnswers[questions[i].id]??null:state().answers[i];
  }
  function select(i){if(ids().includes(i)){state().index=i;save();}}
  function start(newTopic='',newArea='',mixed=false){
    context='practice';reviewMode=false;reviewBase=null;reviewScope=[...all];
    topic=topics.includes(newTopic)?newTopic:'';area=areas.includes(newArea)?newArea:'';order=[...all];
    if(mixed){shuffle(order);practice.index=order[0];}
    if(!ids().length){topic='';area='';}
    if(!ids().includes(practice.index))practice.index=ids()[0];save();
  }
  function shuffle(list){for(let i=list.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[list[i],list[j]]=[list[j],list[i]];}return list;}
  function compatibleHistory(record){return !!record&&record.bankVersion===subject.bankVersion&&Array.isArray(record.questions)&&record.questions.length>0&&new Set(record.questions.map(q=>q.id)).size===record.questions.length&&record.questions.every(q=>{const current=questions[indexById.get(q.id)];return current&&q.answer===current.answer;});}
  function review(newTopic=''){
    if(context==='history'&&!compatibleHistory(selectedHistory)||context==='exam'&&!exam?.submitted)return false;
    const d=resultData(),newBase=Array(count).fill(null),scope=[];
    d.bank.forEach((q,i)=>{const index=indexById.get(q.id);if(index!==undefined){scope.push(index);newBase[index]=d.answers[i];}});
    const filter=topics.includes(newTopic)?newTopic:'';
    if(!scope.some(i=>(!filter||questions[i].cat===filter)&&newBase[i]!==null&&newBase[i]!==questions[i].answer))return false;
    if(!(context==='practice'&&reviewMode))reviewOrigin=context==='exam'?'simulacro':context==='history'?selectedHistory.kind:'practica';
    reviewBase=newBase;reviewScope=scope;context='practice';topic=filter;area='';reviewMode=true;reviewAnswers={};practice.index=ids()[0];save();return true;
  }
  function snapshot(kind,answers,elapsed,attemptId,scope=all){
    const record={id:uid(),attemptId,kind,bankVersion:subject.bankVersion,date:new Date().toISOString(),answers:scope.map(i=>answers[i]),elapsed,questions:scope.map(i=>{const q=questions[i];return {id:q.id,cat:q.cat,area:q.area,answer:q.answer};})};
    const duplicate=history.find(r=>r.attemptId===attemptId&&JSON.stringify(r.answers)===JSON.stringify(record.answers)&&JSON.stringify(r.questions.map(q=>q.id))===JSON.stringify(record.questions.map(q=>q.id)));
    if(duplicate)return duplicate;history.push(record);history=history.slice(-20);save();return record;
  }
  function answer(choice){
    if(context==='history'||context==='exam'&&(!exam||exam.submitted)||!Number.isInteger(choice)||choice<0||choice>3||!ids().includes(state().index)||currentAnswer()!==null)return false;
    if(context==='practice'&&reviewMode)reviewAnswers[questions[practice.index].id]=choice;else state().answers[state().index]=choice;
    save();if(context==='practice'&&!reviewMode&&summarize(practice.answers).done===count)snapshot('practica',practice.answers,practice.elapsed,practiceId);return true;
  }
  function startExam(size=count){
    if(exam&&!exam.submitted){context='exam';return false;}
    if(!Number.isInteger(size)||size<1||size>count)return false;
    const selected=shuffle([...all]).slice(0,size);
    exam={id:uid(),answers:Array(count).fill(null),index:selected[0],elapsed:0,order:selected,submitted:false,startedAt:new Date().toISOString()};context='exam';save();return true;
  }
  function enter(view){
    if(view==='simulacro'||view==='entrega'){if(!exam)startExam();context='exam';}
    else if(view==='practica')context='practice';
    else if(!['resultados','revision'].includes(view)){context='practice';reviewMode=false;reviewBase=null;reviewScope=[...all];}
  }
  function submitExam(){if(!exam||exam.submitted)return false;exam.submitted=true;exam.submittedAt=new Date().toISOString();snapshot('simulacro',exam.answers,exam.elapsed,exam.id,exam.order);save();return true;}
  function openHistory(id){const record=history.find(r=>r.id===id);if(!record)return false;selectedHistory={...record,index:indexById.get(record.questions[0].id)??0};context='history';reviewMode=false;return true;}
  function tick(seconds){if(Number.isFinite(seconds)&&seconds>0&&context!=='history'&&!(context==='exam'&&exam?.submitted))state().elapsed+=Math.floor(seconds);}
  function reset(){practice=storage.empty(subject);practiceId=uid();reviewAnswers={};reviewMode=false;reviewBase=null;reviewScope=[...all];topic='';area='';order=[...all];context='practice';save();}
  function practiceSummary(){return {...summarize(practice.answers),elapsed:practice.elapsed,index:practice.index,topics:topics.map(name=>{const list=all.filter(i=>questions[i].cat===name),done=list.filter(i=>practice.answers[i]!==null).length,correct=list.filter(i=>practice.answers[i]===questions[i].answer).length;return {name,total:list.length,done,correct,wrong:done-correct,pending:list.length-done};})};}
  function continuePractice(){start();const pending=all.map(i=>(i+practice.index)%count).find(i=>practice.answers[i]===null);if(pending!==undefined)select(pending);}
  return {
    subject,questions,topics,areas,save,stats,ids,select,start,review,currentAnswer,answer,startExam,submitExam,enter,tick,reset,openHistory,compatibleHistory,
    topicStats:name=>breakdown('cat',name),areaStats:name=>breakdown('area',name),
    savePractice:()=>snapshot('practica',practice.answers,practice.elapsed,practiceId),practiceStats:()=>summarize(practice.answers),practiceSummary,continuePractice,
    get resultQuestions(){return resultData().bank;},get isSample(){return resultData().bank.length<count;},
    get state(){return state();},get mode(){return context==='exam'?'exam':reviewMode?'review':'all';},get reveal(){return context!=='exam'||!!exam?.submitted;},get context(){return context;},
    get filter(){return topic;},get areaFilter(){return area;},get exam(){return exam;},get history(){return [...history].reverse();},get selectedHistory(){return selectedHistory;},get reviewOrigin(){return reviewOrigin;},
    get lastReviewStats(){const entries=Object.entries(reviewAnswers);return {done:entries.length,correct:entries.filter(([id,a])=>questions[indexById.get(id)]?.answer===a).length};},
    get historyCompatible(){return compatibleHistory(selectedHistory);},
    get reviewStats(){const list=ids();return {total:list.length,done:list.filter(i=>reviewAnswers[questions[i].id]!==undefined).length,correct:list.filter(i=>reviewAnswers[questions[i].id]===questions[i].answer).length};}
  };
};
window.Beyond.createScienceQuiz=window.Beyond.createLearningQuiz;
