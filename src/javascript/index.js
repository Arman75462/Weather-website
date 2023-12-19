import "../index.css";

/* SELECTORS */
import { submitSearch, celsiusButton, fahrenheitButton } from "./selectors";

/* FUNCTIONS */
import { fetchAndShowData } from "./functions";

/* GLOBAL VARIABALES */
export let celsius = true;
export let fahrenheit = false;

// Call the function to display Laval temperature information.
fetchAndShowData();

// Search for a city, event listener.
submitSearch.addEventListener("click", (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  fetchAndShowData();
});

// When clicking celsiusButton, make the temperature info go from fahrenheit to celsius.
celsiusButton.addEventListener("click", () => {
  celsiusButton.classList.add("button-active");
  fahrenheitButton.classList.remove("button-active");
  celsius = true;
  fahrenheit = false;
  fetchAndShowData();
});

// When clicking celsiusButton, make the temperature info go from celsius to fahrenheit.
fahrenheitButton.addEventListener("click", () => {
  fahrenheitButton.classList.add("button-active");
  celsiusButton.classList.remove("button-active");
  fahrenheit = true;
  celsius = false;
  fetchAndShowData();
});
