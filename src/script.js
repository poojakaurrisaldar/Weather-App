function displayWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let unit = document.querySelector("#temp-unit");
  let currentHumidity = document.querySelector("#humidity");
  let currentWind = document.querySelector("#wind");
  let currentDescription = document.querySelector("#description");
  unit.innerHTML = `${temperature}℃`;
  currentHumidity.innerHTML = response.data.main.humidity;
  currentWind.innerHTML = response.data.wind.speed;
  currentDescription.innerHTML = response.data.weather[0].description;
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-name-id");
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = `${searchInput.value}`;
  console.log(`${searchInput.value}`);
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayWeather);
}

function showPosition(position) {
  let lati = position.coords.latitude;
  let logi = position.coords.longitude;

  let urlCords = `https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${logi}&appid=${apiKey}&units=metric`;

  console.log(`Latitude is: ${lati}`);
  console.log(`Longitude is: ${logi}`);

  axios.get(urlCords).then(currentWeather);
}
function currentWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#temp-unit");
  let currentCity = document.querySelector("#city-name");
  let currentHumidity = document.querySelector("#humidity");
  let currentWind = document.querySelector("#wind");
  let currentDescription = document.querySelector("#description");
  console.log(response);
  currentTemp.innerHTML = `${temperature}℃`;
  currentCity.innerHTML = response.data.name;
  currentHumidity.innerHTML = response.data.main.humidity;
  currentWind.innerHTML = response.data.wind.speed;
  currentDescription.innerHTML = response.data.weather[0].description;
}
function currentCity() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let apiKey = "ad793a6d772939c31783de5822791acf";

let form = document.querySelector("#weather-form");
form.addEventListener("submit", search);

let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", currentCity);
currentCity();

let Days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let currentTime = new Date();

let now = document.querySelector("#current-time");
now.innerHTML = `${Days[currentTime.getDay()]} ${currentTime.getDate()} ${
  months[currentTime.getMonth()]
} ${currentTime.getFullYear()}`;
