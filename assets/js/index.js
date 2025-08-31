const cityInput = document.querySelector(".city-input");
const searchBtn = document.querySelector(".search-btn");

const weatherInfoSection = document.querySelector(".weather-info-section");
const searchCitySection = document.querySelector(".search-city");
const notFoundSection = document.querySelector(".not-found");

const countryTxt = document.querySelector(".country-txt");
const currentDateTxt = document.querySelector(".current-date-txt");
const weatherSummaryImg = document.querySelector(".weather-summary-img");
const tempTxt = document.querySelector(".temp-txt");
const conditionTxt = document.querySelector(".condition-txt");
const humidityValueTxt = document.querySelector(".humidity-value-txt");
const windValueTxt = document.querySelector(".wind-value-txt");

const forecastContainer = document.querySelector(".forecat-items-container");

const apiKey = "79570bd674feee2505943f0952b084c5";

searchBtn.addEventListener("click", () => {
  updateWeatherInfo(cityInput.value);
  console.log(cityInput.value);
  cityInput.value = "";
  cityInput.blur();
});

cityInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && cityInput.value.trim() !== "") {
    updateWeatherInfo(cityInput.value);
    cityInput.value = "";
    cityInput.blur();
  }
});

async function getFetchData(endPoint, city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`;

  const response = await fetch(apiUrl);

  return response.json();
}

function getCurrentDate() {
  const currentDate = new Date();

  const options = {
    weekday: "short",
    day: "2-digit",
    month: "short",
  };

  return currentDate.toLocaleDateString("en-GB", options);
}

function getWeatherIcon(id) {
  if (id <= 232) return "thunderstorm.svg";
  if (id <= 321) return "drizzle.svg";
  if (id <= 531) return "rain.svg";
  if (id <= 621) return "snow.svg";
  if (id <= 781) return "atmosphere.svg";
  if (id <= 800) return "clear.svg";
  else return "clouds.svg";
}

async function updateWeatherInfo(city) {
  const weatherData = await getFetchData("weather", city);

  console.log(weatherData);
  if (weatherData.cod != 200) {
    showDisplaySection(notFoundSection);
    return;
  }

  const {
    name: country,
    main: { temp, humidity },
    weather: [{ id, main }],
    wind: { speed },
  } = weatherData;

  currentDateTxt.textContent = getCurrentDate();
  countryTxt.textContent = country;
  tempTxt.textContent = Math.round(temp) + " ℃";
  humidityValueTxt.textContent = humidity + "%";
  windValueTxt.textContent = speed + "km/h";
  conditionTxt.textContent = main;
  weatherSummaryImg.src = `assets/weather/${getWeatherIcon(id)}`;

  await updateForecastInfo(city);
  showDisplaySection(weatherInfoSection);
}

async function updateForecastInfo(city) {
  const forecastData = await getFetchData("forecast", city);

  console.log(forecastData);

  const timeTaken = "12:00:00";
  const todayDate = new Date().toISOString().split("T")[0];

  forecastContainer.innerHTML = "";

  forecastData.list.forEach((forecastWeather) => {
    if (
      forecastWeather.dt_txt.includes(timeTaken) &&
      !forecastWeather.dt_txt.includes(todayDate)
    )
      updateForecastItems(forecastWeather);
  });
}

function updateForecastItems(weatherData) {
  console.log(weatherData);

  const {
    dt_txt: date,
    main: { temp },
    weather: [{ id }],
  } = weatherData;

  const dateTaken = new Date(date);

  const dateOption = {
    day: "2-digit",
    month: "short",
  };

  const dateResult = dateTaken.toLocaleDateString("en-GB", dateOption);

  const forecastItems = `
  <div class="forecast-item">
            <h5 class="forecast-item-date-txt regular-txt">${dateResult}</h5>
            <img
              src="assets/weather/${getWeatherIcon(id)}"
              alt=""
              class="forecast-item-img"
            />
            <h5 class="forecast-item-temp regular-txt">${
              Math.round(temp) + " ℃"
            }</h5>
          </div>
  
  `;

  forecastContainer.insertAdjacentHTML("beforeend", forecastItems);
}

function showDisplaySection(section) {
  [notFoundSection, searchCitySection, weatherInfoSection].forEach(
    (section) => (section.style.display = "none")
  );
  section.style.display = "flex";
}
