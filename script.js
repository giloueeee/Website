const slides = [...document.querySelectorAll(".slide")];
const dots = document.querySelector(".slide-dots");
let index = 0;

slides.forEach(() => {
  const dot = document.createElement("span");
  dot.className = "slide-dot";
  dots.appendChild(dot);
});

function show(next) {
  index = (next + slides.length) % slides.length;
  slides.forEach((slide, i) => slide.classList.toggle("is-active", i === index));
  [...dots.children].forEach((dot, i) => dot.classList.toggle("is-current", i === index));
  dots.setAttribute("aria-label", `Projet ${index + 1} sur ${slides.length}`);
}

show(0);

document.querySelector(".arrow.next").addEventListener("click", () => show(index + 1));
document.querySelector(".arrow.prev").addEventListener("click", () => show(index - 1));

const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#nav");

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(open));
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  });
});
