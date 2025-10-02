document.addEventListener("DOMContentLoaded", () => {
  setupStorySection();
});

function setupStorySection() {
  const storyContainer = document.getElementById("story");
  if (!storyContainer) return;

  const storyVisuals = storyContainer.querySelector(".story-visuals");
  const storySteps = storyContainer.querySelectorAll(".story-step");
  const candidateScreen = document.getElementById("candidate-screen");
  const employerScreen = document.getElementById("employer-screen");
  const actionHub = document.getElementById("action-hub");
  const actionIcon = document.getElementById("action-icon");
  const backgroundGlow = document.getElementById("story-background-glow");

  // --- IMPORTANT ---
  // 1. Create an 'images' folder next to your html file.
  // 2. Place all your screenshot files in that 'images' folder.
  const imagePaths = {
    emp_dash: "images/Screenshot_20251002_114127_ShiftSureEmployer.jpeg",
    emp_add_shift: "images/Screenshot_20251002_114201_ShiftSureEmployer.jpeg",
    emp_post_job: "images/Screenshot_20251002_114836_ShiftSureEmployer.jpeg",
    emp_review: "images/Screenshot_20251002_115653_ShiftSureEmployer.jpeg",
    emp_schedule: "images/Screenshot_20251002_115747_ShiftSureEmployer.jpeg",
    emp_confirm_hire:
      "images/Screenshot_20251002_115937_ShiftSureEmployer.jpeg",

    can_job_details: "images/Screenshot_20251002_115309_ShiftSure_Prod.jpeg",
    can_apply: "images/Screenshot_20251002_115521_ShiftSure_Prod.jpeg",
    can_interview_status:
      "images/Screenshot_20251002_115920_ShiftSure_Prod.jpeg",
    can_hired_status: "images/Screenshot_20251002_120005_ShiftSure_Prod.jpeg",
    can_calendar: "images/Screenshot_20251002_120021_ShiftSure_Prod.jpeg",
  };

  // Preload images
  Object.values(imagePaths).forEach((path) => {
    if (path) {
      new Image().src = path;
    }
  });

  const getNotificationHTML = (title, message) => `
    <div class="mock-notification">
        <img class="app-icon" src="images/app-icon.png" alt="App Icon">
        <strong>${title}</strong>
        <p>${message}</p>
    </div>`;

  const storyData = [
    {
      step: 1,
      focus: "employer",
      employerImg: imagePaths.emp_add_shift,
      candidateImg: "",
      icon: "fa-magnifying-glass",
      glow: "right",
      line: "",
    },
    {
      step: 2,
      focus: "employer",
      employerImg: imagePaths.emp_post_job,
      candidateImg: "",
      icon: "fa-paper-plane",
      glow: "right",
      line: "line-right",
    },
    {
      step: 3,
      focus: "candidate",
      employerImg: imagePaths.emp_post_job,
      candidateImg: "mock-notification",
      icon: "fa-bell",
      glow: "left",
      line: "line-left",
    },
    {
      step: 4,
      focus: "candidate",
      employerImg: "",
      candidateImg: imagePaths.can_apply,
      icon: "fa-file-arrow-up",
      glow: "left",
      line: "line-left",
    },
    {
      step: 5,
      focus: "employer",
      employerImg: imagePaths.emp_review,
      candidateImg: imagePaths.can_apply,
      icon: "fa-magnifying-glass-chart",
      glow: "right",
      line: "line-right",
    },
    {
      step: 6,
      focus: "employer",
      employerImg: imagePaths.emp_schedule,
      candidateImg: imagePaths.can_interview_status,
      icon: "fa-calendar-days",
      glow: "right",
      line: "line-right",
    },
    {
      step: 7,
      focus: "employer",
      employerImg: imagePaths.emp_confirm_hire,
      candidateImg: "",
      icon: "fa-handshake",
      glow: "right",
      line: "line-right",
    },
    {
      step: 8,
      focus: "candidate",
      employerImg: "",
      candidateImg: imagePaths.can_calendar,
      icon: "fa-circle-check",
      glow: "left",
      line: "",
    },
  ];

  let currentIcon = "";

  const updateVisuals = (stepIndex) => {
    const data = storyData.find((d) => d.step === stepIndex);
    if (!data) return;

    // Update Focus and Glow
    storyVisuals.className = `story-visuals focus-${data.focus}`;
    backgroundGlow.className = data.glow ? `glow-${data.glow}` : "";

    // Update Screens
    if (data.employerImg)
      employerScreen.style.backgroundImage = `url('${data.employerImg}')`;
    if (data.candidateImg === "mock-notification") {
      candidateScreen.innerHTML = getNotificationHTML(
        "New Job Match!",
        "A Dental Specialist position is available at Toronto Red Cross."
      );
      candidateScreen.style.backgroundImage = ""; // Clear BG image
    } else if (data.candidateImg) {
      candidateScreen.innerHTML = ""; // Clear inner HTML
      candidateScreen.style.backgroundImage = `url('${data.candidateImg}')`;
    }

    // Update Action Hub Icon and Lines
    actionHub.className = data.line || "";
    if (data.icon !== currentIcon) {
      actionIcon.classList.remove("is-active");
      setTimeout(() => {
        actionIcon.className = `fa-solid ${data.icon} is-active`;
        currentIcon = data.icon;
      }, 250); // Wait for fade out before changing
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const step = parseInt(entry.target.dataset.step);
        if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
          entry.target.classList.add("is-active");
          updateVisuals(step);
        } else {
          entry.target.classList.remove("is-active");
        }
      });
    },
    { threshold: 0.6 }
  );

  storySteps.forEach((step) => observer.observe(step));

  // Set initial state
  updateVisuals(1);
  storySteps[0].classList.add("is-active");
}
