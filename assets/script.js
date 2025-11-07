const data = {
  testimonials: [
    {
      quote:
        "Every walk is a mini adventure! Pepper comes home calm, happy, and ready for a nap. I love the photo updates after each outing.",
      name: "Isabella, Pepper's mom",
    },
    {
      quote:
        "Sasha treats my pup like her own. The one-dog-at-a-time promise means Moose gets undivided attention and tailored routes.",
      name: "Devon, Moose's dad",
    },
    {
      quote:
        "From the welcome note to the cool-down stretches, Luxe Leash Walks is thoughtful in every detail. Finn adores his weekday strolls!",
      name: "Monica, Finn's human",
    },
  ],
  schedule: [
    { time: "7:00 AM", description: "Sunrise Sniffs & Stretches", mood: "Early bird adventures to energize the day." },
    { time: "11:30 AM", description: "Midday Mindful Meander", mood: "Gentle neighborhood exploration with mindful breaks." },
    { time: "3:00 PM", description: "Golden Hour Gallivant", mood: "Park play, mental games, and tailored enrichment." },
    { time: "6:30 PM", description: "Twilight Tail Trail", mood: "Sunset stroll with calming cues and paw massages." },
  ],
};

const navLinks = document.querySelectorAll(".nav-links a");
const activePage = document.body.dataset.page;

navLinks.forEach((link) => {
  const isActive = activePage && link.getAttribute("href").includes(activePage);
  if (isActive) {
    link.classList.add("active");
  }
});

const footerYear = document.querySelector(".current-year");
if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}

const testimonialsContainer = document.querySelector("[data-testimonials]");
if (testimonialsContainer) {
  data.testimonials.forEach((item) => {
    const card = document.createElement("article");
    card.className = "testimonial-card";
    card.innerHTML = `<p>${item.quote}</p><strong>${item.name}</strong>`;
    testimonialsContainer.appendChild(card);
  });
}

const scheduleContainer = document.querySelector("[data-schedule]");
if (scheduleContainer) {
  data.schedule.forEach((slot) => {
    const row = document.createElement("div");
    row.className = "schedule-slot";
    row.innerHTML = `<div><strong>${slot.time}</strong><span>${slot.description}</span></div><span>${slot.mood}</span>`;
    scheduleContainer.appendChild(row);
  });
}

const faqItems = document.querySelectorAll(".faq-item");
faqItems.forEach((item) => {
  const answer = item.querySelector(".faq-answer");
  const question = item.querySelector(".faq-question");
  if (!answer || !question) return;

  question.addEventListener("click", () => {
    const isOpen = answer.classList.contains("open");
    faqItems.forEach((other) => {
      if (other !== item) {
        const otherAnswer = other.querySelector(".faq-answer");
        otherAnswer?.classList.remove("open");
        otherAnswer?.style.setProperty("max-height", 0);
      }
    });

    if (!isOpen) {
      answer.classList.add("open");
      answer.style.setProperty("max-height", `${answer.scrollHeight}px`);
    } else {
      answer.classList.remove("open");
      answer.style.setProperty("max-height", 0);
    }
  });
});

const gallery = document.querySelector("[data-gallery]");
if (gallery) {
  const galleryImages = [
    {
      src: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=900&q=80",
      alt: "Dog and walker silhouetted against a Hyde sunset",
      caption: "Sunset cool-down at Werneth Low",
    },
    {
      src: "https://images.unsplash.com/photo-1525253013412-55b77772e44f?auto=format&fit=crop&w=900&q=80",
      alt: "Walker greeting a golden retriever on a Hyde doorstep",
      caption: "Friendly pick-ups across Hyde & Denton",
    },
    {
      src: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80",
      alt: "Calm dog waiting on a Denton pavement",
      caption: "Patient pals ready for their walk",
    },
    {
      src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
      alt: "Dog bounding through long grass",
      caption: "Weekend zoomies on open trails",
    },
  ];

  galleryImages.forEach(({ src, alt, caption }) => {
    const item = document.createElement("figure");
    item.className = "gallery-item";
    item.innerHTML = `<img src="${src}" alt="${alt}" loading="lazy" />${caption ? `<figcaption>${caption}</figcaption>` : ""}`;
    gallery.appendChild(item);
  });
}

const highlights = document.querySelectorAll("[data-highlight]");
if ("IntersectionObserver" in window && highlights.length) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  highlights.forEach((el) => observer.observe(el));
} else {
  highlights.forEach((el) => el.classList.add("reveal"));
}
