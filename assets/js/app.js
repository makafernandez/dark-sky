'use strict';

// Geolocalización usuario
$('#locate').click(function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      let location = '';
      });
  } else {
    $('#userLocation').append = 'Este navegador no soporta geolocalización.';
  }
});

// Geocodificación inversa (devuelve una localidad para la posición):                            
fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&result_type=locality&key=AIzaSyD3ITDAeNFr0MvgoNVODFh0JJHIxdbch_M`)                          
  .then(function(response) {
    return response.json();
  })
  .then(function (data3) {
    location = data3.results[0].address_components[0].short_name;
  })  

// Genera el pronóstico para la ubicación del usuario:
fetch(`https://api.darksky.net/forecast/ddd476a250882ec17bf7b60f9d91689e/${latitude},${longitude}?lang=es&units=auto`)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);
    const actual = data.currently;
    const daily = data.daily.data;

    // Datos actuales:
    let icon = actual.icon;
    let summary = actual.summary;
    let temperature = parseInt(actual.temperature);
    let apparent = parseInt(actual.apparentTemperature); // sensación térmica
    let precipProb = actual.precipProbability * 100; // probabilidad de precipitaciones
    let humidity = actual.humidity * 100;
    let uvIndex = actual.uvIndex; // indice UV
    let windSpeed = actual.windSpeed; // velocidad del viento
    let tempMax = parseInt(daily[0].temperatureMax);
    let tempMin = parseInt(daily[0].temperatureMin);

    // Agrega contenido dinámico Día Actual:
    $('.actual').append(`
      <div class="container">
        <div class="row">
          <div class="col s12 m8 l6 offset-m2 offset-l3 center">  
            <div class="row">  
              <div class="col s12 center city">
                ${location}
              </div>
              <div class="col s12">  
                <canvas id="iconActual" width="128" height="128"></canvas>
              </div>
              <div class="col s12 center temperature">  
                ${temperature} °
              </div>
              <div class="col s12 center summary">  
                ${summary}
              </div>
            </div>
            <div class="row">  
              <div class="col s12">  
                <div class="col s7 left-align detailWeather">
                  Temperatura ambiente
                </div>
                <div class="col s5 rigth-align detailWeather">
                  ${apparent} °C
                </div>
              </div>
              <div class="col s12">  
                <div class="col s7 left-align detailWeather">
                  Probabilidad de lluvia
                </div>
                <div class="col s5 rigth-align detailWeather">
                  ${precipProb} %
                </div>
              </div>
              <div class="col s12">  
                <div class="col s7 left-align detailWeather">
                  Humedad ambiente 
                </div>
                <div class="col s5 rigth-align detailWeather">
                  ${humidity} %
                </div>
              </div>
              <div class="col s12">  
                <div class="col s7 left-align detailWeather">
                  Índice UV 
                </div>
                <div class="col s5 rigth-align detailWeather">
                  ${uvIndex} 
                </div>
              </div>
              <div class="col s12">  
                <div class="col s7 left-align detailWeather">
                  Velocidad del viento 
                </div>
                <div class="col s5 rigth-align detailWeather">
                  ${windSpeed} 
                </div>
              </div>  
            </div>
            <p class="prediction lighten-4">Predicción de la semana</p>
          </div>  
        </div>  
      </div>
      `);

    // Agrega ícono actual:
    const skycons = new Skycons({ 
      'color': 'gray',
      'resizeClear': true
    });
    skycons.add('iconActual', icon);
    skycons.play();

    // PRONÓSTICO SEMANAL
    $('')daily.map
  
    // Días de pronóstico
    let today = convertUnixDate(daily[0].time);
    let dayOne = convertUnixDate(daily[1].time);
    let dayTwo = convertUnixDate(daily[2].time);
    let dayThree = convertUnixDate(daily[3].time);
    let dayFour = convertUnixDate(daily[4].time);
    let dayFive = convertUnixDate(daily[5].time);
    let daySix = convertUnixDate(daily[6].time);
    let daySeven = convertUnixDate(daily[7].time);

    function convertUnixDate(unix) {
      let timestamp = unix;
      let pubDate = new Date(timestamp * 1000);
      const weekday = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");
      let formattedDate = weekday[pubDate.getDay()] + ' ' + pubDate.getDate();
      return formattedDate;
    }
      
    // Pronóstico diario semana:
    let iconWeek = daily.icon;
    let summaryWeek = daily.summary;
    let min
  })

// Vistas 
$("#locate").click(function() {
  $("#initial").hide();
});
$("#locate").click(function() {
  $("#second").show();
});
