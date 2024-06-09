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
    landing.style.backgroundImage = `url("./images/slider/bg${1 + i++}.jpg")`;
    if (i === 3) {
      rightSlider.style.cursor = "auto";
    }
  }
});

leftSlider.addEventListener("click", () => {
  if (i > 1 && i <= 3) {
    m(ul, i - 2);
    rightSlider.style.cursor = "pointer";
    landing.style.backgroundImage = `url("./images/slider/bg${i-- - 1}.jpg")`;
    if (i === 1) {
      leftSlider.style.cursor = "auto";
    }
  }
});

//end slider
//start active in landing classes
let ul = document.querySelectorAll(".landing .shape li");
ul.forEach((li) => {
  li.addEventListener("click", () => {
    ul.forEach((li) => {
      li.classList.remove("active");
    });
    i = parseInt(li.getAttribute("index"));
    ul[i - 1].classList.add("active");
    if (i - 1 === 2) {
      rightSlider.style.cursor = "auto";
      leftSlider.style.cursor = "pointer";
    } else if (i - 1 === 0) {
      leftSlider.style.cursor = "auto";
    } else {
      rightSlider.style.cursor = "pointer";
      leftSlider.style.cursor = "pointer";
    }
    landing.style.backgroundImage = `url("./images/slider/bg${i}.jpg")`;
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
