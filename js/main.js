// image preloaded
let preloadedImages = [];
for (let j = 1; j <= 3; j++) {
  let img = new Image();
  img.src = `./images/slider/bg${j}.jpg`;
  preloadedImages.push(img);
}

let landing = document.querySelector(".landing");
let rightSlider = document.querySelector(".right-click");
let leftSlider = document.querySelector(".left-click");
let i = 2;
function m(ul, index) {
  ul.forEach((li) => {
    li.classList.remove("active");
  });
  ul[index].classList.add("active");
}

rightSlider.addEventListener("click", () => {
  if (i >= 1 && i <= 2) {
    leftSlider.style.cursor = "pointer";
    m(ul, i);
    landing.style.backgroundImage = `url("${preloadedImages[i].src}")`;
    if (i === 2) {
      rightSlider.style.cursor = "auto";
    }
    i++;
  }
});

leftSlider.addEventListener("click", () => {
  if (i > 1 && i <= 3) {
    m(ul, i - 2);
    rightSlider.style.cursor = "pointer";
    landing.style.backgroundImage = `url("${preloadedImages[i - 2].src}")`;
    if (i === 2) {
      leftSlider.style.cursor = "auto";
    }
    i--;
  }
});

let ul = document.querySelectorAll(".landing .shape li");
ul.forEach((li) => {
  li.addEventListener("click", () => {
    ul.forEach((li) => {
      li.classList.remove("active");
    });
    i = parseInt(li.getAttribute("index")) - 1;
    ul[i].classList.add("active");
    if (i === 2) {
      rightSlider.style.cursor = "auto";
      leftSlider.style.cursor = "pointer";
    } else if (i === 0) {
      leftSlider.style.cursor = "auto";
    } else {
      rightSlider.style.cursor = "pointer";
      leftSlider.style.cursor = "pointer";
    }
    landing.style.backgroundImage = `url("${preloadedImages[i].src}")`;
  });
});

//end active classes

// start portfolio
//add active and show elements
let portfolioLis = document.querySelectorAll(".portfolio nav ul li"),
  portfolioDivs = document.querySelectorAll(".gallary .com");
portfolioLis.forEach((li) => {
  li.addEventListener("click", () => {
    portfolioLis.forEach((li) => {
      li.classList.remove("active");
    }),
      portfolioDivs.forEach((div) => {
        div.style.display = "none";
      }),
      li.classList.add("active");
    document.querySelectorAll(li.dataset.kind).forEach((div) => {
      div.style.display = "flex";
    });
  });
});
// end portfolio
// start count
let countDiv = document.querySelector(".count");
let targetEls = document.querySelectorAll(".count .items .numbers h1");
let run = true;
const couterMethod = (ele) => {
  let targetNum = ele.dataset.count;
  const inter = setInterval(() => {
    ele.textContent++;
    if (ele.textContent == targetNum) {
      clearInterval(inter);
    }
  }, 2000 / targetNum);
};
window.onscroll = () => {
  if (window.scrollY >= countDiv.offsetTop - 500) {
    if (run) {
      targetEls.forEach((ele) => couterMethod(ele));
    }
    run = false;
  }
};
// end count

//links active
let links = document.querySelectorAll(".links li a");
links.forEach((link) => {
  link.addEventListener("click", () => {
    links.forEach((link) => {
      link.classList.remove("active");
    });
    link.classList.add("active");
  });
});
//end links active

// start making header and nav links flexible

let header = document.querySelector("header");
let sections = document.querySelectorAll(".section");
const navLinks = document.querySelectorAll(".parent .container nav ul li a");
window.onscroll = () => {
  if (window.scrollY > 0) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }

  var current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (scrollY >= sectionTop - 100) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.classList.contains(current + "-link")) {
      link.classList.add("active");
    }
  });
};
// end header & nav links

// start bar menu
let bar = document.querySelector(".bar1");

bar.addEventListener("click", () => {
  document.querySelector(".links").classList.toggle("active");
  bar.classList.toggle("active");
});
