window.Beyond = window.Beyond || {};
window.Beyond.scienceQuestions = [];
window.Beyond.scienceBankVersion = 'ciencias-1';
/* Author each correct answer with its three misconception-based distractors.
   A fixed shuffled deck balances A–D without a predictable repeating pattern. */
window.Beyond.createQuestionBank = (questions, initialSeed = 821947) => {
  const positions = Array.from({ length: 100 }, (_, i) => i % 4);
  let seed = initialSeed;
  for (let i = positions.length - 1; i > 0; i--) {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    const j = seed % (i + 1);
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }
  function question(difficulty, type, stem, correct, distractors, explain, concept, tip, extra = {}) {
    return { difficulty, type, stem, correct, distractors, explain, concept, tip, ...extra };
  }
  function section(prefix, area, cat, start, rows) {
    rows.forEach((row, i) => {
      const { correct, distractors, ...fields } = row;
      const answer = positions[questions.length];
      const pairs = [...distractors];
      pairs.splice(answer, 0, [correct, row.explain]);
      questions.push({
        ...fields, id: `${prefix}-${String(start + i).padStart(3, '0')}`, area, cat,
        opts: pairs.map(pair => pair[0]), answer, feedback: pairs.map(pair => pair[1]),
        tags: [area, cat, ...(row.tags || [])]
      });
    });
  }
  return { question, section };
};
window.Beyond.scienceBank = window.Beyond.createQuestionBank(window.Beyond.scienceQuestions);
