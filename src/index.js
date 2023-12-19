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

// AddEventListener
submitSearch.addEventListener("click", (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  fetch(
    `https://api.weatherapi.com/v1/current.json?key=2539b1e0094247a1aa3160336231212&q=${searchInput.value}`
  )
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      // The city name
      cityName.textContent = response.location.name;
      // The time
      date.textContent = response.location.localtime;
      // The weather condition name
      weatherCondition.textContent = `Weather condition: ${response.current.condition.text}`;
      // The current weather temperature
      temperature.textContent = `${response.current.temp_c}°`;
      // What the temperature feels like
      temperatureFeeling.textContent = `Feels like: ${response.current.feelslike_c}°`;

      // The weather icon
      if (response.current.condition.text === "Sunny") {
        weatherIcon.textContent = "☀️";
      } else if (
        response.current.condition.text === "Cloudy" ||
        response.current.condition.text === "Overcast" ||
        response.current.condition.text === "Partly cloudy"
      ) {
        weatherIcon.textContent = "☁️";
      } else if (
        response.current.condition.text === "Light rain" ||
        response.current.condition.text === "Patchy rain possible" ||
        response.current.condition.text === "Mist"
      ) {
        weatherIcon.textContent = "🌧";
      } else if (
        response.current.condition.text === "Patchy light rain with thunder" ||
        "Moderate or heavy rain with thunder"
      ) {
        weatherIcon.textContent = "⛈";
      } else if (response.current.condition.text === "Clear") {
        weatherIcon.textContent = "🌌";
      } else if (
        response.current.condition.text === "Snow" ||
        response.current.condition.text === "Patchy snow possible"
      ) {
        weatherIcon.textContent = "❄️";
      } else if (response.current.condition.text === "Fog") {
        weatherIcon.textContent = "🌫";
      } else if (response.current.condition.text === "Freezing fog") {
        weatherIcon.textContent = "🥶";
      } else if (
        response.current.condition.text === "Heavy rain" ||
        response.current.condition.text === "Moderate or heavy rain shower"
      ) {
        weatherIcon.textContent = "☔";
      } else if (response.current.condition.text === "Thunderstorm") {
        weatherIcon.textContent = "🌩";
      } else if (
        response.current.condition.text === "Hail" ||
        response.current.condition.text === "Moderate or heavy sleet"
      ) {
        weatherIcon.textContent = "🌨";
      } else if (
        response.current.condition.text === "Dust" ||
        response.current.condition.text === "Patchy light drizzle"
      ) {
        weatherIcon.textContent = "🌫";
      } else if (
        response.current.condition.text === "Haze" ||
        response.current.condition.text === "Smoke"
      ) {
        weatherIcon.textContent = "🌫";
      } else {
        weatherIcon.textContent = "❓"; // Unknown or other conditions
      }

      // The UV Index
      UVIndexInfo.textContent = `${response.current.uv}`;
      // The wind status (speed)
      windStatusInfo.textContent = `${response.current.wind_kph} km/h`;
      // Humidity
      humidityInfo.textContent = `${response.current.humidity} %`;
      // Visibility
      visibilityInfo.textContent = `${response.current.vis_km} km`;
      // Pressure
      pressureInfo.textContent = `${response.current.pressure_in}%`;
      // Precipitation
      precipitationInfo.textContent = `${response.current.precip_mm} mm`;
    });
});
