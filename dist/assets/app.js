const toggle=document.querySelector('.menu-toggle');
const navigation=document.querySelector('#navigation');
toggle?.addEventListener('click',()=>{const open=navigation.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'Sluiten ✕':'Menu ☰';});
document.addEventListener('keydown',event=>{if(event.key==='Escape'){navigation?.classList.remove('open');toggle?.setAttribute('aria-expanded','false');document.querySelectorAll('nav details[open]').forEach(item=>item.removeAttribute('open'));}});
document.querySelectorAll('nav details').forEach(item=>item.addEventListener('toggle',()=>{if(item.open)document.querySelectorAll('nav details').forEach(other=>{if(other!==item)other.open=false;});}));
document.querySelector('#kenteken')?.addEventListener('input',event=>{event.target.value=event.target.value.toUpperCase();});
