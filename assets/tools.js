const money=new Intl.NumberFormat('nl-NL',{style:'currency',currency:'EUR',maximumFractionDigits:0});
document.querySelectorAll('[data-calculator]').forEach(form=>form.addEventListener('submit',event=>{
 event.preventDefault();if(!form.reportValidity())return;
 const input=Object.fromEntries(Array.from(new FormData(form),([key,value])=>[key,Number(value)]));
 const output=form.querySelector('output');
 if(Object.values(input).some(value=>!Number.isFinite(value)||value<0)){output.textContent='Vul geldige, positieve bedragen in.';return;}
 let text='';
 if(form.dataset.calculator==='repair'){const net=input.na-input.kosten-input.extra;const difference=net-input.nu;text=`Netto scenario na reparatie: ${money.format(net)}. Verschil met verkoop in huidige staat: ${money.format(difference)}. ${difference>0?'Repareren levert in dit scenario meer op.':difference<0?'Verkopen in huidige staat levert in dit scenario meer op.':'De scenario’s zijn in deze berekening gelijk.'}`;}
 if(form.dataset.calculator==='suspend'){const normal=input.maanden*(input.vast+input.waardedaling);const suspended=input.schorsing+input.maanden*(input.stalling+input.waardedaling);text=`Kosten aanhouden zonder schorsing: ${money.format(normal)}. Kosten bij schorsing: ${money.format(suspended)}. Verschil: ${money.format(normal-suspended)}. Deze vergelijking berekent geen verkoopwaarde. Controleer officiële schorsingskosten en voorwaarden bij de RDW.`;}
 if(form.dataset.calculator==='private'){const net=input.particulier-input.advertentie-input.uren*input.uurwaarde-input.risico;text=`Particuliere opbrengst na ingevoerde kosten, tijd en buffer: ${money.format(net)}. Aanbod inkoper: ${money.format(input.inkoper)}. Verschil: ${money.format(net-input.inkoper)}. Controleer of alle bedragen op dezelfde btw-basis zijn.`;}
 if(form.dataset.calculator==='depreciation'){if(input.jaren<=0){output.textContent='Vul een looptijd van minimaal één jaar in.';return;}const difference=input.prijs-input.rest;const rate=input.prijs>0?` (${(100*difference/input.prijs).toFixed(1).replace('.',',')}% van de oorspronkelijke prijs)`:'';text=`Totale waardeverandering: ${money.format(difference)}${rate}. Gemiddeld per jaar: ${money.format(difference/input.jaren)}. Dit is geen voorspelling van toekomstige afschrijving.`;}
 output.textContent=text;
}));

function datum(value){if(!value||!/^[0-9]{8}$/.test(value))return 'Niet beschikbaar';return `${value.slice(6,8)}-${value.slice(4,6)}-${value.slice(0,4)}`;}
document.querySelectorAll('.rdw-check').forEach(form=>{
 const plate=form.querySelector('input[name="rdw-kenteken"]');
 plate.addEventListener('input',()=>{plate.value=window.VJBRdw.formatPlate(plate.value);});
 const provided=new URLSearchParams(location.search).get('kenteken');if(provided)plate.value=provided.toUpperCase();
 form.addEventListener('submit',async event=>{
  event.preventDefault();if(!form.reportValidity())return;
  const kenteken=plate.value.toUpperCase().replace(/[^A-Z0-9]/g,'');
  const output=form.querySelector('.rdw-result');
  if(kenteken.length<5||kenteken.length>7){output.textContent='Controleer het kenteken. Gebruik letters en cijfers van een Nederlands kenteken.';return;}
  const button=form.querySelector('button');button.disabled=true;output.textContent='Voertuiggegevens ophalen…';
  try{
   const vehicle=await window.VJBRdw.lookup(kenteken);
   const data=[['Merk',vehicle.merk],['Model',vehicle.handelsbenaming],['Voertuigsoort',vehicle.voertuigsoort],['Bouwjaar',vehicle.bouwjaar],['APK vervaldatum',vehicle.apk_vervaldatum?vehicle.apk_vervaldatum.split('-').reverse().join('-'):'Niet beschikbaar'],['Brandstof',vehicle.brandstof],['Inrichting',vehicle.inrichting],['Tellerstandoordeel',vehicle.tellerstandoordeel]];
   output.replaceChildren();const title=document.createElement('strong');title.textContent='Openbare gegevens voor '+kenteken;output.append(title);
   const list=document.createElement('dl');list.className='vehicle-data';
   data.forEach(([label,value])=>{const group=document.createElement('div');const term=document.createElement('dt');term.textContent=label;const definition=document.createElement('dd');definition.textContent=value||'Niet beschikbaar';group.append(term,definition);list.append(group);});output.append(list);
   const onward=document.createElement('a');onward.className='btn';onward.href='/#aanvragen';onward.textContent='Verder met aanvraag';output.append(onward);
   const allowed=['kenteken','merk','model','bouwjaar','apk','brandstof','inrichting'];
   const state={kenteken,merk:vehicle.merk||'',model:vehicle.handelsbenaming||'',bouwjaar:vehicle.bouwjaar||'',apk:vehicle.apk_vervaldatum||'',brandstof:vehicle.brandstof||'',inrichting:vehicle.inrichting||''};
   fillVehicleFields(state);
   try{sessionStorage.setItem('vjb-voertuig',JSON.stringify(Object.fromEntries(allowed.map(key=>[key,state[key]]))));}catch{}
  }catch(error){if(error instanceof window.VJBRdw.NotFoundError){output.textContent='Geen voertuig gevonden voor dit kenteken. Controleer de invoer of ga verder met een handmatige aanvraag.';return;}output.textContent='De voertuiggegevens konden niet worden opgehaald. Probeer later opnieuw of ga verder met een handmatige aanvraag. Je hebt geen RDW-check nodig om contact aan te vragen.';}
  finally{button.disabled=false;}
 });
});
function fillVehicleFields(vehicle){
 const form=document.querySelector('form[name="bus-aanvraag"]');if(!vehicle||!form)return;
 Object.entries(vehicle).forEach(([name,value])=>{const field=form.elements.namedItem(name);if(!field||field.value)return;if(field.tagName==='SELECT'){const option=Array.from(field.options).find(option=>option.text.toLowerCase()===String(value).toLowerCase());if(option)field.value=option.value;else if(name==='merk')field.value='Ander merk';}else field.value=value;});
}
try{fillVehicleFields(JSON.parse(sessionStorage.getItem('vjb-voertuig')||'null'));}catch{}
