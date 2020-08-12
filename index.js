function formatDate(timestamp) {
  let now = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];
  let date = now.getDate();

  return `${day}, ${date} ${month} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionEelement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionEelement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-2">
      <h3>
        ${formatHours(forecast.dt * 1000)}
      </h3>
         <img
        src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"
      />

      <div class="weather-forecast-temperature">
        <strong>
          ${Math.round(forecast.main.temp_max)}°
        ${Math.round(forecast.main.temp_min)}°
        </strong>
      </div>
    </div>
  `;
  }
}

function changeImage(icon) {
  let iconCondition = document.querySelectorAll("#current-weather-img");
  if (icon === "01d") {
    iconCondition.setAttribute(`sun.png`);
  } else if (icon === "01n.") {
    iconCondition.setAttribute(`moon.png`);
  } else if (icon === "02d.") {
    iconCondition.setAttribute(`partiallysun.png`);
  } else if (icon === "02n.") {
    iconCondition.setAttribute(`partiallynight.png`);
  } else if (icon === "03d." || icon === "03n.") {
    iconCondition.setAttribute(`cloudy.png`);
  } else if (icon === "04d." || icon === "04n.") {
    iconCondition.setAttribute(`cloudy.png`);
  } else if (icon === "09d." || icon === "09n.") {
    iconCondition.setAttribute(`rain.png`);
  } else if (icon === "10d." || icon === "10n.") {
    iconCondition.setAttribute(`rain.png`);
  } else if (icon === "11d." || icon === "11n.") {
    iconCondition.setAttribute(`thunder.png`);
  } else if (icon === "13d." || icon === "13n.") {
    iconCondition.setAttribute(`snow.png`);
  } else if (icon === "50d." || icon === "50n.") {
    iconCondition.setAttribute(`windy.png`);
  } else {
    iconCondition.setAttribute(`cloudy.png`);
  }
}

function searchCity(city) {
  let apiKey = "2dd446df6b116993857a1a248b7acb15";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  searchCity(cityInputElement.value);
  let input = document.querySelectorAll("input");
  input.value = "";
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}
function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

searchCity("Lagoa");
