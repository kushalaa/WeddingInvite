const weddingConfig = {
  coupleNames: "Sharath & Kushalaa",
  heroLocation: "Samavana, Bengaluru",
  footerLine: "Both teams are excited to see you there!",
  teams: {
    bride: {
      label: "Team Bride",
      name: "Kushalaa",
      initials: "K",
      videoCandidates: ["./assets/team-bride.mov?v=20260318-100250", "./assets/team-bride.mp4?v=20260318-100250"],
      imageCandidates: [
        "./assets/team-bride.jpg",
        "./assets/team-bride.jpeg",
        "./assets/team-bride.png",
        "./assets/team-bride.webp"
      ]
    },
    groom: {
      label: "Team Groom",
      name: "Sharath",
      initials: "S",
      videoCandidates: ["./assets/team-groom.mov?v=20260318-100250", "./assets/team-groom.mp4?v=20260318-100250"],
      imageCandidates: [
        "./assets/team-groom.jpg",
        "./assets/team-groom.jpeg",
        "./assets/team-groom.png",
        "./assets/team-groom.webp"
      ]
    }
  },
  map: {
    label:
      "Samavana, Sy. no 74, 10, opposite JB Kaval Tree Park, Jarakabande Kaval, Yelahanka, Bengaluru, Ramagondanahalli, Karnataka 560119, India",
    directionsUrl: "https://maps.app.goo.gl/P6gD3vT8jN1t1wHH9",
    embedUrl:
      "https://www.google.com/maps?q=Samavana%2C%20Sy.%20no%2074%2C%2010%2C%20opposite%20JB%20Kaval%20Tree%20Park%2C%20Jarakabande%20Kaval%2C%20Yelahanka%2C%20Bengaluru%2C%20Ramagondanahalli%2C%20Karnataka%20560119%2C%20India&z=16&output=embed"
  },
  calendarFileName: "Kushalaa-Sharath-wedding-dates.ics",
  events: [
    {
      id: "sangeet",
      dateLabel: "May 6",
      title: "Sangeet",
      time: "6:30 PM",
      description:
        "A night of music, dance, and vibrant colors to begin the wedding weekend.",
      hoverCopy:
        "We're dancing like nobody's watching... but you definitely should be. Join us at 6:30 PM",
      calendarStart: "20260506T183000",
      calendarEnd: "20260506T213000"
    },
    {
      id: "engagement",
      dateLabel: "May 7",
      title: "Engagement",
      time: "11:00 AM",
      description:
        "A warm morning gathering with family and close friends to mark the engagement.",
      hoverCopy: "We are making it official, witness it at 11:00 AM",
      calendarStart: "20260507T110000",
      calendarEnd: "20260507T133000"
    },
    {
      id: "reception",
      dateLabel: "May 7",
      title: "Reception",
      time: "6:30 PM",
      description:
        "An elegant reception with dinner, speeches, and a luminous evening atmosphere.",
      hoverCopy:
        "When the formalities fade and the celebration begins, 6:30 PM.",
      calendarStart: "20260507T183000",
      calendarEnd: "20260507T213000"
    },
    {
      id: "wedding",
      dateLabel: "May 8",
      title: "Wedding",
      time: "10:11 AM",
      description:
        "The wedding day itself, centered on tradition, ceremony, and a joyful gathering.",
      hoverCopy: "A sacred hour, quietly ours-10:11AM",
      calendarStart: "20260508T101100",
      calendarEnd: "20260508T131100"
    }
  ]
};

