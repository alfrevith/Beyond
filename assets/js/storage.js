window.Beyond = window.Beyond || {};
window.Beyond.storage = (() => {
  let available = true;

  function empty(subject) {
    const state = { answers: Array(subject.questions.length).fill(null), elapsed: 0, index: 0 };
    if (subject.bankVersion) {
      state.bankVersion = subject.bankVersion;
      state.questionIds = subject.questions.map(question => question.id);
    }
    return state;
  }

  function normalize(raw, subject) {
    const state = empty(subject);
    if (subject.bankVersion && (raw?.bankVersion !== subject.bankVersion || JSON.stringify(raw?.questionIds) !== JSON.stringify(state.questionIds))) return state;
    if (!raw || !Array.isArray(raw.answers) || raw.answers.length !== state.answers.length) return state;
    state.answers = raw.answers.map((answer, i) => Number.isInteger(answer) && answer >= 0 && answer < subject.questions[i].opts.length ? answer : null);
    state.elapsed = Number.isFinite(raw.elapsed) ? Math.max(0, Math.floor(raw.elapsed)) : 0;
    state.index = Number.isInteger(raw.index) ? Math.max(0, Math.min(state.answers.length - 1, raw.index)) : 0;
    return state;
  }

  function load(subject) {
    let raw = null;
    try {
      for (const key of [subject.storageKey, ...(subject.legacyKeys || [])]) {
        const saved = localStorage.getItem(key);
        if (!saved) continue;
        try { raw = JSON.parse(saved); } catch (_) { continue; }
        if (raw && Array.isArray(raw.answers) && raw.answers.length === subject.questions.length) break;
        raw = null;
      }
    } catch (_) { available = false; }
    return normalize(raw, subject);
  }

  function save(subject, state) {
    try { localStorage.setItem(subject.storageKey, JSON.stringify(normalize(state, subject))); }
    catch (_) { available = false; }
    return available;
  }

  function read(key, fallback) {
    try { const text = localStorage.getItem(key); return text ? JSON.parse(text) : fallback; }
    catch (_) { return fallback; }
  }

  function write(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; }
    catch (_) { available = false; return false; }
  }

  return { empty, normalize, load, save, read, write, isAvailable: () => available };
})();
