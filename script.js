
var fetchButton = $("#fetchBtn");
var inputEl = $("#input");
var cityNameEl = $("#citynamedate");
var cityTempEl = $("#maintemp");
var cityWindEl = $("#mainwind");
var cityHumidEl = $("#mainhumid");
var forecast0dateEl = $("#date0");
var forecast0tempEl = $("#temp0");
var forcast0humidEl


function search(event) {
  event.preventDefault();
  var city = inputEl.val();
  var latLongFetchUrl =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    city +
    "&appid=b110023a32982697701df76e58c95ed4";
  fetch(latLongFetchUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {

        //grab the lat and log of the city
        lat = data[0].lat;
        lon = data[0].lon;

        var dailyFetchUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=b110023a32982697701df76e58c95ed4'

        //now that we have a city name, lat, and lon we can get the details
        fetch(dailyFetchUrl)
            .then(function (response) {
                return response.json();
            }).then(function (data) {

                // addSearchBtn(data.city.name);
                console.log(data)
                var displayTime = moment.unix(data.list[0].dt).format("L");
                var currentDate = $("<span>", { "class": "card-title" })
                currentDate.text(" (" + displayTime + ") ");
                cityNameEl.text(data.city.name);

                // cityNameEl.append(currentDate);
                var iconCode = data.list[0].weather[0].icon;
                var dailyUrl = "https://openweathermap.org/img/w/" + iconCode + ".png"

                var dayIcon = $("<img>", { "src": dailyUrl });
                dayIcon.attr("lt", "Weather Icon");

                // main display icon, temp, wind speed, and humidity
                cityNameEl.append(currentDate).append(dayIcon);
                cityTempEl.text(data.list[0].main.temp + " F");
                cityWindEl.text(data.list[0].wind.speed + " MPH");
                cityHumidEl.text(data.list[0].main.humidity + " %");
            })
        })
    }


fetchButton.on("click", search);

// function results() {
//     var tableResults = ""
//     fetch(tableResults)
//         .then(function ())
//
