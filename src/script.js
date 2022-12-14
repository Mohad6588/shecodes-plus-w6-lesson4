// ⏰Feature #1
function searchCity(event) {
  event.preventDefault();
  let cityValue = document.querySelector(".city-value").value;

  let apiKey = `5ef4de8cd6b7fefcd7c42f98cf464ce8`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}
function showCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
  function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiCurrentKey = `6a48a550fc04f170639e60d52b8a6bc5`;
    let apiCurrentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiCurrentKey}&units=metric`;
    axios.get(apiCurrentUrl).then(showTemp);
  }
}
function showTemp(response) {
  console.log(response);
  let cityName = document.querySelector(".city-name");
  cityName.innerHTML = response.data.name;
  let countryName = document.querySelector(".country-name");
  countryName.innerHTML = response.data.sys.country;
  let weatherDescription = document.querySelector(".wheather-description");
  weatherDescription.innerHTML = response.data.weather[0].description;
  let cityCurrentTemp = document.querySelector("h1");
  cityCurrentTemp.innerHTML = Math.round(response.data.main.temp);
  let minTemp = document.querySelector("#min-temp");
  minTemp.innerHTML = `${Math.round(response.data.main.temp_min)} °C`;
  let maxTemp = document.querySelector("#max-temp");
  maxTemp.innerHTML = `${Math.round(response.data.main.temp_max)} °C`;
  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = `${Math.round(response.data.main.feels_like)} °C`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${Math.round(response.data.main.humidity)}%`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `${Math.round(response.data.wind.speed)} m/s`;
}

let submitButton = document.querySelector(".search-box");
submitButton.addEventListener("submit", searchCity);

let currentBtn = document.querySelector("#current-btn");
currentBtn.addEventListener("click", showCurrentPosition);

let current = new Date();
let currentDay = current.getDay();
let weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let hour = current.getHours();
if (hour <= 9) {
  hour = "0" + hour;
}
let minutes = current.getMinutes();
if (minutes <= 9) {
  minutes = "0" + minutes;
}
let dayTime = document.querySelector(".day-time");
dayTime.innerHTML = `${weekdays[currentDay]} ${hour}:${minutes}`;
