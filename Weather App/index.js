"use strict";

const temperature = document.querySelector(".temperature").value;
let imageWeather = document.querySelector(".img");

// const options = { method: "GET", headers: { accept: "application/json" } };

// fetch(
//   "https://api.tomorrow.io/v4/weather/realtime?location=delhi&apikey=fQ9As07fHu2ngwdoUAUyYdrWKVT9c16T"
// )
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));

function getData(city) {
  return fetch(
    `https://api.tomorrow.io/v4/weather/realtime?location=${city}&apikey=fQ9As07fHu2ngwdoUAUyYdrWKVT9c16T`
  ).then((res) => res.json());

  //   const dataTemp = data.json();
  //   const dataTemp = data
  //     .then((data) => data.json)
  //     .then((res) => res.data.values.temperature);
  //   console.log(data);
  //   console.log(data.PromiseResult.data.location);
  //   console.log(dataTemp.data.values.temperature);
}

function checkWeather(weatherCode) {
  switch (weatherCode) {
    case 1000:
    case 1100:
      imageWeather.src = `./images/clear.png`;
      break;
    case 1101:
    case 1102:
    case 1001:
      imageWeather.src = `./images/clouds.png`;
      break;
    case 4000:
      imageWeather.src = `./images/drizzle.png`;
      break;
    case 4001:
    case 4200:
    case 4201:
      imageWeather.src = `./images/rain.png`;
      break;
    default:
      imageWeather.src = `./images/clear.png`;
      break;
  }
}

document.querySelector(".check").addEventListener("click", function () {
  const city = document.querySelector(".cityName").value;
  //   console.log(city);
  const res = getData(city);
  res.then((res) => {
    const cityyy = res.location.name.split(",");
    document.querySelector(".city").textContent = cityyy[0];
    document.querySelector(".temperature").textContent =
      res.data.values.temperature;
    document.querySelector(".humidity-percent").textContent =
      res.data.values.humidity;
    document.querySelector(".wind").textContent = res.data.values.windSpeed;
    // console.log(res.data.values.temperature);
    checkWeather(res.data.values.weatherCode);
  });
});
