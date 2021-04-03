//переключатель тем

switchThemeElem.addEventListener("change", () => {
  if (document.body.classList.contains("theme-toggle")) {
    document.body.classList.remove("theme-toggle");
    removeLocalSrorageItem("theme");
    changeImgPreloaderTheme(false);
  } else {
    document.body.classList.add("theme-toggle");
    setLocalStorage("theme", JSON.stringify(true));
    changeImgPreloaderTheme(true);
  }
});

function formatingNumber(number) {
  return Number(number).toLocaleString({ style: "percent" });
}
