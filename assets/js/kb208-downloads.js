
(function(){
const assets=JSON.parse(document.getElementById('kb208-assets').textContent);
document.querySelectorAll('[data-kb208-asset]').forEach(el=>el.src=assets[el.dataset.kb208Asset]);
document.querySelectorAll('[data-kb208-download]').forEach(el=>{el.href=assets[el.dataset.kb208Download];});
document.getElementById('kb208-download-pack').href='assets/downloads/kloobok-logo-pack.zip';
})();
