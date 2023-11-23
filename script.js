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

            var searchTerm = searchInput.val()
            console.log(`Searching for ${searchTerm}...`)
            // Create and list search history
            // TODO: Save to local storage
            $('.search-history').append("<ul><ul>").addClass("ul")
            $('.search-history').append('<li>' + city + '</li>').addClass("li")

            $('.main-weather').append(`<h3>${data.name}</h3>`).addClass('cityName');
            $('.main-weather').append(`<p>${data.weather[0].description}</p>`).addClass('weatherData');
            $('.main-weather').append(`<p>${data.dt}</p>`).addClass('date');
        });
}


// Takes input value of the search bar when user clicks the search button
// Fetches data connected to the weather API
searchBtn.click(function (event) {
    getApi();
})

// Calls the searchBtn function if user presses the 'Enter' key
searchInput.keypress(function (event) {
    if (event.keyCode === 13) {
        searchBtn.click()
    }
})