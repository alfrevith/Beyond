const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function setup(initial = {}, blocked = false) {
  const values = new Map(Object.entries(initial));
  const context = vm.createContext({ window: {}, localStorage: {
    getItem(key) { if (blocked) throw new Error('Storage blocked'); return values.get(key) ?? null; },
    setItem(key, value) { if (blocked) throw new Error('Storage blocked'); values.set(key, value); }
  } });
  for (const file of ['data/math-questions.js', 'data/math-guides.js', 'data/subjects.js', 'storage.js', 'quiz.js']) {
    vm.runInContext(fs.readFileSync(path.join(__dirname, '../assets/js', file), 'utf8'), context);
  }
  const app = context.window.Avanzo;
  const subject = app.subjects[0];
  return { app, subject, values, quiz: app.createQuiz(subject) };
}

test('El banco conserva 100 preguntas válidas y una guía completa para cada tema', () => {
  const { subject, quiz, app } = setup();
  assert.equal(subject.questions.length, 100);
  assert.equal(quiz.topics.length, 22);
  for (const question of subject.questions) {
    assert.equal(question.opts.length, 4);
    assert.ok(Number.isInteger(question.answer) && question.answer >= 0 && question.answer < 4);
    assert.ok(question.stem && question.explain);
    for (const key of ['idea', 'rule', 'example', 'tip']) assert.ok(subject.guides[question.cat][key]);
  }
  assert.equal(app.subjects.filter(subject => !subject.available).length, 2);
});

test('La primera respuesta es definitiva; se puede saltar y continuar sin perderla', () => {
  const { quiz } = setup();
  assert.equal(quiz.answer(quiz.questions[0].answer), true);
  assert.equal(quiz.answer(1), false);
  quiz.select(2);
  quiz.answer(quiz.questions[2].answer);
  assert.equal(quiz.stats().correct, 2);
  assert.equal(quiz.stats().pending, 98);
  quiz.select(0);
  assert.equal(quiz.currentAnswer(), quiz.questions[0].answer);
});

test('Los errores se repasan sin alterar las respuestas ni el diagnóstico original', () => {
  const { quiz } = setup();
  assert.equal(quiz.review(), false);
  const wrong = (quiz.questions[0].answer + 1) % 4;
  quiz.answer(wrong);
  quiz.select(1);
  quiz.answer(quiz.questions[1].answer);
  assert.equal(quiz.review(), true);
  assert.equal(quiz.ids().length, 1);
  assert.equal(quiz.currentAnswer(), null);
  quiz.answer(quiz.questions[0].answer);
  assert.equal(quiz.reviewStats.correct, 1);
  assert.equal(quiz.stats().wrong, 1);
  assert.equal(quiz.stats().correct, 1);
  assert.equal(quiz.state.answers[0], wrong);
  quiz.start('Fracciones');
  assert.equal(quiz.mode, 'all');
  assert.ok(quiz.ids().every(i => quiz.questions[i].cat === 'Fracciones'));
});

test('Se recuperan el tiempo, el índice y las respuestas anteriores de ESEN', () => {
  const answers = Array(100).fill(null); answers[0] = 0;
  const { quiz, values, subject } = setup({ esen_diagnostico_100_v1: JSON.stringify({ answers, elapsed: 73, index: 4, mode: 'review' }) });
  assert.equal(quiz.state.elapsed, 73);
  assert.equal(quiz.state.index, 4);
  assert.equal(quiz.stats().correct, 1);
  assert.equal(quiz.mode, 'all');
  quiz.save();
  assert.ok(values.has(subject.storageKey));
});

test('Datos dañados, respuestas imposibles y almacenamiento bloqueado no rompen la práctica', () => {
  assert.equal(setup({ avanzo_matematica_v1: '{malformed' }).quiz.stats().done, 0);
  const answers = Array(100).fill(null); answers[0] = -1; answers[1] = 9; answers[2] = '0';
  const { quiz } = setup({ avanzo_matematica_v1: JSON.stringify({ answers, elapsed: -20, index: 400 }) });
  assert.equal(quiz.stats().done, 0);
  assert.equal(quiz.state.elapsed, 0);
  assert.equal(quiz.state.index, 99);
  const blocked = setup({}, true);
  assert.equal(blocked.app.storage.isAvailable(), false);
  assert.equal(blocked.quiz.answer(0), true);
  assert.equal(blocked.quiz.stats().done, 1);
});

test('Completar el banco, persistir y reiniciar produce resultados coherentes', () => {
  const { quiz, values, subject } = setup();
  quiz.questions.forEach((question, i) => { quiz.select(i); quiz.answer(question.answer); });
  assert.equal(quiz.stats().correct, 100);
  assert.equal(quiz.stats().pending, 0);
  assert.equal(quiz.topics.reduce((sum, topic) => sum + quiz.topicStats(topic).correct, 0), 100);
  quiz.tick(30);
  quiz.save();
  const restored = setup(Object.fromEntries(values)).quiz;
  assert.equal(restored.stats().correct, 100);
  assert.equal(restored.state.elapsed, 30);
  restored.reset();
  assert.equal(restored.stats().done, 0);
  assert.equal(restored.state.elapsed, 0);
  assert.ok(values.has(subject.storageKey));
});

test('El motor admite otra materia y un banco de tamaño diferente sin mezclar progresos', () => {
  const { app, subject, quiz, values } = setup();
  quiz.answer(0);
  const science = { ...subject, id: 'ciencias', storageKey: 'avanzo_ciencias_v1', legacyKey: undefined, questions: subject.questions.slice(4, 6) };
  const second = app.createQuiz(science);
  assert.equal(second.stats().total, 2);
  assert.equal(second.stats().done, 0);
  second.answer(science.questions[0].answer);
  assert.equal(second.stats().correct, 1);
  assert.equal(quiz.stats().done, 1);
  assert.ok(values.has(science.storageKey));
  second.reset();
  assert.equal(app.createQuiz(subject).stats().done, 1);
});
