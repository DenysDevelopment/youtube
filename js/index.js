"user strict";

const switchThemeElem = document.querySelector(".switch");

function setLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

function getLocalSrorage(key) {
  return localStorage.getItem(key);
}

function removeLocalSrorageItem(key) {
  localStorage.removeItem(key);
}

function setLocalTheme() {
  if (JSON.parse(getLocalSrorage("theme"))) {
    document.body.classList.add("theme-toggle");
  }
}

setLocalTheme();

switchThemeElem.addEventListener("change", () => {
  if (document.body.classList.contains("theme-toggle")) {
    document.body.classList.remove("theme-toggle");
    removeLocalSrorageItem("theme");
  } else {
    document.body.classList.add("theme-toggle");
    setLocalStorage("theme", JSON.stringify(true));
  }
});
