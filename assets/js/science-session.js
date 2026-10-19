window.Beyond = window.Beyond || {};
/* Shared advanced study engine. Storage remains scoped to each subject. */
window.Beyond.createLearningQuiz = subject => {
  const storage = window.Beyond.storage;
  const questions = subject.questions;
  const count = questions.length;
  const all = questions.map((_, i) => i);
  const topics = [...new Set(questions.map(q => q.cat))];
  const areas = [...new Set(questions.map(q => q.area))];
  const extraKey = subject.storageKey + '_sesiones';
  const uid = () => Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10);
  let practice = storage.load(subject);
  const loaded = storage.read(extraKey, {});
  const raw = loaded && typeof loaded === 'object' && !Array.isArray(loaded) ? loaded : {};
  let practiceId = typeof raw.practiceId === 'string' ? raw.practiceId : uid();
  const validAnswers = values => Array.isArray(values) && values.length === count && values.every(a => a === null || Number.isInteger(a) && a >= 0 && a < 4);
  const validOrder = values => Array.isArray(values) && values.length === count && new Set(values).size === count && values.every(i => Number.isInteger(i) && i >= 0 && i < count);
  const validTime = value => Number.isFinite(value) && value >= 0;
  const questionIds = questions.map(q => q.id);
  const answerKey = questions.map(q => q.answer);
  const compatible = raw.bankVersion === subject.bankVersion && JSON.stringify(raw.questionIds) === JSON.stringify(questionIds) && JSON.stringify(raw.answerKey) === JSON.stringify(answerKey);
  let exam = compatible && raw.exam && validAnswers(raw.exam.answers) && validOrder(raw.exam.order) && validTime(raw.exam.elapsed) && Number.isInteger(raw.exam.index) && all.includes(raw.exam.index)
    ? { ...raw.exam, submitted: raw.exam.submitted === true } : null;
  let history = Array.isArray(raw.history) ? raw.history.filter(record => record && typeof record.id === 'string' && typeof record.bankVersion === 'string' && ['practica','simulacro'].includes(record.kind) && validAnswers(record.answers) && validTime(record.elapsed) && Array.isArray(record.questions) && record.questions.length === count && record.questions.every(q => q && typeof q.id === 'string' && typeof q.cat === 'string' && typeof q.area === 'string' && Number.isInteger(q.answer) && q.answer >= 0 && q.answer < 4)).slice(-20) : [];
  let reviewAnswers = compatible && raw.reviewAnswers && typeof raw.reviewAnswers === 'object' ? Object.fromEntries(Object.entries(raw.reviewAnswers).filter(([id,a]) => questions.some(q => q.id === id) && Number.isInteger(a) && a >= 0 && a < 4)) : {};
  let context = 'practice';
  let reviewMode = false;
  let topic = '';
  let area = '';
  let order = [...all];
  let selectedHistory = null;
  let reviewBase = null;
  let reviewOrigin = raw.reviewOrigin === 'simulacro' ? 'simulacro' : 'practica';

  function save() {
    storage.save(subject, practice);
    return storage.write(extraKey, { bankVersion:subject.bankVersion, questionIds, answerKey, practiceId, exam, history, reviewAnswers, reviewOrigin });
  }
  function summarize(answers, questionList = questions) {
    const done = answers.filter(a => a !== null).length;
    const correct = answers.filter((a,i) => a === questionList[i].answer).length;
    return { total:count, done, correct, wrong:done-correct, pending:count-done };
  }
  function state() { return context === 'exam' && exam ? exam : context === 'history' && selectedHistory ? selectedHistory : practice; }
  function stats() {
    const current = state();
    if (context === 'exam' && exam && !exam.submitted) {
      const done = exam.answers.filter(a => a !== null).length;
      return {total:count,done,pending:count-done,correct:0,wrong:0,hidden:true};
    }
    return summarize(context === 'practice' && reviewMode ? reviewBase : current.answers, context === 'history' ? current.questions : questions);
  }
  function breakdown(field, name) {
    const current = state();
    const bank = context === 'history' ? current.questions : questions;
    const indices = bank.flatMap((q,i) => q[field] === name ? [i] : []);
    const answers = context === 'practice' && reviewMode ? reviewBase : current.answers;
    const done = indices.filter(i => answers[i] !== null).length;
    const correct = context === 'exam' && !exam.submitted ? 0 : indices.filter(i => answers[i] === bank[i].answer).length;
    return {name,total:indices.length,done,correct,wrong:done-correct,pending:indices.length-done};
  }
  function ids() {
    if (context === 'exam' && exam) return exam.order;
    if (context === 'history') return all;
    return order.filter(i => (!topic || questions[i].cat === topic) && (!area || questions[i].area === area) && (!reviewMode || reviewBase[i] !== null && reviewBase[i] !== questions[i].answer));
  }
  function currentAnswer(i = state().index) {
    return context === 'practice' && reviewMode ? reviewAnswers[questions[i].id] ?? null : state().answers[i];
  }
  function select(i) { if (ids().includes(i)) { state().index = i; save(); } }
  function start(newTopic = '', newArea = '', mixed = false) {
    context = 'practice'; reviewMode = false; reviewBase = null;
    topic = topics.includes(newTopic) ? newTopic : '';
    area = areas.includes(newArea) ? newArea : '';
    order = [...all];
    if (mixed) { shuffle(order); practice.index = order[0]; }
    if (!ids().length) { topic = ''; area = ''; }
    if (!ids().includes(practice.index)) practice.index = ids()[0];
    save();
  }
  function shuffle(list) {
    for (let i = list.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i+1)); [list[i],list[j]] = [list[j],list[i]]; }
  }
  function review(newTopic = '') {
    if (context === 'history' && selectedHistory?.bankVersion !== subject.bankVersion) return false;
    if (context === 'exam' && !exam?.submitted) return false;
    if (!(context === 'practice' && reviewMode)) {
      reviewBase = [...state().answers];
      reviewOrigin = context === 'exam' ? 'simulacro' : context === 'history' ? selectedHistory.kind : 'practica';
    }
    context = 'practice'; topic = topics.includes(newTopic) ? newTopic : ''; area = ''; reviewMode = true;
    if (!ids().length) { reviewMode = false; topic = ''; return false; }
    reviewAnswers = {};
    practice.index = ids()[0]; save(); return true;
  }
  function snapshot(kind, answers, elapsed, attemptId) {
    const record = { id:uid(), attemptId, kind, bankVersion:subject.bankVersion, date:new Date().toISOString(), answers:[...answers], elapsed, questions:questions.map(q => ({id:q.id,cat:q.cat,area:q.area,answer:q.answer})) };
    const duplicate = history.find(r => r.attemptId === attemptId && JSON.stringify(r.answers) === JSON.stringify(answers));
    if (duplicate) return duplicate;
    history.push(record); history = history.slice(-20); save(); return record;
  }
  function answer(choice) {
    if (context === 'history' || context === 'exam' && (!exam || exam.submitted) || !Number.isInteger(choice) || choice < 0 || choice > 3 || currentAnswer() !== null) return false;
    const current = state();
    if (context === 'practice' && reviewMode) reviewAnswers[questions[current.index].id] = choice;
    else current.answers[current.index] = choice;
    save();
    if (context === 'practice' && !reviewMode && summarize(practice.answers).done === count) snapshot('practica',practice.answers,practice.elapsed,practiceId);
    return true;
  }
  function startExam() {
    if (exam && !exam.submitted) { context = 'exam'; return false; }
    exam = {id:uid(),answers:Array(count).fill(null),index:0,elapsed:0,order:[...all],submitted:false,startedAt:new Date().toISOString()};
    context = 'exam'; save(); return true;
  }
  function enter(view) {
    if (view === 'simulacro' || view === 'entrega') { if (!exam) startExam(); context = 'exam'; }
    else if (view === 'practica') context = 'practice';
    else if (!['resultados','revision'].includes(view)) { context = 'practice'; reviewMode = false; reviewBase = null; }
  }
  function submitExam() {
    if (!exam || exam.submitted) return false;
    exam.submitted = true; exam.submittedAt = new Date().toISOString();
    snapshot('simulacro',exam.answers,exam.elapsed,exam.id); save(); return true;
  }
  function openHistory(id) {
    const record = history.find(item => item.id === id);
    if (!record) return false;
    selectedHistory = {...record,index:0}; context = 'history'; return true;
  }
  function tick(seconds) {
    if (Number.isFinite(seconds) && seconds > 0 && context !== 'history' && !(context === 'exam' && exam?.submitted)) state().elapsed += Math.floor(seconds);
  }
  function reset() {
    practice = storage.empty(subject); practiceId = uid(); reviewAnswers = {}; reviewMode = false; topic = ''; area = ''; order = [...all]; context = 'practice'; save();
  }
  return {
    subject,questions,topics,areas,save,stats,ids,select,start,review,currentAnswer,answer,startExam,submitExam,enter,tick,reset,openHistory,
    topicStats:name => breakdown('cat',name), areaStats:name => breakdown('area',name),
    savePractice:() => snapshot('practica',practice.answers,practice.elapsed,practiceId),
    practiceStats:() => summarize(practice.answers),
    get state() {return state();}, get mode() {return context === 'exam' ? 'exam' : reviewMode ? 'review' : 'all';},
    get reveal() {return context !== 'exam' || !!exam?.submitted;}, get context() {return context;},
    get filter() {return topic;}, get areaFilter() {return area;}, get exam() {return exam;},
    get history() {return [...history].reverse();}, get selectedHistory() {return selectedHistory;},
    get reviewOrigin() {return reviewOrigin;},
    get lastReviewStats() {const entries=Object.entries(reviewAnswers);return {done:entries.length,correct:entries.filter(([id,answer])=>questions.find(q=>q.id===id)?.answer===answer).length};},
    get historyCompatible() {return selectedHistory?.bankVersion === subject.bankVersion && selectedHistory.questions.every((q,i) => q.id === questions[i].id && q.answer === questions[i].answer);},
    get reviewStats() {const list = ids();return {total:list.length,done:list.filter(i=>reviewAnswers[questions[i].id]!==undefined).length,correct:list.filter(i=>reviewAnswers[questions[i].id]===questions[i].answer).length};}
  };
};

// Compatibility for existing integrations.
window.Beyond.createScienceQuiz = window.Beyond.createLearningQuiz;
