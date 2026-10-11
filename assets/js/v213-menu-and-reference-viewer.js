
(function(){
  'use strict';
  function normaliseMenuDashes(){
    const menu=document.getElementById('sidebar');if(!menu)return;
    const walker=document.createTreeWalker(menu,NodeFilter.SHOW_TEXT);let n;
    while((n=walker.nextNode())){const text=n.nodeValue.replace(/[\u2013\u2014]/g,'-');if(text!==n.nodeValue)n.nodeValue=text;}
  }
  if(typeof APP_HOOKS!=='undefined')APP_HOOKS.afterLanguage.push(normaliseMenuDashes);
  normaliseMenuDashes();
  const menu=document.getElementById('sidebar');
  if(menu)new MutationObserver(normaliseMenuDashes).observe(menu,{childList:true,subtree:true,characterData:true});
  const dialog=document.getElementById('zn213-preview'),large=document.getElementById('zn213-preview-image'),title=document.getElementById('zn213-preview-title'),source=document.getElementById('zn213-preview-source');
  if(!dialog)return;
  document.querySelectorAll('#cn-zoning-inspiration .zn215-zoom').forEach(button=>button.addEventListener('click',()=>{
    const img=button.querySelector('img'),card=button.closest('.zn215-ref-card'),ref=card.querySelector('.zn215-source');
    large.src=img.src;large.alt=img.alt;title.textContent=img.alt;source.href=ref.href;dialog.showModal();
  }));
  document.getElementById('zn213-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
  dialog.addEventListener('close',()=>{large.removeAttribute('src');});
})();
