$(document).ready(function() {
    // Yelp API
    var apiKey = "rFlPqBV_66EyE8ZnW2gPlA1uKfHNFf8b9h-4yEQZuOdqSis4_VOBnA-jWORLf2oc_-DBUAdDK6tw3J6_rKR7P9ZJv-pFi76s9G5vPw72ppObfaA9YngRrix74DaWYnYx";
    var queryUrl = "https://api.yelp.com/v3/businesses/{id}/reviews";

    $.ajax({
        url: queryUrl,
        method: "GET"
        }).then(function(response) {
        console.log(response);
        var businessId = response.id;
        console.log(businessId);
    });

// ==================================================================================================================================================
   // OpenWeather API

   // Global variables created
   var searchBtn = $("#searchBtn");
   var deleteBtn = $("#deleteBtn");
   var textArea = $("#textarea1");
   var cityList = $("#city-list");
   var restaurantsDiv = $("#restaurants");
   var weatherDiv = $("#weather");
   var weatherCard = $("<div>").addClass("card");
   
   var title = $("<span>").addClass("card-title");
   // starting local storage
   var searchHistory = JSON.parse(window.localStorage.getItem("search-history")) || [];

   // Retrieves the longitude and latitude required for the getCurrentWeather function
   function getGeoLocation () {
       var apiKey = "b0786aaf2595b4e2380f01ed8f03a7a4";
       var searchInput = textArea.val().trim();
       var url = "http://api.openweathermap.org/geo/1.0/direct?q=" + searchInput + "&limit=1&appid=" + apiKey;
       console.log(searchInput);
       $.ajax({
         url: url,
         method: "GET"
       }).then(function(response) {
          console.log("Geolocation: ", response);
          var lat = response[0].lat;
          var lon = response[0].lon;
        //   var weatherIcon = response.current.weather[0].icon;
          console.log(lat, lon);
          var name = response[0].name
          title.text(response[0].name);
          
         
          // temp, humidity, windspeed, icons
        //   var cardIcon = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.current.weather[0].icon + ".png");
        //   weatherCard.append(cardIcon);
          
          
        //   weatherCard.append(cardIcon);

          console.log(name);
          weatherDiv.append(weatherCard);
          getCurrentWeather(lat, lon);
       });
   }

   // Triggers getGeoLocation function to start once the search button is clicked
   searchBtn.on("click", getGeoLocation);

   // Gets the weather forecast using longitude and latitude from getGeoLocation
   function getCurrentWeather(lat, lon) {
       var apiKey = "b0786aaf2595b4e2380f01ed8f03a7a4";
       var queryUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial";
       $.ajax({
           url: queryUrl,
           method: "GET"
       }).then(function(response) {
           console.log("Current weather: ", response);
           var cardContent = $("<div>").addClass("card-content");
           var temp = $("<p>").text("Current temperature (F): " + response.current.temp);
           var humidity = $("<p>").text("Current humidity: " + response.current.humidity);
           var windSpeed = $("<p>").text("Current wind speed (mph): " + response.current.wind_speed);
           weatherCard.append(title);
           cardContent.append(temp, humidity, windSpeed);
           weatherCard.append(cardContent);
           weatherDiv.append(weatherCard);
        //    console.log(response.current.weather[0].icon);
           
           
       });
   }
});

