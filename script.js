var APIKey = 'aae95d5ae884ba06ac8463780698a447';
var searchInput = $('.search-input')
var searchBtn = $('.search-btn')

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

            // TODO: move to the right and put a border around it
            $('.main-weather').append(`<h3>${data.name + ' ' + '(' + date + ')'}<img src="${icon}"></h3>
            <p> Temp: ${tempFahrenheit}°F</p>
            <p> Wind: ${windMPH} MPH</p>
            <p> Humidity: ${humidity}%</p>`).addClass('main-weather');
            // $('.main-weather').append(`<p> Temp: ${tempFahrenheit}°F</p>`).addClass('weatherData');
            // $('.main-weather').append(`<p> Wind: ${windMPH} MPH</p>`).addClass('weatherData');
            // $('.main-weather').append(`<p> Humidity: ${humidity}%</p>`).addClass('weatherData');

            //Calls 5-day forecast API
            var longitude = data.coord.lon
            var latitude = data.coord.lat

            var fiveDayURL = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&appid=' + APIKey + '&units=imperial';

            fetch(fiveDayURL)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);

                    $('.five-day-forecast').append(`<h4>5-Day Forecast:</h4>`).addClass('fiveDayHeader')

                    for (var i = 7; i < data.list.length; i += 8) {
                
                        var fiveDayDate = new Date(data.list[i].dt * 1000).toLocaleDateString()
                        console.log(data)

                        
                        $('.five-day-forecast').append(`<h3>(${fiveDayDate})</h3>`).addClass('fiveDayWeather');
                        $('.five-day-forecast').append(`<img src="${icon}">`).addClass('fiveDayWeather');
                        $('.five-day-forecast').append(`<p> Temp: ${data.list[i].main.temp}°F</p>`).addClass('fiveDayWeather');
                        $('.five-day-forecast').append(`<p> Wind: ${data.list[i].wind.speed} MPH</p>`).addClass('fiveDayWeather');
                        $('.five-day-forecast').append(`<p> Humidity: ${data.list[i].main.humidity}%</p>`).addClass('fiveDayWeather');
                    }


                })
        });

}


function pageLoad(){ 

}

function renderPastCities() {

}

function saveToStorage(city) {
    // Give us the string of savedCities and parse it as an array, or give us an empty array if there is nothing saved
    var savedCities = JSON.parse(localStorage.getItem("savedCities")) || [];
    savedCities.push(city);
    localStorage.setItem("savedCities", JSON.stringify(savedCities));
}

// Create and list search history
            //TODO: Make these clickable buttons to retrieve the weather for the corresponding city
            // $('.search-history').append("<ul><ul>").addClass("ul")
            // $('.search-history').append('<li>' + city + '</li>').addClass("li")

// Takes input value of the search bar when user clicks the search button
// Fetches data connected to the weather API
// TODO: Clear the search input once you click button
searchBtn.click(function (event) {
    // event.preventDefault();
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


// function add(a,b){
//     return a+b
// }

// var someNum = 55
// add(someNum,22)