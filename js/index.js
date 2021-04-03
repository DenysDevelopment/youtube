"user strict";

//получаєм переключатель теми
const switchThemeElem = document.querySelector(".switch");

//установлення даних локально в браузер
function setLocalStorage(key, data) {
  localStorage.setItem(key, data);
}

//отримання данных з локального сховища браузера
function getLocalStorage(key) {
  return localStorage.getItem(key);
}

//видалення даних з локального сховища
function removeLocalStorageItem(key) {
  localStorage.removeItem(key);
}

//установлення теми після загрузкі сторінкі
function setLocalTheme() {
  if (JSON.parse(getLocalStorage("theme"))) {
    document.body.classList.add("theme-toggle");
  }
}
setLocalTheme();
