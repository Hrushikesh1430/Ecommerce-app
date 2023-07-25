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

export { regexCheck, HideLoader };
