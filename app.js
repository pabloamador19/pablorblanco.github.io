// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Fade-in on scroll using CSS classes
const animEls = document.querySelectorAll(
  '.timeline__item, .stack__card, .stat, .about__text p'
);

animEls.forEach(el => el.classList.add('anim-hidden'));

const observer = new IntersectionObserver(
  entries => entries.forEach((e, i) => {
    if (e.isIntersecting) {
      // stagger siblings
      const siblings = [...e.target.parentElement.children].filter(c => c.classList.contains('anim-hidden'));
      siblings.forEach((sib, idx) => {
        setTimeout(() => sib.classList.replace('anim-hidden', 'anim-visible'), idx * 80);
      });
      // also reveal the element itself immediately
      e.target.classList.replace('anim-hidden', 'anim-visible');
      observer.unobserve(e.target);
    }
  }),
  { threshold: 0.08 }
);

animEls.forEach(el => observer.observe(el));
