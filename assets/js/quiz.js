window.Avanzo = window.Avanzo || {};
window.Avanzo.createQuiz = (subject) => {
  let state = window.Avanzo.storage.load(subject);
  let mode = 'all';
  let filter = '';
  let reviewAnswers = {};
  const questions = subject.questions;
  const topics = [...new Set(questions.map(question => question.cat))];
  const save = () => window.Avanzo.storage.save(subject, state);

  function stats() {
    const done = state.answers.filter(answer => answer !== null).length;
    const correct = state.answers.filter((answer, i) => answer === questions[i].answer).length;
    return { done, correct, wrong: done - correct, pending: questions.length - done, total: questions.length };
  }

  function topicStats(topic) {
    const ids = questions.flatMap((question, i) => question.cat === topic ? [i] : []);
    const done = ids.filter(i => state.answers[i] !== null).length;
    const correct = ids.filter(i => state.answers[i] === questions[i].answer).length;
    return { topic, total: ids.length, done, correct, wrong: done - correct, pending: ids.length - done };
  }

  function ids() {
    return questions.flatMap((question, i) => {
      const matchesTopic = !filter || question.cat === filter;
      const matchesMode = mode !== 'review' || (state.answers[i] !== null && state.answers[i] !== question.answer);
      return matchesTopic && matchesMode ? [i] : [];
    });
  }

  function currentAnswer(i = state.index) { return mode === 'review' ? (reviewAnswers[i] ?? null) : state.answers[i]; }

  function select(i) {
    if (!ids().includes(i)) return;
    state.index = i;
    save();
  }

  function start(topic = '') {
    mode = 'all';
    filter = topics.includes(topic) ? topic : '';
    if (!ids().includes(state.index)) state.index = ids()[0];
    save();
  }

  function review() {
    if (!stats().wrong) return false;
    mode = 'review';
    filter = '';
    reviewAnswers = {};
    state.index = ids()[0];
    save();
    return true;
  }

  function answer(choice) {
    const question = questions[state.index];
    if (!Number.isInteger(choice) || choice < 0 || choice >= question.opts.length || currentAnswer() !== null) return false;
    if (mode === 'review') reviewAnswers[state.index] = choice;
    else state.answers[state.index] = choice;
    save();
    return true;
  }

  function tick(seconds) {
    if (Number.isFinite(seconds) && seconds > 0) state.elapsed += Math.floor(seconds);
  }

  function reset() {
    state = window.Avanzo.storage.empty(subject);
    mode = 'all'; filter = ''; reviewAnswers = {};
    save();
  }

  return {
    subject, questions, topics, stats, topicStats, ids, select, start, review, answer, currentAnswer, tick, reset, save,
    get state() { return state; }, get mode() { return mode; }, get filter() { return filter; },
    get reviewStats() {
      const list = ids();
      return { total: list.length, done: list.filter(i => reviewAnswers[i] !== undefined).length, correct: list.filter(i => reviewAnswers[i] === questions[i].answer).length };
    }
  };
};
