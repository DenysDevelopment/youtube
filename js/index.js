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
