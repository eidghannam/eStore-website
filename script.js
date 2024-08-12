"use strict";

//! Page Navigation

//& Event Delegation
//~ 1. Add event listener to common parent element
//~ 2. Determine what element originated the event
document.querySelector(".nav-links").addEventListener("click", function (e) {
  e.preventDefault();

  //~ Matching Strategy

  if (e.target.classList.contains("nav-link")) {
    const id = e.target.getAttribute("href");
    // console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

//! Reveal sections
const allSections = document.querySelectorAll("section");

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

//! Sticky navigation: Intersection Observer API
const nav = document.querySelector(".nav");
const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

//! Dark Theme
// const body = document.body;
const toggleSwitch = document.querySelector('.switch input[type="checkbox"]');

function $(querySelector) {
  return document.querySelector(querySelector);
}

toggleSwitch.addEventListener("change", function () {
  if (this.checked) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
});
