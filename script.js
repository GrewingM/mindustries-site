"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const headerInner = document.querySelector(".site-header-inner");
  const primaryNav = document.querySelector("#primary-nav");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');

  const closeMobileMenu = () => {
    if (!menuToggle || !primaryNav) {
      return;
    }

    headerInner?.classList.remove("is-open");
    primaryNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  };

  if (menuToggle && headerInner && primaryNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = primaryNav.classList.toggle("is-open");
      headerInner.classList.toggle("is-open", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") {
        return;
      }

      const targetElement = document.querySelector(targetId);
      if (!targetElement) {
        return;
      }

      event.preventDefault();
      const headerOffset = header ? header.offsetHeight : 0;
      const targetY = targetElement.getBoundingClientRect().top + window.scrollY - headerOffset - 12;

      window.scrollTo({ top: targetY, behavior: "smooth" });
      closeMobileMenu();
      history.replaceState(null, "", targetId);
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      closeMobileMenu();
    }
  });

  document.addEventListener("click", (event) => {
    if (window.innerWidth > 768 || !headerInner || !menuToggle) {
      return;
    }

    const target = event.target;
    if (target instanceof Node && !headerInner.contains(target)) {
      closeMobileMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileMenu();
    }
  });

  // ── Contact form ─────────────────────
  const contactForm = document.querySelector("#contact-form");
  const formFeedback = document.querySelector("#form-feedback");

  if (contactForm && formFeedback) {
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const fields = {
      name: contactForm.querySelector("#name"),
      email: contactForm.querySelector("#email"),
      message: contactForm.querySelector("#message"),
      consent: contactForm.querySelector("#consent"),
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    Object.values(fields).forEach((field) => {
      if (!field) return;
      const evt = field.type === "checkbox" ? "change" : "input";
      field.addEventListener(evt, () => field.classList.remove("field-invalid"));
    });

    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      formFeedback.textContent = "";
      formFeedback.className = "form-feedback";
      Object.values(fields).forEach((f) => f?.classList.remove("field-invalid"));

      let hasError = false;
      if (!fields.name?.value.trim()) { fields.name?.classList.add("field-invalid"); hasError = true; }
      if (!fields.email?.value.trim() || !emailRegex.test(fields.email.value.trim())) {
        fields.email?.classList.add("field-invalid"); hasError = true;
      }
      if (!fields.message?.value.trim()) { fields.message?.classList.add("field-invalid"); hasError = true; }
      if (!fields.consent?.checked) { fields.consent?.classList.add("field-invalid"); hasError = true; }

      if (hasError) {
        formFeedback.textContent = "Please complete all fields and accept the privacy notice.";
        formFeedback.classList.add("form-feedback--error");
        return;
      }

      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending\u2026";

      try {
        const data = new FormData(contactForm);
        // Only send fields Formspree needs
        const payload = new FormData();
        payload.append("name", data.get("name"));
        payload.append("email", data.get("email"));
        payload.append("message", data.get("message"));
        payload.append("_gotcha", data.get("_gotcha"));
        const response = await fetch(contactForm.action, {
          method: "POST",
          body: payload,
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          formFeedback.textContent = "Thank you. Your message has been sent and we will be in touch shortly.";
          formFeedback.classList.add("form-feedback--success");
          contactForm.reset();
        } else {
          const errorText = await response.text().catch(() => "");
          console.error("Formspree error:", response.status, errorText);
          formFeedback.textContent = "Something went wrong. Please try again or contact us directly.";
          formFeedback.classList.add("form-feedback--error");
        }
      } catch {
        formFeedback.textContent = "Something went wrong. Please try again or contact us directly.";
        formFeedback.classList.add("form-feedback--error");
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    });
  }
});
