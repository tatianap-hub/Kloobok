
(function(){
 'use strict';
 const P=JSON.parse(document.getElementById('index-v220-locales').textContent);
 function apply(lang){
  lang=P.design[lang]?lang:'ru';
  document.querySelectorAll('[data-v220-key]').forEach(e=>{e.textContent=P[e.dataset.v220Key][lang];});
  document.querySelectorAll('.ds220-zoom').forEach(b=>{b.querySelector('img').alt=P['title'+b.dataset.ds220Index][lang];});
 }
 if(typeof APP_HOOKS!=='undefined')APP_HOOKS.afterLanguage.push(apply);
 apply(document.documentElement.lang);
 const dialog=document.getElementById('zn213-preview');
 document.querySelectorAll('.ds220-zoom').forEach(button=>button.addEventListener('click',()=>{
  const img=button.querySelector('img');
  const large=document.getElementById('zn213-preview-image');
  large.src=img.src;large.alt=img.alt;
  document.getElementById('zn213-preview-title').textContent=img.alt;
  document.getElementById('zn213-preview-source').href=button.dataset.ds220Source;
  dialog.showModal();
 }));
})();
