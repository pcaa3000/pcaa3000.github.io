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
    menuToggle.setAttribute('aria-label', menuOpen ? I18N[currentLang].menuClose : I18N[currentLang].menuOpen);
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
        container.dispatchEvent(new CustomEvent('filterchange'));
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
  const submitBtn = document.getElementById('contact-submit');
  const status = document.getElementById('contact-status');

  function showStatus(key, ok) {
    if (!status) return;
    status.textContent = I18N[currentLang][key];
    status.classList.remove('hidden');
    status.style.color = ok ? 'var(--emerald-400)' : 'var(--cyan-300)';
  }

  function mailtoFallback() {
    const { name, email, message } = form;
    const subject = encodeURIComponent(`Portfolio contact from ${name.value}`);
    const body = encodeURIComponent(`From: ${name.value} <${email.value}>\n\n${message.value}`);
    window.location.href = `mailto:pcaa3000@gmail.com?subject=${subject}&body=${body}`;
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (submitBtn) submitBtn.disabled = true;
    showStatus('sending', true);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form)))
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        showStatus('sent', true);
        form.reset();
      } else {
        showStatus('error', false);
      }
    } catch {
      mailtoFallback();
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });
}

function setYear() {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
}

const I18N = {
  en: {
    sections: { hero: 'intro', about: 'about', stack: 'stack', projects: 'projects', experience: 'experience', resume: 'resume', contact: 'contact' },
    remaining: '% remaining',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    prevProjects: 'Previous projects',
    nextProjects: 'Next projects',
    page: 'Go to page',
    pauseAutoplay: 'Pause autoplay',
    playAutoplay: 'Resume autoplay',
    sending: 'Sending…',
    sent: 'Message sent! I will get back to you soon.',
    error: 'Could not send the message. Please email me directly.',
    metaDesc: 'Pablo Cesar Aquino Ajra — Platform Engineer & Developer focused on AI, automation and cloud infrastructure.'
  },
  es: {
    sections: { hero: 'inicio', about: 'sobre mí', stack: 'stack', projects: 'proyectos', experience: 'experiencia', resume: 'cv', contact: 'contacto' },
    remaining: '% restante',
    menuOpen: 'Abrir menú',
    menuClose: 'Cerrar menú',
    prevProjects: 'Proyectos anteriores',
    nextProjects: 'Proyectos siguientes',
    page: 'Ir a la página',
    pauseAutoplay: 'Pausar reproducción automática',
    playAutoplay: 'Reanudar reproducción automática',
    sending: 'Enviando…',
    sent: '¡Mensaje enviado! Te responderé pronto.',
    error: 'No se pudo enviar el mensaje. Escribime directo por email.',
    metaDesc: 'Pablo Cesar Aquino Ajra — Platform Engineer y Developer enfocado en IA, automatización e infraestructura cloud.'
  }
};

let currentLang = 'en';
let updateScrollLabels = () => {};
let syncPauseBtnGlobal = () => {};

function setupLanguage() {
  const toggles = document.querySelectorAll('.lang-toggle');
  if (!toggles.length) return;

  document.querySelectorAll('[data-es]').forEach(el => {
    el.dataset.en = el.textContent.trim();
  });
  document.querySelectorAll('[data-es-ph]').forEach(el => {
    el.dataset.enPh = el.getAttribute('placeholder') || '';
  });

  function apply(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    document.querySelector('meta[name="description"]')?.setAttribute('content', I18N[lang].metaDesc);

    document.querySelectorAll('[data-es]').forEach(el => {
      el.textContent = lang === 'es' ? el.dataset.es : el.dataset.en;
    });
    document.querySelectorAll('[data-es-ph]').forEach(el => {
      el.setAttribute('placeholder', lang === 'es' ? el.dataset.esPh : el.dataset.enPh);
    });

    const prev = document.getElementById('projects-prev');
    const next = document.getElementById('projects-next');
    if (prev) prev.setAttribute('aria-label', I18N[lang].prevProjects);
    if (next) next.setAttribute('aria-label', I18N[lang].nextProjects);
    document.querySelectorAll('#projects-dots .carousel-dot').forEach((d, i) => {
      d.setAttribute('aria-label', `${I18N[lang].page} ${i + 1}`);
    });
    syncPauseBtnGlobal();

    toggles.forEach(t => { t.textContent = lang === 'es' ? 'EN' : 'ES'; });
    localStorage.setItem('lang', lang);
    updateScrollLabels();
  }

  toggles.forEach(t => t.addEventListener('click', () => {
    apply(currentLang === 'es' ? 'en' : 'es');
  }));

  const saved = localStorage.getItem('lang');
  if (saved === 'es') apply('es');
  else toggles.forEach(t => { t.textContent = 'ES'; });
}

