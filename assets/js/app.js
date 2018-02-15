// Geolocalización usuario
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
  let location = '';
  userLocation.innerHTML = `Latitud: ${latitude}
                            <br>Longitud: ${longitude}`;
  // Geocodificación inversa (devuelve una localidad para la posición):                            
  fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&result_type=locality&key=AIzaSyD3ITDAeNFr0MvgoNVODFh0JJHIxdbch_M`)                          
    .then(function(response) {
      return response.json();
    })
    .then(function (data3) {
      console.log(data3);
      location = data3.results[0].address_components[0].short_name;
      console.log(location);
    })  

  // Genera el pronóstico para la ubicación del usuario:
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
      let temperature = parseInt(actual.temperature);
      let apparent = parseInt(actual.apparentTemperature); // sensación térmica
      let precipProb = actual.precipProbability * 100; // probabilidad de precipitaciones
      let humidity = actual.humidity * 100;
      let uvIndex = actual.uvIndex; // indice UV
      let windSpeed = actual.windSpeed; // velocidad del viento

      $('.actual').append(`
        <span>${location}</span>
        <canvas id="iconActual" width="128" height="128"></canvas>
        <span>${temperature}°</span>
        <span>${summary}</span>
        <span>Temperatura ambiente ${apparent}°</span>
        <span>Probabilidad de lluvia ${precipProb}%</span>
        <span>Humedad ambiente ${humidity}%</span>
        <span>Índice UV ${uvIndex}</span>
        <span>Velocidad del viento${windSpeed}</span>
      `);

      // Agrega ícono actual:
      const skycons = new Skycons({ 
        'color': '#fff',
        'resizeClear': true
      });
      skycons.add("iconActual", icon);
      skycons.play();
    
    })
}

// vistas 
$("#locate").click(function(){
  $("#initial").hide();
});
$("#locate").click(function(){
  $(".actual").show();
});