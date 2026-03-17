const weddingConfig = {
  coupleNames: "Sharath & Kushalaa",
  heroLocation: "Samavana, Bengaluru",
  footerLine: "We can't wait to celebrate with you.",
  teams: {
    bride: {
      label: "Team Bride",
      name: "Kushalaa",
      initials: "K",
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
  calendarFileName: "wedding-weekend.ics",
  events: [
    {
      id: "sangeet",
      dateLabel: "May 6",
      title: "Sangeet",
      time: "Evening celebration",
      description:
        "A night of music, dance, and vibrant colors to begin the wedding weekend."
    },
    {
      id: "engagement",
      dateLabel: "May 7",
      title: "Engagement",
      time: "Morning ceremony",
      description:
        "A warm morning gathering with family and close friends to mark the engagement."
    },
    {
      id: "reception",
      dateLabel: "May 7",
      title: "Reception",
      time: "Evening celebration",
      description:
        "An elegant reception with dinner, speeches, and a luminous evening atmosphere."
    },
    {
      id: "wedding",
      dateLabel: "May 8",
      title: "Wedding",
      time: "Wedding ceremony",
      description:
        "The wedding day itself, centered on tradition, ceremony, and a joyful gathering."
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
const eventsBanner = document.querySelector("#events-banner");
const filmSection = document.querySelector("#film");
const filmVideo = document.querySelector("#film-video");
const ourStorySection = document.querySelector("#our-story");
const ourStoryTitle = document.querySelector("#our-story-title");
const storyGalleryTrack = document.querySelector("#story-gallery-track");
const continueToInviteButton = document.querySelector("#continue-to-invite");
const pointerTargets = document.querySelectorAll(".location-copy, .map-shell");
const chapterLinks = document.querySelectorAll(".chapter-link");
const teamChoices = document.querySelectorAll(".team-choice");
const teamFlash = document.querySelector("#team-flash");
const teamFlashImage = document.querySelector("#team-flash-image");
const teamFlashFallback = document.querySelector("#team-flash-fallback");
const teamFlashInitials = document.querySelector("#team-flash-initials");
const teamFlashLabel = document.querySelector("#team-flash-label");
const teamFlashName = document.querySelector("#team-flash-name");
const teamFireworks = document.querySelector("#team-fireworks");
const countdownIds = {
  days: document.querySelector("#countdown-days"),
  hours: document.querySelector("#countdown-hours"),
  minutes: document.querySelector("#countdown-minutes")
};
let calendarUrl = "";
let spotlightIntervalId = 0;
let openingSequenceCompleted = false;
let filmSequenceReady = false;
let filmAutoArrived = false;
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
  document.querySelector("#dates-headline").textContent =
    weddingConfig.events.map((event) => event.dateLabel).filter(uniqueOnly).join(" • ");
  directionsLink.href = weddingConfig.map.directionsUrl;
  mapEmbed.src = weddingConfig.map.embedUrl;
  calendarUrl = createCalendarFile();
  calendarDownloadLink.href = calendarUrl;
  calendarDownloadLink.download = weddingConfig.calendarFileName;
  weddingConfig.events.forEach((event, index) => {
    const item = document.createElement("article");
    item.className = "timeline-item reveal";
    item.dataset.eventId = event.id;
    item.tabIndex = 0;
    item.innerHTML = `
      <div class="timeline-underlay">
        <video class="timeline-underlay-video" autoplay muted playsinline preload="auto" loop>
          <source src="./assets/dinner-table.mp4?v=20260316-4" type="video/mp4" />
        </video>
        <div class="timeline-underlay-overlay"></div>
      </div>
      <div class="timeline-shutters" aria-hidden="true">
        <span class="timeline-shutter timeline-shutter-full"></span>
      </div>
      <div class="timeline-content">
        <span class="timeline-date">${event.dateLabel}</span>
        <h3>${event.title}</h3>
        <p class="timeline-time">${event.time}</p>
        <p class="timeline-description">${event.description}</p>
        <p class="timeline-hint">Hover to open this moment</p>
      </div>
    `;
    item.addEventListener("click", () => activateEvent(index));
    item.addEventListener("keydown", (keyboardEvent) => {
      if (keyboardEvent.key === "Enter" || keyboardEvent.key === " ") {
        keyboardEvent.preventDefault();
        activateEvent(index);
      }
    });
    timeline.appendChild(item);
  });

  activateEvent(0);
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

function activateEvent(index) {
  document.querySelectorAll(".timeline-item").forEach((item, itemIndex) => {
    item.classList.toggle("is-active", itemIndex === index);
  });
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

function setupSpotlightAutoplay() {
  let activeIndex = 0;

  function restartAutoplay() {
    window.clearInterval(spotlightIntervalId);
    spotlightIntervalId = window.setInterval(() => {
      activeIndex = (activeIndex + 1) % weddingConfig.events.length;
      activateEvent(activeIndex);
    }, 4200);
  }

  timeline.addEventListener("click", () => {
    activeIndex = [...document.querySelectorAll(".timeline-item")].findIndex((item) =>
      item.classList.contains("is-active")
    );
    restartAutoplay();
  });

  restartAutoplay();
}

function setupOpeningSequence() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const openingDelay = prefersReducedMotion ? 0 : 3000;
  let spotlightInteractive = false;

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

  function scrollToFilm() {
    filmSequenceReady = true;
    filmAutoArrived = false;
    filmSection.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
    filmVideo.play().catch(() => {});
    window.setTimeout(() => {
      filmAutoArrived = true;
    }, prefersReducedMotion ? 0 : 1200);
  }

  function scrollToInvitation() {
    if (openingSequenceCompleted) {
      return;
    }

    openingSequenceCompleted = true;
    ourStorySection.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start"
    });
  }

  function maybeAdvanceFromScroll() {
    if (!filmSequenceReady || !filmAutoArrived || openingSequenceCompleted) {
      return;
    }
  }

  function handleDirectionalScroll(event) {
    if (!filmSequenceReady || !filmAutoArrived || openingSequenceCompleted) {
      return;
    }

    const movingForward =
      ("deltaY" in event && event.deltaY > 0) ||
      ("key" in event &&
        ["ArrowDown", "PageDown", " ", "Enter"].includes(event.key));

    if (!movingForward) {
      return;
    }

    const filmBounds = filmSection.getBoundingClientRect();
    const isFilmVisible =
      filmBounds.top < window.innerHeight * 0.45 &&
      filmBounds.bottom > window.innerHeight * 0.45;

    if (isFilmVisible) {
      scrollToInvitation();
    }
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
  window.setTimeout(() => {
    spotlightInteractive = !prefersReducedMotion;
  }, prefersReducedMotion ? 0 : 2300);
  window.setTimeout(scrollToFilm, openingDelay);
  continueToInviteButton.addEventListener("click", scrollToInvitation);
  filmVisibilityObserver.observe(filmSection);
  window.addEventListener("wheel", handleDirectionalScroll, { passive: true });
  window.addEventListener("touchmove", maybeAdvanceFromScroll, { passive: true });
  window.addEventListener("keydown", handleDirectionalScroll);
  openingSpotlight.addEventListener("pointermove", (event) => {
    moveOpeningBeam(event.clientX, event.clientY);
  });

  window.setTimeout(() => {
    if (!openingSequenceCompleted && filmVideo.readyState < 2) {
      scrollToInvitation();
    }
  }, 9000);
}

function setupOurStoryScroll() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function updateStoryMotion() {
    const sectionRect = ourStorySection.getBoundingClientRect();
    const sectionHeight = Math.max(ourStorySection.offsetHeight - window.innerHeight, 1);
    const rawProgress = Math.min(Math.max(-sectionRect.top / sectionHeight, 0), 1);
    const titleExitProgress = Math.min(rawProgress / 0.22, 1);
    const galleryProgress = rawProgress <= 0.14 ? 0 : Math.min((rawProgress - 0.14) / 0.86, 1);
    const titleShift = prefersReducedMotion ? 0 : titleExitProgress * -120;
    const titleOpacity = prefersReducedMotion ? 1 : 1 - titleExitProgress;
    const galleryOpacity = prefersReducedMotion ? 1 : Math.min(galleryProgress * 1.35, 1);
    const galleryShift = prefersReducedMotion ? 0 : (1 - galleryOpacity) * 50;
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

function setupEventsBannerScroll() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function updateEventsBanner() {
    const rect = eventsBanner.getBoundingClientRect();
    const totalTravel = window.innerHeight + rect.height;
    const reveal = prefersReducedMotion
      ? 1
      : Math.min(Math.max((window.innerHeight - rect.top) / totalTravel, 0), 1);
    const easedReveal = reveal * 0.82;
    const shift = 44 * easedReveal;
    const opacity = 1 - reveal * 0.08;

    eventsBanner.style.setProperty("--events-banner-shift", `${shift}vw`);
    eventsBanner.style.setProperty("--events-banner-opacity", `${opacity}`);
    eventsBanner.style.setProperty("--events-banner-open", `${easedReveal}`);
  }

  updateEventsBanner();
  window.addEventListener("scroll", updateEventsBanner, { passive: true });
  window.addEventListener("resize", updateEventsBanner);
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
  teamFlashImage.hidden = true;
  teamFlashFallback.hidden = false;
  teamFlash.classList.add("is-visible");
  teamFlash.setAttribute("aria-hidden", "false");
  document.body.classList.add("has-team-flash");
  createTeamFireworks();

  const resolvedImage = await loadImageCandidate(team.imageCandidates);
  if (requestId !== teamFlashRequestId) {
    return;
  }

  if (resolvedImage) {
    teamFlashImage.src = `${resolvedImage}?v=20260316-7`;
    teamFlashImage.alt = team.name;
    teamFlashImage.hidden = false;
    teamFlashFallback.hidden = true;
  }

  teamFlashTimeoutId = window.setTimeout(() => {
    teamFlash.classList.remove("is-visible");
    teamFlash.setAttribute("aria-hidden", "true");
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
  const events = [
    createCalendarEvent(
      "20260506T190000",
      "20260506T230000",
      "Sangeet",
      "Sangeet celebration"
    ),
    createCalendarEvent(
      "20260507T100000",
      "20260507T120000",
      "Engagement",
      "Morning engagement ceremony"
    ),
    createCalendarEvent(
      "20260507T190000",
      "20260507T230000",
      "Reception",
      "Evening reception"
    ),
    createCalendarEvent(
      "20260508T110000",
      "20260508T150000",
      "Wedding",
      "Wedding ceremony"
    )
  ].join("\n");

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
setupPointerGlow();
setupParallaxCards();
setupScrollProgress();
setupSectionRail();
setupSpotlightAutoplay();
setupCountdown();
setupAudioToggle();
setupEventsBannerScroll();
setupOurStoryScroll();
setupTeamChoice();
createPetals();
