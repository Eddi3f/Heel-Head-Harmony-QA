// Run with: node tests/launch-checks.cjs
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.join(__dirname, '..');
const flush = () => new Promise(setImmediate);
const classes = () => ({add() {}, remove() {}});

async function testFeed(csv, ok, ids) {
  const elements = {};
  const el = id => ({id, innerHTML:'old content', textContent:'', className:'',
    setAttribute() {}, querySelectorAll:()=>[], insertAdjacentElement(_, n) { elements[n.id] = n; }});
  ids.forEach(id => elements[id] = el(id));
  const context = {
    window:{HHH_CONFIG:{enabled:true,sheetId:'test',tabs:{treatments:'Treatments',research:'Research',about:'About',testimonials:'Testimonials'}}},
    document:{getElementById:id=>elements[id] || null,createElement:()=>el('')},
    URL,TextDecoder,AbortController,setTimeout,clearTimeout,
    fetch:async()=>({ok,arrayBuffer:async()=>new TextEncoder().encode(csv).buffer})
  };
  vm.runInNewContext(fs.readFileSync(path.join(root,'js/data.js'),'utf8'),context);
  await flush(); return elements;
}

async function testForm(endpoint, response) {
  let reset = false;
  const status={classList:classes(),setAttribute(){},focus(){}};
  const button={textContent:'Send message',dataset:{}};
  const form={checkValidity:()=>true,reset:()=>{reset=true;},addEventListener:(type,fn)=>{form.submit=fn;},
    querySelector:s=>s==='.form-status'?status:s==='button[type="submit"]'?button:{value:'Test'}};
  const context={CFG:{formEndpoint:endpoint},AbortController,setTimeout,clearTimeout,
    document:{querySelectorAll:()=>[form]},fetch:async()=>response,toggleOther(){}};
  const source=fs.readFileSync(path.join(root,'js/site.js'),'utf8');
  vm.runInNewContext(source.slice(source.indexOf('  function endpointReady()'),source.indexOf('  /* ---- 5.')),context);
  form.submit({preventDefault(){}});await flush();
  return {reset,status:status.textContent,disabled:button.disabled};
}

(async()=>{
  let e=await testFeed('',false,['price-grid','subject-treatments','subject']);
  assert.equal(e['price-grid'].innerHTML,''); assert.equal(e['subject-treatments'].innerHTML,'');
  assert.match(e['price-grid-notice'].textContent,/unavailable/);
  e=await testFeed('treatment,price\n',true,['price-grid']);
  assert.equal(e['price-grid'].innerHTML,'');
  e=await testFeed('condition,link_url\nUnsafe,javascript:alert(1)\n',true,['research-grid']);
  assert.equal(e['research-grid'].innerHTML,'');
  e=await testFeed('condition,link_url\nStudy,https://example.org/paper\n',true,['research-grid']);
  assert.match(e['research-grid'].innerHTML,/https:\/\/example.org\/paper/);
  e=await testFeed('type,text\nbio,First paragraph\\n\\nSecond paragraph\n',true,['about-bio']);
  assert.equal(e['about-bio'].innerHTML,'<p>First paragraph</p><p>Second paragraph</p>');
  e=await testFeed('<html>Sign in</html>',true,['research-grid']);
  assert.match(e['research-grid-notice'].textContent,/unavailable/);
  console.log('PASS feed failure, empty prices, unsafe URLs, valid research and bio paragraphs');
  let f=await testForm('',null);assert.equal(f.reset,false);assert.match(f.status,/unavailable/);
  f=await testForm('https://example.org',{ok:false});assert.equal(f.reset,false);assert.match(f.status,/could not confirm/);
  f=await testForm('https://example.org',{ok:true,json:async()=>{throw Error('HTML response');}});assert.equal(f.reset,false);
  f=await testForm('https://example.org',{ok:true,json:async()=>({ok:true})});assert.equal(f.reset,true);assert.equal(f.disabled,false);
  console.log('PASS missing endpoint, failed HTTP, malformed response and confirmed form success');
  const css=fs.readFileSync(path.join(root,'styles.css'),'utf8');
  assert.match(css,/\.tcarousel-controls \{[^}]*justify-content:center/);
  assert.match(fs.readFileSync(path.join(root,'404.html'),'utf8'),/<base href="\/">/);
  console.log('PASS centred arrows and nested 404 root paths');
})().catch(e=>{console.error(e);process.exitCode=1;});
