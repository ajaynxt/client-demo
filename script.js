const searchInput=document.getElementById('searchInput');
const cards=[...document.querySelectorAll('.demo-card')];
const chips=[...document.querySelectorAll('.chip')];
let activeFilter='all';

function applyFilter(){
  const q=(searchInput.value||'').trim().toLowerCase();
  cards.forEach(card=>{
    const tags=(card.dataset.tags||'').toLowerCase();
    const matchesText=!q || tags.includes(q) || card.querySelector('h3').textContent.toLowerCase().includes(q);
    const matchesFilter=activeFilter==='all' || tags.includes(activeFilter);
    card.classList.toggle('hidden', !(matchesText && matchesFilter));
  });
}
searchInput?.addEventListener('input', applyFilter);
chips.forEach(chip=>{
  chip.addEventListener('click', ()=>{
    chips.forEach(c=>c.classList.remove('active'));
    chip.classList.add('active');
    activeFilter=chip.dataset.filter;
    applyFilter();
  });
});
applyFilter();
