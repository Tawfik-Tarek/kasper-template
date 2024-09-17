// Preload images
function preloadImages(imagePaths) {
  const preloadedImages = [];
  imagePaths.forEach((path) => {
    const img = new Image();
    img.src = path;
    preloadedImages.push(img);
  });
  return preloadedImages;
}

const imagePaths = ['./images/slider/bg1.jpg', './images/slider/bg2.jpg', './images/slider/bg3.jpg'];
const preloadedImages = preloadImages(imagePaths);

// Update active class on elements
function updateActiveClass(elements, index) {
  elements.forEach((el) => el.classList.remove("active"));
  elements[index].classList.add("active");
}

// Change slider background image
function changeSliderBackground(index, elements, landingElement) {
  updateActiveClass(elements, index);
  landingElement.style.backgroundImage = `url("${preloadedImages[index].src}")`;
}

// Slider navigation
function setupSliderNavigation(rightSlider, leftSlider, landing, ul) {
  let currentIndex = 1; 

  rightSlider.addEventListener("click", () => handleSliderNavigation(1));
  leftSlider.addEventListener("click", () => handleSliderNavigation(-1));

  function handleSliderNavigation(direction) {
    const newIndex = currentIndex + direction;

    // Ensure the index stays within the bounds
    if (newIndex >= 0 && newIndex < preloadedImages.length) {
      changeSliderBackground(newIndex, ul, landing);
      currentIndex = newIndex;
      updateSliderCursor(rightSlider, leftSlider, currentIndex);
    }
  }
}

// Update slider cursors based on index
function updateSliderCursor(rightSlider, leftSlider, currentIndex) {
  rightSlider.style.cursor = currentIndex === preloadedImages.length - 1 ? "auto" : "pointer";
  leftSlider.style.cursor = currentIndex === 0 ? "auto" : "pointer";
}

// Setup individual slider item click
function setupSliderItemsClick(ul, landing) {
  ul.forEach((li, index) => {
    li.addEventListener("click", () => {
      changeSliderBackground(index, ul, landing);
      updateSliderCursor(rightSlider, leftSlider, index);
    });
  });
}

// Portfolio filter logic
function setupPortfolioFilter(portfolioLis, portfolioDivs) {
  portfolioLis.forEach((li) => {
    li.addEventListener("click", () => {
      filterPortfolio(li, portfolioLis, portfolioDivs);
    });
  });
}

function filterPortfolio(clickedLi, allLis, allDivs) {
  allLis.forEach((li) => li.classList.remove("active"));
  allDivs.forEach((div) => div.style.display = "none");

  clickedLi.classList.add("active");
  document.querySelectorAll(clickedLi.dataset.kind).forEach((div) => {
    div.style.display = "flex";
  });
}

// Counter using Intersection Observer
function setupCounterObserver(targetDiv, targetEls) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        targetEls.forEach(countUp);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  observer.observe(targetDiv);
}

function countUp(ele) {
  const targetNum = parseInt(ele.dataset.count, 10);
  let currentNum = 0;
  const interval = setInterval(() => {
    if (currentNum >= targetNum) {
      clearInterval(interval);
    } else {
      ele.textContent = ++currentNum;
    }
  }, 2000 / targetNum);
}

// Navigation link active state on scroll
function setupScrollListener(header, sections, navLinks) {
  window.addEventListener("scroll", () => {
    toggleHeaderActive(header);
    updateActiveNavLink(sections, navLinks);
  });
}

function toggleHeaderActive(header) {
  header.classList.toggle("active", window.scrollY > 0);
}

function updateActiveNavLink(sections, navLinks) {
  let currentSectionId = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= sectionTop - 100) {
      currentSectionId = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.classList.contains(`${currentSectionId}-link`));
  });
}

// Mobile menu toggle
function setupMobileMenuToggle(bar, menu) {
  bar.addEventListener("click", () => {
    menu.classList.toggle("active");
    bar.classList.toggle("active");
  });
}

// Initialize all components
document.addEventListener("DOMContentLoaded", () => {
  const landing = document.querySelector(".landing");
  const rightSlider = document.querySelector(".right-click");
  const leftSlider = document.querySelector(".left-click");
  const ul = document.querySelectorAll(".landing .shape li");

  landing.style.backgroundImage = `url("${preloadedImages[1].src}")`;

  setupSliderNavigation(rightSlider, leftSlider, landing, ul);
  setupSliderItemsClick(ul, landing);

  const portfolioLis = document.querySelectorAll(".portfolio nav ul li");
  const portfolioDivs = document.querySelectorAll(".gallary .com");
  setupPortfolioFilter(portfolioLis, portfolioDivs);

  const countDiv = document.querySelector(".count");
  const targetEls = document.querySelectorAll(".count .items .numbers h1");
  setupCounterObserver(countDiv, targetEls);

  const header = document.querySelector("header");
  const sections = document.querySelectorAll(".section");
  const navLinks = document.querySelectorAll(".parent .container nav ul li a");
  setupScrollListener(header, sections, navLinks);

  const bar = document.querySelector(".bar1");
  const mobileMenu = document.querySelector(".links");
  setupMobileMenuToggle(bar, mobileMenu);
});