const timeline = document.querySelector("#timeline");
const mapEmbed = document.querySelector("#map-embed");
const directionsLink = document.querySelector("#map-directions-link");
const calendarDownloadLink = document.querySelector("#calendar-download-link");
const backgroundAudio = document.querySelector("#background-audio");
const musicToggle = document.querySelector("#music-toggle");
const openingSpotlight = document.querySelector("#top");
const openingBeam = document.querySelector(".opening-beam");
const filmSection = document.querySelector("#film");
const filmVideo = document.querySelector("#film-video");
const ourStorySection = document.querySelector("#our-story");
const ourStoryTitle = document.querySelector("#our-story-title");
const storyGalleryTrack = document.querySelector("#story-gallery-track");
const pointerTargets = document.querySelectorAll(".location-copy, .map-shell");
const chapterLinks = document.querySelectorAll(".chapter-link");
const teamChoices = document.querySelectorAll(".team-choice");
const teamFlash = document.querySelector("#team-flash");
const teamFlashVideo = document.querySelector("#team-flash-video");
const teamFlashImage = document.querySelector("#team-flash-image");
const teamFlashFallback = document.querySelector("#team-flash-fallback");
const teamFlashInitials = document.querySelector("#team-flash-initials");
const teamFlashLabel = document.querySelector("#team-flash-label");
const teamFlashName = document.querySelector("#team-flash-name");
const teamFireworks = document.querySelector("#team-fireworks");
const datesHeadline = document.querySelector("#dates-headline");
const countdownIds = {
  days: document.querySelector("#countdown-days"),
  hours: document.querySelector("#countdown-hours"),
  minutes: document.querySelector("#countdown-minutes")
};
let calendarUrl = "";
let spotlightIntervalId = 0;
let teamFlashTimeoutId = 0;
let teamFlashRequestId = 0;

function createTeamFireworks() {
  if (!teamFireworks) {
    return;
  }

  const burstPositions = [
    { x: 18, y: 22 },
    { x: 82, y: 26 },
    { x: 16, y: 78 },
    { x: 84, y: 74 }
  ];

  teamFireworks.replaceChildren();
  teamFireworks.classList.remove("is-active");

  burstPositions.forEach((position, burstIndex) => {
    const burst = document.createElement("span");
    burst.className = "team-firework-burst";
    burst.style.left = `${position.x}%`;
    burst.style.top = `${position.y}%`;

    for (let sparkIndex = 0; sparkIndex < 14; sparkIndex += 1) {
      const spark = document.createElement("span");
      spark.className = "team-firework-spark";
      spark.style.setProperty("--spark-angle", `${(360 / 14) * sparkIndex}deg`);
      spark.style.setProperty("--spark-delay", `${burstIndex * 0.1 + sparkIndex * 0.02}s`);
      spark.style.setProperty("--spark-distance", `${50 + (sparkIndex % 4) * 16}px`);
      burst.appendChild(spark);
    }

    teamFireworks.appendChild(burst);
  });

  window.requestAnimationFrame(() => {
    teamFireworks.classList.add("is-active");
  });
}

function applyConfig() {
  document.querySelector("#location-summary").textContent = weddingConfig.map.label;
  document.querySelector("#footer-line").textContent = weddingConfig.footerLine;
  document.querySelector("#dates-headline").innerHTML = weddingConfig.events
    .map((event) => event.dateLabel)
    .filter(uniqueOnly)
    .map((dateLabel) => `<span class="dates-roll-item">${dateLabel}</span>`)
    .join('<span class="dates-roll-separator">•</span>');
  directionsLink.href = weddingConfig.map.directionsUrl;
  mapEmbed.src = weddingConfig.map.embedUrl;
  calendarUrl = createCalendarFile();
  calendarDownloadLink.href = calendarUrl;
  calendarDownloadLink.download = weddingConfig.calendarFileName;
  weddingConfig.events.forEach((event, index) => {
    const item = document.createElement("article");
    item.className = `timeline-item timeline-item--${event.id} reveal`;
    item.dataset.eventId = event.id;
    item.tabIndex = 0;
    item.innerHTML = `
      <div class="timeline-aura" aria-hidden="true"></div>
      <div class="timeline-orbit" aria-hidden="true">
        <span class="timeline-orbit-dot timeline-orbit-dot-a"></span>
        <span class="timeline-orbit-dot timeline-orbit-dot-b"></span>
        <span class="timeline-orbit-dot timeline-orbit-dot-c"></span>
      </div>
      <div class="timeline-content">
        <span class="timeline-date">${event.dateLabel}</span>
        <h3>${event.title}</h3>
        <p class="timeline-time">${event.time}</p>
        <p class="timeline-hover-copy">${event.hoverCopy}</p>
      </div>
    `;
    item.addEventListener("click", () => {
      document.querySelectorAll(".timeline-item").forEach((timelineItem, itemIndex) => {
        timelineItem.classList.toggle("is-hovered", itemIndex === index);
      });
    });
    item.addEventListener("keydown", (keyboardEvent) => {
      if (keyboardEvent.key === "Enter" || keyboardEvent.key === " ") {
        keyboardEvent.preventDefault();
        document.querySelectorAll(".timeline-item").forEach((timelineItem, itemIndex) => {
          timelineItem.classList.toggle("is-hovered", itemIndex === index);
        });
      }
    });
    item.addEventListener("mouseleave", () => {
      item.classList.remove("is-hovered");
    });
    item.addEventListener("blur", () => {
      item.classList.remove("is-hovered");
    });
    timeline.appendChild(item);
  });
}

