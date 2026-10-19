const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const DATA_FILES = ['science-bank','science-physics','science-chemistry','science-biology','science-ecology','science-guides'];
function loadScience() {
  const context = vm.createContext({window:{}});
  for(const name of DATA_FILES)vm.runInContext(fs.readFileSync(path.join(__dirname,'../assets/js/data',name+'.js'),'utf8'),context,{filename:name});
  return context.window.Beyond;
}
function validateScience(app=loadScience()) {
  const qs=app.scienceQuestions;
  const plain=value=>JSON.parse(JSON.stringify(value));
  const tally=key=>plain(qs.reduce((counts,q)=>(counts[q[key]]=(counts[q[key]]||0)+1,counts),{}));
  const text=(value,label)=>assert.ok(typeof value==='string'&&value.trim().length>0,label);
  assert.equal(qs.length,100,'Se requieren exactamente 100 preguntas');
  assert.equal(new Set(qs.map(q=>q.id)).size,100,'Identificadores únicos');
  assert.deepEqual(tally('area'),{'Física':30,'Química':25,'Biología':25,'Ecología, Tierra y Medio Ambiente':20});
  assert.deepEqual(tally('difficulty'),{basico:30,intermedio:45,avanzado:25});
  assert.deepEqual(tally('type'),{conceptual:25,aplicacion:25,caso:20,calculo:15,datos:15});
  assert.deepEqual(tally('answer'),{0:25,1:25,2:25,3:25});
  const sections=[['FIS',1,10,'Cinemática y dinámica'],['FIS',11,17,'Fluidos y termodinámica'],['FIS',18,24,'Electromagnetismo y circuitos'],['FIS',25,30,'Ondas y óptica'],['QUI',1,8,'Estructura atómica y tabla periódica'],['QUI',9,15,'Reacciones y estequiometría'],['QUI',16,21,'Soluciones químicas'],['QUI',22,25,'Química orgánica'],['BIO',1,10,'Célula y fisiología celular'],['BIO',11,19,'Genética y evolución'],['BIO',20,25,'Anatomía y fisiología humana'],['ECO',1,8,'Ecosistemas y dinámica ecológica'],['ECO',9,14,'Geología y fenómenos naturales'],['ECO',15,20,'Medio ambiente y recursos naturales']];
  for(const [prefix,start,end,topic]of sections){
    for(let n=start;n<=end;n++)assert.equal(qs.find(q=>q.id===prefix+'-'+String(n).padStart(3,'0'))?.cat,topic);
    assert.equal(qs.filter(q=>q.cat===topic).length,end-start+1);
    for(const key of ['idea','rule','example','tip'])text(app.scienceGuides[topic][key],topic+' guía '+key);
  }
  const normalized=stem=>stem.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\d+(?:\.\d+)?/g,'#').replace(/[^a-z#]+/g,' ').trim();
  assert.equal(new Set(qs.map(q=>normalized(q.stem))).size,100,'Enunciados duplicados o diferenciados solo por cifras');
  for(const q of qs){
    for(const key of ['id','area','cat','difficulty','type','stem','explain','concept','tip'])text(q[key],q.id+' '+key);
    assert.ok(!/lorem ipsum|TODO:|placeholder|texto provisional/i.test(q.stem+' '+q.explain),q.id+' sin relleno');
    assert.equal(q.opts.length,4,q.id+' cuatro alternativas');
    assert.equal(new Set(q.opts).size,4,q.id+' alternativas distintas');
    assert.ok(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<4,q.id+' respuesta válida');
    assert.equal(q.feedback.length,4);
    q.opts.forEach((opt,i)=>{text(opt,q.id+' opción '+i);text(q.feedback[i],q.id+' feedback '+i);});
    assert.equal(new Set(q.feedback.filter((_,i)=>i!==q.answer)).size,3,q.id+' tres retroalimentaciones diferentes');
    assert.ok(Array.isArray(q.tags)&&q.tags.length>=2&&q.tags.every(t=>typeof t==='string'&&t.trim()),q.id+' etiquetas');
    if(q.formula){text(q.formula.text,q.id+' fórmula');text(q.formula.variables,q.id+' variables');}
    if(q.steps){assert.ok(q.steps.length>=2);q.steps.forEach(step=>text(step,q.id+' procedimiento'));}
    if(q.type==='datos')assert.ok(q.visual,q.id+' recurso necesario para interpretar datos');
    if(q.visual?.kind==='table'||q.solutionVisual?.kind==='table'){
      for(const v of [q.visual,q.solutionVisual].filter(v=>v?.kind==='table')){
        assert.ok(v.headers.length>=2&&v.rows.length>=1);assert.ok(v.rows.every(row=>row.length===v.headers.length));text(v.caption,q.id+' título de tabla');
      }
    }
    if(q.type==='calculo')assert.ok(q.numeric||q.equation,q.id+' cálculo verificable');
    if(q.numeric){
      const {method,inputs:a,result}=q.numeric;
      const methods={divide:()=>a[0]/a[1],freefall:()=>a[0]*a[1]**2/2,vertical:()=>a[0]**2/(2*a[1]),temperature:()=>a[0]+273.15,coulombRatio:()=>a[0]/a[1]**2,multiply:()=>a[0]*a[1],molarMass:()=>a[0]+2*a[1]+2*a[2],limiting:()=>Math.min(a[0]/2,a[1])*2,massPercent:()=>100*a[0]/(a[0]+a[1]),molarity:()=>a[0]/a[1]/a[2],probability:()=>100*a[0]*a[1]};
      assert.ok(methods[method],q.id+' método numérico');
      const computed=methods[method]();assert.ok(Number.isFinite(computed)&&Math.abs(computed-result)<=Math.max(1,Math.abs(result))*1e-12,q.id+' aritmética');
      if(method==='temperature')assert.equal(a[0]*9/5+32,q.numeric.secondary);
    }
    if(q.equation){
      const count=side=>side.reduce((atoms,item)=>{assert.ok(item.coefficient>0&&Number.isInteger(item.coefficient));for(const [atom,n]of Object.entries(item.atoms))atoms[atom]=(atoms[atom]||0)+n*item.coefficient;return atoms;},{});
      assert.deepEqual(count(q.equation.reactants),count(q.equation.products),q.id+' conservación de átomos');
    }
  }
  // Vocabulary-independent duplicate screen: token overlap, not just exact text.
  for(let i=0;i<qs.length;i++)for(let j=i+1;j<qs.length;j++){
    const a=new Set(normalized(qs[i].stem).split(' ')),b=new Set(normalized(qs[j].stem).split(' '));
    const intersection=[...a].filter(word=>b.has(word)).length;
    const similarity=intersection/new Set([...a,...b]).size;
    assert.ok(similarity<0.86,qs[i].id+' y '+qs[j].id+' demasiado similares');
  }
  return {questions:100,areas:tally('area'),topics:sections.length,difficulty:tally('difficulty'),modalities:tally('type'),answers:tally('answer')};
}
if(require.main===module)console.log(JSON.stringify(validateScience(),null,2));
module.exports={DATA_FILES,loadScience,validateScience};
