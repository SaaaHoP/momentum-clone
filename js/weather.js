const API_KEY = 'c3e9a855ccf74a4b94c90025211507';
// const GOOGLE_API_KEY = 'AIzaSyAb7SVZpvCvYYDEF-GoXfJFX8mrK9HwJ3I';
// const googleUrl = `https://www.googleapis.com/geolocation/v1/geolocate?key=${GOOGLE_API_KEY}`;
const weatherBox = document.querySelector('.icon-weather-box');

const onGeoSuccess = (location) => {
  const latitude = location.coords.latitude;
  const longitude = location.coords.longitude;
  console.log(location.coords.accuracy, latitude, longitude);
  const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}&aqi=yes`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const city = document.querySelector('.city');
      // const weather = document.querySelector('.weather');
      const temperature = document.querySelector('.temperature');
      const icon = document.createElement('img');
      icon.classList.add('weather-icon');
      icon.src = `https://${data.current.condition.icon.substring(2)}`;
      weatherBox.appendChild(icon);
      city.innerText = data.location.name;
      // weather.innerText = data.current.condition.text;
      temperature.innerText = `${data.current.temp_c} °C`;
    });
};

const onGeoFail = () => {};
const options = {
  enableHighAccuracy: true,
  timeout: 500,
  maximumAge: 500,
};

navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoFail, options);
