const regexCheck = (value, regex) => (regex.test(value) ? true : false);

const HideLoader = () => {
  const loaderElement = document.querySelector(".loaderBackground");
  if (loaderElement) {
    document.querySelector(".loaderBackground").style.display = "none";
    var loader = document.querySelector("body").classList;
    if (loader.contains("loaderDefault")) loader.remove("loaderDefault");
    document.querySelector("html").style.overflow = "";
  }
};
const showLoader = () => {
  document.querySelector("html").style.overflow = "hidden";
  document.querySelector(".loaderBackground").style.display = "flex";
};

export { regexCheck, HideLoader, showLoader };
