const WEDDING_DATE = new Date("2027-01-03T11:30:00+05:30");
// Add a Google Form URL here to connect the RSVP form before publishing.
// Example: const RSVP_FORM_URL = "https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform";
const RSVP_FORM_URL = "";

const music = document.getElementById("weddingMusic");
const musicToggle = document.getElementById("musicToggle");
const musicLabel = document.getElementById("musicLabel");
musicToggle.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicToggle.setAttribute("aria-pressed", "true");
      musicLabel.textContent = "Music on";
    } catch {
      musicLabel.textContent = "Tap to retry";
    }
  } else {
    music.pause();
    musicToggle.setAttribute("aria-pressed", "false");
    musicLabel.textContent = "Music off";
  }
});

function updateCountdown() {
  const distance = WEDDING_DATE.getTime() - Date.now();
  if (distance <= 0) {
    document.getElementById("countdown").innerHTML = "<p class='countdown-ended'>Today is the day. Let the celebration begin!</p>";
    return;
  }
  const values = {
    days: Math.floor(distance / 86400000),
    hours: Math.floor((distance % 86400000) / 3600000),
    minutes: Math.floor((distance % 3600000) / 60000),
    seconds: Math.floor((distance % 60000) / 1000)
  };
  Object.entries(values).forEach(([id, value]) => {
    document.getElementById(id).textContent = String(value).padStart(2, "0");
  });
}
updateCountdown();
setInterval(updateCountdown, 1000);

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {threshold: 0.12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
document.querySelectorAll(".photo").forEach(button => {
  button.addEventListener("click", () => {
    lightboxImage.src = button.dataset.full;
    lightbox.showModal();
  });
});
document.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());
lightbox.addEventListener("click", event => {
  if (event.target === lightbox) lightbox.close();
});

const currentUrl = window.location.href.split("#")[0];
const qr = document.getElementById("qrCode");
qr.src = "https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=8&data=" + encodeURIComponent(currentUrl);

const shareText = "You're invited to celebrate the wedding of Santwana & Neeraj on Sunday, 3 January 2027 at Kuthuparamba Rural Bank Auditorium. We would love to have you with us: " + currentUrl;
document.getElementById("shareButton").addEventListener("click", () => {
  window.open("https://wa.me/?text=" + encodeURIComponent(shareText), "_blank", "noopener");
});
document.getElementById("copyLink").addEventListener("click", async event => {
  try {
    await navigator.clipboard.writeText(currentUrl);
    event.currentTarget.textContent = "Link copied ✓";
  } catch {
    window.prompt("Copy your invitation link:", currentUrl);
  }
});

document.getElementById("rsvpForm").addEventListener("submit", event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const name = data.get("guestName").trim();
  const attendance = data.get("attendance");
  const guests = data.get("guests");
  const message = data.get("message").trim();
  const status = document.getElementById("rsvpStatus");
  if (!name || !attendance) {
    status.textContent = "Please add your name and attendance response.";
    return;
  }
  if (RSVP_FORM_URL) {
    const query = new URLSearchParams({name, attendance, guests, message});
    window.open(RSVP_FORM_URL + (RSVP_FORM_URL.includes("?") ? "&" : "?") + query.toString(), "_blank", "noopener");
    status.textContent = "Your RSVP form has opened in a new tab. Please submit it there.";
  } else {
    const summary = `Wedding RSVP — Santwana & Neeraj\nName: ${name}\nResponse: ${attendance}\nGuests: ${guests}\nMessage: ${message || "—"}`;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(summary).then(() => {
        status.textContent = "Your RSVP details have been copied. The couple's RSVP collection link still needs to be connected before publishing.";
      }).catch(() => {
        status.textContent = "Please connect a Google Form or form service to receive RSVPs. See README.";
      });
    } else {
      status.textContent = "Please connect a Google Form or form service to receive RSVPs. See README.";
    }
  }
});