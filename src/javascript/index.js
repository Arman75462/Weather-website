import "../index.css";

/* SELECTORS */
import { submitSearch, celsiusButton, fahrenheitButton } from "./selectors";

/* FUNCTIONS */
import { fetchAndShowData } from "./functions";

/* GLOBAL VARIABALES */
export let celsius = true;
export let fahrenheit = false;

// Search for place event listener
submitSearch.addEventListener("click", (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  fetchAndShowData();
});

celsiusButton.addEventListener("click", () => {
  celsiusButton.classList.add("button-active");
  fahrenheitButton.classList.remove("button-active");
  celsius = true;
  fahrenheit = false;
  fetchAndShowData();
});

fahrenheitButton.addEventListener("click", () => {
  fahrenheitButton.classList.add("button-active");
  celsiusButton.classList.remove("button-active");
  fahrenheit = true;
  celsius = false;
  fetchAndShowData();
});
