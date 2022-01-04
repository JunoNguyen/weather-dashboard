var searchCity = document.querySelector("#searchcity");
var findCity = document.querySelector("#findcity");
var APIKey = "e3fc80ad5571c3e2bbb3009c402430e0";
var tempEl = $("#temp");
var windEl = $("#wind");
var humidityEl = $("humidity");
var indexEl = $("#index");

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
                    var apiUrl2 = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&appid='+APIKey;
                    console.log(apiUrl2);

                    fetch(apiUrl2)
                        .then(function(response){
                            if(response.ok){
                                console.log(response);
                                response.json().then(function(data){
                                    console.log(data);
                                    humidityEl.textContent = data.current.humidity;
                                    console.log(data.current.humidity);
                                    console.log(tempEl.textContent);
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

searchCity.addEventListener('click', getCityWeather);






 