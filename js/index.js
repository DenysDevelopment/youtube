"user strict";

//получаєм переключатель теми
const switchThemeElem = document.querySelector(".switch");

//установлення теми після загрузкі сторінкі
function setLocalTheme() {
  if (JSON.parse(localStorage.getItem("theme"))) {
    //для боді добавляю класс, щоб можна було управляти в стилях і js якщо треба буде
    document.body.classList.add("theme-toggle");
  }
}
setLocalTheme(localStorage.getItem("theme"));

const helloImgElem = document.querySelector(".hello__img img");

function changeImgPreloaderTheme(theme) {
  if (theme) {
    helloImgElem.src = "./images/welcome-dark.png";
  } else {
    helloImgElem.src = "./images/welcome-white.png";
  }
}
changeImgPreloaderTheme(localStorage.getItem("theme"));

function preloader() {
  gsap.to(helloImgElem, {
    duration: 1,
    opacity: 1,
  });

  function animationImgPreloader() {
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

  setTimeout(animationImgPreloader, 6000);
}

if (localStorage.getItem("loggined") === null) {
  preloader();
  localStorage.setItem("loggined", true);
} else {
  helloImgElem.style.opacity = 1;
  document.body.classList.remove("lock");
  document.querySelector("#preloader").remove();
}

//переключатель тем
function changeImgPreloaderTheme(theme) {
  if (theme) {
    helloImgElem.src = "./images/welcome-dark.png";
  } else {
    helloImgElem.src = "./images/welcome-white.png";
  }
}

function handlerThemeInstall(theme) {
  if (!theme) {
    switchThemeElem.classList.add("_dark");
  }
}
handlerThemeInstall(localStorage.getItem("theme"));

switchThemeElem.addEventListener("change", () => {
  if (document.body.classList.contains("theme-toggle")) {
    document.body.classList.remove("theme-toggle");
    changeImgPreloaderTheme(false);
    console.log(true);
    localStorage.removeItem("theme");
    switchThemeElem.classList.remove("_dark");
  } else {
    document.body.classList.add("theme-toggle");
    localStorage.setItem("theme", true);
    changeImgPreloaderTheme(true);
  }
});

function formatingNumber(number) {
  return Number(number).toLocaleString({ style: "percent" });
}





//модалка
class Modal {
  constructor(opts = {}) {
    this.targetElem = opts.targetElem;
    this.selectorOut = opts.selectorOut;
    this.html = opts.html;
  }

  init() {
    console.log(this)
    document.querySelector(this.targetElem).addEventListener('click', this.create);
  }

  create() {    
    const afterElem = document.querySelector(this.selectorOut);
    const modalElem = document.createElement('div')
    const overlayElem = document.createElement('div')
    const bodyElem = document.createElement('div')
    const closeBtnElem = document.createElement('button')

    closeBtnElem.innerText = '×';

    modalElem.classList.add('modal');
    overlayElem.classList.add('modal__overlay');
    bodyElem.classList.add('modal__body');
    closeBtnElem.classList.add('modal__close');

    afterElem.insertAdjacentElement('afterbegin',modalElem);
    modalElem.append(overlayElem);
    modalElem.append(bodyElem);
    bodyElem.append(closeBtnElem);
    bodyElem.innerHTML += this.html;

    document.querySelector('.modal__close').addEventListener('click', this.close);

  }

  close() {
    document.querySelector('.modal').remove();
  }
  
}


// example for created modal
const modal = new Modal({
  targetElem: '.header__add',
  selectorOut: "body",
  html: 'htmlToModal()',
});

const addBtnElem = document.querySelector('.header__add');

addBtnElem.addEventListener('click', modal.create);