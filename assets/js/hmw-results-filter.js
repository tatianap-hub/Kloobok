
(function(){
 function setup(root){
   if(root.dataset.hmwReady==='1') return; root.dataset.hmwReady='1';
   const section=root.closest('[data-proto-lang]'); if(!section) return;
   const rows=[...section.querySelectorAll('.hmw-v191-results tbody tr')];
   const sels=[...root.querySelectorAll('[data-hmw-filter]')];
   function apply(){
     const f={}; sels.forEach(s=>f[s.dataset.hmwFilter]=s.value);
     rows.forEach(r=>{r.style.display=(!f.hmw||r.dataset.hmw===f.hmw)&&(!f.source||r.dataset.source===f.source)&&(!f.cluster||r.dataset.cluster===f.cluster)?'':'none';});
   }
   sels.forEach(s=>s.addEventListener('change',apply));
   const reset=root.querySelector('[data-hmw-reset]'); if(reset) reset.addEventListener('click',()=>{sels.forEach(s=>s.value='');apply();});
 }
 document.querySelectorAll('[data-hmw-filterbar]').forEach(setup);
})();
