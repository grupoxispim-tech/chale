document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /* =========================
     MENU MOBILE
     ========================= */

  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Abrir menu");
      });
    });

    document.addEventListener("click", (event) => {
      const clickedInsideHeader = event.target.closest(".site-header");

      if (!clickedInsideHeader && navMenu.classList.contains("is-open")) {
        navMenu.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Abrir menu");
      }
    });
  }

  /* =========================
     ANO AUTOMÁTICO
     ========================= */

  const yearElement = document.querySelector("#current-year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  /* =========================
     ANIMAÇÕES AO ROLAR
     ========================= */

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealElements.forEach((element) => revealObserver.observe(element));
  } else {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  }

  /* =========================
     GALERIA / MODAL
     ========================= */

  const modal = document.querySelector("#gallery-modal");
  const modalImage = document.querySelector("#modal-image");
  const modalCaption = document.querySelector("#modal-caption");
  const modalClose = document.querySelector(".modal-close");
  const modalPrev = document.querySelector(".modal-prev");
  const modalNext = document.querySelector(".modal-next");

  const galleryItems = Array.from(document.querySelectorAll(".gallery-item"));

  let currentGalleryIndex = 0;

  const openGallery = (index) => {
    if (!modal || !modalImage || !galleryItems.length) return;

    currentGalleryIndex = index;

    const item = galleryItems[currentGalleryIndex];
    const imagePath = item.dataset.full;
    const imageAlt = item.dataset.alt || "";

    modalImage.src = imagePath;
    modalImage.alt = imageAlt;

    if (modalCaption) {
      modalCaption.textContent = imageAlt;
    }

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  };

  const closeGallery = () => {
    if (!modal) return;

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  };

  const showGalleryImage = (direction) => {
    if (!galleryItems.length) return;

    currentGalleryIndex =
      (currentGalleryIndex + direction + galleryItems.length) %
      galleryItems.length;

    openGallery(currentGalleryIndex);
  };

  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      openGallery(index);
    });
  });

  document.querySelectorAll(".gallery-trigger").forEach((button) => {
    button.addEventListener("click", () => {
      const galleryName = button.dataset.gallery;

      const galleryMap = {
        primavera: 0,
        inverno: 2,
        verao: 1,
        outono: 8
      };

      const targetIndex = galleryMap[galleryName];

      if (Number.isInteger(targetIndex)) {
        openGallery(targetIndex);
      } else {
        const gallerySection = document.querySelector("#galeria");

        if (gallerySection) {
          gallerySection.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  modalClose?.addEventListener("click", closeGallery);
  modalPrev?.addEventListener("click", () => showGalleryImage(-1));
  modalNext?.addEventListener("click", () => showGalleryImage(1));

  modal?.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeGallery();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (!modal?.classList.contains("is-open")) return;

    if (event.key === "Escape") {
      closeGallery();
    }

    if (event.key === "ArrowLeft") {
      showGalleryImage(-1);
    }

    if (event.key === "ArrowRight") {
      showGalleryImage(1);
    }
  });

  /* =========================
     FALLBACK PARA IMAGENS
     =========================
     Se alguma imagem ainda não existir, o navegador não quebra
     o restante do layout.
  */

  document.querySelectorAll("img").forEach((image) => {
    image.addEventListener("error", () => {
      image.classList.add("image-error");
    });
  });
});
