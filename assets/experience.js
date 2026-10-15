// Small, local interactions; no personal details are stored by these controls.
const situations={
 volgende:{name:'Toe aan iets nieuws',title:'Ruimte voor iets nieuws.',description:'Houd uitvoering, kilometerstand en onderhoud bij de hand. Zo begint uw aanvraag met een compleet verhaal.',items:['Actuele kilometerstand','Onderhoud en uitvoering','Afspraken over de overdracht'],path:'/bestelbus-verkopen/'},
 schade:{name:'Schade of gebreken',title:'Een deuk in de plannen?',description:'Benoem wat er is gebeurd en of uw bus nog veilig kan rijden. Daarmee kunnen inspectie en eventueel transport goed worden besproken.',items:['Beschrijving en foto’s van de schade','Start de bus en is deze rijdbaar?','Beschikbare reparatieofferte'],path:'/bus-met-schade-verkopen/'},
 zakelijk:{name:'Zakelijk verkopen',title:'Een volgende stap voor uw bedrijf.',description:'Btw, bedrijfsinrichting of financiering: bij een zakelijke bus hoort ook een stukje administratie. Breng dat vooraf in beeld.',items:['Btw- of margestatus controleren','Lease of financiering nagaan','Bepalen welke inrichting meegaat'],path:'/bedrijfswagen-verkopen/'},
 apk:{name:'Geen geldige APK',title:'Eerst duidelijkheid. Dan op weg.',description:'Een verlopen APK vraagt om aandacht bij vervoer. Deel het keuringsrapport en spreek af hoe de bus veilig wordt verplaatst.',items:['APK-status of afkeuringsrapport','Bekende gebreken beschrijven','Transport en kosten vooraf bespreken'],path:'/bus-zonder-apk-verkopen/'}
};
let selected='volgende';
try{const saved=sessionStorage.getItem('vjb-situatie');if(Object.hasOwn(situations,saved))selected=saved;}catch{}
function applySituation(key){
 const situation=situations[key];if(!situation)return;
 selected=key;
 const title=document.querySelector('#situation-title');
 if(title){
  title.textContent=situation.title;
  document.querySelector('#situation-description').textContent=situation.description;
  const list=document.querySelector('#situation-checklist');list.replaceChildren(...situation.items.map(text=>{const li=document.createElement('li');li.textContent=text;return li;}));
  document.querySelector('#situation-read').href=situation.path;
  document.querySelectorAll('[name="verkoopkeuze"]').forEach(radio=>{radio.checked=radio.value===key;});
 }
 document.querySelectorAll('form[name="bus-aanvraag"]').forEach(form=>{
  form.elements.namedItem('verkoop-situatie').value=situation.name;
  const summary=form.querySelector('.selected-situation');summary.hidden=false;summary.textContent='Uw situatie: '+situation.name;
 });
 try{sessionStorage.setItem('vjb-situatie',key);}catch{}
}
const explorer=document.querySelector('.situation-interactive');
if(explorer){
 explorer.hidden=false;document.querySelector('.situation-fallback').hidden=true;
 explorer.querySelectorAll('[name="verkoopkeuze"]').forEach(radio=>radio.addEventListener('change',()=>applySituation(radio.value)));
 applySituation(selected);
}else{
 try{if(sessionStorage.getItem('vjb-situatie'))applySituation(selected);}catch{}
}

// Search the visible FAQ text without losing the native keyboard-accessible accordions.
document.querySelectorAll('.faq').forEach((faq,index)=>{
 const details=Array.from(faq.querySelectorAll('details'));if(details.length<3)return;
 const search=document.createElement('div');search.className='faq-search';
 const label=document.createElement('label');label.htmlFor='faq-search-'+index;label.textContent='Waar wilt u meer over weten?';
 const input=document.createElement('input');input.id=label.htmlFor;input.type='search';input.placeholder='Zoek bijvoorbeeld op schade of betaling';input.autocomplete='off';input.setAttribute('aria-controls','faq-results-'+index);
 faq.id='faq-results-'+index;
 const status=document.createElement('p');status.className='faq-search-status';status.setAttribute('role','status');
 const clear=document.createElement('button');clear.type='button';clear.className='clear-search';clear.textContent='Wis zoekopdracht';clear.hidden=true;
 search.append(label,input,clear,status);const panel=document.createElement('div');panel.className='faq-panel';faq.before(panel);panel.append(search,faq);
 function filter(){
  const query=input.value.trim().toLocaleLowerCase('nl');let count=0;
  details.forEach(item=>{const match=item.textContent.toLocaleLowerCase('nl').includes(query);item.hidden=!match;if(match)count++;});
  clear.hidden=!query;
  status.textContent=query?(count?`${count} ${count===1?'antwoord gevonden':'antwoorden gevonden'}.`:'Geen passend antwoord gevonden. Probeer een ander woord of neem contact op.') :'';
 }
 input.addEventListener('input',filter);clear.addEventListener('click',()=>{input.value='';filter();input.focus();});
});

// A compact mobile action only appears when neither the hero nor the request form is in view.
if('IntersectionObserver' in window&&document.querySelector('.home-hero')){
 const bar=document.createElement('div');bar.className='mobile-next-step';bar.hidden=true;
 const copy=document.createElement('span');copy.textContent='Uw bus. Uw volgende stap.';
 const action=document.createElement('a');action.href='#aanvragen';action.className='btn';action.textContent='Meld uw bus aan';bar.append(copy,action);document.body.append(bar);
 const visible=new Set();const targets=[document.querySelector('.home-hero'),document.querySelector('#aanvragen'),document.querySelector('footer')].filter(Boolean);
 const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)visible.add(entry.target);else visible.delete(entry.target);});bar.hidden=visible.size>0;},{threshold:0});targets.forEach(target=>observer.observe(target));
}
