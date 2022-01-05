# weather-dashboard

GOAL:: Pull data from a weather website so I can search a city and it will display the city, the weather, and the weather for the next 5 days. There should also be a recent searches feature so I can see what cities I have previously looked at. When I reload the page, local storage should still save the recent searches as well as the city I most recently searched and its weather results.

1/2/22 :: So far I have a baseline setup. I have a basic wireframing so my html is complete and my css is somewhat complete. It looks similar to the demo, just with less css. 

REMINDER:: DO NOT FORGET TO ADD LINKS TO BOOTSTRAP 

1/3/22 :: I have started the javascript. Now I need to append the elements from the api fetch so I can display the data. That should not be too hard because I have all the data logged in the console. 

TODO FOR 1/4/22 :: Be able to append and implement the data, log local storage for previous searches. These should be simple as I have done this before. 

1/4/22 :: I have the data being pulled. When I search a city, I see the temp, wind, humidity as well as the weather for the next 5 days. 

WHAT I NEED TO ADD :: I need to add the current date, the next five days, local storage, and I need to fix an issue where previous search results do no reset (if I search another city, the data from the previous city is still appended). I also need the local storage to pull the 5 most recent searches and append them underneath my search button.