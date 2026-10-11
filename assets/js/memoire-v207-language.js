
function resolveMemoireLanguage(){
  const baked=document.documentElement.dataset.bakedLang||'ru';
  try{const saved=localStorage.getItem('memoire-lang-v207-'+baked);if(['ru','en','fr'].includes(saved))return saved;}catch(_){}
  return baked;
}
