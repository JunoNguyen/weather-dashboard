var searchCity = document.querySelector("#searchcity");
var findCity = document.querySelector("#findcity");
var APIKey = "e3fc80ad5571c3e2bbb3009c402430e0";
var tempEl = $("#temp");
var windEl = $("#wind");
var humidityEl = $("#humidity");
var indexEl = $("#index");
var forecastDailyEl = $("#forecastdaily");


var getCityWeather = function(city){
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+findCity.value+'&appid='+APIKey;

    localStorage.setItem('Recent Searches', findCity.value);
    //FIX LOCAL STORAGE SO IT DOESN'T REWRITE OTHER VALUES

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






 