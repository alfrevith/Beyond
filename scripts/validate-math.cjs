const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const DATA_FILES=['math-questions','math-guides','math-learning'];
// Baseline captured before enrichment: includes all 100 original stems, options,
// answer indices, explanations and their order. Never silently update this hash.
const ORIGINAL_SHA256='7b68e49b8d3e48f28e4f92830d809f8f3f01f36d6a075765ce26f63b3a96fe37';
function loadMath(){const c=vm.createContext({window:{}});for(const name of DATA_FILES)vm.runInContext(fs.readFileSync(path.join(__dirname,'../assets/js/data',name+'.js'),'utf8'),c,{filename:name});return c.window.Beyond;}
function validateMath(app=loadMath()){
  const original=app.mathQuestions,qs=app.mathLearningQuestions;
  assert.equal(crypto.createHash('sha256').update(JSON.stringify(original)).digest('hex'),ORIGINAL_SHA256,'Se modificó el banco matemático original');
  assert.equal(qs.length,100);assert.equal(new Set(qs.map(q=>q.id)).size,100);
  const areas={};
  qs.forEach((q,i)=>{
    for(const field of ['cat','stem','opts','answer','explain'])assert.equal(JSON.stringify(q[field]),JSON.stringify(original[i][field]),'No reinterpretar la pregunta '+(i+1)+' '+field);
    assert.equal(q.id,'MAT-'+String(i+1).padStart(3,'0'));
    assert.equal(q.opts.length,4);assert.equal(new Set(q.opts).size,4);assert.ok(q.answer>=0&&q.answer<4&&Number.isInteger(q.answer));
    for(const key of ['area','concept','tip'])assert.ok(typeof q[key]==='string'&&q[key].trim());
    assert.ok(['basico','intermedio','avanzado'].includes(q.difficulty));assert.ok(['conceptual','calculo','datos'].includes(q.type));
    assert.equal(q.feedback.length,4);assert.ok(q.feedback.every(s=>typeof s==='string'&&s.trim()));assert.equal(new Set(q.feedback).size,4);
    assert.ok(q.steps.length>=2&&q.steps.every(s=>typeof s==='string'&&s.trim()));assert.ok(q.tags.includes(q.cat));
    for(const key of ['idea','rule','example','tip'])assert.ok(app.mathGuides[q.cat]?.[key]);
    if(q.type==='datos')assert.ok(q.visual);
    if(q.visual?.kind==='table')assert.ok(q.visual.rows.every(row=>row.length===q.visual.headers.length));
    if(q.visual?.kind==='bars')assert.ok(q.visual.rows.every(row=>Number.isFinite(row[1])&&row[1]>=0));
    areas[q.area]=(areas[q.area]||0)+1;
  });
  assert.deepEqual(areas,{'Números y proporcionalidad':24,'Álgebra y funciones':41,'Estadística y probabilidad':15,'Geometría y patrones':20});
  assert.equal(new Set(qs.map(q=>q.cat)).size,22);
  return {questions:100,topics:22,areas,fingerprint:ORIGINAL_SHA256};
}
if(require.main===module)console.log(JSON.stringify(validateMath(),null,2));
module.exports={DATA_FILES,ORIGINAL_SHA256,loadMath,validateMath};
