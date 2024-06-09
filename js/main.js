document.addEventListener("DOMContentLoaded", () => {
  const landing = document.querySelector(".landing");
  const rightSlider = document.querySelector(".right-click");
  const leftSlider = document.querySelector(".left-click");
  let i = 2;

  const ul = document.querySelectorAll(".landing .shape li");
  const portfolioLis = document.querySelectorAll(".portfolio nav ul li");
  const portfolioDivs = document.querySelectorAll(".gallary .com");
  const countDiv = document.querySelector(".count");
  const targetEls = document.querySelectorAll(".count .items .numbers h1");
  let run = true;

  const updateSliderCursor = () => {
    rightSlider.style.cursor = i === 3 ? "auto" : "pointer";
    leftSlider.style.cursor = i === 1 ? "auto" : "pointer";
  };

  const changeBackgroundImage = () => {
    landing.style.backgroundImage = `url("./images/slider/bg${i}.jpg")`;
  };

  const updateActiveClass = (elements, index) => {
    elements.forEach((element, idx) => {
      element.classList.toggle("active", idx === index);
    });
  };

  rightSlider.addEventListener("click", () => {
    if (i >= 1 && i < 3) {
      updateActiveClass(ul, i);
      i++;
      changeBackgroundImage();
      updateSliderCursor();
    }
  });

  leftSlider.addEventListener("click", () => {
    if (i > 1 && i <= 3) {
      i--;
      updateActiveClass(ul, i - 1);
      changeBackgroundImage();
      updateSliderCursor();
    }
  });

  ul.forEach((li, index) => {
    li.addEventListener("click", () => {
      i = index + 1;
      updateActiveClass(ul, index);
      changeBackgroundImage();
      updateSliderCursor();
    });
  });

  portfolioLis.forEach((li) => {
    li.addEventListener("click", () => {
      const kind = li.dataset.kind;
      portfolioLis.forEach((li) => li.classList.remove("active"));
      portfolioDivs.forEach((div) => div.style.display = "none");

      li.classList.add("active");
      document.querySelectorAll(kind).forEach((div) => div.style.display = "flex");
    });
  });

  const counterMethod = (ele) => {
    const targetNum = parseInt(ele.dataset.count, 10);
    let currentNum = 0;
    const increment = Math.ceil(targetNum / 200); // Adjust the speed here

    const inter = setInterval(() => {
      currentNum += increment;
      if (currentNum >= targetNum) {
        ele.textContent = targetNum;
        clearInterval(inter);
      } else {
        ele.textContent = currentNum;
      }
    }, 10); // Adjust the interval time here
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY >= countDiv.offsetTop - 500) {
      if (run) {
        targetEls.forEach((ele) => counterMethod(ele));
      }
      run = false;
    }
  });
});
