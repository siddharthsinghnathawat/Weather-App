let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_temperature = document.querySelector(".weather_temperature");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");

let w_feelsLike = document.querySelector(".weather_feelsLike");
let w_humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");

let citySearch = document.querySelector(".weather_search");

// to get the actual country name
const getCountryName = (code) => {
  return new Intl.DisplayNames(["en"], { type: "region" }).of(code);
};

// to get the date and time
const getDateTime = (dt) => {
  const curDate = new Date(dt * 1000); // Convert seconds to milliseconds
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const formatter = new Intl.DateTimeFormat("en-US", options);
  return formatter.format(curDate);
};

let city = "jaipur";

// search functionality
citySearch.addEventListener("submit", (e) => {
  e.preventDefault();

  let cityInput = document.querySelector(".city_name");
  city = cityInput.value.trim();

  if (city) {
    getWeatherData();
    cityInput.value = "";
  }
});

const kelvinToCelsius = (k) => (k - 273.15).toFixed(1);

const getWeatherData = async () => {
  const apiKey = ;  // <-- your new API key here
  const weatherUrl =;

  try {
    const res = await fetch(weatherUrl);
    if (!res.ok) throw new Error("City not found");
    const data = await res.json();

    const { main, name, weather, wind, sys, dt } = data;

    cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`;
    dateTime.innerHTML = getDateTime(dt);

    w_forecast.innerHTML = weather[0].main;
    w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" alt="${weather[0].description}"/>`;

    w_temperature.innerHTML = `${kelvinToCelsius(main.temp)}&#176;C`;
    w_minTem.innerHTML = `Min: ${kelvinToCelsius(main.temp_min)}&#176;C`;
    w_maxTem.innerHTML = `Max: ${kelvinToCelsius(main.temp_max)}&#176;C`;

    w_feelsLike.innerHTML = `${kelvinToCelsius(main.feels_like)}&#176;C`;
    w_humidity.innerHTML = `${main.humidity}%`;
    w_wind.innerHTML = `${wind.speed} m/s`;
    w_pressure.innerHTML = `${main.pressure} hPa`;
  } catch (error) {
    alert(error.message); // You can customize error handling here
    console.error(error);
  }
};

// Run on page load
window.addEventListener("load", getWeatherData);
