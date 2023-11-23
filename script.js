var APIKey = 'aae95d5ae884ba06ac8463780698a447';
var city = "Salt Lake City"
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

var searchInput = $('.search-input')
var searchBtn = $('.search-btn')

// fetch(queryURL);

function getApi() {
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function(data){
            console.log(data)
        });
}


// Takes input value of the search bar when user clicks the search button
// Fetches data connected to the weather API
searchBtn.click(function (event) {
    getApi();

    var searchTerm = searchInput.val()
    console.log(`Searching for ${searchTerm}...`)
// Create search history
// TODO: Save to local storage
    var createUl = $('.search-history').append("<ul><ul>").addClass("ul")
    var createLi = $('.search-history').append('<li>' + city + '</li>').addClass("li")

    var cityName = $('main-weather').append('<h3></h3>');
    var weatherData = $('main-weather').append('p');

    

    cityName.textContent = data.name;
})



// Calls the searchBtn function if user presses the 'Enter' key
searchInput.keypress(function(event) {
    if (event.keyCode === 13) {
        searchBtn.click()
    }
})