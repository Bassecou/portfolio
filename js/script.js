/**
 * Portfolio Bassecou Touré — Data Analyst
 * Interactions : Navigation fluide, animations au scroll, copie email & drawer mobile
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialisation des icônes Lucide si présentes
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }

  // 2. Gestion de l'en-tête au scroll
  const siteHeader = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader?.classList.add('scrolled');
    } else {
      siteHeader?.classList.remove('scrolled');
    }
  }, { passive: true });

  // 3. Menu Mobile Drawer
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (isOpen) {
          icon.setAttribute('data-lucide', 'x');
        } else {
          icon.setAttribute('data-lucide', 'menu');
        }
        if (typeof lucide !== 'undefined' && lucide.createIcons) lucide.createIcons();
      }
    });

    // Fermer le drawer lors d'un clic sur un lien
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.setAttribute('data-lucide', 'menu');
          if (typeof lucide !== 'undefined' && lucide.createIcons) lucide.createIcons();
        }
      });
    });
  }

  // 4. Copie de l'email en 1 clic avec Toast Notification
  const copyBtn = document.getElementById('btn-copy-email');
  const emailTextEl = document.getElementById('email-address-text');
  const toastEl = document.getElementById('toast-notice');
  const emailToCopy = 'bassecou.pro@gmail.com';

  function showToast(message) {
    if (!toastEl) return;
    toastEl.querySelector('.toast-msg').textContent = message;
    toastEl.classList.add('visible');

    setTimeout(() => {
      toastEl.classList.remove('visible');
    }, 3200);
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(emailToCopy);
        } else {
          // Fallback
          const textarea = document.createElement('textarea');
          textarea.value = emailToCopy;
          textarea.style.position = 'fixed';
          textarea.style.opacity = '0';
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
        }
        showToast('Adresse email copiée : ' + emailToCopy);
      } catch (err) {
        showToast('Contactez : ' + emailToCopy);
      }
    });
  }

  // 5. Scroll Reveal Animation (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Si pas de support, révéler immédiatement
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }
});
