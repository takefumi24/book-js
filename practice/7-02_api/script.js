'use strict'

//geolocation
function success(pos) {
  ajaxRequest(pos.coords.latitude, pos.coords.longitude);
}

function fail(error) {
  alert('位置情報の取得に失敗しました。エラーコード：' + error.code)
}
navigator.geolocation.getCurrentPosition(success, fail);

//UTCをミリ秒に
function utcToJSTime(utcTime) {
  return utcTime * 1000
}

//データ取得
function ajaxRequest(lat, long) {
  const url = 'https://api.openweathermap.org/data/2.5/forecast';
  const appId = '33473163a60f815ada0d36c4e19859a4'
  $.ajax({
    url: url,
    data: {
      appid: appId,
      lat: lat,
      lon: long,
      units: 'metric',
      lang:'ja'
    }
  })
  .done(function (data) {

    //都市名、国名
    $('#place').text(data.city.name + ', ' + data.city.country);

    //天気予報データ
    data.list.forEach(function (forecast, index) {
      const dateTime = new Date(utcToJSTime(forecast.dt));
      const month = dateTime.getMonth() + 1;
      const date = dateTime.getDate();
      const hours = dateTime.getHours();
      const min = String(dateTime.getMinutes()).padStart(2, '0');
      const temperature = Math.round(forecast.main.temp);
      const description = forecast.weather[0].description;
      const iconPath = `images/${forecast.weather[0].icon}.svg`;

      //現在の天気とそれ以外で出力を変える
      if (index === 0) {

      }

    });
  })
  .fail(function () {
    console.log('$.ajax failed!')
  })
}
