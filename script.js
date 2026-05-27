const text = "Every moment with you feels timeless ❤️";

let i = 0;
let musicStarted = false;
let currentSlide = 0;

/* 🔐 CONFIG */
const PASSWORD = "moncheri";
const unlockTime = new Date("2026-06-06T00:00:00").getTime();

/* =========================
   COUNTDOWN TIMER
========================= */

setInterval(() => {
  const now = Date.now();
  const distance = unlockTime - now;

  const el = document.getElementById("countdown");
  if (!el) return;

  if (distance <= 0) {
    el.innerHTML = "🎉 It's time! Happy Birthday ❤️";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  el.innerHTML =
    `${days}d ${hours}h ${minutes}m ${seconds}s`;
}, 1000);

/* =========================
   UNLOCK SYSTEM
========================= */

function unlockExperience() {
  const input = document.getElementById("password").value;

  if (Date.now() < unlockTime) {
    alert("⏳ Not her birthday yet ❤️");
    return;
  }

  if (input === PASSWORD) {
    const lock = document.getElementById("lock-screen");
    if (lock) lock.style.display = "none";
  } else {
    alert("❌ Wrong password");
  }
}

/* =========================
   START EXPERIENCE
========================= */

function startExperience() {
  document.querySelector(".intro").style.display = "none";
  document.getElementById("main-content").classList.remove("hidden");

  startMusic();
  typeWriter();
  launchConfetti();
  startSlideshow();
}

/* =========================
   TYPEWRITER EFFECT
========================= */

function typeWriter() {
  const el = document.querySelector(".typing-text");

  if (!el) return;

  if (i < text.length) {
    el.innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, 80);
  }
}

/* =========================
   MUSIC SYSTEM
========================= */

function startMusic() {
  const music = document.getElementById("bg-music");

  if (!music) {
    console.error("Music element not found!");
    return;
  }

  music.volume = 0.5;

  music.play().then(() => {
    musicStarted = true;
  }).catch(() => {
    document.body.addEventListener(
      "click",
      () => {
        if (!musicStarted) {
          music.play().then(() => {
            musicStarted = true;
          });
        }
      },
      { once: true }
    );
  });
}

/* =========================
   CINEMATIC SLIDESHOW
========================= */

function startSlideshow() {
  const slides = document.querySelectorAll(".gallery .slide");

  if (!slides.length) return;

  setInterval(() => {
    slides[currentSlide].classList.remove("active");

    currentSlide = (currentSlide + 1) % slides.length;

    slides[currentSlide].classList.add("active");
  }, 3000);
}

/* =========================
   CONFETTI
========================= */

function launchConfetti() {
  if (typeof confetti !== "function") return;

  confetti({
    particleCount: 200,
    spread: 120,
    origin: { y: 0.6 }
  });
}