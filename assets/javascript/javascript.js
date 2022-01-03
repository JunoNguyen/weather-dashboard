var searchCity = document.querySelector("#searchcity");
var findCity = document.querySelector("#findcity");
var APIKey = "e3fc80ad5571c3e2bbb3009c402430e0";

var getCityWeather = function(city){
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+findCity.value+'&appid='+APIKey;

    fetch(apiUrl)
        .then(function(response){
            if(response.ok){
                console.log(response);
                response.json().then(function(data){
                    console.log(data);
                });
            }
        })
        .catch(function (error){
            alert('City Not Found');
        });
};

searchCity.addEventListener('click', getCityWeather);




 