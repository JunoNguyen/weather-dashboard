var searchCity = document.querySelector("#searchcity");
var findCity = document.querySelector("#findcity");
var APIKey = "e3fc80ad5571c3e2bbb3009c402430e0";
var tempEl = $("#temp");
var windEl = $("#wind");
var humidityEl = $("#humidity");
var indexEl = $("#index");
var forecastDailyEl = $("#forecastdaily");
var today = moment();
var recentSearchList = $("#recent-searches");

var recentSearches = [];

var recentStorage = function(){

    recentSearches.push(findCity.value);

    localStorage.setItem("Recent Searches", JSON.stringify(recentSearches));

    var getRecent = localStorage.getItem("Recent Searches");

    var arrayRecent = JSON.parse(getRecent);

    console.log(getRecent);

    var showRecent = document.createElement('li');

    showRecent.textContent = arrayRecent.slice(-1);

    recentSearchList.append(showRecent);
};

var getCityWeather = function(city){
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+findCity.value+'&appid='+APIKey;

    recentStorage();

    fetch(apiUrl)
        .then(function(response) {
            if(response.ok) {
                console.log(response);
                response.json().then(function(data){
                    console.log(data);
                    console.log(data.coord);
                    console.log(data.coord.lon);
                    var lat = data.coord.lat;
                    var lon = data.coord.lon;
                    var apiUrl2 = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&units=imperial&appid='+APIKey;
                    console.log(apiUrl2);

                    cityname.textContent = findCity.value + " (" + (today.format("MMM do, YYYY")) + ") ";

                    fetch(apiUrl2)
                        .then(function(response){
                            if(response.ok){
                                console.log(response);
                                response.json().then(function(data){
                                    console.log(data);

                                    tempData = document.createElement('p');
                                    tempData.textContent = data.current.temp + "°F";
                                    tempEl.append(tempData);

                                    windData = document.createElement('p');
                                    windData.textContent = data.current.wind_speed + "MPH";
                                    windEl.append(windData);

                                    humidityData = document.createElement('p');
                                    humidityData.textContent = data.current.humidity + "%";
                                    humidityEl.append(humidityData);

                                    indexData = document.createElement('p');
                                    indexData.textContent = data.current.uvi;
                                    indexEl.append(indexData);

                                    for (var i = 0; i < 5; i++) {
                                        var forecastday = $("#forecastday" + i);
                                        var weatherBlock = $("#daily" + i);
                                        var dailyTemp = document.createElement('p');
                                        var dailyWind = document.createElement('p');
                                        var dailyHumidity = document.createElement('p');

                                        dailyTemp.textContent = "Temp: " + data.daily[i].temp.day + "°F";
                                        dailyWind.textContent = "Wind: " + data.daily[i].wind_gust + "MPH";
                                        dailyHumidity.textContent = "Humidity: " + data.daily[i].humidity + "%";

                                        weatherBlock.append(dailyTemp);
                                        weatherBlock.append(dailyWind);
                                        weatherBlock.append(dailyHumidity);

                                        forecastday.append(today.format("MMM " + moment().add([i], "days").format("D") + " YYYY"));
                                    };
                                });
                            }
                        })
                            
                });
            }
        })
        .catch(function (error){
            alert('City Not Found');
        });
};

searchCity.addEventListener('click', getCityWeather);

//MOMENT 








 