// Preload images
const preloadedImages = [];
for (let j = 1; j <= 3; j++) {
  const img = new Image();
  img.src = `./images/slider/bg${j}.jpg`;
  preloadedImages.push(img);
}

const landing = document.querySelector(".landing");
const rightSlider = document.querySelector(".right-click");
const leftSlider = document.querySelector(".left-click");
let i = 2;

// Update active class
function updateActiveClass(ul, index) {
  ul.forEach((li) => li.classList.remove("active"));
  ul[index].classList.add("active");
}

// Slider event listeners
rightSlider.addEventListener("click", () => {
  if (i < 2) {
    updateActiveClass(ul, i + 1);
    landing.style.backgroundImage = `url("${preloadedImages[i + 1].src}")`;
    i++;
    leftSlider.style.cursor = "pointer";
    if (i === 2) rightSlider.style.cursor = "auto";
  }
});

leftSlider.addEventListener("click", () => {
  if (i > 1) {
    updateActiveClass(ul, i - 2);
    landing.style.backgroundImage = `url("${preloadedImages[i - 1].src}")`;
    i--;
    rightSlider.style.cursor = "pointer";
    if (i === 1) leftSlider.style.cursor = "auto";
  }
});

// Update slider on click
const ul = document.querySelectorAll(".landing .shape li");
ul.forEach((li) => {
  li.addEventListener("click", () => {
    const index = parseInt(li.getAttribute("index")) - 1;
    updateActiveClass(ul, index);
    i = index;
    landing.style.backgroundImage = `url("${preloadedImages[i].src}")`;
    rightSlider.style.cursor = i === 2 ? "auto" : "pointer";
    leftSlider.style.cursor = i === 0 ? "auto" : "pointer";
  });
});

// Portfolio filter
const portfolioLis = document.querySelectorAll(".portfolio nav ul li");
const portfolioDivs = document.querySelectorAll(".gallary .com");

portfolioLis.forEach((li) => {
  li.addEventListener("click", () => {
    portfolioLis.forEach((li) => li.classList.remove("active"));
    portfolioDivs.forEach((div) => div.style.display = "none");
    li.classList.add("active");
    document.querySelectorAll(li.dataset.kind).forEach((div) => {
      div.style.display = "flex";
    });
  });
});

// Counter using Intersection Observer
const countDiv = document.querySelector(".count");
const targetEls = document.querySelectorAll(".count .items .numbers h1");

const countUp = (ele) => {
  const targetNum = parseInt(ele.dataset.count, 10);
  let currentNum = 0;
  const interval = setInterval(() => {
    if (currentNum >= targetNum) {
      clearInterval(interval);
    } else {
      ele.textContent = ++currentNum;
    }
  }, 2000 / targetNum);
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      targetEls.forEach(countUp);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

observer.observe(countDiv);

// Navigation link active
const header = document.querySelector("header");
const sections = document.querySelectorAll(".section");
const navLinks = document.querySelectorAll(".parent .container nav ul li a");

window.addEventListener("scroll", () => {
  header.classList.toggle("active", window.scrollY > 0);

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= sectionTop - 100) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.classList.contains(`${current}-link`));
  });
});

// Mobile menu toggle
const bar = document.querySelector(".bar1");
bar.addEventListener("click", () => {
  document.querySelector(".links").classList.toggle("active");
  bar.classList.toggle("active");
});
