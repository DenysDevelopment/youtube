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
    console.log(this);
    document
      .querySelector(this.targetElem)
      .addEventListener("click", this.create);
  }

  create() {
    const afterElem = document.querySelector(this.selectorOut);
    const modalElem = document.createElement("div");
    const overlayElem = document.createElement("div");
    const bodyElem = document.createElement("div");
    const closeBtnElem = document.createElement("button");

    closeBtnElem.innerText = "×";

    document.body.classList.add("lock");

    modalElem.classList.add("modal");
    overlayElem.classList.add("modal__overlay");
    bodyElem.classList.add("modal__body");
    closeBtnElem.classList.add("modal__close");

    afterElem.insertAdjacentElement("afterbegin", modalElem);
    modalElem.append(overlayElem);
    modalElem.append(bodyElem);
    bodyElem.append(closeBtnElem);
    bodyElem.innerHTML += this.html;

    document
      .querySelector(".modal__close")
      .addEventListener("click", this.close);

    document.querySelector(".modal__overlay").addEventListener("click", () => {
      document.querySelector(".modal").remove();
    });

    //========================================================================================================================================================
    let data;

    function loadClient() {
      gapi.client.setApiKey("AIzaSyCMQPA4JFFHpFPK-sr00Z6YRHeyJr-3_iA");
      return gapi.client
        .load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(
          function () {
            console.log("ok");
          },
          function (err) {
            console.error("Error loading GAPI client for API", err);
          }
        );
    }

    function execute() {
      loadClient();
      return gapi.client.youtube.channels
        .list({
          part: ["snippet,contentDetails,statistics"],
          // id: ["UC_x5XG1OV2P6uZZ5FSM9Ttw"],
          id: [document.querySelector(".input-card").value],
        })
        .then(
          function (response) {
            data = JSON.parse(response.body);
          },
          function (err) {
            console.error("Execute error", err);
          }
        );
    }
    gapi.load("client:auth2");

    //========================================================================================================================================================
    let cards = [];

    if (localStorage.getItem("cards")) {
      cards = JSON.parse(localStorage.getItem("cards"));
    }

    document.querySelector(".add-card").addEventListener("click", () => {
      cards.push(document.querySelector(".input-card").value);
      localStorage.setItem("cards", JSON.stringify(cards));
      console.log(cards);
    });
  }

  close() {
    document.querySelector(".modal").remove();
  }
}

// example for created modal

const addBtnElem = document.querySelector(".header__add");

addBtnElem.addEventListener("click", () => {
  new Modal({
    targetElem: ".header__add",
    selectorOut: "body",
    html: htmlToModal(),
  }).create();
});

function htmlToModal() {
  return `<input class='input-card' type='text' placeholder='Ведіть id канала' /><button class='add-card'>Добавити</button>`;
}

//========================================================================================================================================================
//channels insert
if (localStorage.getItem("cards")) {
  const main = document.querySelector(".main");
  document.querySelector(".hello").remove();

  JSON.parse(localStorage.getItem("cards")).forEach((card) => {
    main.innerHTML += `<div>${card}</div>`;
    //body for insert
  });
}


window.onload = function loadClient() {
  gapi.client.setApiKey("AIzaSyCMQPA4JFFHpFPK-sr00Z6YRHeyJr-3_iA");
  return gapi.client
    .load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
    .then(
      function () {
       console.log('ok')
      },
      function (err) {
        console.error("Error loading GAPI client for API", err);
      }
    );
};

function getData() {
  let data ;
 function loadClient() {
    gapi.client.setApiKey("AIzaSyCMQPA4JFFHpFPK-sr00Z6YRHeyJr-3_iA");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
  }
  // Make sure the client is loaded and sign-in is complete before calling this method.
  function execute() {
    return gapi.client.youtube.channels.list({
      "part": [
        "snippet,contentDetails,statistics"
      ],
      "id": [
        "UC_x5XG1OV2P6uZZ5FSM9Ttw"
      ]
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                data =  {
                  title: response.result.items[0].snippet.title,
                  img: response.result.items[0].snippet.thumbnails.default.url,
                }
              },
              function(err) { console.error("Execute error", err); });
  }
  gapi.load("client:auth2");
  loadClient()
  execute()

  return data;
}
