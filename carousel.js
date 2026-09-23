/* ==========================================================================
   SCRIPT ADDITIF — CARROUSEL "PROJETS" + ACCORDÉON "EN SAVOIR PLUS"
   Ce fichier ne touche à rien de script.js : il ajoute uniquement le
   comportement du nouveau carrousel de la section #projets et des
   panneaux de détail repliables de chaque carte projet.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------ */
  /* 1. CARROUSEL DE PROJETS                                            */
  /* ------------------------------------------------------------------ */
  const viewport = document.querySelector('.projects-carousel-viewport');
  const track = document.querySelector('.projects-carousel-track');
  const slides = track ? Array.from(track.children) : [];
  const prevBtn = document.querySelector('.carousel-nav-prev');
  const nextBtn = document.querySelector('.carousel-nav-next');
  const dotsContainer = document.querySelector('.carousel-dots');

  if (track && slides.length > 0) {
    let currentIndex = 0;

    // Génère un point de pagination par slide
    const dots = slides.map((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'carousel-dot';
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Aller au projet ${i + 1}`);
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer?.appendChild(dot);
      return dot;
    });

    function updateCarousel() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      dots.forEach((dot, i) => {
        const isActive = i === currentIndex;
        dot.classList.toggle('is-active', isActive);
        dot.setAttribute('aria-selected', String(isActive));
      });
    }

    function goToSlide(index) {
      currentIndex = (index + slides.length) % slides.length;
      updateCarousel();
    }

    prevBtn?.addEventListener('click', () => goToSlide(currentIndex - 1));
    nextBtn?.addEventListener('click', () => goToSlide(currentIndex + 1));

    // Navigation clavier quand le focus est dans le carrousel
    viewport?.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') goToSlide(currentIndex - 1);
      if (e.key === 'ArrowRight') goToSlide(currentIndex + 1);
    });

    updateCarousel();
  }

  /* ------------------------------------------------------------------ */
  /* 2. ACCORDÉON "EN SAVOIR PLUS" (DÉTAIL PROBLÉMATIQUE / TRAITEMENT /  */
  /*    SOLUTION / RÉSULTAT DE CHAQUE CARTE PROJET)                     */
  /* ------------------------------------------------------------------ */
  document.querySelectorAll('.btn-toggle-details').forEach((btn) => {
    const targetId = btn.getAttribute('data-target');
    const panel = targetId ? document.getElementById(targetId) : null;
    if (!panel) return;

    const label = btn.querySelector('span');

    btn.addEventListener('click', () => {
      const isHidden = panel.hasAttribute('hidden');

      if (isHidden) {
        panel.removeAttribute('hidden');
        btn.setAttribute('aria-expanded', 'true');
        if (label) label.textContent = 'Voir moins';
      } else {
        panel.setAttribute('hidden', '');
        btn.setAttribute('aria-expanded', 'false');
        if (label) label.textContent = 'En savoir plus';
      }
    });
  });

  /* Ré-initialise les icônes Lucide au cas où (sécurité, sans effet si déjà fait) */
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }

});
