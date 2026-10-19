(() => {
  'use strict';

  const { subjects, createQuiz, storage } = window.Beyond;
  const quizzes = new Map(subjects.filter(subject => subject.available).map(subject => [subject.id, subject.advanced ? window.Beyond.createLearningQuiz(subject) : createQuiz(subject)]));
  const main = document.getElementById('main');
  const navigation = document.getElementById('navigation');
  const breadcrumb = document.getElementById('breadcrumb');
  const dialog = document.getElementById('reset-dialog');
  let route = '';
  let activeQuiz = null;
  let lastTick = Date.now();
  let lastSave = Date.now();
  let toastTimeout;
  let storageNotified = false;
  const learningUIs = new Map([...quizzes].filter(([,quiz])=>quiz.subject.advanced).map(([id,quiz])=>[id,window.Beyond.createLearningUI({quiz,main,navigate,notify,flush:updateTime})]));

  const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  const percent = (part, total) => total ? Math.round(100 * part / total) : 0;
  const formatTime = seconds => [Math.floor(seconds / 3600), Math.floor(seconds % 3600 / 60), seconds % 60].map(value => String(value).padStart(2, '0')).join(':');
  const paths = {
    home: '<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
    math: '<path d="M6 3v6m-3-3h6m5 0h7M4 15l5 5m0-5-5 5m11-3h6m-6 4h6"/>',
    science: '<path d="M9 3h6m-5 0v6L4.5 18a2 2 0 0 0 1.7 3h11.6a2 2 0 0 0 1.7-3L14 9V3M8 14h8m-6 3h.01m4 1h.01"/>',
    community: '<circle cx="9" cy="7" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3m2-17a3 3 0 0 1 0 6m2 11v-3a6 6 0 0 0-3-5"/>',
    arrow: '<path d="M5 12h14m-5-5 5 5-5 5"/>',
    left: '<path d="M19 12H5m5 5-5-5 5-5"/>',
    chevron: '<path d="m9 5 7 7-7 7"/>',
    book: '<path d="M12 5v15m0-15C8 2 4 3 2 4v15c3-1 6-1 10 1 4-2 7-2 10-1V4c-2-1-6-2-10 1Z"/>',
    list: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8m-8 4h8m-8 4h5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 4v3"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v.01"/>',
    spark: '<path d="m12 3 2.4 6.6L21 12l-6.6 2.4L12 21l-2.4-6.6L3 12l6.6-2.4L12 3Z"/>',
    chart: '<path d="M4 3v17h17M8 16v-5m5 5V7m5 9v-3"/>',
    reset: '<path d="M3 4v6h6m-6 0a9 9 0 1 1 1 8"/>'
  };
  function icon(name, size = 19) {
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.book}</svg>`;
  }

  function illustration() {
    return `<div class="hero-art" aria-hidden="true"><span class="mascot-orbit"></span><span class="mascot-spark mascot-spark-one">✦</span><img class="hero-mascot" src="assets/images/beyond-logo.png" alt="" width="240" height="240"><span class="mascot-spark mascot-spark-two">✧</span><span class="mascot-caption">UN PASO MÁS ALLÁ</span></div>`;
  }

  function notify(message) {
    const toast = document.getElementById('toast');
    clearTimeout(toastTimeout);
    toast.textContent = message;
    toast.hidden = false;
    toastTimeout = setTimeout(() => { toast.hidden = true; }, 4500);
  }

  function save(quiz) {
    if (quiz) quiz.save();
    if (!storage.isAvailable() && !storageNotified) {
      storageNotified = true;
      notify('El navegador no permite guardar el progreso. Puedes practicar durante esta sesión.');
    }
  }

  function updateTime() {
    const now = Date.now();
    if (activeQuiz && ['/practica','/simulacro','/revision'].some(suffix => route.split('/').slice(0,2).join('/').endsWith(suffix)) && !document.hidden) {
      const seconds = Math.floor((now - lastTick) / 1000);
      activeQuiz.tick(seconds);
      lastTick += seconds * 1000;
      const clock = document.getElementById('clock');
      if (clock) clock.textContent = formatTime(activeQuiz.state.elapsed);
      if (now - lastSave >= 10000) { save(activeQuiz); lastSave = now; }
    } else lastTick = now;
  }

  function notice() {
    return `<p class="study-notice">${icon('info', 13)}<span>Práctica independiente. El banco inicial de Matemática está en adaptación al temario de AVANZO. No es una prueba oficial.</span></p>`;
  }

  function renderNavigation(subjectId = '') {
    navigation.innerHTML = `<a class="nav-link ${!subjectId ? 'active' : ''}" href="#inicio" ${!subjectId ? 'aria-current="page"' : ''}>${icon('home', 18)}<span class="nav-text">Mi espacio</span></a>` + subjects.map(subject => subject.available
      ? `<a class="nav-link ${subjectId === subject.id ? 'active' : ''}" href="#${subject.id}" ${subjectId === subject.id ? 'aria-current="page"' : ''}>${icon(subject.icon, 18)}<span class="nav-text">${escape(subject.shortName)}</span></a>`
      : `<span class="nav-link unavailable" aria-disabled="true">${icon(subject.icon, 18)}<span class="nav-text">${escape(subject.shortName)}</span><span class="nav-soon">PRONTO</span></span>`).join('');
  }

  function renderLobby() {
    breadcrumb.textContent = 'Mi espacio de estudio';
    renderNavigation();
    main.innerHTML = `${!storage.isAvailable() ? '<p class="storage-warning">Tu navegador no permite guardar el progreso. Las respuestas se conservarán solo durante esta sesión.</p>' : ''}
      <div class="page-heading"><div><div class="eyebrow">BEYOND · TU ESPACIO DE ESTUDIO</div><h1>Un esfuerzo<br>para mañana<span class="accent">.</span></h1><p>Pequeños pasos hoy. Más confianza para tu prueba AVANZO.</p></div><span class="quiet-badge">${icon('spark', 14)} Tú pones el ritmo</span></div>
      <section class="hero" aria-labelledby="hero-title"><div class="hero-copy"><span class="hero-label">${icon('spark', 13)} APRENDE CON CONFIANZA</span><h2 id="hero-title">Entenderlo cambia todo.</h2><p>Practica, descubre qué puedes mejorar y aprende de cada respuesta. Este es tu espacio para llegar con más confianza.</p><a class="button button-primary" href="#matematica">Empezar con Matemática ${icon('arrow', 15)}</a></div>${illustration()}</section>
      <div class="section-title"><div><h2>¿Qué vamos a estudiar?</h2><p>Elige una materia y construye tu propio camino.</p></div><span class="section-meta">${String(subjects.filter(subject => subject.available).length).padStart(2, '0')} de ${String(subjects.length).padStart(2, '0')} materias disponibles</span></div>
      <div class="subject-grid">${subjects.map(subjectCard).join('')}</div>
      <section class="learning-strip" aria-labelledby="learning-title"><div><h3 id="learning-title">Aprender va más allá de acertar.</h3><p>Cada intento es una oportunidad para entender.</p></div><div class="steps"><div class="step"><span class="step-number">01</span><div><strong>Explora</strong><p>Repasa las ideas clave de cada tema.</p></div></div><div class="step"><span class="step-number">02</span><div><strong>Practica</strong><p>Resuelve sin presión y a tu ritmo.</p></div></div><div class="step"><span class="step-number">03</span><div><strong>Comprende</strong><p>Aprende del porqué de tu respuesta.</p></div></div></div></section>${notice()}`;
  }

  function subjectCard(subject) {
    const quiz = quizzes.get(subject.id);
    const stats = subject.advanced ? quiz.practiceStats() : quiz?.stats();
    return `<article class="subject-card ${subject.available ? 'available' : ''}">
      <div class="subject-card-top"><span class="subject-icon ${subject.color}">${icon(subject.icon, 25)}</span><span class="availability ${subject.available ? '' : 'soon'}">${subject.available ? '<span class="availability-dot"></span> Disponible' : icon('lock', 10) + ' Próximamente'}</span></div>
      <h3>${escape(subject.name)}</h3><p class="tagline">${escape(subject.label)}</p><p class="description">${escape(subject.description)}</p>
      <div class="card-meta">${subject.available ? `<span>${icon('list', 12)} ${stats.total} ejercicios</span><span>${icon('book', 12)} ${quiz.topics.length} temas</span>` : `<span>${icon('book', 12)} Una nueva guía está en camino</span>`}</div>
      <div class="card-footer">${subject.available ? `<div><div class="card-progress"><span style="width:${percent(stats.done, stats.total)}%"></span></div><div class="progress-caption"><span>Tu progreso</span><span>${stats.done}/${stats.total}</span></div></div><a class="button button-primary" href="#${subject.id}">Explorar materia ${icon('arrow', 14)}</a>` : '<button class="button button-muted" disabled>Disponible próximamente</button>'}</div></article>`;
  }

  function guideContent(guide) {
    if (!guide) return '';
    return `<span class="guide-label">La idea clave</span><p>${escape(guide.idea)}</p><span class="guide-label">Tenlo a mano</span><p class="formula">${escape(guide.rule)}</p><span class="guide-label">Veámoslo en un ejemplo</span><p>${escape(guide.example)}</p><p class="guide-tip"><strong>Recuerda:</strong> ${escape(guide.tip)}</p>`;
  }

  function renderSubject(quiz) {
    const { subject } = quiz;
    const stats = quiz.stats();
    const hasProgress = stats.done > 0 || quiz.state.elapsed > 0;
    main.innerHTML = `<div class="page-heading"><div><div class="eyebrow">TU GUÍA DE ESTUDIO</div><h1>${escape(subject.name)}<span class="accent">.</span></h1><p>Primero comprende la idea. Después, ponla en práctica.</p></div><a class="button button-light" href="#inicio">${icon('left', 14)} Volver al lobby</a></div>
      <div class="subject-overview"><section class="hero subject-hero"><div class="hero-copy"><span class="subject-icon">${icon(subject.icon, 25)}</span><span class="hero-label">SIN PRISA, CON PROPÓSITO</span><h2>Tu siguiente respuesta<br>empieza por entender.</h2><p>Lee las guías, resuelve los ejercicios y recibe una explicación en cada respuesta. Puedes saltar preguntas y volver después.</p><div class="mini-stats"><div class="mini-stat"><b>${stats.total}</b><span>ejercicios</span></div><div class="mini-stat"><b>${quiz.topics.length}</b><span>temas</span></div><div class="mini-stat"><b>∞</b><span>sin límite de tiempo</span></div></div><button class="button button-primary" data-action="practice">${hasProgress ? 'Continuar práctica' : 'Comenzar práctica'} ${icon('arrow', 15)}</button></div></section>
      <aside class="progress-panel" aria-label="Tu progreso en ${escape(subject.name)}"><div class="panel-heading">Tu recorrido ${icon('chart', 20)}</div><div class="progress-value">${percent(stats.done, stats.total)}<small>%</small></div><div class="progress-track" role="progressbar" aria-label="Preguntas respondidas" aria-valuenow="${stats.done}" aria-valuemin="0" aria-valuemax="${stats.total}"><span style="width:${percent(stats.done, stats.total)}%"></span></div><p>${stats.done} de ${stats.total} preguntas respondidas</p><div class="progress-counts"><div><b class="positive">${stats.correct}</b><span>Aciertos</span></div><div><b class="negative">${stats.wrong}</b><span>Por reforzar</span></div><div><b>${stats.pending}</b><span>Pendientes</span></div></div><a class="text-link" href="#${subject.id}/resultados">Ver mi diagnóstico ${icon('arrow', 14)}</a></aside></div>
      <div class="section-title"><div><h2>Una idea clara, un tema a la vez.</h2><p>Abre una guía para repasar o practicar ese tema.</p></div><span class="section-meta">${quiz.topics.length} guías rápidas</span></div>
      <div class="topic-grid">${quiz.topics.map((topic, i) => {
        const topicStats = quiz.topicStats(topic);
        return `<details class="topic-guide"><summary><span class="topic-index">${String(i + 1).padStart(2, '0')}</span><span class="topic-info"><strong>${escape(topic)}</strong><small>${topicStats.total} ejercicios · ${topicStats.done} respondidos</small></span><span class="topic-chevron">${icon('chevron', 14)}</span></summary><div class="guide-content">${guideContent(subject.guides[topic])}<button class="button button-light" data-action="practice-topic" data-topic="${escape(topic)}">Practicar este tema ${icon('arrow', 14)}</button></div></details>`;
      }).join('')}</div>${notice()}${hasProgress ? '<div class="reset-row"><button class="text-link" data-action="reset">' + icon('reset', 13) + ' Reiniciar mi progreso</button></div>' : ''}`;
  }

  function renderQuestion(quiz) {
    const list = quiz.ids();
    if (!list.includes(quiz.state.index)) quiz.select(list[0]);
    const i = quiz.state.index;
    const question = quiz.questions[i];
    const answer = quiz.currentAnswer();
    const stats = quiz.stats();
    const position = list.indexOf(i);
    const isReview = quiz.mode === 'review';
    const reviewStats = quiz.reviewStats;
    const finished = position === list.length - 1;
    const correct = answer === question.answer;
    main.innerHTML = `<div class="page-heading quiz-heading"><div><div class="eyebrow">${isReview ? 'OTRA OPORTUNIDAD PARA APRENDER' : 'PON EN PRÁCTICA LO QUE SABES'}</div><h1>${isReview ? 'Repasa tus errores' : 'Un ejercicio a la vez'}<span class="accent">.</span></h1><p>${isReview ? 'Tus resultados iniciales se conservan durante el repaso.' : 'Sin límite de tiempo. Cada respuesta incluye una explicación.'}</p></div><div class="quiz-tools"><span class="timer">${icon('clock', 15)}<span id="clock" aria-label="Tiempo de estudio">${formatTime(quiz.state.elapsed)}</span></span><a class="button button-light" href="#${quiz.subject.id}">${icon('book', 14)} Guía</a><a class="button button-primary" href="#${quiz.subject.id}/resultados">Ver diagnóstico ${icon('chart', 14)}</a></div></div>
      ${isReview ? `<div class="review-banner"><span>${reviewStats.done} de ${reviewStats.total} repasadas · ${reviewStats.correct} acertadas en este repaso. Puedes volver a consultar todas las explicaciones.</span><button class="text-link" data-action="practice">Salir del repaso ${icon('arrow', 13)}</button></div>` : ''}
      <div class="quiz-grid"><section aria-label="Ejercicio actual"><article class="question-card"><div class="question-top"><span class="topic-pill">${escape(question.cat)}</span><span class="question-position">${position + 1} de ${list.length}${quiz.filter ? ' en este tema' : isReview ? ' en repaso' : ' ejercicios'}</span></div><div class="question-body"><div class="question-number">PREGUNTA ${String(i + 1).padStart(2, '0')}</div><h2 id="question-title" tabindex="-1">${escape(question.stem)}</h2><div class="choices" role="group" aria-labelledby="question-title">${question.opts.map((option, k) => {
        const status = answer !== null ? k === question.answer ? 'correct' : k === answer ? 'incorrect' : '' : '';
        return `<button class="choice ${status}" data-action="answer" data-choice="${k}" ${answer !== null ? 'disabled' : ''}><span class="choice-letter">${String.fromCharCode(65 + k)}</span><span class="choice-text">${escape(option)}</span>${status ? `<span class="answer-mark">${status === 'correct' ? '✓ Correcta' : '✕ Tu respuesta'}</span>` : ''}</button>`;
      }).join('')}</div>${answer !== null ? `<div id="feedback" class="feedback ${correct ? '' : 'bad'}" role="status" tabindex="-1"><strong>${icon(correct ? 'check' : 'info', 17)}${correct ? '¡Bien! Vamos a entender por qué.' : 'Aquí hay una oportunidad para aprender.'}</strong>${!correct ? `<p class="correct-answer">Respuesta correcta: ${String.fromCharCode(65 + question.answer)}) ${escape(question.opts[question.answer])}</p>` : ''}<p>${escape(question.explain)}</p></div>` : ''}
      <details class="question-guide"><summary>¿Necesitas una pista? Repasa la idea clave</summary><div class="guide-content">${guideContent(quiz.subject.guides[question.cat])}</div></details></div>
      <div class="question-actions"><button class="button button-light" data-action="previous" ${position === 0 ? 'disabled' : ''}>${icon('left', 14)} Anterior</button>${finished ? `<a class="button button-primary" href="#${quiz.subject.id}/resultados">Ver mi diagnóstico ${icon('arrow', 14)}</a>` : `<button class="button button-primary" data-action="next">${answer === null ? 'Saltar pregunta' : 'Siguiente'} ${icon('arrow', 14)}</button>`}</div></article>
      <p class="question-footnote">${icon('info', 12)}<span>${isReview ? 'El repaso no cambia tu primera respuesta. Reinicia el progreso únicamente si quieres realizar un diagnóstico nuevo.' : 'El diagnóstico registra tu primera respuesta. Puedes consultar las explicaciones y volver a practicar tus errores al terminar.'}</span></p></section>
      <details class="navigator" ${window.matchMedia('(min-width: 1001px)').matches ? 'open' : ''}><summary>Tu recorrido ${icon('list', 16)}</summary><div class="navigator-body"><div class="progress-track" role="progressbar" aria-label="Preguntas respondidas" aria-valuenow="${stats.done}" aria-valuemin="0" aria-valuemax="${stats.total}"><span style="width:${percent(stats.done, stats.total)}%"></span></div><p class="progress-caption nav-progress-caption">${stats.done} de ${stats.total} respondidas</p><div class="nav-counts"><div><b class="positive">${stats.correct}</b>Aciertos</div><div><b class="negative">${stats.wrong}</b>Por reforzar</div><div><b>${stats.pending}</b>Pendientes</div></div>
      <label class="select-label" for="topic-select">Ir a un tema${isReview ? ' (salir del repaso)' : ''}</label><select class="topic-select" id="topic-select"><option value="">Todos los temas</option>${quiz.topics.map(topic => `<option value="${escape(topic)}" ${quiz.filter === topic ? 'selected' : ''}>${escape(topic)}</option>`).join('')}</select>
      <div class="question-nav" aria-label="Navegador de preguntas">${list.map(index => {
        const saved = isReview ? quiz.currentAnswer(index) : quiz.state.answers[index];
        const status = saved === null ? 'pendiente' : saved === quiz.questions[index].answer ? 'correcta' : 'incorrecta';
        return `<button data-action="select-question" data-index="${index}" class="${saved === null ? '' : saved === quiz.questions[index].answer ? 'done' : 'bad'} ${i === index ? 'current' : ''}" ${i === index ? 'aria-current="step"' : ''} aria-label="Pregunta ${index + 1}: ${escape(quiz.questions[index].cat)}, ${status}">${index + 1}</button>`;
      }).join('')}</div><div class="nav-legend"><span><i class="legend-dot good"></i>Correcta</span><span><i class="legend-dot bad"></i>Por reforzar</span><span><i class="legend-dot"></i>Pendiente</span></div><button class="button button-light" data-action="review" ${!stats.wrong ? 'disabled' : ''}>${icon('reset', 14)} Repasar errores</button></div></details></div>`;
    document.getElementById('topic-select').addEventListener('change', event => {
      quiz.start(event.target.value);
      refreshQuestion(true);
    });
    save(quiz);
  }

  function renderReport(quiz) {
    const stats = quiz.stats();
    const topics = quiz.topics.map(quiz.topicStats);
    const weak = topics.filter(topic => topic.wrong > 0).sort((a, b) => b.wrong / b.done - a.wrong / a.done || b.wrong - a.wrong).slice(0, 3);
    main.innerHTML = `<div class="page-heading"><div><div class="eyebrow">CADA INTENTO TE ENSEÑA ALGO</div><h1>Tu mapa de aprendizaje<span class="accent">.</span></h1><p>Descubre tus avances y elige qué reforzar después.</p></div><a class="button button-light" href="#${quiz.subject.id}">${icon('left', 14)} Volver a la guía</a></div>
      <section class="result-hero"><div class="score-ring"><svg viewBox="0 0 150 150" aria-hidden="true"><circle cx="75" cy="75" r="65" stroke="#34323b" stroke-width="7"/><circle cx="75" cy="75" r="65" stroke="#f2bd69" stroke-width="7" stroke-linecap="round" stroke-dasharray="${408.4 * stats.correct / stats.total} 408.4"/></svg><div><strong>${stats.correct}<span class="score-total">/${stats.total}</span></strong><small>aciertos iniciales</small></div></div><div><div class="eyebrow">${stats.done === 0 ? 'EL PRIMER PASO ESTÁ POR VENIR' : stats.pending ? 'TU RECORRIDO SIGUE' : 'DIAGNÓSTICO COMPLETADO'}</div><h2>${stats.done === 0 ? 'Todo empieza con un intento.' : stats.wrong ? 'Ya sabes por dónde continuar.' : 'Cada idea comprendida cuenta.'}</h2><p>${stats.done === 0 ? 'Todavía no has respondido preguntas. Empieza a practicar para descubrir tus fortalezas y los temas que puedes reforzar.' : `Has respondido ${stats.done} de ${stats.total} ejercicios. ${stats.pending ? `Quedan ${stats.pending} pendientes. ` : ''}Tu precisión entre las preguntas respondidas es del ${percent(stats.correct, stats.done)}%. Tiempo de estudio: ${formatTime(quiz.state.elapsed)}.`}</p><div class="quiz-tools"><button class="button button-primary" data-action="practice">${stats.pending ? 'Continuar práctica' : 'Revisar preguntas'} ${icon('arrow', 14)}</button><button class="button button-light" data-action="review" ${stats.wrong ? '' : 'disabled'}>${icon('reset', 14)} Repasar errores</button></div></div></section>
      <div class="result-counters"><div class="result-counter"><b class="positive">${stats.correct}</b><span>Respuestas correctas</span></div><div class="result-counter"><b class="negative">${stats.wrong}</b><span>Oportunidades de mejora</span></div><div class="result-counter"><b>${stats.pending}</b><span>Preguntas pendientes</span></div><div class="result-counter"><b>${percent(stats.done, stats.total)}%</b><span>Del recorrido completado</span></div></div>
      <div class="section-title"><div><h2>Tu siguiente paso</h2><p>Repasa las ideas detrás de los ejercicios que más costaron.</p></div></div>
      ${weak.length ? `<div class="recommendations">${weak.map((topic, i) => `<article class="recommendation"><span class="topic-index">${String(i + 1).padStart(2, '0')}</span><h3>${escape(topic.topic)}</h3><p>${topic.wrong} de ${topic.done} respuestas para reforzar${topic.pending ? ` · ${topic.pending} pendientes` : ''}.</p><button class="text-link" data-action="open-guide" data-topic="${escape(topic.topic)}">Repasar la idea ${icon('arrow', 13)}</button></article>`).join('')}</div>` : `<p class="empty-note">${stats.done ? 'No tienes errores registrados. Continúa con las preguntas pendientes o explora las guías para consolidar lo aprendido.' : 'Tus recomendaciones aparecerán aquí cuando respondas los primeros ejercicios.'}</p>`}
      <div class="section-title"><div><h2>Tema por tema</h2><p>80% o más: fortaleza · 60–79%: en progreso · Menos del 60%: reforzar.</p></div></div><div class="results-table-wrap"><table class="results-table"><caption class="sr-only">Resultados iniciales por tema. El dominio se calcula cuando completas todas sus preguntas.</caption><thead><tr><th scope="col">Tema</th><th scope="col">Aciertos</th><th scope="col">Respondidas</th><th scope="col">Dominio</th></tr></thead><tbody>${topics.map(topic => {
        const score = percent(topic.correct, topic.total);
        const label = topic.done === 0 ? 'Sin empezar' : topic.pending ? `${topic.pending} pendientes` : score >= 80 ? 'Fortaleza' : score >= 60 ? 'En progreso' : 'Reforzar';
        return `<tr><td>${escape(topic.topic)}</td><td>${topic.correct}/${topic.total}</td><td>${topic.done}/${topic.total}</td><td><div class="progress-track table-progress"><span style="width:${score}%"></span></div><span class="status-label">${label}</span></td></tr>`;
      }).join('')}</tbody></table></div><p class="study-notice">${icon('info', 13)}<span>Este diagnóstico describe tus respuestas en estos ${stats.total} ejercicios. Los temas incompletos aún no tienen valoración de dominio. No predice una nota oficial de AVANZO.</span></p><div class="reset-row"><button class="text-link" data-action="reset">${icon('reset', 13)} Reiniciar mi progreso</button></div>`;
  }

  function navigate(destination) {
    const hash = `#${destination}`;
    if (location.hash === hash) renderRoute();
    else location.hash = hash;
  }

  function renderRoute() {
    updateTime();
    save(activeQuiz);
    route = location.hash.slice(1) || 'inicio';
    const [subjectId, view] = route.split('/');
    activeQuiz = quizzes.get(subjectId) || null;
    const allowedViews = activeQuiz?.subject.advanced ? ['practica','resultados','simulacro','entrega','historial','revision'] : ['practica','resultados'];
    if (!activeQuiz || (view && !allowedViews.includes(view))) {
      route = 'inicio'; activeQuiz = null;
      renderLobby();
      document.title = 'Beyond · Un esfuerzo para mañana.';
    } else {
      const name = activeQuiz.subject.name;
      const viewName = {practica:'Práctica',resultados:'Resultados',simulacro:'Simulacro',entrega:'Entrega',historial:'Historial',revision:'Revisión'}[view];
      breadcrumb.innerHTML = `<a href="#inicio">Mi espacio</a><span class="breadcrumb-separator">/</span><a href="#${subjectId}">${escape(name)}</a>${view ? `<span class="breadcrumb-separator">/</span>${viewName}` : ''}`;
      renderNavigation(subjectId);
      if (activeQuiz.subject.advanced) learningUIs.get(subjectId).render(view || 'inicio');
      else if (view === 'practica') renderQuestion(activeQuiz);
      else if (view === 'resultados') renderReport(activeQuiz);
      else renderSubject(activeQuiz);
      document.title = `${name}${view ? ' · ' + viewName : ''} · Beyond`;
    }
    lastTick = Date.now();
    window.scrollTo({ top: 0, behavior: 'instant' });
    main.focus({ preventScroll: true });
  }

  function refreshQuestion(focusTitle = false) {
    updateTime();
    const navOpen = main.querySelector('.navigator')?.open;
    renderQuestion(activeQuiz);
    if (navOpen !== undefined) main.querySelector('.navigator').open = navOpen;
    if (focusTitle) {
      document.getElementById('question-title').focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }

  main.addEventListener('click', event => {
    const scienceButton = event.target.closest('[data-science-action]');
    if (scienceButton && activeQuiz?.subject.advanced) { learningUIs.get(activeQuiz.subject.id).handle(scienceButton); return; }
    const button = event.target.closest('[data-action]');
    if (!button || button.disabled || !activeQuiz) return;
    const quiz = activeQuiz;
    switch (button.dataset.action) {
      case 'practice':
      case 'practice-topic':
        quiz.start(button.dataset.topic || '');
        navigate(`${quiz.subject.id}/practica`);
        break;
      case 'answer':
        if (quiz.answer(Number(button.dataset.choice))) {
          refreshQuestion();
          const feedback = document.getElementById('feedback');
          feedback.focus({ preventScroll: true });
          feedback.scrollIntoView({ block: 'nearest', behavior: 'instant' });
        }
        break;
      case 'next':
      case 'previous': {
        const list = quiz.ids();
        const next = list[list.indexOf(quiz.state.index) + (button.dataset.action === 'next' ? 1 : -1)];
        if (next !== undefined) { quiz.select(next); refreshQuestion(true); }
        break;
      }
      case 'select-question':
        quiz.select(Number(button.dataset.index)); refreshQuestion(true);
        break;
      case 'review':
        if (quiz.review()) navigate(`${quiz.subject.id}/practica`);
        else notify('Todavía no hay errores para repasar.');
        break;
      case 'open-guide': {
        const topic = button.dataset.topic;
        const reveal = () => {
          const index = quiz.topics.indexOf(topic);
          const detail = main.querySelectorAll('.topic-guide')[index];
          if (detail) { detail.open = true; detail.querySelector('summary').focus({ preventScroll: true }); detail.scrollIntoView({ block: 'start', behavior: 'instant' }); }
        };
        const sameRoute = location.hash === `#${quiz.subject.id}`;
        navigate(quiz.subject.id);
        if (sameRoute) reveal();
        else window.addEventListener('hashchange', reveal, { once: true });
        break;
      }
      case 'reset':
        dialog.querySelector('p').textContent = quiz.subject.advanced ? `Se reiniciarán las respuestas y el tiempo de tu práctica de ${quiz.subject.name}. Se conservarán su historial y su simulacro. Las otras materias no cambian.` : `Se eliminarán tus respuestas y el tiempo de ${quiz.subject.name} en este navegador. Puedes seguir estudiando sin reiniciar.`;
        dialog.showModal();
        break;
    }
  });

  dialog.addEventListener('close', () => {
    if (dialog.returnValue === 'reset' && activeQuiz) {
      updateTime();
      activeQuiz.reset();
      renderRoute();
      notify('Listo. Tu recorrido comienza de nuevo.');
    }
  });
  window.addEventListener('hashchange', renderRoute);
  document.querySelector('.skip-link').addEventListener('click', event => {
    event.preventDefault();
    main.focus();
    main.scrollIntoView({ block: 'start' });
  });
  document.addEventListener('visibilitychange', () => {
    lastTick = Date.now();
    save(activeQuiz);
  });
  window.addEventListener('pagehide', () => { updateTime(); save(activeQuiz); });
  window.addEventListener('beforeunload', () => { updateTime(); save(activeQuiz); });
  setInterval(updateTime, 1000);
  renderRoute();
})();
