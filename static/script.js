document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Navbar scroll ---------- */
  const navbar = document.getElementById("navbar");
  const onScroll = () => {
    navbar.classList.toggle("is-scrolled", window.scrollY > 10);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
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

  navLinks.querySelectorAll(".navbar__link").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  /* ---------- Active nav section ---------- */
  const sections = document.querySelectorAll("section[id]");
  const navLinksAll = document.querySelectorAll(".navbar__link:not(.navbar__link--cta)");

  const updateActiveLink = () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinksAll.forEach((link) => {
      link.classList.remove("is-active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("is-active");
      }
    });
  };

  window.addEventListener("scroll", updateActiveLink, { passive: true });
  updateActiveLink();

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add staggered delay for project cards
            const card = entry.target.closest(".project-card");
            if (card) {
              const index = Array.from(card.parentElement.children).indexOf(card);
              card.style.setProperty("--project-index", index);
            }
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => observer.observe(el));
  }

  /* ---------- Contact form ---------- */
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

      status.textContent =
        `Thanks${name ? ", " + name : ""}! I'll get back to you soon. For now, feel free to reach out directly via email or phone.`;
      form.reset();
    });
  }

  /* ---------- Smooth reveal for project cards on load ---------- */
  document.querySelectorAll(".project-card").forEach((card, index) => {
    card.style.setProperty("--project-index", index);
  });
});