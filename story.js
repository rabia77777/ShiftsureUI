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
  const connector = storyContainer.querySelector(".story-connector");

  // --- IMPORTANT ---
  // 1. Create an 'images' folder next to your html file.
  // 2. Place all your screenshot files in that 'images' folder.
  // 3. The paths below should now work correctly.
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

    // NOTE: I will generate mockups for these if you need them. For now, they are blank.
    mock_can_notification: "",
    mock_emp_notification: "",
  };

  // Preload images for smooth transitions
  Object.values(imagePaths).forEach((path) => {
    if (path) {
      // Only preload if path is not empty
      const img = new Image();
      img.src = path;
    }
  });

  const storyData = [
    {
      step: 1,
      focus: "employer",
      employerImg: imagePaths.emp_add_shift,
      candidateImg: "",
      connectorActive: false,
    },
    {
      step: 2,
      focus: "employer",
      employerImg: imagePaths.emp_post_job,
      candidateImg: "",
      connectorActive: true,
    },
    {
      step: 3,
      focus: "candidate",
      employerImg: imagePaths.emp_post_job,
      candidateImg: imagePaths.can_job_details,
      connectorActive: false,
    },
    {
      step: 4,
      focus: "candidate",
      employerImg: "",
      candidateImg: imagePaths.can_apply,
      connectorActive: true,
    },
    {
      step: 5,
      focus: "employer",
      employerImg: imagePaths.emp_review,
      candidateImg: imagePaths.can_apply,
      connectorActive: false,
    },
    {
      step: 6,
      focus: "employer",
      employerImg: imagePaths.emp_schedule,
      candidateImg: imagePaths.can_interview_status,
      connectorActive: false,
    },
    {
      step: 7,
      focus: "employer",
      employerImg: imagePaths.emp_confirm_hire,
      candidateImg: "",
      connectorActive: false,
    },
    {
      step: 8,
      focus: "candidate",
      employerImg: imagePaths.emp_confirm_hire,
      candidateImg: imagePaths.can_calendar,
      connectorActive: false,
    },
  ];

  const updateVisuals = (stepIndex) => {
    const data = storyData.find((d) => d.step === stepIndex);
    if (!data) return;

    storyVisuals.className = "story-visuals"; // Reset
    storyVisuals.classList.add(`focus-${data.focus}`);

    if (data.employerImg) {
      employerScreen.style.backgroundImage = `url('${data.employerImg}')`;
      employerScreen.classList.add("is-visible");
    } else {
      employerScreen.classList.remove("is-visible");
    }
    if (data.candidateImg) {
      candidateScreen.style.backgroundImage = `url('${data.candidateImg}')`;
      candidateScreen.classList.add("is-visible");
    } else {
      candidateScreen.classList.remove("is-visible");
    }

    if (data.connectorActive) {
      connector.classList.add("is-active");
    } else {
      connector.classList.remove("is-active");
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
    { threshold: 0.6 } // When 60% of the step is visible
  );

  storySteps.forEach((step) => observer.observe(step));

  // Set initial state
  updateVisuals(1);
  storySteps[0].classList.add("is-active");
}
