function renderIcons() {
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function setupMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!menuToggle || !mobileMenu) return;

  let menuOpen = false;
  menuToggle.addEventListener('click', () => {
    menuOpen = !menuOpen;
    mobileMenu.classList.toggle('hidden', !menuOpen);
    menuToggle.setAttribute('aria-label', menuOpen ? 'Close menu' : 'Open menu');
    menuToggle.innerHTML = menuOpen
      ? '<i data-lucide="x" class="h-6 w-6"></i>'
      : '<i data-lucide="menu" class="h-6 w-6"></i>';
    renderIcons();
  });
}

function setupFilters() {
  document.querySelectorAll('[data-filter-group]').forEach(group => {
    const container = document.querySelector(`[data-filter-container="${group.dataset.filterGroup}"]`);
    if (!container) return;

    const tabs = group.querySelectorAll('[data-filter]');
    const items = container.querySelectorAll('[data-cat]');

    function setActiveTab(activeTab) {
      tabs.forEach(t => {
        const isActive = t === activeTab;
        t.classList.toggle('bg-violet-600', isActive);
        t.classList.toggle('text-white', isActive);
        t.classList.toggle('active', isActive);
        t.classList.toggle('bg-slate-900/50', !isActive);
        t.classList.toggle('text-slate-300', !isActive);
        t.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });
    }

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const filter = tab.dataset.filter;
        setActiveTab(tab);
        items.forEach(item => {
          item.classList.toggle('hidden', filter !== 'all' && item.dataset.cat !== filter);
        });
      });
    });
  });
}

function setupReveal() {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

function setupContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const { name, email, message } = form;
    const subject = encodeURIComponent(`Portfolio contact from ${name.value}`);
    const body = encodeURIComponent(`From: ${name.value} <${email.value}>\n\n${message.value}`);
    window.location.href = `mailto:pcaa3000@gmail.com?subject=${subject}&body=${body}`;
  });
}

function setYear() {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
}

function setupScrollProgress() {
  const bar = document.getElementById('scroll-fill');
  const start = document.getElementById('scroll-start');
  const remaining = document.getElementById('scroll-remaining');
  const section = document.getElementById('scroll-section');
  if (!bar || !start || !remaining || !section) return;

  const sectionMap = {
    hero: 'intro',
    about: 'about',
    stack: 'stack',
    projects: 'projects',
    experience: 'experience',
    resume: 'resume',
    contact: 'contact'
  };

  function update() {
    const doc = document.documentElement;
    const scrollTop = window.scrollY || doc.scrollTop;
    const height = doc.scrollHeight - doc.clientHeight;
    const percent = height > 0 ? Math.min(100, Math.max(0, Math.round((scrollTop / height) * 100))) : 0;
    bar.style.width = percent + '%';
    start.textContent = '-> ' + percent + '%';
    remaining.textContent = (100 - percent) + '% remaining';

    let current = 'intro';
    const sections = document.querySelectorAll('main section[id]');
    sections.forEach(s => {
      const rect = s.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.4) {
        current = sectionMap[s.id] || s.id;
      }
    });
    section.textContent = '{' + current + '}';
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();
}

(function init() {
  renderIcons();
  setupMobileMenu();
  setupFilters();
  setupReveal();
  setupContactForm();
  setYear();
  setupScrollProgress();
})();
