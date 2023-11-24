var APIKey = 'aae95d5ae884ba06ac8463780698a447';
var searchInput = $('.search-input')
var searchBtn = $('.search-btn')

// fetch(queryURL);

function getApi() {
    var city = searchInput.val();
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            var searchTerm = searchInput.val();
            var dateUnix = data.dt; // change from unix
            var date = new Date(dateUnix * 1000).toLocaleDateString()
            var tempKelvin = data.main.temp; // The API default temperature unit is Kelvin
            var tempFahrenheit = ((tempKelvin - 273.15) * 1.8 + 32).toFixed(2) // Convert Kelvin temp to Fahrenheit
            var wind = data.wind.speed; // The API default wind speed unit is meters/sec
            var windMPH = (wind * 2.2369).toFixed(2) // Convert meters/sec to miles/hour
            var humidity = data.main.humidity
            var iconCode = data.weather[0].icon;
            var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
            console.log(`Searching for ${searchTerm}...`)
            // Create and list search history
            // TODO: Save to local storage
            $('.search-history').append("<ul><ul>").addClass("ul")
            $('.search-history').append('<li>' + city + '</li>').addClass("li")

            $('.main-weather').append(`<h3>${data.name + ' ' + '(' + date + ')'}</h3>`).addClass('cityName');
            $('.main-weather').append(`<p> Temp: ${tempFahrenheit}°F</p>`).addClass('weatherData');
            $('.main-weather').append(`<p> Wind: ${windMPH} MPH</p>`).addClass('weatherData');
            $('.main-weather').append(`<p> Humidity: ${humidity}%</p>`).addClass('weatherData');
            
        });
}


// Takes input value of the search bar when user clicks the search button
// Fetches data connected to the weather API
searchBtn.click(function (event) {
    // event.preventDefault();
    getApi();
})

// Calls the searchBtn function if user presses the 'Enter' key
searchInput.keypress(function (event) {
    if (event.keyCode === 13) {
        searchBtn.click()
    }
})

