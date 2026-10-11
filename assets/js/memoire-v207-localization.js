
(function(){
  'use strict';
  const P=JSON.parse(document.getElementById('memoire-v207-locales').textContent);
  const records=[],svgRecords=[],vpcRecords=[];
  const normal=s=>s.replace(/\s+/g,' ').trim();
  const reverse=new Map();
  Object.entries(P.text).forEach(([ru,v])=>{reverse.set(ru,ru);['en','fr'].forEach(l=>{if(!reverse.has(v[l]))reverse.set(v[l],ru);});});
  const ignored=e=>e.closest('[data-i18n],[data-i18n-inline],[data-fixed-trilingual],[data-arch218-root],script,style,template');
  document.querySelectorAll('[data-v206-root]').forEach(root=>{
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    let n;
    while((n=walker.nextNode())){
      const e=n.parentElement;if(!e||ignored(e)||e.closest('svg text,[data-vpc-key]'))continue;
      const t=n.nodeValue,k=(n.previousSibling&&n.previousSibling.nodeType===1?n.previousSibling.getAttribute('data-v207-tail-key'):e.getAttribute('data-v207-text-key'))||reverse.get(t.trim());
      if(typeof k==='string'&&Object.prototype.hasOwnProperty.call(P.text,k))records.push({node:n,key:k,prefix:t.match(/^\s*/)[0],suffix:t.match(/\s*$/)[0]});
    }
    [root,...root.querySelectorAll('*')].forEach(e=>{
      if(ignored(e))return;
      ['aria-label','alt','title'].forEach(attr=>{
        const t=e.getAttribute(attr),k=e.getAttribute('data-v207-'+attr+'-key')||(t&&reverse.get(t.trim()));
        if(typeof k==='string'&&Object.prototype.hasOwnProperty.call(P.text,k))records.push({node:e,attr,key:k,prefix:'',suffix:''});
      });
    });
    root.querySelectorAll('svg text').forEach(e=>{
      if(e.closest('[data-vpc-key]'))return;
      const current=normal(e.textContent),withSpaces=normal([...e.childNodes].map(n=>n.textContent).join(' '));
      const key=e.getAttribute('data-v207-svg-key')||Object.keys(P.svg).find(k=>k===current||k===withSpaces||Object.values(P.svg[k]).some(lines=>normal(lines.join(' '))===withSpaces));
      if(key!==undefined)svgRecords.push({node:e,key});
    });
    root.querySelectorAll('g[data-vpc-key]').forEach(e=>{
      const key=e.getAttribute('data-vpc-key');if(P.vpc[key])vpcRecords.push({node:e,key});
    });
  });
  const legacyMap=new Map(),legacyCache=new WeakMap();
  if(typeof translations!=='undefined')Object.entries(translations.fr).forEach(([k,fr])=>{
    if(typeof fr==='string'&&fr.trim().length>2&&!/[<>]/.test(fr)&&translations.en[k]!==undefined&&translations.ru[k]!==undefined){
      legacyMap.set(fr.trim(),{fr,en:translations.en[k],ru:translations.ru[k]});
    }
  });
  Object.entries(P.legacy).forEach(([key,val])=>legacyMap.set(key,val));
  function localiseLegacy(lang){
    const main=document.getElementById('mainContent');if(!main)return;
    const walker=document.createTreeWalker(main,NodeFilter.SHOW_TEXT);let n;
    while((n=walker.nextNode())){
      const e=n.parentElement;
      if(!e||ignored(e)||e.closest('[data-proto-lang],[data-v206-root],#literature-body,#map-offline-geography,#pcModal,#imgLightbox'))continue;
      let rec=legacyCache.get(n);
      if(!rec){
        const text=n.nodeValue,trim=text.trim();
        let values=legacyMap.get(trim);
        if(!values&&/^[—–]\s/.test(trim)){
          const match=trim.match(/^([—–]\s*)(.*)$/),base=legacyMap.get(match[2]);
          if(base)values=Object.fromEntries(['ru','en','fr'].map(l=>[l,match[1]+base[l]]));
        }
        if(values&&!Object.values(values).some(v=>/[<>]/.test(v))){rec={values,prefix:text.match(/^\s*/)[0],suffix:text.match(/\s*$/)[0]};legacyCache.set(n,rec);}
      }
      if(rec)n.nodeValue=rec.prefix+rec.values[lang]+rec.suffix;
    }
  }

  function applyStable(lang){
    document.querySelectorAll('[data-v207-text],[data-v207-tail]').forEach(e=>{
      ['text','tail'].forEach(slot=>{
        const key=e.getAttribute('data-v207-'+slot);if(!key||!P.stable[key])return;
        const n=slot==='text'?e.firstChild:e.nextSibling;
        if(n&&n.nodeType===3){const old=n.nodeValue;n.nodeValue=old.match(/^\s*/)[0]+P.stable[key][lang]+old.match(/\s*$/)[0];}
      });
    });
  }
  function apply(lang){
    lang=['ru','en','fr'].includes(lang)?lang:document.documentElement.lang;
    if(!['ru','en','fr'].includes(lang))lang='ru';
    records.forEach(r=>{
      const v=lang==='ru'?r.key:P.text[r.key][lang];
      if(r.attr)r.node.setAttribute(r.attr,v);else r.node.nodeValue=r.prefix+v+r.suffix;
    });
    svgRecords.forEach(r=>{
      const lines=P.svg[r.key][lang],spans=r.node.querySelectorAll(':scope > tspan');
      if(spans.length)spans.forEach((s,i)=>s.textContent=lines[i]||'');else r.node.textContent=lines[0];
    });
    vpcRecords.forEach(r=>{
      const lines=P.vpc[r.key][lang];r.node.querySelectorAll(':scope > text').forEach((n,i)=>n.textContent=lines[i]);
    });
    localiseLegacy(lang);
    applyStable(lang);
    document.title=({ru:'Дипломная работа по UX-дизайну · Татьяна Постникова',en:'UX Dissertation · Tatiana Postnikova',fr:'Mémoire UX · Tatiana Postnikova'})[lang]+' · V226';
  }
  if(typeof APP_HOOKS!=='undefined')APP_HOOKS.afterLanguage.push(apply);
  apply(document.documentElement.lang);
})();
