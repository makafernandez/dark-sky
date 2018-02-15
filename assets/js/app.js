// Geolocation
const userLocation = document.getElementById('userLocation');
const locate = document.getElementById('locate');

locate.onclick = function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    userLocation.innerHTML = "Este navegador no soporta geolocalización.";
  }
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  userLocation.innerHTML = `Latitud: ${latitude}
                            <br>Longitud: ${longitude}`;

  // Retrieve weather forecast for location
  let actual = document.querySelector('.actual');

  fetch(`https://api.darksky.net/forecast/ddd476a250882ec17bf7b60f9d91689e/${latitude},${longitude}?lang=es&units=auto`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      const actual = data.currently;
      const daily = data.daily;

      // Datos actuales:
      let icon = actual.icon;
      let summary = actual.summary;
      let temperature = actual.temperature;
      let apparent = actual.apparentTemperature;
      let precipProb = actual.precipProbability;
      let humidity = actual.humidity;
      let uvIndex = actual.uvIndex;
      let windSpeed = actual.windSpeed;

      // Datos para la semana:

      $('.actual').append(`<span>${temperature}°</span>
        <span>${summary}</span>
      `);
    
    })
}