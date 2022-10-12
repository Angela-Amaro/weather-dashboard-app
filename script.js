
var fetchButton = $("#fetchBtn");
var inputEl = $("#input");
var cityNameEl = $("#citynamedate");
var cityTempEl = $("#maintemp");
var cityWindEl = $("#mainwind");
var cityHumidEl = $("#mainhumid");

var forecast0dateEl = $("#date0");
var forecast0tempEl = $("#temp0");
var forcast0humidEl = $("#humid0");
var forcast0windEl = $("#wind0");

var forecast1dateEl = $("#date1");
var forecast1tempEl = $("#temp1");
var forcast1humidEl = $("#humid1");
var forcast1windEl = $("#wind1");

var forecast2dateEl = $("#date2");
var forecast2tempEl = $("#temp2");
var forcast2humidEl = $("#humid2");
var forcast2windEl = $("#wind2");

var forecast3dateEl = $("#date3");
var forecast3tempEl = $("#temp3");
var forcast3humidEl = $("#humid3");
var forcast3windEl = $("#wind3");

var forecast4dateEl = $("#date4");
var forecast4tempEl = $("#temp4");
var forcast4humidEl = $("#humid4");
var forcast4windEl = $("#wind4");

var pastSearchesEl = $('#past')
var cityHistArray = []

if (localStorage.getItem("cityHistory")) {
    cityHistArray = JSON.parse(localStorage.getItem("cityHistory"))

    for (i = 0; i <cityHistArray.length; i++) {
        console.log(cityHistArray)
        addSearchBtn(cityHistArray[i])
    }
}

function search(city) {
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

        var dailyFetchUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=b110023a32982697701df76e58c95ed4'
        var forecastFetchUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=b110023a32982697701df76e58c95ed4'
        //now that we have a city name, lat, and lon we can get the details
        fetch(dailyFetchUrl)
            .then(function (response) {
                return response.json();
            }).then(function (data) {

                if (!cityHistArray.includes(data.name)) {
                    cityHistArray.push(data.name)
                    localStorage.setItem("cityHistory", JSON.stringify(cityHistArray))
                    cityHistArray = JSON.parse(localStorage.getItem("cityHistory"))
                    addSearchBtn(data.name);
                }
                console.log(data)
                var displayTime = moment.unix(data.dt).format("L");
                var currentDate = $("<span>", { "class": "card-title" })
                currentDate.text(" (" + displayTime + ") ");
                cityNameEl.text(data.name);

                // cityNameEl.append(currentDate);
                var iconCode = data.weather[0].icon;
                var dailyUrl = "https://openweathermap.org/img/w/" + iconCode + ".png"

                var dayIcon = $("<img>", { "src": dailyUrl });
                dayIcon.attr("lt", "Weather Icon");

                // main display icon, temp, wind speed, and humidity
                cityNameEl.append(currentDate).append(dayIcon);
                cityTempEl.text("Temperature: " + data.main.temp + " F");
                cityWindEl.text("Wind speed: " + data.wind.speed + " MPH");
                cityHumidEl.text("Humidity: " + data.main.humidity + " %");
                fetch(forecastFetchUrl)
                .then(function (response) {
                    return response.json();
                }).then(function (data) {
                    console.log(data)
                    var index = 7;
                    for (i = 0; i < 5 ; i++){
                        var date = $("#date" + i);
                        var temp = $("#temp" + i);
                        var humid = $("#humid" + i);
                        var wind = $("#wind" + i);
                        populateCard(date, temp, humid, wind, data, index)
                        index += 8
                    }
            })
        })
    })
}


fetchButton.on("click", function(event) {
    event.preventDefault
    search(inputEl.val())});

function populateCard(dateEl, tempEl, humidEl, windEl, data, index) {
    var object = data.list[index]
    dateEl.text(moment.unix(object.dt).format("L"))
    var iconCode = object.weather[0].icon;
    var dailyUrl = "https://openweathermap.org/img/w/" + iconCode + ".png"

    var dayIcon = $("<img>", { "src": dailyUrl });
    dayIcon.attr("lt", "Weather Icon");


    dateEl.append(dayIcon);
    tempEl.text(" Temperature: " + object.main.temp + " F");
    windEl.text(" Wind speed: " + object.wind.speed + " MPH");
    humidEl.text(" Humidity: " + object.main.humidity + " %");
}

function addSearchBtn(cityName) {
        var buttonEl = $("<button>", {"class":"w3-btn"})
        buttonEl.text(cityName)
        pastSearchesEl.prepend(buttonEl)
}

pastSearchesEl.on("click", "button", function() {
   search($(this).text()) 
})

