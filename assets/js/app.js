'use strict';

$(document).ready(function() {
  // Vista Día
  $('#locate').click(function () {
    $('#initial').hide();
    $('#second').show();
    $('#week').hide();
  });
  // Vista Semana
  $('#weekBtn').click(function () {
    $('#initial').hide();
    $('#second').hide();
    $('#week').show();
  });
});

// Geolocalización usuario
$('#locate').click(function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    $('#userLocation').append = 'Este navegador no soporta geolocalización.';
  }
});

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let location = '';
  
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

      // Genera contenidos dinámicos vista Día Actual
      $('#actual').append(`
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
          </div>  
        </div>
      `);

      // Agrega ícono actual:
      const skycons = new Skycons({ 
        'color': 'rgba(255, 255, 255, 0.6)',
        'resizeClear': true
      });
      skycons.add('iconActual', icon);
      skycons.play();

      // PRONÓSTICO SEMANAL
      let weekForecast = daily.map(el => {
        let dayWeek = convertUnixDate(el.time);
        let minTempDay = el.temperatureMin;
        let maxTempDay = el.temperatureMax;
        let iconDay = el.icon;

        // Genera contenido dinámico Week Forecast:
        $('#days').append(`
          <div class="row">
            <div class="col s2">
              <canvas id="icon${dayWeek}" width="30" height="30"></canvas>
            </div>
            <div class="col s6">${dayWeek}</div>
            <div class="col s4">${minTempDay} - ${maxTempDay}</div>
          </div>  
        `);
      });
      
      function convertUnixDate(unix) {
        let timestamp = unix;
        let pubDate = new Date(timestamp * 1000);
        const week = new Array("Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sáb");
        let formattedDate = week[pubDate.getDay()] + ' ' + pubDate.getDate();
        return formattedDate;
      }
    })
}

//Api Flickr

//clave 3203c051377d5f52b0f08da0f8b66634
//secreto 464f1233a0a7d944

$(document).ready(function() {
  console.log( "ready!" );
  
  let flickrAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
  $.getJSON(flickrAPI, {
    tags: ['beach'],
    tagmode: "any",
    format: "json"
  })  
  .done(function(data) {
    console.log(data);
    $.each(data.items, function(index, item) {
      //console.log(item);
      $('.flickr').css({
        'background-image': `url(${item.media.m})`,
        'background-size': 'cover',
        'background-position': 'center'
      });
      $('.flickr').addClass('myImg');
      if (index == 0) {
        return false;
      }
    });
  })
  .fail(function() {
    alert('La llamada AJAX falló');
  });
});