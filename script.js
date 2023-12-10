var APIKey = 'aae95d5ae884ba06ac8463780698a447';
var searchInput = $('.search-input')
var searchBtn = $('.search-btn')
var searchHistory = $('.search-history')
// Gives us the string of savedCities and parses it as an array, or gives us an empty array if there is nothing saved
var savedCities = JSON.parse(localStorage.getItem("savedCities")) || [];

function getApi(city) {
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + '&units=imperial';

    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            var dataName = data.name;

            saveToStorage(dataName);

            // Variables to store data from the API call
            var dateUnix = data.dt; // Convert from Unix
            var date = new Date(dateUnix * 1000).toLocaleDateString()
            var tempFahrenheit = data.main.temp;
            var windMPH = data.wind.speed;
            var humidity = data.main.humidity;
            var icon = "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";

            // Clears display of city's weather before appending the new weather data
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

            // Loops through the 5-day API at every 8th index, which is the following day
            for (var i = 7; i < fiveDayData.list.length; i += 8) {
                var icon = "https://openweathermap.org/img/wn/" + fiveDayData.list[i].weather[0].icon + ".png"
                var fiveDayDate = new Date(fiveDayData.list[i].dt * 1000).toLocaleDateString()
                console.log(fiveDayData)

                // Appends a div of the weather forecase for each index (day) that is looped through 
                $('.five-day-forecast-container').append(`<div class="fiveDayWeather">
                <h3 style="font-weight:bold">(${fiveDayDate})</h3>
                <img class="five-day-image" src="${icon}">
                <p> Temp: ${fiveDayData.list[i].main.temp}°F</p>
                <p> Wind: ${fiveDayData.list[i].wind.speed} MPH</p>
                <p> Humidity: ${fiveDayData.list[i].main.humidity}%</p><div>`)
            }
        })
}

// Checks local storage and appends a button for each value in local storage
function renderPastCities() {
    searchHistory.html('')
    for (var i = 0; i < savedCities.length; i++) {
        // Create a button element with data attribute of whichever city is tied to that button
        var buttonEL = $(`<button class="btn btn-secondary history-button" data-city="${savedCities[i]}">`)
        buttonEL.on('click', function (event) {
            // Targets the data (city) of whichever button is clicked
            getApi(event.target.dataset.city)
        })
        // Text of the button is whichever city is at the index of the array in the for loop
        buttonEL.text(savedCities[i])
        // Append a button element for each city saved to local storage
        searchHistory.append(buttonEL)
    }
}

// Pushes new cities to the savedCities array in local storage
function saveToStorage(city) {
    if (!savedCities.includes(city)) {
        savedCities.push(city);
        localStorage.setItem("savedCities", JSON.stringify(savedCities));
        renderPastCities()
    }
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

// Happens on page load
renderPastCities()