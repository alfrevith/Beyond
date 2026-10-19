window.Beyond = window.Beyond || {};
/* Dashboard reads practice snapshots without changing exam/review context.
   Archived results use their own answer keys; unfinished exams expose only progress. */
window.Beyond.buildStudyDashboard = quizzes => {
  const percent=(a,b)=>b?Math.round(a/b*100):null;
  const cards=quizzes.map(quiz=>{
    const practice=quiz.practiceSummary();
    const weak=practice.topics.filter(t=>t.wrong>0).sort((a,b)=>b.wrong/b.done-a.wrong/a.done||b.wrong-a.wrong);
    const next=weak[0]||practice.topics.find(t=>t.pending>0)||null;
    const results=quiz.history.map(record=>{
      const total=record.questions.length,done=record.answers.filter(a=>a!==null).length;
      const correct=record.answers.filter((a,i)=>a===record.questions[i].answer).length;
      return {id:record.id,subjectId:quiz.subject.id,subjectName:quiz.subject.shortName,kind:record.kind,date:record.date,elapsed:record.elapsed,bankVersion:record.bankVersion,questions:record.questions,total,done,correct,score:percent(correct,total)};
    });
    const complete=results.filter(r=>r.kind==='simulacro'&&r.total===quiz.questions.length&&r.done===r.total&&quiz.compatibleHistory(r)).sort((a,b)=>Date.parse(b.date)-Date.parse(a.date));
    const trend=complete.length>=2?{change:complete[0].score-complete[1].score,latest:complete[0].score,previous:complete[1].score}:null;
    const lastRecord=quiz.history.find(r=>r.kind==='simulacro');
    const lastExam=lastRecord?{...results.find(r=>r.id===lastRecord.id),weakTopics:[...new Set(lastRecord.questions.map(q=>q.cat))].map(name=>{
      const indices=lastRecord.questions.flatMap((q,i)=>q.cat===name?[i]:[]),done=indices.filter(i=>lastRecord.answers[i]!==null).length,wrong=indices.filter(i=>lastRecord.answers[i]!==null&&lastRecord.answers[i]!==lastRecord.questions[i].answer).length;
      return {name,done,wrong};
    }).filter(t=>t.wrong>0).sort((a,b)=>b.wrong/b.done-a.wrong/a.done||b.wrong-a.wrong).slice(0,2)}:null;
    return {id:quiz.subject.id,name:quiz.subject.shortName,practice,accuracy:percent(practice.correct,practice.done),next,weak,trend,lastExam,results,review:quiz.lastReviewStats,
      exam:quiz.exam&&!quiz.exam.submitted?{done:quiz.exam.answers.filter(a=>a!==null).length,total:quiz.exam.order.length,elapsed:quiz.exam.elapsed}:null};
  });
  const totals=cards.reduce((a,c)=>{for(const key of ['total','done','correct','wrong','pending','elapsed'])a[key]+=c.practice[key];return a;},{total:0,done:0,correct:0,wrong:0,pending:0,elapsed:0});
  const recent=cards.flatMap(c=>c.results).sort((a,b)=>(Date.parse(b.date)||0)-(Date.parse(a.date)||0)).slice(0,6);
  return {cards,totals,recent,accuracy:percent(totals.correct,totals.done),recommendations:cards.filter(c=>c.next)};
};
window.Beyond.renderStudyDashboard = model => {
  const X=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);
  const duration=s=>{const m=Math.floor(s/60),h=Math.floor(m/60);return s>0&&m===0?`${Math.floor(s)} s`:h?`${h} h ${m%60} min`:`${m} min`;};
  const action=(kind,c,label,topic='')=>`<button class="button button-light" data-dashboard-action="${kind}" data-subject="${X(c.id)}" ${topic?`data-topic="${X(topic)}"`:''}>${X(label)}</button>`;
  const date=value=>Number.isFinite(Date.parse(value))?new Intl.DateTimeFormat('es-SV',{dateStyle:'medium',timeStyle:'short',timeZone:'America/El_Salvador'}).format(new Date(value)):'Fecha no disponible';
  const summary=`<section class="dashboard-summary" aria-label="Resumen de tus prácticas"><article><span>Avance entre materias</span><strong>${model.totals.done}<small> / ${model.totals.total}</small></strong><p>Respuestas iniciales guardadas</p></article><article><span>Precisión al practicar</span><strong>${model.accuracy===null?'—':model.accuracy+'%'}</strong><p>${model.totals.correct} aciertos de ${model.totals.done} ${model.totals.done===1?"respuesta":"respuestas"}</p></article><article><span>Errores para aprender</span><strong>${model.totals.wrong}</strong><p>${model.totals.pending} preguntas todavía pendientes</p></article><article><span>Tiempo de práctica y repaso</span><strong>${duration(model.totals.elapsed)}</strong><p>Tiempo registrado en tus prácticas actuales</p></article></section>`;
  const plan=`<section aria-labelledby="dashboard-plan-title"><div class="section-title"><div><h2 id="dashboard-plan-title">Tu siguiente paso</h2><p>Una propuesta por materia según tus respuestas iniciales. Empieza por la que prefieras.</p></div></div><div class="dashboard-plan">${model.recommendations.length?model.recommendations.map(c=>`<article class="dashboard-task"><span class="dashboard-subject">${X(c.name)}</span><h3>${X(c.next.name)}</h3><p>${c.next.wrong?`${c.next.wrong} ${c.next.wrong===1?'error inicial':'errores iniciales'} de ${c.next.done} ${c.next.done===1?"respuesta":"respuestas"}. Revisa el procedimiento y reintenta.`:`${c.next.pending} preguntas sin responder. Completa el tema para conocer tu dominio.`}</p><div class="dashboard-task-actions">${action(c.next.wrong?'review':'topic',c,c.next.wrong?'Repasar estos errores':'Practicar este tema',c.next.name)}<a class="text-link" href="#${X(c.id)}">Ver guías →</a></div></article>`).join(''):'<p class="empty-note">Completaste todas las prácticas sin errores iniciales. Puedes probar un simulacro desde cada materia.</p>'}</div><p class="dashboard-caption">El repaso cuenta mejoras por separado; no borra los errores iniciales. Las recomendaciones y porcentajes son una orientación interna de Beyond.</p></section>`;
  const history=`<section aria-labelledby="dashboard-history-title"><div class="section-title"><div><h2 id="dashboard-history-title">Tu recorrido reciente</h2><p>Últimos resultados guardados de tus tres materias.</p></div></div>${model.recent.length?`<div class="dashboard-history">${model.recent.map(r=>`<a class="dashboard-result" href="#${X(r.subjectId)}/resultados/${encodeURIComponent(r.id)}"><span class="dashboard-result-score">${r.correct}<small>/${r.total}</small></span><span><strong>${X(r.subjectName)} · ${r.kind==='simulacro'?'Simulacro':'Práctica'}</strong><small>${date(r.date)} · ${r.done}/${r.total} respondidas${r.done<r.total?' · Incompleto':''}</small></span><span aria-hidden="true">↗</span></a>`).join('')}</div>`:'<p class="dashboard-empty">Tu recorrido aparecerá aquí al entregar un simulacro o guardar un diagnóstico de práctica. Cada materia tiene su propio historial.</p>'}</section>`;
  function cardDetails(id){
    const c=model.cards.find(c=>c.id===id);if(!c)return '';
    return `<div class="dashboard-card-details"><div class="dashboard-card-counts"><span><b>${c.practice.correct}</b> ${c.practice.correct===1?"acierto":"aciertos"}</span><span><b>${c.practice.wrong}</b> ${c.practice.wrong===1?"error inicial":"errores iniciales"}</span><span><b>${c.practice.pending}</b> pendientes</span></div><p>Precisión: <strong>${c.accuracy===null?'sin respuestas':c.accuracy+'%'}</strong> · ${duration(c.practice.elapsed)} de práctica</p>${c.review.done?`<p>Último repaso: ${c.review.correct}/${c.review.done} aciertos posteriores.</p>`:''}${c.trend?`<p class="dashboard-trend">${c.trend.change>0?'+':''}${c.trend.change} puntos entre tus dos últimos simulacros completos de ${c.practice.total} preguntas de esta versión (${c.trend.previous}% → ${c.trend.latest}%).</p>`:''}<div class="dashboard-card-actions">${action('continue',c,c.practice.pending?(c.practice.done?'Continuar práctica':'Comenzar práctica'):'Revisar práctica')}${action('report',c,'Ver resumen')}<a class="text-link" href="#${X(id)}/historial">Historial →</a></div>${c.lastExam?`<div class="dashboard-last-exam"><a class="text-link" href="#${X(id)}/resultados/${encodeURIComponent(c.lastExam.id)}">Último simulacro: ${c.lastExam.correct}/${c.lastExam.total} aciertos · Ver temas →</a><p>${c.lastExam.done}/${c.lastExam.total} respondidas${c.lastExam.done<c.lastExam.total?" · Incompleto":""}.${c.lastExam.weakTopics.length?" Para reforzar en ese intento: "+c.lastExam.weakTopics.map(t=>X(t.name)).join(", ")+".":""}</p></div>`:""}${c.exam?`<div class="dashboard-exam"><p><strong>Simulacro pendiente</strong><br>${c.exam.done}/${c.exam.total} respuestas · ${duration(c.exam.elapsed)}. Corrección disponible al entregar.</p>${action('exam',c,'Retomar simulacro')}</div>`:''}</div>`;
  }
  return {summary,plan,history,cardDetails};
};
