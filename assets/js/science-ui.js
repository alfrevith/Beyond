window.Beyond = window.Beyond || {};
window.Beyond.createLearningUI = ({quiz, main, navigate, notify, flush}) => {
  const subject = quiz.subject;
  const homeLink = label => `<a class="button button-light" href="#${subject.id}">${label}</a>`;
  const X = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);
  const pct = (a,b) => b ? Math.round(100*a/b) : 0;
  const reviewLabel = n => n===1?'Revisar la pregunta':`Revisar las ${n} preguntas`;
  const time = seconds => [Math.floor(seconds/3600),Math.floor(seconds%3600/60),seconds%60].map(n=>String(n).padStart(2,'0')).join(':');
  const date = value => { const d = new Date(value); return Number.isNaN(d.getTime()) ? 'Fecha no disponible' : new Intl.DateTimeFormat('es-SV',{dateStyle:'medium',timeStyle:'short',timeZone:'America/El_Salvador'}).format(d); };
  const difficulty = {basico:'Básica',intermedio:'Intermedia',avanzado:'Avanzada'};
  const types = {conceptual:'Conceptual',aplicacion:'Aplicación',caso:'Análisis de caso',calculo:'Cálculo',datos:'Interpretación de datos',fuente:'Interpretación de fuentes',relacion:'Causas y consecuencias'};
  const action = (name,label,cls='button button-light',attrs='') => `<button type="button" class="${cls}" data-science-action="${name}" ${attrs}>${label}</button>`;
  const buttonTopic = (topic,label='Practicar este tema') => action('topic',X(label),'button button-light',`data-topic="${X(topic)}"`);
  const note = '<p class="study-notice">Práctica original e independiente. La distribución, los niveles y las puntuaciones son internos de Beyond; no reproducen una escala ni una prueba oficial de AVANZO. Los casos y datos hipotéticos se indican como tales.</p>';
  let pending = null;
  let pendingKey = '';
  let view = '';

  function table(visual) {
    return `<div class="science-table-scroll" tabindex="0" role="region" aria-label="${X(visual.caption)}"><table class="science-table"><caption>${X(visual.caption)}</caption><thead><tr>${visual.headers.map(h=>`<th scope="col">${X(h)}</th>`).join('')}</tr></thead><tbody>${visual.rows.map(row=>`<tr>${row.map((cell,i)=>i===0?`<th scope="row">${X(cell)}</th>`:`<td>${X(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  }
  function visual(resource) {
    if (!resource) return '';
    if (resource.kind === 'table') return table(resource);
    if (resource.kind === 'bars') {
      const max=Math.max(...resource.rows.map(row=>row[1]));
      return `<figure class="science-visual study-bars" data-study-resource="bars"><figcaption>${X(resource.caption)} · ${X(resource.unit)}</figcaption><div class="study-bar-scale">Escala desde 0 hasta ${max} ${X(resource.unit)}</div>${resource.rows.map(([label,value])=>`<div class="study-bar-row"><span>${X(label)}</span><div class="study-bar-track"><span style="width:${value/max*100}%" aria-hidden="true"></span></div><b>${value}</b></div>`).join('')}<details><summary>Ver tabla de datos</summary>${table({caption:resource.caption,headers:['Categoría',resource.unit],rows:resource.rows})}</details></figure>`;
    }
    if (resource.kind === 'map') {
      return `<figure class="science-visual" data-study-resource="map"><figcaption>${X(resource.caption)}</figcaption><div class="study-map" aria-hidden="true">${resource.cells.map(([label,value,intensity])=>`<div class="study-map-cell" style="background:rgb(238 173 73 / ${.08+intensity/100*.3})"><b>${X(label)}</b><span>${X(value)}</span></div>`).join('')}</div><p class="study-resource-note">${X(resource.legend)} La posición de las celdas es ilustrativa.</p>${table({caption:'Datos equivalentes del esquema',headers:['Zona',resource.unit],rows:resource.cells.map(([label,value])=>[label,value])})}</figure>`;
    }
    if (resource.kind === 'cartoon') return `<figure class="science-visual" data-study-resource="cartoon"><figcaption>${X(resource.caption)}</figcaption><svg class="study-cartoon" viewBox="0 0 440 200" role="img" aria-label="Un cartel dice Tu voz cuenta. Tres propuestas avanzan hacia un buzón, pero una barrera lo bloquea."><rect x="12" y="12" width="416" height="38" rx="8"/><text x="220" y="37" text-anchor="middle">TU VOZ CUENTA</text><path d="M35 88h48v20H35z M35 122h48v20H35z M35 156h48v20H35z M95 132h130 M208 121l18 11-18 11"/><rect x="287" y="82" width="126" height="98" rx="8"/><text x="350" y="119" text-anchor="middle">BUZÓN</text><path d="M308 137h84 M259 69v111 M245 82l28 22 M245 112l28 22 M245 142l28 22"/></svg><p class="study-resource-note">Tres propuestas encuentran una barrera frente al buzón de participación.</p></figure>`;
    if (resource.kind === 'foodweb') return `<figure class="science-visual"><figcaption>${X(resource.caption)}</figcaption><ul class="science-foodweb">${resource.links.map(([food,consumer])=>`<li><span>${X(food)}</span><b aria-label="sirve de alimento a">→</b><span>${X(consumer)}</span></li>`).join('')}</ul></figure>`;
    if (resource.kind === 'line') {
      const maxX = Math.max(...resource.points.map(p=>p[0]));
      const maxY = Math.max(...resource.points.map(p=>p[1]));
      const coord = ([x,y]) => `${60+x/maxX*260},${180-y/maxY*140}`;
      const ticks = resource.points.map(([x,y])=>`<text x="${60+x/maxX*260}" y="199" text-anchor="middle">${X(x)}</text><text x="48" y="${184-y/maxY*140}" text-anchor="end">${X(y)}</text>`).join('');
      return `<figure class="science-visual"><figcaption>${X(resource.caption)}</figcaption><svg class="science-chart" viewBox="0 0 360 240" role="img" aria-label="${X(resource.caption)}. ${resource.points.map(p=>`${p[0]} s: ${p[1]} m/s`).join('; ')}"><path d="M60 30V180H335" class="science-axis"/>${ticks}<polyline points="${resource.points.map(coord).join(' ')}" class="science-plot"/>${resource.points.map(p=>`<circle cx="${coord(p).split(',')[0]}" cy="${coord(p).split(',')[1]}" r="4" class="science-point"/>`).join('')}<text x="190" y="226" text-anchor="middle">${X(resource.xLabel)}</text><text x="60" y="19">${X(resource.yLabel)}</text></svg><details><summary>Ver los datos de la gráfica</summary>${table({caption:resource.caption,headers:[resource.xLabel,resource.yLabel],rows:resource.points})}</details></figure>`;
    }
    if (resource.kind === 'circuit') {
      const series = resource.layout === 'series';
      const content = series
        ? '<path d="M40 110V60H60 M90 60H110 M170 60H205 M265 60H280 M310 60H330V195H40V145"/><path d="M24 120H56 M31 137H49"/><rect x="110" y="48" width="60" height="24"/><rect x="205" y="48" width="60" height="24"/><circle cx="75" cy="60" r="15"/><circle cx="295" cy="60" r="15"/><text x="75" y="64">A₁</text><text x="295" y="64">A₂</text><text x="140" y="36">2 Ω</text><text x="235" y="36">4 Ω</text><text x="72" y="140">12 V</text>'
        : '<path d="M50 60H80 M110 60H165 M225 60H330V205H205 M180 205H50V60 M50 130H165 M225 130H330"/><path d="M80 60L108 42 M185 188V222 M201 196V214"/><circle cx="80" cy="60" r="2"/><circle cx="110" cy="60" r="2"/><rect x="165" y="48" width="60" height="24"/><rect x="165" y="118" width="60" height="24"/><text x="195" y="36">6 Ω</text><text x="195" y="105">6 Ω</text><text x="92" y="26">S</text><text x="246" y="225">12 V</text>';
      return `<figure class="science-visual"><figcaption>${X(resource.caption)}</figcaption><svg class="science-circuit" viewBox="0 0 380 245" role="img" aria-label="${X(resource.caption)}">${content}</svg></figure>`;
    }
    return '';
  }
  function guide(topic) {
    const g = quiz.subject.guides[topic];
    return `<div class="guide-content"><span class="guide-label">La idea clave</span><p>${X(g.idea)}</p><span class="guide-label">Conceptos y relaciones</span><p class="formula">${X(g.rule)}</p><span class="guide-label">Veámoslo en un ejemplo</span><p>${X(g.example)}</p><p class="guide-tip">${X(g.tip)}</p>${buttonTopic(topic)}</div>`;
  }
  function context(q) {
    return q.context ? `<aside class="study-context" aria-label="Contexto para interpretar"><span class="guide-label">${X(q.context.label)}</span><p>${X(q.context.text)}</p></aside>` : '';
  }
  function references(q) {
    const sources=(q.sources||[]).map(id=>subject.sources.find(s=>s.id===id)).filter(Boolean);
    return sources.length?`<details class="study-question-sources"><summary>Consultar fuentes y contexto</summary><ul>${sources.map(s=>`<li><a href="${X(s.url)}" target="_blank" rel="noopener noreferrer">${X(s.title)}</a></li>`).join('')}</ul><p>Los pasajes son redacción didáctica de Beyond. Los casos y datos simulados no se atribuyen a estas instituciones.</p></details>`:'';
  }
  function header(title,subtitle,tools='') {
    return `<div class="page-heading quiz-heading"><div><div class="eyebrow">${X(subject.name.toUpperCase())} · BEYOND</div><h1>${X(title)}<span class="accent">.</span></h1><p>${X(subtitle)}</p></div><div class="quiz-tools">${tools}</div></div>`;
  }
  function mastery(s) {
    if (!s.total) return 'No evaluado';
    if (!s.done) return 'Sin empezar';
    if (s.pending) return 'Incompleto';
    if (quiz.isSample) return 'Muestra del tema';
    const score = pct(s.correct,s.total);
    return score<40?'Necesita refuerzo fundamental':score<60?'Dominio inicial':score<75?'En desarrollo':score<90?'Buen dominio':'Dominio avanzado';
  }
  function overview() {
    const s = quiz.practiceStats();
    const reviewSummary=quiz.lastReviewStats.done?`<p>Último repaso guardado: ${quiz.lastReviewStats.correct} ${quiz.lastReviewStats.correct===1?"acierto posterior":"aciertos posteriores"} de ${quiz.lastReviewStats.done} ${quiz.lastReviewStats.done===1?"reintentada":"reintentadas"}.</p>`:"";
    main.innerHTML = header(subject.name,subject.study.subtitle, '<a class="button button-light" href="#inicio">← Volver al lobby</a>') + `
      <div class="subject-overview"><section class="hero subject-hero"><div class="hero-copy"><div class="hero-label">${X(subject.study.areas)}</div><h2>${X(subject.study.title)}</h2><p>${quiz.questions.length} preguntas originales, ${quiz.topics.length} guías y explicaciones que responden a tu elección. Explora una materia, estudia un tema o mezcla los ejercicios.</p><div class="mini-stats"><div class="mini-stat"><b>100</b><span>preguntas</span></div><div class="mini-stat"><b>${quiz.areas.length}</b><span>${X(subject.study.areaLabel)}</span></div><div class="mini-stat"><b>∞</b><span>sin límite de tiempo</span></div></div><div class="science-actions">${action('practice',s.done?'Continuar práctica':'Comenzar práctica','button button-primary')}${action('mixed','Mezclar práctica')}</div></div></section>
      <aside class="progress-panel"><div class="panel-heading">Tu práctica</div><div class="progress-value">${pct(s.done,100)}<small>%</small></div><div class="progress-track"><span style="width:${s.done}%"></span></div><p>${s.done} de ${s.total} respondidas</p><div class="progress-counts"><div><b class="positive">${s.correct}</b><span>Aciertos iniciales</span></div><div><b class="negative">${s.wrong}</b><span>Por reforzar</span></div><div><b>${s.pending}</b><span>Pendientes</span></div></div>${reviewSummary}${action('practice-report','Ver diagnóstico de práctica','text-link')}</aside></div>
      <section class="science-simulation-card"><div><div class="eyebrow">PON A PRUEBA LO APRENDIDO</div><h2>Un simulacro a tu medida.</h2><p>Elige cuántas preguntas resolver. Se seleccionan al azar, sin repeticiones dentro del intento y sin pistas hasta entregar. Tu práctica se conserva por separado.</p></div><div class="science-exam-config">${examSetup()}<div class="science-actions">${quiz.exam?.submitted?action('last-exam','Revisar último simulacro'):''}<a class="text-link" href="#${subject.id}/historial">Historial de intentos →</a></div></div></section>
      <div class="section-title"><div><h2>Elige un área para practicar</h2><p>${quiz.areas.map(area=>`${quiz.questions.filter(q=>q.area===area).length} de ${X(area)}`).join(" · ")}.</p></div></div><div class="science-area-grid" style="--study-area-count:${quiz.areas.length}">${quiz.areas.map(name=>`<button class="science-area-card" data-science-action="area" data-area="${X(name)}"><strong>${X(name)}</strong><span>${quiz.questions.filter(q=>q.area===name).length} preguntas →</span></button>`).join('')}</div>
      ${quiz.areas.map(name=>`<div class="section-title"><div><h2>${X(name)}</h2><p>Comprende el concepto y luego aplícalo.</p></div></div><div class="topic-grid">${quiz.topics.filter(topic=>quiz.questions.some(q=>q.cat===topic&&q.area===name)).map(topic=>{const t=quiz.topicStats(topic);return `<details class="topic-guide"><summary><span class="topic-info"><strong>${X(topic)}</strong><small>${t.total} ejercicios · ${t.done} respondidos</small></span><span class="topic-chevron">›</span></summary>${guide(topic)}</details>`;}).join('')}</div>`).join('')}
      ${subject.sources.length?`<details class="science-sources"><summary>Referencias para seguir aprendiendo</summary><ul>${subject.sources.map(source=>`<li><a href="${X(source.url)}" target="_blank" rel="noopener noreferrer">${X(source.title)} ↗</a></li>`).join('')}</ul><p>Las preguntas y sus explicaciones son originales. Estas referencias apoyan los conceptos; los datos de casos hipotéticos no son estadísticas nacionales.</p></details>`:""}${note}<div class="reset-row"><button class="text-link" data-action="reset">Reiniciar solo la práctica de ${X(subject.shortName)}</button></div>`;
  }
  function examSetup() {
    const active=quiz.exam&&!quiz.exam.submitted,size=quiz.exam?.order.length||20;
    const preset=size>=10&&size%5===0;
    return `<form id="science-exam-setup"><div class="exam-count-field"><label for="science-exam-count">Cantidad de preguntas</label><select id="science-exam-count" aria-describedby="science-exam-help" ${active?'disabled':''}>${Array.from({length:Math.floor((quiz.questions.length-10)/5)+1},(_,i)=>10+i*5).map(n=>`<option value="${n}" ${preset&&n===size?'selected':''}>${n} preguntas</option>`).join('')}<option value="custom" ${!preset?'selected':''}>Otra cantidad</option></select></div><div class="exam-count-field" id="science-exam-custom-field" ${preset?'hidden':''}><label for="science-exam-custom">Escribe una cantidad (1–${quiz.questions.length})</label><input id="science-exam-custom" type="number" inputmode="numeric" min="1" max="${quiz.questions.length}" step="1" required value="${size}" ${active||preset?'disabled':''}></div><p id="science-exam-help" class="exam-setup-help">${active?`Tienes un intento de ${size} preguntas en curso. Continúalo y entrégalo antes de preparar otro.`:'Puedes elegir una opción o escribir otra cantidad. Se guarda la selección para continuar después.'}</p>${action('exam',active?'Continuar simulacro':'Comenzar simulacro','button button-primary')}</form>`;
  }
  function launchExam() {
    if(quiz.exam&&!quiz.exam.submitted){quiz.startExam();navigate(subject.id+'/simulacro');return;}
    const select=document.getElementById('science-exam-count'),input=document.getElementById('science-exam-custom');
    if(select?.value==='custom'&&input&&!input.reportValidity())return;
    const size=Number(select?.value==='custom'?input?.value:select?.value||20);
    if(!Number.isInteger(size)||size<1||size>quiz.questions.length){notify('Elige una cantidad entera entre 1 y '+quiz.questions.length+'.');return;}
    quiz.startExam(size);navigate(subject.id+'/simulacro');
  }
  function bindExamSetup() {
    const select=document.getElementById('science-exam-count'),input=document.getElementById('science-exam-custom'),field=document.getElementById('science-exam-custom-field');
    select?.addEventListener('change',()=>{field.hidden=select.value!=='custom';input.disabled=field.hidden;if(!field.hidden)input.focus();});
    document.getElementById('science-exam-setup')?.addEventListener('submit',event=>{event.preventDefault();flush();launchExam();});
  }
  function feedback(q,answer) {
    return `<div class="feedback ${answer===q.answer?'':'bad'}" id="feedback" role="status" tabindex="-1"><strong>${answer===null?'Pregunta pendiente en este intento.':answer===q.answer?'✓ ¡Correcto! Veamos el razonamiento.':'✕ Esa respuesta no es correcta. Puedes aprender de este error.'}</strong>${answer!==q.answer?`<p class="science-misconception">${X(answer===null?'No se registró una respuesta en este intento.':q.feedback[answer])}</p><p class="correct-answer">Respuesta correcta: ${'ABCD'[q.answer]}) ${X(q.opts[q.answer])}</p>`:''}<p>${X(q.explain)}</p><div class="science-explanation"><span class="guide-label">Concepto que te llevas</span><p>${X(q.concept)}</p>${q.formula?`<span class="guide-label">Fórmula y variables</span><p class="formula">${X(q.formula.text)}</p><p>${X(q.formula.variables)}</p>`:''}${q.steps?`<span class="guide-label">Paso a paso</span><ol>${q.steps.map(step=>`<li>${X(step)}</li>`).join('')}</ol>`:''}${visual(q.solutionVisual)}<p class="guide-tip"><strong>Para el siguiente intento:</strong> ${X(q.tip)}</p>${references(q)}</div></div>`;
  }
  function questionView() {
    if (quiz.context==='history'&&!quiz.historyCompatible) { historyView(); return; }
    const list=quiz.ids();
    if (!list.includes(quiz.state.index)) quiz.select(list[0]);
    const i=quiz.state.index, q=quiz.questions[i], answer=quiz.currentAnswer(), s=quiz.stats();
    const key=quiz.context+quiz.mode+q.id;
    if(key!==pendingKey){pending=null;pendingKey=key;}
    const blind=!quiz.reveal, review=quiz.mode==='review', exam=quiz.context==='exam', historical=quiz.context==='history';
    const readOnly=historical||(exam&&quiz.exam.submitted);
    const registered=answer!==null;
    const position=list.indexOf(i);
    const previouslyOpen=main.querySelector('.navigator')?.open;
    main.innerHTML=header(historical?'Revisa tu intento':exam?'Tu simulacro':review?'Aprende de tus errores':'Explora y comprueba',readOnly?'Consulta la corrección de tus respuestas y las preguntas que quedaron pendientes.':blind?'Las respuestas se corregirán únicamente después de entregar.':review?'El repaso registra tus aciertos posteriores sin cambiar el primer intento.':'Selecciona una alternativa y confírmala para registrar tu respuesta.', `<span class="timer">◷ <span id="clock">${time(quiz.state.elapsed)}</span></span><a class="button button-light" href="#${subject.id}">Guías</a>${action('report',blind?'Entregar / ver avance':'Ver resultados','button button-primary')}`)+
      (review?`<div class="review-banner">Repaso de ${quiz.reviewOrigin === "simulacro" ? "un simulacro" : "la práctica"}: ${quiz.reviewStats.done}/${quiz.reviewStats.total} reintentadas · ${quiz.reviewStats.correct} acertadas después de repetir. ${action('practice','Volver a práctica','text-link')}</div>`:'')+
      `<div class="quiz-grid"><section aria-label="Ejercicio actual"><article class="question-card"><div class="question-top"><span class="topic-pill">${X(q.area)} · ${X(q.cat)}</span><span class="question-position">${position+1} de ${list.length}</span></div><div class="question-body"><div class="science-question-meta"><span>${q.id}</span><span>${difficulty[q.difficulty]}</span><span>${types[q.type]}</span></div><h2 id="question-title" tabindex="-1">${X(q.stem)}</h2>${context(q)}${visual(q.visual)}<div class="choices" role="group" aria-labelledby="question-title">${q.opts.map((option,k)=>{
        const status=(registered||readOnly)&&quiz.reveal?(k===q.answer?'correct':k===answer?'incorrect':''):'';
        const selected=registered?answer===k:pending===k;
        return `<button class="choice science-choice ${status} ${selected?'selected':''}" data-science-action="choose" data-choice="${k}" aria-pressed="${selected}" ${registered||readOnly?'disabled':''}><span class="choice-letter">${'ABCD'[k]}</span><span class="choice-text">${X(option)}</span>${status?`<span class="answer-mark">${status==='correct'?'✓ Correcta':'✕ Tu respuesta'}</span>`:registered&&selected?'<span class="answer-mark">Registrada</span>':''}</button>`;
      }).join('')}</div>${!registered&&!readOnly?action('confirm','Confirmar respuesta','button button-primary',pending===null?'disabled':''):quiz.reveal?feedback(q,answer):'<p class="science-registered" role="status">✓ Respuesta registrada. La corrección estará disponible al entregar el simulacro.</p>'}
      ${!blind?`<details class="question-guide"><summary>Repasar la guía de este tema</summary>${guide(q.cat)}</details>`:''}</div><div class="question-actions">${action('previous','← Anterior','button button-light',position===0?'disabled':'')}${position<list.length-1?action('next',registered||readOnly?'Siguiente →':'Saltar pregunta →','button button-primary'):action('report',blind?'Entregar simulacro':'Ver resultados','button button-primary')}</div></article><p class="question-footnote">${blind?'Una vez confirmada, la respuesta no se modifica. Puedes saltar preguntas y volver antes de entregar.':historical?'Estas son las respuestas de este intento guardado.':'Las respuestas iniciales se conservan; en el repaso puedes reintentar los errores.'}</p></section>
      <details class="navigator" ${previouslyOpen??window.matchMedia('(min-width:1001px)').matches?'open':''}><summary>Preguntas de esta vista</summary><div class="navigator-body"><div class="progress-track" role="progressbar" aria-label="Preguntas respondidas" aria-valuemin="0" aria-valuemax="${s.total}" aria-valuenow="${s.done}"><span style="width:${pct(s.done,s.total)}%"></span></div><p class="progress-caption nav-progress-caption">${s.done}/${s.total} respuestas iniciales · ${s.pending} pendientes</p>${!blind?`<div class="nav-counts"><div><b class="positive">${s.correct}</b>Aciertos iniciales</div><div><b class="negative">${s.wrong}</b>Errores iniciales</div></div>`:''}
      ${!exam&&!historical?`<label class="select-label" for="science-area">Área (sale del repaso)</label><select class="topic-select" id="science-area"><option value="">Todas las áreas</option>${quiz.areas.map(a=>`<option ${quiz.areaFilter===a?'selected':''}>${X(a)}</option>`).join('')}</select><label class="select-label" for="science-topic">Tema (sale del repaso)</label><select class="topic-select" id="science-topic"><option value="">Todos los temas</option>${quiz.topics.map(t=>`<option ${quiz.filter===t?'selected':''}>${X(t)}</option>`).join('')}</select>`:''}
      <div class="question-nav" aria-label="Navegador de preguntas de ${X(subject.name)}">${list.map((index,position)=>{const a=quiz.currentAnswer(index);const status=a===null?'pendiente':blind?'respondida':a===quiz.questions[index].answer?'correcta':'incorrecta';return `<button class="${i===index?'current':''} ${a===null?'':blind?'recorded':a===quiz.questions[index].answer?'done':'bad'}" data-science-action="jump" data-index="${index}" aria-label="${quiz.questions[index].id}: ${status}" ${i===index?'aria-current="step"':''}>${exam||historical||review?position+1:index+1}</button>`;}).join('')}</div><p class="mini muted">${blind?'La marca indica que respondiste; no indica si acertaste.':'✓ Verde: correcta · ✕ Ámbar: por reforzar. Los números vacíos siguen pendientes.'}</p>${!blind?action('review','Repasar errores','button button-light',s.wrong?'':'disabled'):''}</div></details></div>`;
    document.getElementById('science-area')?.addEventListener('change',event=>{quiz.start('',event.target.value);pending=null;questionView();focusQuestion();});
    document.getElementById('science-topic')?.addEventListener('change',event=>{quiz.start(event.target.value);pending=null;questionView();focusQuestion();});
  }
  function report() {
    const s=quiz.stats();
    if(s.hidden){
      main.innerHTML=header('Tu simulacro sigue en curso','La corrección permanece oculta hasta que entregues.')+`<section class="results science-report"><h2>${s.done} de ${s.total} respondidas</h2><p>Quedan ${s.pending} pendientes. Tiempo de estudio: ${time(quiz.state.elapsed)}. Puedes continuar o entregar ahora; las pendientes no cuentan como aciertos.</p><div class="science-actions"><a class="button button-light" href="#${subject.id}/simulacro">Continuar simulacro</a>${action('submit','Entregar y corregir','button button-primary')}</div></section>${note}`;
      return;
    }
    const historical=quiz.context==='history', exam=quiz.context==='exam', review=quiz.mode==='review';
    const bank=quiz.resultQuestions;
    const areas=[...new Set(bank.map(q=>q.area))], topics=[...new Set(bank.map(q=>q.cat))];
    const weak=topics.map(t=>quiz.topicStats(t)).filter(t=>t.wrong>0).sort((a,b)=>b.wrong/b.done-a.wrong/a.done||b.wrong-a.wrong).slice(0,3);
    const compatible=!historical||quiz.historyCompatible;
    main.innerHTML=header(exam?'Resultados del simulacro':historical?'Un intento de tu recorrido':review?'El primer intento y tu repaso':'Tu diagnóstico de práctica','Una orientación sobre lo aprendido, sin equivalencia con notas oficiales.', homeLink('Volver a '+X(subject.shortName)))+
      `<section class="result-hero"><div class="science-score"><strong>${s.correct}<small>/${s.total}</small></strong><span>Aciertos de este intento</span></div><div><div class="eyebrow">${s.done===s.total?(quiz.isSample?'MUESTRA COMPLETADA':mastery(s)):'DIAGNÓSTICO INCOMPLETO'}</div><h2>${s.wrong?'Ya tienes un próximo paso.':s.done?'Cada concepto comprendido cuenta.':'Empieza con una pregunta.'}</h2><p>${s.done} ${s.done===1?"respondida":"respondidas"} · ${s.correct} ${s.correct===1?"correcta":"correctas"} · ${s.wrong} ${s.wrong===1?"incorrecta":"incorrectas"} · ${s.pending} pendientes.</p><p>Precisión entre respondidas: ${pct(s.correct,s.done)}%. Tiempo: ${time(quiz.state.elapsed)}.</p>${historical?`<p>${date(quiz.selectedHistory.date)} · ${quiz.selectedHistory.kind==='simulacro'?'Simulacro':'Práctica'}</p>`:''}<div class="science-actions">${exam?`<a class="button button-primary" href="#${subject.id}/simulacro">${reviewLabel(s.total)}</a>`:historical&&compatible?'<a class="button button-primary" href="#'+subject.id+'/revision/'+encodeURIComponent(quiz.selectedHistory.id)+'">'+reviewLabel(s.total)+'</a>':!historical?action('practice','Continuar práctica','button button-primary'):''}${compatible?action('review','Repasar solo errores','button button-light',s.wrong?'':'disabled'):''}${!exam&&!historical&&!review?action('save-result','Guardar este resultado','button button-light',s.done?'':'disabled'):''}<a class="button button-light" href="#${subject.id}/historial">Historial</a></div></div></section>
      ${review?`<div class="review-banner">Primer intento: ${s.correct} aciertos. Después de repetir: ${quiz.reviewStats.correct} aciertos de ${quiz.reviewStats.done} respuestas de repaso. Las cifras anteriores no se reemplazan.</div>`:''}
      <div class="section-title"><div><h2>Tu rendimiento por área</h2><p>${quiz.isSample?"Solo se evalúan las preguntas elegidas para este intento. Los temas no incluidos no fueron evaluados; esta muestra no determina tu dominio global.":"Porcentaje de aciertos entre respondidas. Las áreas incompletas todavía no tienen clasificación final."}</p></div></div><div class="science-area-grid" style="--study-area-count:${areas.length}">${areas.map(name=>{const a=quiz.areaStats(name);return `<article class="science-area-card"><strong>${X(name)}</strong><b>${pct(a.correct,a.done)}%</b><div class="progress-track"><span style="width:${pct(a.correct,a.done)}%"></span></div><span>${a.correct} correctas de ${a.done} respondidas · ${a.pending} pendientes</span><small>${mastery(a)}</small></article>`;}).join('')}</div>
      <div class="section-title"><div><h2>Qué reforzar ahora</h2><p>Recomendaciones calculadas a partir de los errores de este intento.</p></div></div>${weak.length?`<div class="recommendations">${weak.map(t=>`<article class="recommendation"><h3>${X(t.name)}</h3><p>${t.correct} aciertos de ${t.done} respondidas (${pct(t.correct,t.done)}%). ${t.wrong} ${t.wrong===1?"error":"errores"} y ${t.pending} pendientes.</p>${compatible?action('review-topic','Reintentar estos errores','text-link',`data-topic="${X(t.name)}"`):''}${buttonTopic(t.name,'Estudiar y practicar el tema')}</article>`).join('')}</div>`:`<p class="empty-note">${s.done?'No hay errores registrados en este intento. Revisa los temas pendientes para completar el diagnóstico.':'Las recomendaciones aparecerán después de tus primeras respuestas.'}</p>`}
      <div class="section-title"><div><h2>Detalle por subtema</h2><p>${quiz.isSample?"Aciertos y pendientes dentro de esta selección. La clasificación del dominio completo requiere una evaluación más amplia.":"Escala interna con temas completos: 0–39% refuerzo fundamental · 40–59% inicial · 60–74% en desarrollo · 75–89% buen dominio · 90–100% avanzado."}</p></div></div><div class="results-table-wrap"><table class="results-table"><caption class="sr-only">Aciertos, preguntas respondidas y clasificación por subtema</caption><thead><tr><th scope="col">Tema</th><th scope="col">Aciertos</th><th scope="col">Respondidas</th><th scope="col">Orientación</th></tr></thead><tbody>${topics.map(name=>{const t=quiz.topicStats(name);return `<tr><td>${X(name)}</td><td>${t.correct}/${t.total}</td><td>${t.done}/${t.total}</td><td>${mastery(t)}</td></tr>`;}).join('')}</tbody></table></div>${note}`;
  }
  function historyView() {
    main.innerHTML=header('Tu historial de '+subject.shortName,'Últimos 20 resultados guardados. Los simulacros se guardan al entregar y la práctica al completarla o guardar su diagnóstico.',homeLink('Volver a '+X(subject.shortName)))+
      `<div class="science-history">${quiz.history.length?quiz.history.map(record=>{const correct=record.answers.filter((a,i)=>a===record.questions[i].answer).length,done=record.answers.filter(a=>a!==null).length;return `<article class="recommendation"><div class="eyebrow">${record.kind==='simulacro'?'SIMULACRO':'PRÁCTICA'}</div><h2>${correct}/${record.questions.length} aciertos</h2><p>${date(record.date)}</p><p>${done} ${done===1?"respondida":"respondidas"} · ${record.questions.length-done} pendientes · ${time(record.elapsed)}</p>${record.bankVersion!==quiz.subject.bankVersion?'<p>Versión anterior del banco: se conserva su resultado; la revisión de preguntas requiere la misma versión.</p>':''}${action('history-open','Ver este resultado','button button-light',`data-id="${X(record.id)}"`)}</article>`;}).join(''):'<p class="empty-note">Todavía no has guardado resultados. Entrega un simulacro o guarda un diagnóstico de práctica para verlo aquí.</p>'}</div>`;
  }
  function focusQuestion(){document.getElementById('question-title')?.focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});}
  function render(nextView) {
    view=nextView;pending=null;pendingKey='';
    const recordId=location.hash.split('/')[2];
    if(recordId&&['resultados','revision'].includes(view)&&!quiz.openHistory(recordId)){historyView();return;}
    quiz.enter(view);
    if(view==='practica'||view==='simulacro'||view==='revision') {
      if(view==='revision'&&quiz.context!=='history')historyView();else questionView();
    } else if(view==='resultados'||view==='entrega')report();else if(view==='historial')historyView();else {overview();bindExamSetup();}
    quiz.save();
  }
  function examResultRoute(){const r=quiz.history.find(record=>record.kind==='simulacro'&&record.attemptId===quiz.exam?.id);return r?subject.id+'/resultados/'+encodeURIComponent(r.id):subject.id+'/entrega';}
  function handle(button) {
    if(button.disabled)return;
    const name=button.dataset.scienceAction;
    flush();
    if(name==='practice'||name==='mixed'||name==='topic'||name==='area') {
      quiz.start(button.dataset.topic||'',button.dataset.area||'',name==='mixed');navigate(subject.id+'/practica');
    } else if(name==='practice-report') {quiz.start();navigate(subject.id+'/resultados');}
    else if(name==='exam'){launchExam();}
    else if(name==='last-exam'){quiz.enter('simulacro');navigate(examResultRoute());}
    else if(name==='choose'){pending=Number(button.dataset.choice);questionView();main.querySelector(`[data-science-action="choose"][data-choice="${pending}"]`)?.focus({preventScroll:true});}
    else if(name==='confirm'){
      if(pending!==null&&quiz.answer(pending)){pending=null;questionView();const target=document.getElementById('feedback')||main.querySelector('.science-registered');target?.scrollIntoView({block:'nearest',behavior:'instant'});document.getElementById('feedback')?.focus({preventScroll:true});}
    } else if(name==='jump'){quiz.select(Number(button.dataset.index));pending=null;questionView();focusQuestion();}
    else if(name==='next'||name==='previous'){const list=quiz.ids(),index=list[list.indexOf(quiz.state.index)+(name==='next'?1:-1)];if(index!==undefined){quiz.select(index);pending=null;questionView();focusQuestion();}}
    else if(name==='report')navigate(quiz.context==='exam'?examResultRoute():quiz.context==='history'?subject.id+'/resultados/'+encodeURIComponent(quiz.selectedHistory.id):subject.id+'/resultados');
    else if(name==='review'||name==='review-topic'){if(quiz.review(button.dataset.topic||''))navigate(subject.id+'/practica');else notify('No hay errores disponibles para este repaso.');}
    else if(name==='save-result'){quiz.savePractice();notify('Resultado de práctica guardado en tu historial.');}
    else if(name==='history-open'){if(quiz.openHistory(button.dataset.id))navigate(subject.id+'/resultados/'+encodeURIComponent(button.dataset.id));}
    else if(name==='submit'){
      const dialog=document.createElement('dialog');dialog.setAttribute('aria-labelledby','science-submit-title');
      dialog.innerHTML=`<form method="dialog"><h2 id="science-submit-title">¿Entregar el simulacro?</h2><p>Has respondido ${quiz.stats().done} ${quiz.stats().done===1?"pregunta":"preguntas"}. Quedan ${quiz.stats().pending} pendientes, que no contarán como aciertos. La entrega cierra este intento y permite ver todas las explicaciones.</p><div class="dialog-actions"><button class="button button-light" value="cancel" autofocus>Seguir respondiendo</button><button class="button button-primary" value="submit">Entregar y corregir</button></div></form>`;
      document.body.append(dialog);dialog.addEventListener('close',()=>{if(dialog.returnValue==='submit'){flush();quiz.submitExam();navigate(examResultRoute());}dialog.remove();},{once:true});dialog.showModal();
    }
  }
  return {render,handle};
};

window.Beyond.createScienceUI = window.Beyond.createLearningUI;
