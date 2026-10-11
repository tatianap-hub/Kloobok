
(function(){
  const logoUri = 'assets/media-01/8d9f5327113e5808ecd8.jpg';
  const portraitUri = 'assets/media-03/f26ea29919fbc312f1a0.webp';
  const childUri = 'assets/media-03/6a50869065640d831939.jpg';

  const labels = {
    fr: {
      name: 'Alya Vereshhetina · Shaltai-Boltai',
      tag: 'rédactrice en chef · magazine bilingue',
      role: 'Rédactrice en chef',
      alt: 'Logo Shaltai-Boltai',
      bio: 'Alya Vereshhetina est la rédactrice en chef de « Shaltai-Boltai », un magazine littéraire et artistique bilingue destiné aux enfants de 2 à 6 ans. L’entretien a été réalisé le 19 août 2026. Le projet propose des poèmes, contes et histoires d’auteurs jeunesse contemporains, ainsi que des jeux et activités de développement du langage pensés pour les enfants bilingues. Le magazine inclut aussi des concours, coloriages, recettes, bricolages et d’autres formats ludiques pour nourrir un ancrage culturel à la maison.',
      c1: 'Alya Vereshhetina avec le magazine Shaltai-Boltai',
      c2: 'Enfant en train de lire les numéros de Shaltai-Boltai'
    },
    en: {
      name: 'Alya Vereshhetina · Shaltai-Boltai',
      tag: 'Chief Editor · bilingual journal',
      role: 'Chief Editor',
      alt: 'Shaltai-Boltai logo',
      bio: 'Alya Vereshhetina is the Chief Editor of “Shaltai-Boltai”, a bilingual literary and artistic journal for children aged 2 to 6. The interview was conducted on 19 August 2026. The project offers poems, fairy tales and stories by contemporary children’s authors, together with games and speech-development activities designed for bilingual children. The journal also includes competitions, colouring pages, recipes, crafts and other playful formats that help families maintain cultural connection at home.',
      c1: 'Alya Vereshhetina holding Shaltai-Boltai journal',
      c2: 'Child reading Shaltai-Boltai issues'
    },
    ru: {
      name: 'Аля Верешетина · Шалтай-Болтай',
      tag: 'главный редактор · билингвальный журнал',
      role: 'Главный редактор',
      alt: 'Логотип Шалтай-Болтай',
      bio: 'Аля Верешетина — главный редактор «Шалтай-Болтай», детского билингвального литературно-художественного журнала для детей 2–6 лет. Интервью проведено 19 августа 2026 года. Проект предлагает стихи, сказки и рассказы современных детских авторов, а также игры и задания на развитие речи, рассчитанные на билингвальных детей. В журнале также есть конкурсы, раскраски, рецепты, поделки и другие игровые форматы, которые помогают поддерживать культурную связь дома.',
      c1: 'Аля Верешетина с журналом «Шалтай-Болтай»',
      c2: 'Ребёнок читает выпуски «Шалтай-Болтай»'
    }
  };

  const lang = () => ((window.currentLang || document.documentElement.lang || 'fr').slice(0,2));
  const txt = () => labels[lang()] || labels.fr;

  if (typeof translations !== 'undefined') {
    translations.fr['eco-n9'] = labels.fr.name;
    translations.en['eco-n9'] = labels.en.name;
    translations.ru['eco-n9'] = labels.ru.name;
    translations.fr['tg-eco-9'] = labels.fr.tag;
    translations.en['tg-eco-9'] = labels.en.tag;
    translations.ru['tg-eco-9'] = labels.ru.tag;
    translations.fr['eco-role-9'] = labels.fr.role;
    translations.en['eco-role-9'] = labels.en.role;
    translations.ru['eco-role-9'] = labels.ru.role;
    translations.fr['alt-shaltai-boltai'] = labels.fr.alt;
    translations.en['alt-shaltai-boltai'] = labels.en.alt;
    translations.ru['alt-shaltai-boltai'] = labels.ru.alt;
  }

  if (typeof PC_SEED !== 'undefined') {
    PC_SEED.e9 = {
      bio: { fr: labels.fr.bio, en: labels.en.bio, ru: labels.ru.bio },
      html: { fr: '', en: '', ru: '' },
      persona: { fr: '', en: '', ru: '' },
      keys: { fr: {}, en: {}, ru: {} }
    };
  }

  function syncCard() {
    const card = document.querySelector('.pcard[data-num="e9"]');
    if (!card) return;
    card.dataset.name = txt().name;
    const img = card.querySelector('.eco-card-photo');
    if (img) { img.src = logoUri; img.alt = txt().alt; }
  }

  if (typeof APP_HOOKS !== 'undefined' && APP_HOOKS.afterLanguage) APP_HOOKS.afterLanguage.push(syncCard);
  if (typeof APP_HOOKS !== 'undefined' && APP_HOOKS.beforeOpenParticipant) APP_HOOKS.beforeOpenParticipant.push(function(card){ if(card && card.dataset.num==='e9') card.dataset.name = txt().name; });
  if (typeof APP_HOOKS !== 'undefined' && APP_HOOKS.afterOpenParticipant) APP_HOOKS.afterOpenParticipant.push(function(card){
    if(!card || card.dataset.num!=='e9') return;
    const pane = document.querySelector('#pcModalB .pc-pane[data-pane="bio"]');
    if(!pane) return;
    pane.querySelectorAll('.eco-modal-gallery,.eco-modal-gallery-v48,.eco-shaltai-gallery').forEach(function(x){ x.remove(); });
    const g = document.createElement('div');
    g.className = 'eco-modal-gallery-v48 eco-shaltai-gallery';
    g.innerHTML = '<img src="'+portraitUri+'" alt="'+txt().c1+'"><img src="'+childUri+'" alt="'+txt().c2+'">';
    pane.insertBefore(g, pane.firstChild);
  });

  syncCard();
  if (typeof pcRefreshCardState === 'function') pcRefreshCardState('e9');
})();
