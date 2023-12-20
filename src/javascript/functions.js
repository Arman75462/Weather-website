/* GLOBAL VARIABLES */
import { celsius, fahrenheit } from "./index";

/* SELECTORS */
import {
  cityName,
  date,
  weatherIcon,
  weatherCondition,
  temperature,
  temperatureFeeling,
  searchInput,
  UVIndexInfo,
  windStatusInfo,
  humidityInfo,
  visibilityInfo,
  pressureInfo,
  precipitationInfo,
  fahrenheitButton,
} from "./selectors";

//  Updates primary weather information (city-name, date, weather-condition, temperature and temperature-feeling) elements with data from the provided APIObject.
export function primaryInfo(APIObject) {
  // The city name
  cityName.textContent = APIObject.location.name;
  // The time
  date.textContent = APIObject.location.localtime;
  // The weather condition name
  weatherCondition.textContent = `Weather condition: ${APIObject.current.condition.text}`;

  // If celsius is true, temperature will be displayed in celsius.
  if (celsius) {
    // The current weather temperature
    temperature.textContent = `${APIObject.current.temp_c}°`;
    // What the temperature feels like
    temperatureFeeling.textContent = `Feels like: ${APIObject.current.feelslike_c}°`;
  } // If fahrenheit is true, temperature will be displayed in celsius.
  else if (fahrenheit) {
    // The current weather temperature
    temperature.textContent = `${APIObject.current.temp_f}°`;
    // What the temperature feels like
    temperatureFeeling.textContent = `Feels like: ${APIObject.current.feelslike_f}°`;
  }
}

// Updates secondary weather information (UV-index, wind-speed, humidity, visibility, pressure and precipitation) elements with data from the provided APIObject.
export function secondaryInfo(APIObject) {
  // The UV Index
  UVIndexInfo.textContent = `${APIObject.current.uv}`;
  // The wind status (speed)
  windStatusInfo.textContent = `${APIObject.current.wind_kph} km/h`;
  // Humidity
  humidityInfo.textContent = `${APIObject.current.humidity} %`;
  // Visibility
  visibilityInfo.textContent = `${APIObject.current.vis_km} km`;
  // Pressure
  pressureInfo.textContent = `${APIObject.current.pressure_in} inHg`;
  // Precipitation
  precipitationInfo.textContent = `${APIObject.current.precip_mm} mm`;
}

// Sets the weather icon based on the current weather condition obtained from the provided APIObject.
export function verifyWeatherCondition(APIObject) {
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
    APIObject.current.condition.text === "Mist" ||
    APIObject.current.condition.text === "Moderate rain"
  ) {
    weatherIcon.textContent = "🌧";
  } else if (
    APIObject.current.condition.text === "Snow" ||
    APIObject.current.condition.text === "Light snow" ||
    APIObject.current.condition.text === "Patchy snow possible" ||
    APIObject.current.condition.text === "Patchy light snow"
  ) {
    weatherIcon.textContent = "🌨";
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
    APIObject.current.condition.text === "Dust" ||
    APIObject.current.condition.text === "Patchy light drizzle" ||
    APIObject.current.condition.text === "Haze" ||
    APIObject.current.condition.text === "Smoke" ||
    APIObject.current.condition.text === "Fog" ||
    APIObject.current.condition.text === "Clear"
  ) {
    weatherIcon.textContent = "🌫";
  } else if (
    APIObject.current.condition.text === "Patchy light rain with thunder" ||
    "Moderate or heavy rain with thunder"
  ) {
    weatherIcon.textContent = "⛈";
  } else {
    weatherIcon.textContent = "❓"; // Unknown or other conditions
  }
}

// Gets data from the API and calls the functions that are designed to show the data, to show data on website.
export function fetchAndShowData() {
  if (searchInput.value === "") {
    fetch(
      `https://api.weatherapi.com/v1/current.json?key=2539b1e0094247a1aa3160336231212&q=laval`
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        primaryInfo(response);
        verifyWeatherCondition(response);
        secondaryInfo(response);
      });
  } else {
    fetch(
      `https://api.weatherapi.com/v1/current.json?key=2539b1e0094247a1aa3160336231212&q=${searchInput.value}`
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        primaryInfo(response);
        verifyWeatherCondition(response);
        secondaryInfo(response);
      });
  }
}
