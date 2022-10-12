var tableResults = ".results";
var fetchButton = "#fetchBtn";

http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
function search() {
    var requestUrl = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=b110023a32982697701df76e58c95ed4"
    fetch(requestUrl)
        .then(function (response) {
            console.log("responce", reponse)
            return response.json();
        })
        .then(function (data) {
            console.log("data")
               {
                
    }
})
search();

function results() {
    var tableResults = ""
    fetch(tableResults)
        .then(function ())
}