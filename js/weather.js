const API_KEY = 'faed19af8fcb125709bd23fdf127d699';
const weatherBox = document.querySelector('.icon-weather-box');
const onGeoSuccess = (location) => {
  const latitude = location.coords.latitude;
  const longitude = location.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const city = document.querySelector('.city');
      const weather = document.querySelector('.weather');
      const temperature = document.querySelector('.temperature');
      const icon = document.createElement('img');
      icon.classList.add('weather-icon');
      icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      weatherBox.appendChild(icon);
      console.dir(icon);
      console.log(data);
      city.innerText = data.name;
      weather.innerText = `${data.weather[0].main}`;
      temperature.innerText = `${data.main.temp} °C`;
    });
};

const onGeoFail = () => {};

navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoFail);