function setupProjectsCarousel() {
  const track = document.getElementById('projects-track');
  const prev = document.getElementById('projects-prev');
  const next = document.getElementById('projects-next');
  const dots = document.getElementById('projects-dots');
  if (!track || !prev || !next || !dots) return;

  const pageCount = () => Math.max(1, Math.ceil(track.scrollWidth / track.clientWidth));
  const currentPage = () => Math.round(track.scrollLeft / track.clientWidth);

  function renderDots() {
    const count = pageCount();
    dots.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === currentPage() ? ' active' : '');
      dot.setAttribute('aria-label', `${I18N[currentLang].page} ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dots.appendChild(dot);
    }
  }

  function updateControls() {
    const max = track.scrollWidth - track.clientWidth - 1;
    prev.disabled = track.scrollLeft <= 0;
    next.disabled = track.scrollLeft >= max;
    track.classList.toggle('justify-center', track.scrollWidth <= track.clientWidth);
    dots.querySelectorAll('.carousel-dot').forEach((d, i) => {
      d.classList.toggle('active', i === currentPage());
    });
  }

  function goTo(page) {
    track.scrollTo({ left: page * track.clientWidth, behavior: 'smooth' });
  }

  prev.addEventListener('click', () => goTo(Math.max(0, currentPage() - 1)));
  next.addEventListener('click', () => goTo(Math.min(pageCount() - 1, currentPage() + 1)));

  let ticking = false;
  track.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { updateControls(); ticking = false; });
  }, { passive: true });

  track.addEventListener('filterchange', () => {
    track.scrollTo({ left: 0 });
    renderDots();
    updateControls();
  });

  window.addEventListener('resize', () => { renderDots(); updateControls(); }, { passive: true });

  // Autoplay: advance one page every 3s, looping back to the start.
  // Disabled entirely when the user prefers reduced motion; pausable via the
  // pause button, on hover/focus, or when the tab is hidden.
  const carousel = document.getElementById('projects-carousel');
  const pauseBtn = document.getElementById('projects-pause');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let hoverPaused = false;
  let userPaused = false;

  const isPaused = () => hoverPaused || userPaused || reducedMotion.matches;

  function syncPauseBtn() {
    if (!pauseBtn) return;
    const stopped = userPaused || reducedMotion.matches;
    pauseBtn.setAttribute('aria-pressed', stopped ? 'true' : 'false');
    pauseBtn.setAttribute('aria-label', stopped ? I18N[currentLang].playAutoplay : I18N[currentLang].pauseAutoplay);
    pauseBtn.innerHTML = `<i data-lucide="${stopped ? 'play' : 'pause'}" class="h-4 w-4"></i>`;
    renderIcons();
  }

  if (pauseBtn) {
    pauseBtn.addEventListener('click', () => {
      userPaused = !userPaused;
      syncPauseBtn();
    });
  }

  if (carousel) {
    carousel.addEventListener('pointerenter', () => { hoverPaused = true; });
    carousel.addEventListener('pointerleave', () => { hoverPaused = false; });
    carousel.addEventListener('focusin', () => { hoverPaused = true; });
    carousel.addEventListener('focusout', () => { hoverPaused = false; });
  }

  reducedMotion.addEventListener('change', syncPauseBtn);
  syncPauseBtnGlobal = syncPauseBtn;

  setInterval(() => {
    if (isPaused() || document.hidden || pageCount() <= 1) return;
    const nextPage = currentPage() + 1;
    goTo(nextPage >= pageCount() ? 0 : nextPage);
  }, 3000);

  syncPauseBtn();

  renderDots();
  updateControls();
}

function setupScrollProgress() {
  const bar = document.getElementById('scroll-fill');
  const start = document.getElementById('scroll-start');
  const remaining = document.getElementById('scroll-remaining');
  const section = document.getElementById('scroll-section');
  if (!bar || !start || !remaining || !section) return;

  function update() {
    const doc = document.documentElement;
    const scrollTop = window.scrollY || doc.scrollTop;
    const height = doc.scrollHeight - doc.clientHeight;
    const percent = height > 0 ? Math.min(100, Math.max(0, Math.round((scrollTop / height) * 100))) : 0;
    bar.style.width = percent + '%';
    start.textContent = '-> ' + percent + '%';
    remaining.textContent = (100 - percent) + I18N[currentLang].remaining;

    let current = I18N[currentLang].sections.hero;
    const sections = document.querySelectorAll('main section[id]');
    sections.forEach(s => {
      const rect = s.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.4) {
        current = I18N[currentLang].sections[s.id] || s.id;
      }
    });
    section.textContent = '{' + current + '}';
  }

  updateScrollLabels = update;

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();
}

(function init() {
  renderIcons();
  setupMobileMenu();
  setupFilters();
  setupReveal();
  setupLanguage();
  setupContactForm();
  setupProjectsCarousel();
  setYear();
  setupScrollProgress();
})();
