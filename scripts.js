const testimonials = [
  {
    name: "Emily R., RN",
    quote:
      "ShiftSure completely transformed how I find healthcare shifts. The AI makes finding and applying for the perfect match effortless!",
  },
  {
    name: "David M., Clinic Manager",
    quote:
      "As an employer, the automation from ShiftSure has saved us hundreds of administrative hours in scheduling and compliance tracking.",
  },
  {
    name: "Nurse Joy",
    quote:
      "I love how ShiftSure connects me to real, verified jobs close to home, instantly. It has given me so much flexibility and control over my career.",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  populateTestimonials();
  setupModal();
  setupTestimonialSlider();
  setupScrollAnimations(); // Initialize scroll animations
  setupThemeToggle(); 

  document
    .getElementById("employer-login-btn")
    .addEventListener("click", () => {
      alert(
        "The Employer Login is for verified healthcare business representatives to access the full staffing dashboard."
      );
    });
});
function setupThemeToggle() {
  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;

  toggle.addEventListener("change", () => {
    document.body.classList.toggle("employer-theme");
  });
}
function populateTestimonials() {
  const container = document.getElementById("testimonial-list");
  if (!container) return;

  testimonials.forEach(({ name, quote }) => {
    const div = document.createElement("div");
    div.classList.add("testimonial");
    div.innerHTML = `<p>"${quote}"</p><p><strong>- ${name}</strong></p>`;
    container.appendChild(div);
  });
}

function setupModal() {
  const openTriggers = document.querySelectorAll(".open-calc-trigger");
  const closeBtn = document.getElementById("close-calc-btn");
  const modal = document.getElementById("calculator-modal");

  if (openTriggers.length === 0 || !closeBtn || !modal) return;

  openTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      modal.style.display = "flex";
      setTimeout(() => modal.classList.add("visible"), 10);
    });
  });

  const closeModal = () => {
    modal.classList.remove("visible");
    setTimeout(() => (modal.style.display = "none"), 300);
  };

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
}

function setupTestimonialSlider() {
  const track = document.getElementById("testimonial-list");
  const prevBtn = document.getElementById("prev-testimonial");
  const nextBtn = document.getElementById("next-testimonial");

  if (!track || !prevBtn || !nextBtn || track.children.length === 0) return;

  let currentIndex = 0;
  const slides = Array.from(track.children);

  const updateSlidePosition = () => {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
  };

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlidePosition();
  });

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlidePosition();
  });

  window.addEventListener("resize", updateSlidePosition);
}

function setupScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1, // Trigger when 10% of the element is visible
    }
  );

  const elementsToAnimate = document.querySelectorAll(".animate-on-scroll");
  elementsToAnimate.forEach((el) => observer.observe(el));
}

