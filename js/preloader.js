
//анімація пролоадера картінкі

const helloImgElem = document.querySelector(".hello__img img");

function preloader() {
  if (window.innerWidth > 900) {
    const preloaderImgElem = document.querySelector("#preloader img");
    gsap.to(preloaderImgElem, {
      duration: 1,
      left: helloImgElem.offsetLeft,
      top: helloImgElem.offsetTop,
      width: helloImgElem.width,
      opacity: 1,
    });

    gsap.to(preloaderImgElem.parentElement, {
      duration: 2,
      background: "transparent",
      display: "none",
    });

    document.body.classList.remove("lock");
  }
}

if (window.innerWidth < 900) {
  document.querySelector("#preloader").style.display = "none";
  document.body.classList.remove("lock");
}

setTimeout(preloader, 6000);

function changeImgPreloaderTheme(theme) {
  if (theme) {
    helloImgElem.src = "./images/welcome-dark.png";
  } else {
    helloImgElem.src = "./images/welcome-white.png";
  }
}

changeImgPreloaderTheme(getLocalSrorage("theme"));
