"user strict";

//получаєм переключатель теми
const switchThemeElem = document.querySelector(".switch");

//установлення даних локально в браузер
function setLocalStorage(key, data) {
  localStorage.setItem(key, data);
}

//отримання данных з локального сховища браузера
function getLocalSrorage(key) {
  return localStorage.getItem(key);
}

//видалення даних з локального сховища
function removeLocalSrorageItem(key) {
  localStorage.removeItem(key);
}

//установлення теми після загрузкі сторінкі
function setLocalTheme() {
  if (JSON.parse(getLocalSrorage("theme"))) {
    document.body.classList.add("theme-toggle");
  }
}
setLocalTheme();

//переключатель тем
switchThemeElem.addEventListener("change", () => {
  if (document.body.classList.contains("theme-toggle")) {
    document.body.classList.remove("theme-toggle");
    removeLocalSrorageItem("theme");
  } else {
    document.body.classList.add("theme-toggle");
    setLocalStorage("theme", JSON.stringify(true));
  }
});

function renderHTML() {
  document.querySelector(".result__out").innerHTML = `
      <div class="result__body">
        <a class="result__icon" href="#" >
          <img src="${
            data.items[0].snippet.thumbnails.default.url ? "" : ""
          }" alt="ICON">
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
          ${data.items[0].statistics.subscriberCount}
        </div>
        <div class="result__name-column">
          Кількість відео
        </div>
        <div class="result__text-column">
          ${data.items[0].statistics.videoCount}
        </div>
        <div class="result__name-column">
          Переглядів на всіх відео
        </div>
        <div class="result__text-column">
          ${data.items[0].statistics.viewCount}
        </div>
        <div class="result__name-column">
          Опис
        </div>
        <div class="result__text-column">
          ${data.items[0].snippet.localized.description}
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

document.addEventListener("click", renderHTML);
