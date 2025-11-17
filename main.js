document.addEventListener("DOMContentLoaded", function () {
  // --- NAVBAR SCROLL EFFECT ---
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // --- NAVBAR TOGGLE FOR MOBILE ---
  const navbarToggle = document.getElementById("navbar-toggle");
  const navbarMenu = document.getElementById("navbar-menu");
  if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener("click", () => {
      navbarMenu.classList.toggle("active");
    });
  }

  // --- HERO SLIDER ---
  const slides = document.querySelectorAll(".hero-section .slide");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      if (i === index) {
        slide.classList.add("active");
      }
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  if (slides.length > 0) {
    // Auto-play slider
    setInterval(nextSlide, 5000); // Change slide every 5 seconds

    if (nextBtn) {
      nextBtn.addEventListener("click", nextSlide);
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
      });
    }
  }

  // --- COUNTER ANIMATION ---
  const counters = document.querySelectorAll(".counter-number");
  const speed = 200; // The lower the slower

  const animateCounter = (counter) => {
    const target = +counter.getAttribute("data-target");
    const count = +counter.innerText;
    const inc = target / speed;

    if (count < target) {
      counter.innerText = Math.ceil(count + inc);
      setTimeout(() => animateCounter(counter), 1);
    } else {
      counter.innerText = target + '+';
    }
  };

  const observerOptions = {
    root: null,
    threshold: 0.1,
  };

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  counters.forEach((counter) => {
    counterObserver.observe(counter);
  });

  // --- SCROLL TO TOP BUTTON ---
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollToTopBtn.classList.add("visible");
    } else {
      scrollToTopBtn.classList.remove("visible");
    }
  });

  // --- GALLERY FILTER ---
  const filterContainer = document.getElementById("gallery-filter-btns");
  if (filterContainer) {
    const galleryItems = document.querySelectorAll("#gallery-grid .gallery-item");

    filterContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("filter-btn")) {
        // De-activate existing active button
        filterContainer.querySelector(".active").classList.remove("active");
        // Activate new button
        e.target.classList.add("active");

        const filterValue = e.target.getAttribute("data-filter");

        galleryItems.forEach((item) => {
          if (item.dataset.category === filterValue || filterValue === "all") {
            item.classList.remove("hide");
          } else {
            item.classList.add("hide");
          }
        });
      }
    });
  }


  // --- LIGHTBOX ---
  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxClose = document.getElementById("lightbox-close");
    const lightboxPrev = document.getElementById("lightbox-prev");
    const lightboxNext = document.getElementById("lightbox-next");

    let galleryImages = [];
    let currentIndex = 0;

    document.querySelectorAll(".gallery-item").forEach((item, index) => {
      // Store image sources for navigation
      const img = item.querySelector("img");
      if (img) {
        galleryImages.push(img.src);
      }

      item.addEventListener("click", () => {
        currentIndex = galleryImages.indexOf(img.src);
        updateLightboxImage();
        lightbox.classList.add("active");
      });
    });

    const updateLightboxImage = () => {
      if (galleryImages.length > 0) {
        lightboxImg.src = galleryImages[currentIndex];
      }
    };

    const closeLightbox = () => {
      lightbox.classList.remove("active");
    };

    const showPrevImage = () => {
      currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
      updateLightboxImage();
    };

    const showNextImage = () => {
      currentIndex = (currentIndex + 1) % galleryImages.length;
      updateLightboxImage();
    };

    lightboxClose.addEventListener("click", closeLightbox);
    lightboxPrev.addEventListener("click", showPrevImage);
    lightboxNext.addEventListener("click", showNextImage);

    // Close on clicking the background overlay
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  // --- FAQ ACCORDION ---
  const faqItems = document.querySelectorAll(".faq-item");
  if (faqItems.length > 0) {
    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question");
      const answer = item.querySelector(".faq-answer");

      question.addEventListener("click", () => {
        const isActive = item.classList.contains("active");
        // Close all other items
        faqItems.forEach(i => {
          i.classList.remove("active");
          i.querySelector(".faq-answer").style.maxHeight = null;
        });
        // Open the clicked one if it wasn't already active
        if (!isActive) {
          item.classList.add("active");
          answer.style.maxHeight = answer.scrollHeight + "px";
        }
      });
    });
  }
});