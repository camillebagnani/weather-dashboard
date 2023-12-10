var APIKey = 'aae95d5ae884ba06ac8463780698a447';
var searchInput = $('.search-input')
var searchBtn = $('.search-btn')
var searchHistory = $('.search-history')
var savedCities = JSON.parse(localStorage.getItem("savedCities")) || [];

// fetch(queryURL);

function getApi(city) {
    // var city = searchInput.val();
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + '&units=imperial';

    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            var dataName = data.name;

            saveToStorage(dataName);

            var dateUnix = data.dt; // change from unix
            var date = new Date(dateUnix * 1000).toLocaleDateString()
            var tempFahrenheit = data.main.temp;
            var windMPH = data.wind.speed;
            var humidity = data.main.humidity;
            var icon = "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";

            // TODO: Move to the right and put a border around it
            // TODO: Have past cities appear as clickable buttons under search
            $('.main-weather').html('')
            $('.main-weather').append(`<h3 style="font-weight:bold">${data.name + ' ' + '(' + date + ')'}<img src="${icon}"></h3>
            <p> Temp: ${tempFahrenheit}°F</p>
            <p> Wind: ${windMPH} MPH</p>
            <p> Humidity: ${humidity}%</p>`).addClass('main-weather-show');

            fiveDayForecast(data)
        });
}

//Calls 5-day forecast API
function fiveDayForecast(data) {
    var longitude = data.coord.lon
    var latitude = data.coord.lat

    var fiveDayURL = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&appid=' + APIKey + '&units=imperial';

    fetch(fiveDayURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (fiveDayData) {
            console.log(fiveDayData);
            $('.five-day-forecast-container').html('')
            $('.five-day-header').html('')
            $('.five-day-header').append(`<h4>5-Day Forecast:</h4>`)

            for (var i = 7; i < fiveDayData.list.length; i += 8) {
                var icon = "https://openweathermap.org/img/wn/" + fiveDayData.list[i].weather[0].icon + ".png"
                var fiveDayDate = new Date(fiveDayData.list[i].dt * 1000).toLocaleDateString()
                console.log(fiveDayData)

                $('.five-day-forecast-container').append(`<div class="fiveDayWeather">
                <h3 style="font-weight:bold">(${fiveDayDate})</h3>
                <img class="five-day-image" src="${icon}">
                <p> Temp: ${fiveDayData.list[i].main.temp}°F</p>
                <p> Wind: ${fiveDayData.list[i].wind.speed} MPH</p>
                <p> Humidity: ${fiveDayData.list[i].main.humidity}%</p><div>`)
            }
        })
}

//TODO: refactor for loop to create html button before it's on page
// on click should trigger getAPI, click button and button is the city name is passed through

function renderPastCities() {
    searchHistory.html('')
    for (var i = 0; i < savedCities.length; i++) {
        var buttonEL = $(`<button class="btn btn-secondary history-button" data-city="${savedCities[i]}">`)
        buttonEL.on('click', function(event){
            getApi(event.target.dataset.city)
        })
        buttonEL.text(savedCities[i])
        searchHistory.append(buttonEL)
    }
}

function saveToStorage(city) {
    // Give us the string of savedCities and parse it as an array, or give us an empty array if there is nothing saved

    savedCities.push(city);
    localStorage.setItem("savedCities", JSON.stringify(savedCities));
    renderPastCities()
}

// Takes input value of the search bar when user clicks the search button
// Fetches data connected to the weather API
searchBtn.click(function () {
    var city = searchInput.val();
    getApi(city);
    searchInput.val('')
})

// Calls the searchBtn function if user presses the 'Enter' key
searchInput.keypress(function (event) {
    if (event.keyCode === 13) {
        searchBtn.click()
    }
})

renderPastCities()

// Create and list search history
//TODO: Make these clickable buttons to retrieve the weather for the corresponding city
// $('.search-history').append("<ul><ul>").addClass("ul")
// $('.search-history').append('<li>' + city + '</li>').addClass("li")

// function add(a,b){
//     return a+b
// }

// var someNum = 55
// add(someNum,22)