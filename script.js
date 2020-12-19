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

let daysAb = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat"
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

function forecastDay(number) {
let day = now.getDay()

  if ( day + number + 1 <= 6) {
     return (day + number + 1)
} else if (day + number + 1 > 6) {
  return (day + number - 6)
}

}

function getForecast(response) {
let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = null;
let forecast = null;

for (let index = 0; index < 6; index++) {
forecast = response.data.daily[index];
let num = index;
tempForecast = Math.round(forecast.temp.day);
forecastElement.innerHTML += `


<div class="col-2" id="forecast-day">
 <div class="row">
 <div class="col emoji"><img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" id="forecast-icon"></div>
 <div class="col day">${daysAb[forecastDay(num)]}</div>
 <div class="col tempF" id="forecast-temperature-${[index]}">${tempForecast}</div>
 </div>
 </div>
`;
}
}

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
windSpeedElement.innerHTML = `${Math.round(windSpeed)} m/sec`;

let weatherIcon = response.data.weather[0].icon;
let iconElement = document.querySelector("#weatherIcon");
iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`);
iconElement.setAttribute("alt", response.data.weather[0].description);


let lat = response.data.coord.lat;
let long = response.data.coord.lon;

let apiKey = "c5b9a1b3ddc23e6e85d9dea7be5ee181";
let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude={current,minutely,hourly,alerts}&units=metric&appid=${apiKey}`;
 
axios.get(apiUrl).then(getForecast);

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
let humidityElement=document.querySelector("#humidity");
humidityElement.innerHTML=response.data.main.humidity;
let windSpeedElement = document.querySelector("#wind-speed");
windSpeedElement.innerHTML = `${Math.round(windSpeed)} m/sec`;
let currentCondition = document.querySelector("#conditions");
currentCondition.innerHTML=response.data.weather[0].description;

let weatherIcon = response.data.weather[0].icon;
let iconElement = document.querySelector("#weatherIcon");
iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`);
iconElement.setAttribute("alt", response.data.weather[0].description);

}

function getLocation(position) {
  let lat = position.coords.latitude;
  let long= position.coords.longitude;
  let apiKey = "c5b9a1b3ddc23e6e85d9dea7be5ee181";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  let totalUrl = `${apiUrl}&units=metric&lat=${lat}&lon=${long}&appid=${apiKey}`;
 axios.get(totalUrl).then(updateLocation);

apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude={current,minutely,hourly,alerts}&units=metric&appid=${apiKey}`;
axios.get(apiUrl).then(getForecast);
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

//for (let index = 0; index < 6; index++) {

//let forecastTemperatureElement = document.querySelector(`#forecast-temperature-${[index]}`);
//console.log(forecastTemperatureElement)
//let forecastTemperatureFarenheit = Math.round((forecastTemperatureElement * (9/5)) + 32);
//forecastTemperatureElement.innerHTML = `${forecastTemperatureFarenheit} F`;
//}
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
windSpeedElement.innerHTML = `${Math.round(windSpeed)} m/sec`;
}


let celsiusTemp = null;
let tempHigh = null;
let tempLow = null;
let windSpeed = null;
let tempForecast = null;

let convertF = document.querySelector("#farenheit");
convertF.addEventListener("click", toFarenheit);

let convertC = document.querySelector("#celsius");
convertC.addEventListener("click", toCelsius);

//change units end

