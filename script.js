const slides = [...document.querySelectorAll(".slide")];
const dots = document.querySelector(".slide-dots");
let index = 0;

slides.forEach(() => {
  const dot = document.createElement("span");
  dot.className = "slide-dot";
  dots.appendChild(dot);
});

function placeArrows() {
  const arrows = document.querySelectorAll(".arrow");
  if (window.innerWidth > 800) {
    arrows.forEach((arrow) => arrow.style.removeProperty("top"));
    return;
  }
  const imageSlide = document.querySelector(".slide:has(> .slide-photo)") || document.querySelector(".slide:has(.slide-photo)");
  const title = imageSlide?.querySelector("h3");
  const carousel = document.querySelector(".carousel");
  if (!title || !carousel) return;
  const top = title.getBoundingClientRect().top - carousel.getBoundingClientRect().top;
  arrows.forEach((arrow) => {
    arrow.style.top = `${Math.max(0, top)}px`;
  });
}

function show(next) {
  index = (next + slides.length) % slides.length;
  slides.forEach((slide, i) => slide.classList.toggle("is-active", i === index));
  [...dots.children].forEach((dot, i) => dot.classList.toggle("is-current", i === index));
  dots.setAttribute("aria-label", `Projet ${index + 1} sur ${slides.length}`);
  placeArrows();
}

show(0);

document.querySelector(".arrow.next").addEventListener("click", () => show(index + 1));
document.querySelector(".arrow.prev").addEventListener("click", () => show(index - 1));

const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#nav");
const backdrop = document.querySelector(".nav-backdrop");

function setMenu(open) {
  nav.classList.toggle("is-open", open);
  document.body.classList.toggle("menu-open", open);
  toggle.setAttribute("aria-expanded", String(open));
}

toggle.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
backdrop.addEventListener("click", () => setMenu(false));
document.querySelector(".nav-close").addEventListener("click", () => setMenu(false));

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenu(false);
});

window.addEventListener("resize", placeArrows);
document.querySelectorAll(".slide-photo").forEach((img) => {
  img.addEventListener("load", placeArrows);
});
