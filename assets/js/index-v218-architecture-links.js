(function(){
'use strict';
const P=JSON.parse(document.getElementById('index-v218-locales').textContent),records=[];
for(const slot of ['text','tail','svg','aria-label','data-label']){
 document.querySelectorAll('[data-arch218-'+slot+'-key]').forEach(e=>{
  const key=e.getAttribute('data-arch218-'+slot+'-key');
  if(!P[key])throw new Error('Missing architecture translation: '+key);
  const node=slot==='text'?e.firstChild:slot==='tail'?e.nextSibling:null;
  const value=node&&node.nodeType===3?node.nodeValue:'';
  records.push({e,node,slot,key,prefix:value.match(/^\s*/)[0],suffix:value.match(/\s*$/)[0]});
 });
}
function apply(lang){
 lang=['ru','en','fr'].includes(lang)?lang:document.documentElement.lang;
 if(!['ru','en','fr'].includes(lang))lang='ru';
 records.forEach(r=>{
  const v=P[r.key][lang];
  if(r.node){r.node.nodeValue=r.prefix+v+r.suffix;}
  else if(r.slot==='svg')r.e.textContent=v;
  else r.e.setAttribute(r.slot,v);
 });
}
function reveal(hash){var raw=typeof hash==='string'?hash:location.hash;var id=decodeURIComponent(raw.slice(1));if(!id.startsWith('cn-arch-'))return;var e=document.getElementById(id);if(!e)return;for(var p=e;p;p=p.parentElement){if(p.tagName==='DETAILS')p.open=true;}}
if(typeof APP_HOOKS!=='undefined')APP_HOOKS.afterLanguage.push(apply);
window.addEventListener('hashchange',reveal);document.addEventListener('DOMContentLoaded',reveal);document.addEventListener('click',function(event){var a=event.target.closest&&event.target.closest('a[href^="#cn-arch-"]');if(a)reveal(a.getAttribute('href'));});
apply(document.documentElement.lang);reveal();
})();