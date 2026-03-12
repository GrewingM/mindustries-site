"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const headerInner = document.querySelector(".site-header-inner");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');

  const closeMobileMenu = () => {
    if (!headerInner || !menuToggle) {
      return;
    }

    headerInner.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  };

  if (menuToggle && headerInner) {
    menuToggle.addEventListener("click", () => {
      const isOpen = headerInner.classList.toggle("is-open");
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
});
