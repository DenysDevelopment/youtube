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

//datqa
let data;

window.onload = function loadClient() {
  gapi.client.setApiKey("AIzaSyCMQPA4JFFHpFPK-sr00Z6YRHeyJr-3_iA");
  return gapi.client
    .load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
    .then(
      function () {
        input();
      },
      function (err) {
        console.error("Error loading GAPI client for API", err);
      }
    );
};
let valueInput = "";

async function input() {
  document
    .querySelector(".search__input")
    .addEventListener("input", function () {
      valueInput = this.value;
      if (valueInput.length > 10) {
        document.querySelector(".search__btn").classList.remove("lock");
      } else {
        document.querySelector(".search__btn").classList.add("lock");
      }
    });
}

function execute() {
  return gapi.client.youtube.channels
    .list({
      part: ["snippet,contentDetails,statistics"],
      // id: ["UC_x5XG1OV2P6uZZ5FSM9Ttw"],
      id: [valueInput],
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

//показання інформацію про канал
function renderHTML() {
  execute();
  document.querySelector(".result__out").innerHTML = `
      <div class="result__body">
        <a class="result__icon" href="${
          data.items[0].snippet.thumbnails.default.url
        }" >
          <img src="${data.items[0].snippet.thumbnails.default.url}" alt="ICON">
        </a>
        <div class="result__name-column">
          Назва канала
        </div>
        <div class="result__text-column">
          <a href="#">${data.items[0].snippet.localized.title}</a>
        </div>
        <div class="result__name-column">
          Підписників
        </div>
        <div class="result__text-column">
          ${formatingNumber(data.items[0].statistics.subscriberCount)}
        </div>
        <div class="result__name-column">
          Кількість відео
        </div>
        <div class="result__text-column">
          ${formatingNumber(data.items[0].statistics.videoCount)}
        </div>
        <div class="result__name-column">
          Переглядів на всіх відео
        </div>
        <div class="result__text-column">
          ${formatingNumber(data.items[0].statistics.viewCount)}
        </div>
        <div class="result__name-column">
          Опис
        </div>
        <div class="result__text-column">
          ${
            data.items[0].snippet.localized.description
              ? data.items[0].snippet.localized.description
              : "Немає опису"
          }
        </div>
        <div class="result__name-column">
          Дата створення
        </div>
        <div class="result__text-column">
          ${data.items[0].snippet.publishedAt.split("-")[1]}.${
    data.items[0].snippet.publishedAt.split("-")[0]
  }
        </div>
      </div>
    `;
}

document.querySelector(".search__btn").addEventListener("click", renderHTML);
