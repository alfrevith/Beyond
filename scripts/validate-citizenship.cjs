const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const DATA_FILES=['citizenship-bank','citizenship-social','citizenship-history','citizenship-civic','citizenship-global','citizenship-environment','citizenship-guides'];
const AREAS={SOC:['Ciencias Sociales e Investigación',15],HIS:['Historia de El Salvador y Centroamérica',25],CIV:['Democracia, Estado de Derecho y Derechos Humanos',25],GLO:['Globalización, Economía y Tecnología',15],AMB:['Medio Ambiente, Población y Urbanización',20]};
const SECTIONS=[['SOC',1,6,'Fundamentos de Ciencias Sociales'],['SOC',7,15,'Métodos e interpretación de investigación social'],['HIS',1,8,'Modelo agroexportador y autoritarismo'],['HIS',9,18,'Conflicto armado, negociación y paz'],['HIS',19,25,'Posguerra, migración y desarrollo humano'],['CIV',1,9,'Constitución e instituciones públicas'],['CIV',10,17,'Democracia, participación y cultura de paz'],['CIV',18,25,'Derechos humanos, igualdad y protección'],['GLO',1,5,'Globalización, comercio e integración regional'],['GLO',6,11,'Tecnología, información y ciudadanía digital'],['GLO',12,15,'Identidad, diversidad e intercambios culturales'],['AMB',1,7,'Ambiente, recursos y sostenibilidad'],['AMB',8,13,'Gestión del riesgo y ordenamiento territorial'],['AMB',14,20,'Demografía, población y urbanización']];
// Content coverage is checked alongside exact per-topic ranges. This lexical
// screen complements, rather than claims to replace, editorial source review.
const COVERAGE={
  SOC:['ciencias naturales','sociologia','historia','antropologia','economia','geografia','ciencia politica','metodo','problema','hipotesis','marco teorico','independiente','dependiente','poblacion','muestra','encuesta','entrevista','observacion','grupo focal','tabla','grafica','mapa'],
  HIS:['agroexport','cafe','tierra','desigualdad','militar','autoritar','1932','1979','polarizacion','ochenta','desplazamiento','negociacion','1992','policia nacional civil','participacion','migracion','remesa','demograf','pandilla','violencia','pobreza','desarrollo humano','centroamerica'],
  CIV:['constitucion','estado de derecho','ejecutivo','legislativo','judicial','independencia','individual','social','economico','politico','responsabilidad','representa','participa','pluralismo','electoral','tse','partido','voto','transparencia','rendicion de cuentas','cultura de paz','tolerancia','dialogo','declaracion','civiles','colectiv','igualdad','discriminacion','expresion','educacion','salud','pddh'],
  GLO:['globalizacion','comercio','tratado','bloque','integracion','interdependencia','informacion','tic','redes','digital','trabajo','brecha','desinformacion','privacidad','participacion','identidad','diversidad','aculturacion','transculturacion','tradicion'],
  AMB:['cambio climatico','invernadero','deforestacion','contaminacion','agua','recursos','sostenib','legislacion','prevencion','riesgo','vulnerabilidad','poblacion','natalidad','mortalidad','migracion','densidad','distribucion','urbanizacion','infraestructura','inundacion','deslizamiento','sismo','suelo','residuo']
};
const normalize=text=>text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
function loadCitizenship(){
  const c=vm.createContext({window:{}});
  for(const file of ['science-bank',...DATA_FILES])vm.runInContext(fs.readFileSync(path.join(__dirname,'../assets/js/data',file+'.js'),'utf8'),c,{filename:file});
  return c.window.Beyond;
}
function validateCitizenship(app=loadCitizenship()){
  const qs=app.citizenshipQuestions,plain=v=>JSON.parse(JSON.stringify(v));
  const tally=key=>plain(qs.reduce((a,q)=>(a[q[key]]=(a[q[key]]||0)+1,a),{}));
  const text=(v,label)=>assert.ok(typeof v==='string'&&v.trim().length>0,label);
  assert.equal(qs.length,100);assert.equal(new Set(qs.map(q=>q.id)).size,100);
  assert.deepEqual(tally('area'),Object.fromEntries(Object.values(AREAS)));
  assert.deepEqual(tally('difficulty'),{basico:30,intermedio:45,avanzado:25});
  assert.deepEqual(tally('type'),{conceptual:15,caso:25,fuente:25,relacion:20,datos:15});
  assert.deepEqual(tally('answer'),{0:25,1:25,2:25,3:25});
  for(const [prefix,[area,count]]of Object.entries(AREAS)){
    for(let n=1;n<=count;n++)assert.equal(qs.find(q=>q.id===`${prefix}-${String(n).padStart(3,'0')}`)?.area,area);
    const topics=SECTIONS.filter(s=>s[0]===prefix).map(s=>s[3]);
    const corpus=normalize(JSON.stringify(qs.filter(q=>q.area===area))+JSON.stringify(topics.map(t=>app.citizenshipGuides[t])));
    for(const term of COVERAGE[prefix])assert.ok(corpus.includes(term),`${prefix}: falta cobertura de ${term}`);
  }
  assert.equal(Object.keys(app.citizenshipGuides).length,SECTIONS.length);
  for(const [prefix,first,last,topic]of SECTIONS){
    for(let n=first;n<=last;n++)assert.equal(qs.find(q=>q.id===`${prefix}-${String(n).padStart(3,'0')}`)?.cat,topic);
    for(const key of ['idea','rule','example','tip'])text(app.citizenshipGuides[topic]?.[key],topic+' '+key);
  }
  const sourceIds=new Set();
  for(const source of app.citizenshipSources){text(source.id,'source id');text(source.title,source.id);assert.ok(!sourceIds.has(source.id));sourceIds.add(source.id);assert.equal(new URL(source.url).protocol,'https:');}
  for(const q of qs){
    for(const key of ['id','area','cat','difficulty','type','stem','explain','concept','tip'])text(q[key],q.id+' '+key);
    assert.ok(!/lorem ipsum|TODO:|placeholder|texto provisional/i.test(q.stem+' '+q.explain));
    assert.equal(q.opts.length,4);assert.equal(new Set(q.opts).size,4);
    assert.ok(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<4);
    assert.equal(q.feedback.length,4);assert.equal(new Set(q.feedback).size,4);
    q.opts.forEach((opt,i)=>{text(opt,q.id+' opción');text(q.feedback[i],q.id+' explicación '+i);});
    assert.ok(q.tags.length>=2&&q.tags.every(t=>typeof t==='string'&&t.trim()));
    for(const id of q.sources||[])assert.ok(sourceIds.has(id),q.id+' referencia desconocida '+id);
    if(q.type==='fuente')assert.ok(q.context,q.id+' requiere texto/fuente');
    if(q.context){text(q.context.text,q.id+' contexto');text(q.context.label,q.id+' procedencia');assert.match(q.context.label,/didáctic|simulada/);}
    if(q.type==='datos')assert.ok(['table','bars','map'].includes(q.visual?.kind),q.id+' recurso de datos');
    const v=q.visual;
    if(v){
      text(v.caption,q.id+' título');assert.ok(['table','bars','map','cartoon'].includes(v.kind));
      if(v.kind!=='cartoon')assert.match(v.caption,/simulad|fictici/);
      if(v.kind==='table'){assert.ok(v.headers.length>=2&&v.rows.length);assert.ok(v.rows.every(r=>r.length===v.headers.length));}
      if(v.kind==='bars'){text(v.unit,q.id+' unidad');assert.ok(v.rows.length>=2);assert.ok(v.rows.every(r=>r.length===2&&typeof r[0]==='string'&&Number.isFinite(r[1])&&r[1]>=0));assert.ok(Math.max(...v.rows.map(r=>r[1]))>0);}
      if(v.kind==='map'){text(v.legend,q.id+' leyenda');text(v.unit,q.id+' unidad');assert.ok(v.cells.length>=2);assert.ok(v.cells.every(r=>r.length===3&&typeof r[0]==='string'&&typeof r[1]==='string'&&Number.isFinite(r[2])&&r[2]>=0&&r[2]<=100));}
    }
  }
  const stems=qs.map(q=>normalize(q.stem).replace(/\d+(?:\.\d+)?/g,'#').replace(/[^a-z#]+/g,' ').trim());
  assert.equal(new Set(stems).size,100,'Duplicados exactos o diferenciados solo por números');
  for(let i=0;i<100;i++)for(let j=i+1;j<100;j++){
    const a=new Set(stems[i].split(' ')),b=new Set(stems[j].split(' '));
    assert.ok([...a].filter(w=>b.has(w)).length/new Set([...a,...b]).size<.86,qs[i].id+' y '+qs[j].id+' similares');
  }
  return {questions:qs.length,areas:tally('area'),topics:SECTIONS.length,difficulty:tally('difficulty'),modalities:tally('type'),answers:tally('answer'),dataResources:qs.filter(q=>q.type==='datos').length};
}
if(require.main===module)console.log(JSON.stringify(validateCitizenship(),null,2));
module.exports={DATA_FILES,AREAS,SECTIONS,loadCitizenship,validateCitizenship};
