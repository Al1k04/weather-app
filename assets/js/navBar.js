const slideMenu = document.querySelector(".slide");
const navBtn = document.querySelector(".nav-btn");
const closeBtn = document.querySelector(".close-btn");

navBtn.addEventListener("click", () => {
  slideMenu.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  slideMenu.classList.remove("active");
});
