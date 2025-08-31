let lightMode = localStorage.getItem("lightMode");
const switchTheme = document.getElementById("theme-switch");

const enabldeLightMode = () => {
  document.body.classList.add("lightMode");
  localStorage.setItem("lightMode", "active");
};

const disableLightMode = () => {
  document.body.classList.remove("lightMode");
  localStorage.setItem("lightMode", "disabled");
};

if (lightMode === "active") {
  enabldeLightMode();
}

switchTheme.addEventListener("click", () => {
  lightMode = localStorage.getItem("lightMode");
  lightMode !== "active" ? enabldeLightMode() : disableLightMode();
});
