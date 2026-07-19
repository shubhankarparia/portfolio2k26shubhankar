document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------
     1. TYPING ANIMATION (hero role line)
  --------------------------------------------- */
  const roles = [
    'Full Stack Developer',
    'React & Node.js Developer',
    'MERN Stack Engineer',
    'SEO-Minded Web Developer'
  ];
  const typedEl = document.getElementById('typedRole');
  if (typedEl) {
    let roleIndex = 0, charIndex = 0, deleting = false;

    function typeLoop() {
      const current = roles[roleIndex];
      if (!deleting) {
        charIndex++;
        typedEl.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(typeLoop, 1400);
          return;
        }
      } else {
        charIndex--;
        typedEl.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }
      setTimeout(typeLoop, deleting ? 45 : 85);
    }
    typeLoop();
  }

  /* ---------------------------------------------
     2. SCROLL REVEAL (IntersectionObserver)
  --------------------------------------------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------------------------------------------
     3. SCROLL PROGRESS BAR + NAVBAR STATE
  --------------------------------------------- */
  const progressBar = document.getElementById('scrollProgress');
  const nav = document.getElementById('mainNav');
  const backToTop = document.getElementById('backToTop');

  function onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = pct + '%';

    if (nav) nav.classList.toggle('scrolled', scrollTop > 40);
    if (backToTop) backToTop.style.opacity = scrollTop > 500 ? '1' : '0';
  }
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ---------------------------------------------
     4. COLLAPSE MOBILE NAV ON LINK CLICK
  --------------------------------------------- */
  const navMenu = document.getElementById('navMenu');
  document.querySelectorAll('#navMenu .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu && navMenu.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navMenu);
        bsCollapse.hide();
      }
    });
  });

  /* ---------------------------------------------
     5. DARK / LIGHT MODE TOGGLE
  --------------------------------------------- */
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  const savedTheme = null; // no localStorage in this environment; defaults to dark each load
  if (savedTheme) root.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = root.getAttribute('data-theme') === 'light';
      root.setAttribute('data-theme', isLight ? 'dark' : 'light');
    });
  }

  /* ---------------------------------------------
     6. CONTACT FORM (front-end validation demo)
  --------------------------------------------- */
  // const contactForm = document.getElementById('contactForm');
  // const formStatus = document.getElementById('formStatus');
  // if (contactForm) {
  //   contactForm.addEventListener('submit', (e) => {
  //     e.preventDefault();
  //     if (!contactForm.checkValidity()) {
  //       e.stopPropagation();
  //       contactForm.classList.add('was-validated');
  //       return;
  //     }
  //     contactForm.classList.add('was-validated');
  //     formStatus.textContent = 'Thanks! Your message has been noted — connect this form to a backend or a service like Formspree to actually send it.';
  //     contactForm.reset();
  //     contactForm.classList.remove('was-validated');
  //   });
  // }

  /* ==========================================
   CONTACT FORM VALIDATION (FormSubmit)
========================================== */

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    if (!contactForm.checkValidity()) {
        contactForm.classList.add("was-validated");
        return;
    }

    const submitBtn = contactForm.querySelector("button[type='submit']");
    submitBtn.disabled = true;
    submitBtn.innerHTML = "Sending...";

    const formData = new FormData(contactForm);

    try {
        const response = await fetch(contactForm.action, {
            method: "POST",
            body: formData,
            headers: {
                Accept: "application/json"
            }
        });

        if (response.ok) {
            formStatus.innerHTML = "✅ Thank you! Your message has been sent successfully.";
            formStatus.classList.remove("text-danger");
            formStatus.classList.add("text-success");

            contactForm.reset();
            contactForm.classList.remove("was-validated");
        } else {
            formStatus.innerHTML = "❌ Something went wrong. Please try again.";
            formStatus.classList.remove("text-success");
            formStatus.classList.add("text-danger");
        }
    } catch (error) {
        formStatus.innerHTML = "❌ Network error. Please try again.";
        formStatus.classList.remove("text-success");
        formStatus.classList.add("text-danger");
    }

    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="bi bi-send me-2"></i>Send Message';
});

  /* ---------------------------------------------
     7. NEWSLETTER FORM (demo)
  --------------------------------------------- */
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterStatus = document.getElementById('newsletterStatus');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      newsletterStatus.textContent = 'Subscribed! (Connect this to Mailchimp / an API to make it live.)';
      newsletterForm.reset();
    });
  }

  /* ---------------------------------------------
     8. FOOTER YEAR
  --------------------------------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
