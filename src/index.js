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

// AddEventListener
submitSearch.addEventListener("click", () => {
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
      temperature.textContent = response.current.temp_c + "°";
      // What the temperature feels like
      temperatureFeeling.textContent = `Feels like: ${response.current.feelslike_c}°`;
    });
});
