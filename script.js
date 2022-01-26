const input = document.querySelector("input");
const weatherContainer = document.querySelector(".weatherContainer");
const err = document.querySelector('#err')

let cities = ["Gjilan", "Prishtine", "Ferizaj"];

let valueFromMic = "";

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new window.SpeechRecognition();
recognition.start();

function onSpeak(e) {
  let value = e.results[0][0].transcript;
  //   console.log(value);
  valueFromMic = value;
  //   console.log(valueFromMic);
  input.value = valueFromMic;
  getWeatherApi();
}

// console.log(valueFromMic);

// fetch weather api

async function getWeatherApi() {
 try{
    let res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${valueFromMic}&appid=9b02fe1ca8400c3ac6a6fa1c573a9c48`
      );
      let data = await res.json();
      console.log(data);
      showData(data);
 }
 catch(err) {
    err.innerText = 'Wrong Country, Try Again!'
 }
}

function showData(data) {
  let weatherTemp = Math.floor(data.main.temp - 273.15);
  let pic = weatherTemp > 1 ? "sunny" : "cloudy";
  console.log(pic);
  weatherContainer.innerHTML = `
  <div class="weather">
            <div class="sky">
                <img src="img/${pic}.jpg" alt="">
            </div>
            <div class="location">
                <span>Current Location:${data.name}</span>
                <span>Weather: ${data.weather[0].main}</span>
                <span>Deegre: ${weatherTemp} celcius</span>
            </div>
        </div>
  `;
}


recognition.addEventListener("result", onSpeak);
recognition.addEventListener("end", () => recognition.start());