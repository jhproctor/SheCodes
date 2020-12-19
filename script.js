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
if (hour < 10) {
  hour= `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes= `0${minutes}`;
}
let currentDay = document.querySelector("#date");
currentDay.innerHTML = `${day} ${hour}:${minutes}`;
 //end of current time 

// update current temperature to city searched
function getTemp(response) {
celsiusTemp = response.data.main.temp;
tempHigh = response.data.main.temp_max;
tempLow = response.data.main.temp_min;
windSpeed= response.data.wind.speed;

let cityTemp = Math.round(celsiusTemp);
let currentTemp = document.querySelector("h4.current");
currentTemp.innerHTML = cityTemp;

let high = document.querySelector("#high");
high.innerHTML = Math.round(tempHigh);
let low = document.querySelector("#low");
low.innerHTML = Math.round(tempLow);

let humidityElement=document.querySelector("#humidity");
humidityElement.innerHTML=response.data.main.humidity;

let currentCondition = document.querySelector("#conditions");
currentCondition.innerHTML=response.data.weather[0].description;

let windSpeedElement = document.querySelector("#wind-speed");
windSpeedElement.innerHTML = `${windSpeed} m/sec`;

let weatherIcon = response.data.weather[0].icon;
let iconElement = document.querySelector("#weatherIcon");
iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`);
iconElement.setAttribute("alt", response.data.weather[0].description);
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
celsiusTemp = response.data.main.temp;
tempHigh = response.data.main.temp_max;
tempLow = response.data.main.temp_min;
windSpeed = response.data.wind.speed;
    let cityTemp = Math.round(celsiusTemp);
let currentTemp = document.querySelector("h4.current");
currentTemp.innerHTML = cityTemp;

let high = document.querySelector("#high");
  high.innerHTML = Math.round(tempHigh);
  let low = document.querySelector("#low");
  low.innerHTML = Math.round(tempLow);
console.log(response.data);
let humidityElement=document.querySelector("#humidity");
humidityElement.innerHTML=response.data.main.humidity;
let windSpeedElement = document.querySelector("#wind-speed");
windSpeedElement.innerHTML = `${windSpeed} m/sec`;
let currentCondition = document.querySelector("#conditions");
currentCondition.innerHTML=response.data.weather[0].description;

let weatherIcon = response.data.weather[0].icon;
let iconElement = document.querySelector("#weatherIcon");
iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`);
iconElement.setAttribute("alt", response.data.weather[0].description);

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
  let temperatureElement = document.querySelector("#temperature");
  let farenheitTemp = (celsiusTemp * (9/5)) + 32;
temperatureElement.innerHTML = Math.round(farenheitTemp);
let highTempElement = document.querySelector("#high");
let highTempF = (tempHigh * (9/5)) + 32;
highTempElement.innerHTML = Math.round(highTempF);
let lowTempElement = document.querySelector("#low");
let lowTempF = (tempLow * (9/5)) + 32;
lowTempElement.innerHTML = Math.round(lowTempF);
let windSpeedElement = document.querySelector("#wind-speed");
let englishWindSpeed = Math.round(windSpeed * 2.237);
windSpeedElement.innerHTML = `${englishWindSpeed} mph`;


}

function toCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
  let highTempElement = document.querySelector("#high");
highTempElement.innerHTML = Math.round(tempHigh);
let lowTempElement = document.querySelector("#low");
lowTempElement.innerHTML = Math.round(tempLow);
let windSpeedElement = document.querySelector("#wind-speed");
windSpeedElement.innerHTML = `${windSpeed} m/sec`;
}


let celsiusTemp = null;
let tempHigh = null;
let tempLow = null;
let windSpeed = null;

let convertF = document.querySelector("#farenheit");
convertF.addEventListener("click", toFarenheit);

let convertC = document.querySelector("#celsius");
convertC.addEventListener("click", toCelsius);

//change units end
