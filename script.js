/*
 * script.js
 *
 * This file contains all of the client‑side logic for the simplified
 * portfolio. It handles smooth scrolling navigation, mobile menu
 * toggling, progress bar animations, project filtering, and footer
 * behaviour. Each interactive element is bound to event listeners
 * once the DOM is ready.
 */

document.addEventListener('DOMContentLoaded', () => {
  /* Smooth scroll to sections */
  function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Attach click handlers to any element with a data‑target attribute
  document.querySelectorAll('[data-target]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-target');
      if (target) {
        scrollToSection(target);
      }
    });
  });

  /* Mobile menu toggling */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('active');
    });

    // Close mobile menu after clicking a link
    mobileMenu.querySelectorAll('button').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('open');
      });
    });
  }

  /* Animate progress bars when they come into view */
  const progressBars = document.querySelectorAll('.progress-fill');
  const progressObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const level = el.getAttribute('data-level');
        if (level) {
          el.style.width = level + '%';
        }
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.6 });
  progressBars.forEach(bar => {
    bar.style.width = '0%';
    progressObserver.observe(bar);
  });

  /* Project category filtering */
  const filterButtons = document.querySelectorAll('.category-filter button');
  const projectCards = document.querySelectorAll('.project-card');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-category');
      // highlight active button
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // filter cards
      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (!category || category === 'All' || cardCategory === category) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* Current year in footer */
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  /* Back to top functionality */
  document.querySelectorAll('.back-to-top').forEach(btn => {
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  /* CTA button scroll to projects */
  const ctaBtn = document.getElementById('cta-button');
  if (ctaBtn) {
    ctaBtn.addEventListener('click', () => {
      scrollToSection('projects');
    });
  }
});