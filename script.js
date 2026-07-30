
(() => {
  const demos = window.AJAYNXT_DEMOS || [];
  const grid = document.getElementById('portfolioGrid');
  const filterRow = document.getElementById('filterRow');
  const search = document.getElementById('searchInput');
  const empty = document.getElementById('emptyState');
  const modal = document.getElementById('demoModal');
  const modalContent = document.getElementById('modalContent');
  const guide = document.getElementById('guideDrawer');
  let currentFilter = 'All';

  const groups = ['All', ...new Set(demos.map(d => d.group))];

  function icon(id, cls='') {
    return `<svg class="${cls}" aria-hidden="true"><use href="assets/icons.svg#i-${id}"></use></svg>`;
  }

  function renderFilters() {
    filterRow.innerHTML = groups.map(group =>
      `<button class="filter-button ${group === currentFilter ? 'active' : ''}" data-filter="${group}">${group}</button>`
    ).join('');
  }

  function card(d) {
    const shortFeatures = d.shows.slice(0, 2);
    return `
      <article class="demo-card reveal" data-name="${(d.name+' '+d.industry+' '+d.group).toLowerCase()}">
        <div class="card-top">
          <span class="demo-icon">${icon(d.icon)}</span>
          <span class="demo-number">${d.number}</span>
        </div>
        <span class="demo-group">${d.group}</span>
        <h3>${d.name}</h3>
        <span class="industry">${d.industry}</span>
        <p class="demo-tagline">${d.tagline}</p>
        <div class="card-features">
          ${shortFeatures.map(x => `<span>${icon('check')}${x}</span>`).join('')}
        </div>
        <div class="card-actions">
          <a class="button button-dark" href="${d.url}" target="_blank" rel="noopener">View live ${icon('arrow')}</a>
          <button class="button button-outline" data-details="${d.id}">Understand</button>
        </div>
      </article>`;
  }

  function renderCards() {
    const q = (search.value || '').trim().toLowerCase();
    const visible = demos.filter(d => {
      const inFilter = currentFilter === 'All' || d.group === currentFilter;
      const haystack = [d.name,d.industry,d.group,d.tagline,...d.custom,...d.shows].join(' ').toLowerCase();
      return inFilter && (!q || haystack.includes(q));
    });
    grid.innerHTML = visible.map(card).join('');
    empty.hidden = visible.length > 0;
    observeReveals();
  }

  function openModal(id) {
    const d = demos.find(x => x.id === id);
    if (!d) return;
    modalContent.innerHTML = `
      <div class="modal-hero">
        <div>
          <span class="demo-icon">${icon(d.icon)}</span>
          <h2>${d.name}</h2>
          <div class="industry">${d.industry}</div>
          <p>${d.tagline}</p>
        </div>
        <div class="modal-qr">
          <img src="assets/qr/${d.id}.svg" width="130" height="130" alt="QR code for ${d.name}">
          <span>Scan live demo</span>
        </div>
      </div>
      <div class="modal-body">
        <div class="modal-grid">
          <section class="modal-block">
            <h3>What this demo shows</h3>
            <div class="modal-list">
              ${d.shows.map(x => `<div>${icon('check')}<span>${x}</span></div>`).join('')}
            </div>
          </section>
          <section class="modal-block">
            <h3>What can be customised</h3>
            <div class="chips">${d.custom.map(x => `<span class="chip">${x}</span>`).join('')}</div>
          </section>
        </div>
        <div class="goal-box">
          <div><small>Primary business goal</small><strong>${d.goal}</strong></div>
          <a class="button button-primary" href="${d.url}" target="_blank" rel="noopener">Open live website ${icon('arrow')}</a>
        </div>
      </div>`;
    modal.hidden = false;
    document.body.classList.add('modal-open');
    modal.querySelector('.modal-close').focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove('modal-open');
  }

  function openGuide() {
    guide.classList.add('open');
    guide.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  }
  function closeGuide() {
    guide.classList.remove('open');
    guide.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  filterRow.addEventListener('click', e => {
    const btn = e.target.closest('[data-filter]');
    if (!btn) return;
    currentFilter = btn.dataset.filter;
    renderFilters();
    renderCards();
  });
  grid.addEventListener('click', e => {
    const btn = e.target.closest('[data-details]');
    if (btn) openModal(btn.dataset.details);
  });
  search.addEventListener('input', renderCards);
  document.addEventListener('click', e => {
    if (e.target.closest('[data-close-modal]')) closeModal();
    if (e.target.closest('[data-open-guide]')) openGuide();
    if (e.target.closest('[data-close-guide]')) closeGuide();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeModal(); closeGuide(); }
  });

  function observeReveals() {
    const items = document.querySelectorAll('.reveal:not(.visible)');
    if (!('IntersectionObserver' in window)) {
      items.forEach(x => x.classList.add('visible')); return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .08 });
    items.forEach(x => observer.observe(x));
  }

  document.getElementById('year').textContent = new Date().getFullYear();
  renderFilters();
  renderCards();
  observeReveals();
})();