function uniqueOnly(value, index, array) {
  return array.indexOf(value) === index;
}

function setupReveals() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll(".reveal").forEach((element) => {
    observer.observe(element);
  });
}

function setupDatesRollout() {
  if (!datesHeadline) {
    return;
  }

  const dateParts = [...datesHeadline.querySelectorAll(".dates-roll-item, .dates-roll-separator")];
  let hasRolled = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || hasRolled) {
          return;
        }

        hasRolled = true;
        dateParts.forEach((part, index) => {
          window.setTimeout(() => {
            part.classList.add("is-visible");
          }, 180 + index * 220);
        });
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );

  observer.observe(datesHeadline);
}

function setupPointerGlow() {
  window.addEventListener("pointermove", (event) => {
    document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
    document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
    document.documentElement.style.setProperty("--glow-x", `${event.clientX}px`);
    document.documentElement.style.setProperty("--glow-y", `${event.clientY}px`);
  });
}

function setupParallaxCards() {
  pointerTargets.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
      const rotateX = ((event.clientY - rect.top) / rect.height - 0.5) * -8;
      card.style.transform = `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    });

    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });
}

function setupScrollProgress() {
  function updateProgress() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
    document.documentElement.style.setProperty("--scroll-progress", `${progress}%`);
  }

  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });
}

function setupSectionRail() {
  const sections = [...document.querySelectorAll("header[id], section[id]")];
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        chapterLinks.forEach((link) => {
          link.classList.toggle("is-active", link.dataset.section === entry.target.id);
        });
      });
    },
    { threshold: 0.45 }
  );

  sections.forEach((section) => observer.observe(section));
}

function setupOpeningSequence() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let spotlightInteractive = false;
  let wasAtTop = true;

  function replayOpeningReveal() {
    openingSpotlight.classList.remove("is-revealing");
    void openingSpotlight.offsetWidth;
    openingSpotlight.classList.add("is-revealing");
  }

  function moveOpeningBeam(clientX, clientY) {
    if (!spotlightInteractive) {
      return;
    }

    const bounds = openingSpotlight.getBoundingClientRect();
    const x = ((clientX - bounds.left) / bounds.width) * 100;
    const y = ((clientY - bounds.top) / bounds.height) * 100;
    const clampedX = Math.max(12, Math.min(88, x));
    const clampedY = Math.max(16, Math.min(84, y));
    openingBeam.style.left = `${clampedX}%`;
    openingBeam.style.top = `${clampedY}%`;
  }

  const filmVisibilityObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          filmVideo.play().catch(() => {});
        } else {
          filmVideo.pause();
        }
      });
    },
    { threshold: 0.35 }
  );

  window.scrollTo({ top: 0, behavior: "auto" });
  replayOpeningReveal();
  window.setTimeout(() => {
    spotlightInteractive = !prefersReducedMotion;
  }, prefersReducedMotion ? 0 : 2300);
  filmVisibilityObserver.observe(filmSection);
  window.addEventListener(
    "scroll",
    () => {
      const isAtTop = window.scrollY < 24;

      if (isAtTop && !wasAtTop) {
        replayOpeningReveal();
      }

      wasAtTop = isAtTop;
    },
    { passive: true }
  );
  openingSpotlight.addEventListener("pointermove", (event) => {
    moveOpeningBeam(event.clientX, event.clientY);
  });
}

function setupOurStoryScroll() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function updateStoryMotion() {
    const sectionRect = ourStorySection.getBoundingClientRect();
    const sectionHeight = Math.max(ourStorySection.offsetHeight - window.innerHeight, 1);
    const rawProgress = Math.min(Math.max(-sectionRect.top / sectionHeight, 0), 1);
    const titleExitProgress = Math.min(rawProgress / 0.2, 1);
    const galleryRevealStart = 0.2;
    const galleryProgress =
      rawProgress <= galleryRevealStart
        ? 0
        : Math.min((rawProgress - galleryRevealStart) / (1 - galleryRevealStart), 1);
    const titleShift = prefersReducedMotion ? 0 : titleExitProgress * -120;
    const titleOpacity = prefersReducedMotion ? 1 : 1 - titleExitProgress;
    const galleryOpacity = prefersReducedMotion ? 1 : Math.min(galleryProgress * 1.85, 1);
    const galleryShift = prefersReducedMotion ? 0 : (1 - galleryProgress) * 28;
    const startOffset = Math.min(window.innerWidth * 0.18, 180);
    const travelDistance = Math.max(storyGalleryTrack.scrollWidth - window.innerWidth + startOffset, 0);
    const trackOffset = prefersReducedMotion ? 0 : startOffset - galleryProgress * travelDistance;
    const cardLift = prefersReducedMotion ? 0 : galleryProgress * 26;

    ourStorySection.style.setProperty("--story-title-shift", `${titleShift}px`);
    ourStorySection.style.setProperty("--story-title-opacity", `${titleOpacity}`);
    ourStorySection.style.setProperty("--story-gallery-opacity", `${galleryOpacity}`);
    ourStorySection.style.setProperty("--story-gallery-shift", `${galleryShift}px`);
    ourStorySection.style.setProperty("--story-track-offset", `${trackOffset}px`);
    ourStorySection.style.setProperty("--story-card-lift", `${cardLift}px`);
    ourStorySection.style.setProperty("--story-thread-progress", `${galleryProgress}`);
  }

  updateStoryMotion();
  window.addEventListener("scroll", updateStoryMotion, { passive: true });
  window.addEventListener("resize", updateStoryMotion);
}

function setupCountdown() {
  const weddingStart = new Date("2026-05-06T18:00:00+05:30");

  function updateCountdown() {
    const difference = weddingStart.getTime() - Date.now();
    const safeDifference = Math.max(difference, 0);
    const days = Math.floor(safeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((safeDifference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((safeDifference / (1000 * 60)) % 60);

    countdownIds.days.textContent = String(days).padStart(2, "0");
    countdownIds.hours.textContent = String(hours).padStart(2, "0");
    countdownIds.minutes.textContent = String(minutes).padStart(2, "0");
  }

  updateCountdown();
  window.setInterval(updateCountdown, 60000);
}

function setupAudioToggle() {
  let isPlaying = false;

  async function toggleAudio() {
    if (!backgroundAudio) {
      return;
    }

    if (isPlaying) {
      backgroundAudio.pause();
      isPlaying = false;
      musicToggle.textContent = "Sound Off";
      musicToggle.setAttribute("aria-pressed", "false");
      return;
    }

    try {
      await backgroundAudio.play();
      isPlaying = true;
      musicToggle.textContent = "Sound On";
      musicToggle.setAttribute("aria-pressed", "true");
    } catch {
      musicToggle.textContent = "Tap for Sound";
      musicToggle.setAttribute("aria-pressed", "false");
    }
  }

  musicToggle.addEventListener("click", toggleAudio);
}

function loadImageCandidate(imageCandidates) {
  const [currentCandidate, ...remainingCandidates] = imageCandidates;

  if (!currentCandidate) {
    return Promise.resolve("");
  }

  return new Promise((resolve) => {
    const candidateImage = new Image();
    candidateImage.onload = () => resolve(currentCandidate);
    candidateImage.onerror = () => {
      loadImageCandidate(remainingCandidates).then(resolve);
    };
    candidateImage.src = `${currentCandidate}?v=20260316-7`;
  });
}

function loadVideoCandidate(videoCandidates) {
  const [currentCandidate, ...remainingCandidates] = videoCandidates;

  if (!currentCandidate) {
    return Promise.resolve("");
  }

  return new Promise((resolve) => {
    const candidateVideo = document.createElement("video");
    candidateVideo.muted = true;
    candidateVideo.playsInline = true;
    candidateVideo.preload = "metadata";
    candidateVideo.onloadeddata = () => resolve(currentCandidate);
    candidateVideo.onerror = () => {
      loadVideoCandidate(remainingCandidates).then(resolve);
    };
    candidateVideo.src = `${currentCandidate}?v=20260317-6`;
  });
}

async function showTeamFlash(teamKey) {
  const team = weddingConfig.teams[teamKey];

  if (!team || !teamFlash) {
    return;
  }

  const requestId = teamFlashRequestId + 1;
  teamFlashRequestId = requestId;
  window.clearTimeout(teamFlashTimeoutId);

  teamFlash.dataset.team = teamKey;
  teamFlashLabel.textContent = team.label;
  teamFlashName.textContent = team.name;
  teamFlashInitials.textContent = team.initials;
  teamFlashVideo.pause();
  teamFlashVideo.removeAttribute("src");
  teamFlashVideo.load();
  teamFlashVideo.hidden = false;
  teamFlashImage.hidden = true;
  teamFlashFallback.hidden = true;
  teamFlash.classList.add("has-video");
  teamFlash.classList.add("is-visible");
  teamFlash.setAttribute("aria-hidden", "false");
  document.body.classList.add("has-team-flash");
  createTeamFireworks();

  const resolvedVideo = await loadVideoCandidate(team.videoCandidates || []);
  if (requestId !== teamFlashRequestId) {
    return;
  }

  if (resolvedVideo) {
    teamFlashVideo.src = `${resolvedVideo}?v=20260317-6`;
    teamFlashVideo.play().catch(() => {});
  }

  teamFlashTimeoutId = window.setTimeout(() => {
    teamFlash.classList.remove("is-visible");
    teamFlash.classList.remove("has-video");
    teamFlash.setAttribute("aria-hidden", "true");
    teamFlashVideo.pause();
    teamFlashVideo.removeAttribute("src");
    teamFlashVideo.load();
    teamFlashImage.removeAttribute("src");
    teamFireworks.classList.remove("is-active");
    teamFireworks.replaceChildren();
    document.body.classList.remove("has-team-flash");
  }, 3000);
}

function setupTeamChoice() {
  document.addEventListener("click", (event) => {
    const choice = event.target.closest(".team-choice");

    if (!choice) {
      return;
    }

    showTeamFlash(choice.dataset.team);
  });
}

function createPetals() {
  const field = document.querySelector("#petal-field");

  for (let index = 0; index < 16; index += 1) {
    const petal = document.createElement("span");
    petal.className = "petal";
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.animationDuration = `${12 + Math.random() * 12}s`;
    petal.style.animationDelay = `${Math.random() * -16}s`;
    petal.style.opacity = `${0.22 + Math.random() * 0.4}`;
    petal.style.transform = `scale(${0.7 + Math.random() * 0.8})`;
    field.appendChild(petal);
  }
}

function createCalendarFile() {
  const events = weddingConfig.events
    .map((event) =>
      createCalendarEvent(event.calendarStart, event.calendarEnd, event.title, event.hoverCopy)
    )
    .join("\n");

  const calendar = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding Invite//EN",
    events,
    "END:VCALENDAR"
  ].join("\n");

  const blob = new Blob([calendar], { type: "text/calendar;charset=utf-8" });
  return URL.createObjectURL(blob);
}

function createCalendarEvent(start, end, summary, description) {
  return [
    "BEGIN:VEVENT",
    `UID:${summary.toLowerCase()}@weddinginvite.local`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${weddingConfig.heroLocation}`,
    "END:VEVENT"
  ].join("\n");
}

applyConfig();
setupOpeningSequence();
setupReveals();
setupDatesRollout();
setupPointerGlow();
setupParallaxCards();
setupScrollProgress();
setupSectionRail();
setupCountdown();
setupAudioToggle();
setupOurStoryScroll();
setupTeamChoice();
createPetals();
