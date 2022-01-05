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
var recentSearches = JSON.parse(localStorage.getItem("Recent Searches"));
if(recentSearches === null){
    recentSearches = [];
};

var recentStorage = function(){

    recentSearches.push(findCity.value);

    localStorage.setItem("Recent Searches", JSON.stringify(recentSearches));

    var showRecent = document.createElement('li');

    showRecent.textContent = recentSearches.slice(-1);

    recentSearchList.append(showRecent);
};

// var getCityWeather = function(city){
//     var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+findCity.value+'&appid='+APIKey;

//     recentStorage();
//     console.log(resetSearch);

//     resetSearch();

//     fetch(apiUrl)
//         .then(function(response) {
//             if(response.ok) {
//                 console.log(response);
//                 response.json().then(function(data){
//                     console.log(data);
//                     console.log(data.coord);
//                     console.log(data.coord.lon);
//                     var lat = data.coord.lat;
//                     var lon = data.coord.lon;
//                     var apiUrl2 = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&units=imperial&appid='+APIKey;
//                     console.log(apiUrl2);

//                     cityname.textContent = findCity.value + " (" + (today.format("MMM do, YYYY")) + ") ";

//                     fetch(apiUrl2)
//                         .then(function(response){
//                             if(response.ok){
//                                 console.log(response);
//                                 response.json().then(function(data){

//                                     tempData = document.createElement('p');
//                                     tempData.textContent = data.current.temp + "°F";
//                                     tempEl.append(tempData);

//                                     windData = document.createElement('p');
//                                     windData.textContent = data.current.wind_speed + "MPH";
//                                     windEl.append(windData);

//                                     humidityData = document.createElement('p');
//                                     humidityData.textContent = data.current.humidity + "%";
//                                     humidityEl.append(humidityData);

//                                     indexData = document.createElement('p');
//                                     indexData.textContent = data.current.uvi;
//                                     indexEl.append(indexData);

//                                     for (var i = 0; i < 5; i++) {
//                                         var forecastday = $("#forecastday" + i);
//                                         var weatherBlock = $("#daily" + i);
//                                         var dailyTemp = document.createElement('p');
//                                         var dailyWind = document.createElement('p');
//                                         var dailyHumidity = document.createElement('p');

//                                         dailyTemp.textContent = "Temp: " + data.daily[i].temp.day + "°F";
//                                         dailyWind.textContent = "Wind: " + data.daily[i].wind_gust + "MPH";
//                                         dailyHumidity.textContent = "Humidity: " + data.daily[i].humidity + "%";

//                                         weatherBlock.append(dailyTemp);
//                                         weatherBlock.append(dailyWind);
//                                         weatherBlock.append(dailyHumidity);

//                                         forecastday.append(today.format("MMM " + moment().add([i], "days").format("D") + " YYYY"));
//                                     };
//                                 });
//                             }
//                         })
                            
//                 });
//             }
//         })
//         .catch(function (error){
//             alert('City Not Found');
//         });
// };

var displayRecentSearches = function(){
    if(recentSearches !== null){
        for (var i = 0; i < recentSearches.length + 1; i++) {
            displayRecent = document.createElement('li');

            displayRecent.textContent = recentSearches[recentSearches.length - i];

            recentSearchList.append(displayRecent);
        }
    }
};

var resetSearch = function(){
    var fivedayblocks = $('#weatherblock p');
    for(var i=0; i<fivedayblocks.length;i++) {
        fivedayblocks[i].hide();
    }
};

// displayRecentSearches();

// searchCity.addEventListener('click', getCityWeather);

var getCityWeather = function(city){
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+findCity.value+'&appid='+APIKey;

    recentStorage();
    console.log(resetSearch);

    resetSearch();

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

                                    if($(".searchedcity p").length > 4) {
                                        tempData.textContent = data.current.temp + "°F";
                                        windData.textContent = data.current.wind_speed + "MPH";
                                        humidityData.textContent = data.current.humidity + "%";
                                        indexData.textContent = data.current.uvi;

                                        for (var i = 0; i < 5; i++) {
                                            var forecastday = $("#forecastday" + i);
                                            var weatherBlock = $("#daily" + i);
                                            var dailyTemp = document.createElement('p');
                                            var dailyWind = document.createElement('p');
                                            var dailyHumidity = document.createElement('p');
                                        
                                            dailyTemp.textContent = data.daily[i].temp.day + "°F";
                                            dailyWind.textContent = data.daily[i].wind_gust + "MPH";
                                            dailyHumidity.textContent = data.daily[i].humidity + "%";
                                        
                                            weatherBlock.append(dailyTemp);
                                            weatherBlock.append(dailyWind);
                                            weatherBlock.append(dailyHumidity);
                                            
                                            forecastday.append(today.format("MMM " + moment().add([i], "days").format("D") + " YYYY"));
                                        };
                                    } else {
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
                                        
                                            dailyTemp.textContent = data.daily[i].temp.day + "°F";
                                            dailyWind.textContent = data.daily[i].wind_gust + "MPH";
                                            dailyHumidity.textContent = data.daily[i].humidity + "%";
                                        
                                            weatherBlock.append(dailyTemp);
                                            weatherBlock.append(dailyWind);
                                            weatherBlock.append(dailyHumidity);
                                            
                                            forecastday.append(today.format("MMM " + moment().add([i], "days").format("D") + " YYYY"));
                                        };
                                    }
                                })
                            }
                        })
                            
                });
            }
        })
        .catch(function (error){
            alert('City Not Found');
        });
};

displayRecentSearches();

searchCity.addEventListener('click', getCityWeather);







//  for (var i = 0; i < 5; i++){
//      dailyTemp.textContent = data.daily[i].temp.day + "°F";
//      dailyWind.textContent = data.daily[i].wind_gust + "MPH";
//      dailyHumidity.textContent = data.daily[i].humidity + "%";
// }; 
                                        
// for (var i = 0; i < 5; i++) {
//     var forecastday = $("#forecastday" + i);
//     var weatherBlock = $("#daily" + i);
//     var dailyTemp = document.createElement('p');
//     var dailyWind = document.createElement('p');
//     var dailyHumidity = document.createElement('p');

//     dailyTemp.textContent = data.daily[i].temp.day + "°F";
//     dailyWind.textContent = data.daily[i].wind_gust + "MPH";
//     dailyHumidity.textContent = data.daily[i].humidity + "%";

//     weatherBlock.append(dailyTemp);
//     weatherBlock.append(dailyWind);
//     weatherBlock.append(dailyHumidity);
    
//     forecastday.append(today.format("MMM " + moment().add([i], "days").format("D") + " YYYY"));