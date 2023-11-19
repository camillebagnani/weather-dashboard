var APIKey = 'aae95d5ae884ba06ac8463780698a447';
var city;
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

fetch(queryURL);