import "./index.css";

/* SELECTORS */
const cityName = document.querySelector(".main__city-name");
const date = document.querySelector(".main__date");
const weatherIcon = document.querySelector(".main__weather-icon");
const weatherCondition = document.querySelector(".main__weather-condition");

const temperature = document.querySelector(".main__current-temperature");
const temperatureFeeling = document.querySelector(".main__feeling-temperature");

const searchInput = document.getElementById("searchInput");
const submitSearch = document.querySelector(".main__submit-search");

const UVIndexInfo = document.getElementById("UV-index");
const windStatusInfo = document.getElementById("wind-status");
const humidityInfo = document.getElementById("humidity");
const visibilityInfo = document.getElementById("visibility");
const pressureInfo = document.getElementById("pressure");
const precipitationInfo = document.getElementById("precipitation");

const celsiusButton = document.querySelector(".details__degree-celsius");
const fahrenheitButton = document.querySelector(".details__degree-fahrenheit");

function fetchAndShowData() {
  fetch(
    `https://api.weatherapi.com/v1/current.json?key=2539b1e0094247a1aa3160336231212&q=${searchInput.value}`
  )
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      left(response);
      verifyWeatherCondition(response);
      right(response);
    });
}

// Search for place event listener
submitSearch.addEventListener("click", (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  fetchAndShowData();
});

let celsius = true;
let fahreinheit = false;

function left(APIObject) {
  // The city name
  cityName.textContent = APIObject.location.name;
  // The time
  date.textContent = APIObject.location.localtime;
  // The weather condition name
  weatherCondition.textContent = `Weather condition: ${APIObject.current.condition.text}`;

  if (celsius === true) {
    // The current weather temperature
    temperature.textContent = `${APIObject.current.temp_c}°`;
    // What the temperature feels like
    temperatureFeeling.textContent = `Feels like: ${APIObject.current.feelslike_c}°`;
  } else if (fahreinheit === true) {
    // The current weather temperature
    temperature.textContent = `${APIObject.current.temp_f}°`;
    // What the temperature feels like
    temperatureFeeling.textContent = `Feels like: ${APIObject.current.feelslike_f}°`;
  }
}

celsiusButton.addEventListener("click", () => {
  celsiusButton.classList.add("button-active");
  fahrenheitButton.classList.remove("button-active");
  celsius = true;
  fahreinheit = false;
  fetchAndShowData();
});

fahrenheitButton.addEventListener("click", () => {
  fahrenheitButton.classList.add("button-active");
  celsiusButton.classList.remove("button-active");
  fahreinheit = true;
  celsius = false;
  fetchAndShowData();
});

function right(APIObject) {
  // The UV Index
  UVIndexInfo.textContent = `${APIObject.current.uv}`;
  // The wind status (speed)
  windStatusInfo.textContent = `${APIObject.current.wind_kph} km/h`;
  // Humidity
  humidityInfo.textContent = `${APIObject.current.humidity} %`;
  // Visibility
  visibilityInfo.textContent = `${APIObject.current.vis_km} km`;
  // Pressure
  pressureInfo.textContent = `${APIObject.current.pressure_in}%`;
  // Precipitation
  precipitationInfo.textContent = `${APIObject.current.precip_mm} mm`;
}

function verifyWeatherCondition(APIObject) {
  // The weather icon
  if (APIObject.current.condition.text === "Sunny") {
    weatherIcon.textContent = "☀️";
  } else if (
    APIObject.current.condition.text === "Cloudy" ||
    APIObject.current.condition.text === "Overcast" ||
    APIObject.current.condition.text === "Partly cloudy"
  ) {
    weatherIcon.textContent = "☁️";
  } else if (
    APIObject.current.condition.text === "Light rain" ||
    APIObject.current.condition.text === "Patchy rain possible" ||
    APIObject.current.condition.text === "Mist"
  ) {
    weatherIcon.textContent = "🌧";
  } else if (
    APIObject.current.condition.text === "Patchy light rain with thunder" ||
    "Moderate or heavy rain with thunder"
  ) {
    weatherIcon.textContent = "⛈";
  } else if (
    APIObject.current.condition.text === "Snow" ||
    APIObject.current.condition.text === "Patchy snow possible"
  ) {
    weatherIcon.textContent = "❄️";
  } else if (APIObject.current.condition.text === "Fog") {
    weatherIcon.textContent = "🌫";
  } else if (APIObject.current.condition.text === "Freezing fog") {
    weatherIcon.textContent = "🥶";
  } else if (
    APIObject.current.condition.text === "Heavy rain" ||
    APIObject.current.condition.text === "Moderate or heavy rain shower"
  ) {
    weatherIcon.textContent = "☔";
  } else if (APIObject.current.condition.text === "Thunderstorm") {
    weatherIcon.textContent = "🌩";
  } else if (
    APIObject.current.condition.text === "Hail" ||
    APIObject.current.condition.text === "Moderate or heavy sleet"
  ) {
    weatherIcon.textContent = "🌨";
  } else if (
    APIObject.current.condition.text === "Dust" ||
    APIObject.current.condition.text === "Patchy light drizzle"
  ) {
    weatherIcon.textContent = "🌫";
  } else if (
    APIObject.current.condition.text === "Haze" ||
    APIObject.current.condition.text === "Smoke"
  ) {
    weatherIcon.textContent = "🌫";
  } else {
    weatherIcon.textContent = "❓"; // Unknown or other conditions
  }
}
