
(function(){
  'use strict';
  const labels={
    irina:{
      fr:'Irina Nesterova · Lectorium musical · musique et médiation culturelle',
      en:'Irina Nesterova · Lectorium musical · music and cultural mediation',
      ru:'Ирина Нестерова · Lectorium musical · музыка и культурная медиация'
    },
    victoria:{
      fr:'Victoria Fifta · ateliers et camps pour enfants · Versailles',
      en:'Victoria Fifta · children’s workshops and camps · Versailles',
      ru:'Victoria Fifta · детские ателье и лагеря · Версаль'
    },
    dashaRougier:{
      fr:'Dasha Rougier · culturologue · médiation culturelle',
      en:'Dasha Rougier · cultural studies specialist · cultural mediation',
      ru:'Dasha Rougier · культуролог · культурная медиация'
    },
    nadiia:{
      fr:'Nadiia Petrova · guide culturel · Paris with Kids',
      en:'Nadiia Petrova · cultural guide · Paris with Kids',
      ru:'Nadiia Petrova · культурный гид · Paris with Kids'
    },
    dashaS:{
      fr:'Dasha S. · directrice de projet · Kids campus « Nashi Zvezdochki »',
      en:'Dasha S. · project director · Kids campus “Nashi Zvezdochki”',
      ru:'Dasha S. · руководитель проекта · Kids campus «Наши звёздочки»'
    },
    ekaterinaIgnatova:{
      fr:'Ekaterina Ignatova · enseignante de russe langue étrangère · enseignement public',
      en:'Ekaterina Ignatova · teacher of Russian as a foreign language · public education',
      ru:'Ekaterina Ignatova · преподаватель русского как иностранного · государственное образование'
    },
    olgaKin:{
      fr:'Olga Kin · Gymnasium n° 1 · école du samedi',
      en:'Olga Kin · Gymnasium No. 1 · Saturday school',
      ru:'Ольга Кин · Гимназия № 1 · субботняя школа'
    }
  };
  const rules=[
    [/Lectorium musical/i,'irina'],
    [/Ateliers et camps pour enfants|children.?s workshops and camps|детские ателье и лагеря/i,'victoria'],
    [/Culturologue|cultural studies specialist|культуролог/i,'dashaRougier'],
    [/Nadiia Petrova/i,'nadiia'],
    [/Daria C\.\s*·\s*Kids campus|Dasha S\.|Nashi Zvezdochki|Наши звёздочки/i,'dashaS'],
    [/Ekaterina Ignatova/i,'ekaterinaIgnatova'],
    [/Olga Kin|Ольга Кин/i,'olgaKin']
  ];
  function lang(){return (document.documentElement.lang||'fr').toLowerCase().slice(0,2);}
  function keyFor(text){for(const pair of rules){if(pair[0].test(text)) return pair[1];}return null;}
  function update(){
    const L=lang();
    document.querySelectorAll('#evidence-tree .tree-quote.ecosystem cite, .ins-quote.ecosystem-quote cite').forEach(function(c){
      let k=c.dataset.ecoCiteKey || keyFor(c.textContent||'');
      if(!k || !labels[k]) return;
      c.dataset.ecoCiteKey=k;
      const wanted='— '+(labels[k][L]||labels[k].fr);
      if(c.textContent!==wanted) c.textContent=wanted;
    });
  }
  update();
  const obs=new MutationObserver(update);
  obs.observe(document.documentElement,{attributes:true,attributeFilter:['lang'],childList:true,subtree:true});
})();
