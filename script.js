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
});
