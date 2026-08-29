document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Sticky nav shadow on scroll ---------- */
  const nav = document.getElementById("nav");
  const onScroll = () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 10);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile hamburger menu ---------- */
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  const closeMenu = () => {
    navToggle.classList.remove("is-active");
    navLinks.classList.remove("is-open");

    navToggle.setAttribute("aria-expanded", "false");
  };

  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.classList.toggle("is-active", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll(".nav__link").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  /* ---------- Scroll-reveal animation ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach((el) => observer.observe(el));
  }

  /* ---------- Contact form (frontend-only placeholder) ---------- */
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.name.value.trim();

      if (!form.checkValidity()) {
        status.textContent = "Please fill in all fields with a valid email.";
        return;
      }

      status.textContent = `Thanks${name ? ", " + name : ""}! This form isn't connected to a backend yet, so please reach out directly via email or LinkedIn for now.`;
      form.reset();
    });
  }
});
