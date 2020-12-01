// change current time 
let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

let hour = now.getHours();
let minutes = now.getMinutes();

let currentDay = document.querySelector("h3.date");
currentDay.innerHTML = `${day} ${hour}:${minutes}`;

// update current temperature to city searched
function getTemp(response) {
let cityTemp = Math.round(response.data.main.temp);
let currentTemp = document.querySelector("h4.current");
currentTemp.innerHTML = cityTemp;

let high = document.querySelector("#high");
  high.innerHTML = Math.round(response.data.main.temp_max);
  let low = document.querySelector("#low");
  low.innerHTML = Math.round(response.data.main.temp_min);
}

function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search");
  if (city.value) {
    let cityHeader = document.querySelector("#city-header");
    cityHeader.innerHTML = `${city.value}`;
  } else {
    alert("please enter a city");
  }
let apiKey = "c5b9a1b3ddc23e6e85d9dea7be5ee181";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&appid=${apiKey}`;
 
axios.get(apiUrl).then(getTemp);
}

let citySearch = document.querySelector("#change-city");
citySearch.addEventListener("submit", changeCity);

//end of search functionality 

//current location button 
function updateLocation(response) {
   let city = response.data.name;
   let cityHeader = document.querySelector("#city-header");
    cityHeader.innerHTML = `${city}`;

    let cityTemp = Math.round(response.data.main.temp);
let currentTemp = document.querySelector("h4.current");
currentTemp.innerHTML = cityTemp;

let high = document.querySelector("#high");
  high.innerHTML = Math.round(response.data.main.temp_max);
  let low = document.querySelector("#low");
  low.innerHTML = Math.round(response.data.main.temp_min);

}

function getLocation(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let long= position.coords.longitude;
  let apiKey = "c5b9a1b3ddc23e6e85d9dea7be5ee181";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  let totalUrl = `${apiUrl}&units=metric&lat=${lat}&lon=${long}&appid=${apiKey}`;
 axios.get(totalUrl).then(updateLocation);
}

function geoLocation(event) {
  navigator.geolocation.getCurrentPosition(getLocation)
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", geoLocation);
//end of get location button 

//change units start

function toFarenheit(event) {
  event.preventDefault();
}

function toCelsius(event) {
  event.preventDefault();
}
let convertF = document.querySelector("#farenheit");
convertF.addEventListener("click", toFarenheit);

let convertC = document.querySelector("#celsius");
convertC.addEventListener("click", toCelsius);