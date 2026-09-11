document.addEventListener("DOMContentLoaded", () => {
  /* =========================================================
     MENU MOBILE
  ========================================================= */

  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");

      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute(
        "aria-label",
        isOpen ? "Fechar menu" : "Abrir menu"
      );
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Abrir menu");
      });
    });
  }

  /* =========================================================
     ANO AUTOMÁTICO DO RODAPÉ
  ========================================================= */

  const yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* =========================================================
     ANIMAÇÕES AO ENTRAR NA TELA
  ========================================================= */

  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => {
      item.classList.add("visible");
    });
  }

  /* =========================================================
     FECHAR GALERIA CLICANDO FORA DA IMAGEM
  ========================================================= */

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("gallery-modal")) {
      const modal = event.target;
      modal.classList.remove("active");
      document.body.classList.remove("modal-open");
    }
  });

  /* =========================================================
     FECHAR GALERIA COM ESC
  ========================================================= */

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const activeModal = document.querySelector(".gallery-modal.active");

      if (activeModal) {
        activeModal.classList.remove("active");
        document.body.classList.remove("modal-open");
      }
    }
  });
});


/* =========================================================
   GALERIAS DOS CHALÉS
========================================================= */

function openGallery(chaletId) {
  const modal = document.getElementById(`${chaletId}-gallery`);

  if (!modal) {
    console.warn(`Galeria não encontrada: ${chaletId}`);
    return;
  }

  modal.classList.add("active");
  document.body.classList.add("modal-open");

  showSlide(0, chaletId);
}


function closeGallery(chaletId) {
  const modal = document.getElementById(`${chaletId}-gallery`);

  if (!modal) {
    return;
  }

  modal.classList.remove("active");
  document.body.classList.remove("modal-open");
}


function currentSlide(index, chaletId) {
  showSlide(index, chaletId);
}


function showSlide(index, chaletId) {
  const modal = document.getElementById(`${chaletId}-gallery`);

  if (!modal) {
    return;
  }

  const slides = modal.querySelectorAll(".gallery-slides img");
  const dots = modal.querySelectorAll(".dot");

  if (!slides.length) {
    return;
  }

  if (index >= slides.length) {
    index = 0;
  }

  if (index < 0) {
    index = slides.length - 1;
  }

  slides.forEach((slide) => {
    slide.classList.remove("active");
  });

  dots.forEach((dot) => {
    dot.classList.remove("active");
  });

  if (slides[index]) {
    slides[index].classList.add("active");
  }

  if (dots[index]) {
    dots[index].classList.add("active");
  }
}


/* =========================================================
   NAVEGAÇÃO POR TECLADO NAS GALERIAS
========================================================= */

document.addEventListener("keydown", (event) => {
  const activeModal = document.querySelector(".gallery-modal.active");

  if (!activeModal) {
    return;
  }

  const chaletId = activeModal.id.replace("-gallery", "");

  const slides = activeModal.querySelectorAll(".gallery-slides img");

  if (!slides.length) {
    return;
  }

  let currentIndex = 0;

  slides.forEach((slide, index) => {
    if (slide.classList.contains("active")) {
      currentIndex = index;
    }
  });

  if (event.key === "ArrowRight") {
    showSlide(currentIndex + 1, chaletId);
  }

  if (event.key === "ArrowLeft") {
    showSlide(currentIndex - 1, chaletId);
  }
});




/* =========================================================
   AJUSTE PREMIUM — GRID DOS 4 CHALÉS
========================================================= */

.accommodation-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 32px;
}

.accommodation-card {
  max-width: none;
}

/* Altura uniforme das imagens */
.accommodation-card > img {
  height: 300px;
  object-fit: cover;
}

/* Mais destaque para o nome do chalé */
.card-header h3 {
  font-family: "Cormorant Garamond", serif;
  font-size: 1.8rem;
  font-weight: 700;
}

/* Botão da galeria mais elegante */
.btn-gallery {
  border-radius: 999px;
  padding: 12px 22px;
  letter-spacing: 0.06em;
}

/* Evita que a página role quando uma galeria estiver aberta */
body.modal-open {
  overflow: hidden;
}


/* =========================================================
   RESPONSIVO — CHALÉS
========================================================= */

@media (max-width: 820px) {
  .accommodation-grid {
    grid-template-columns: 1fr;
  }

  .accommodation-card > img {
    height: 280px;
  }
}