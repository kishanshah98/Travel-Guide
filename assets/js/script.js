$(document).ready(function() {
    // openbrewery API
    function getBrews(name) {
        var queryUrl = "https://api.openbrewerydb.org/breweries?by_city=" + name + "&per_page=5";
        $.ajax({
            url: queryUrl,
            method: "GET"
            }).then(function(response) {
            console.log("Brews reviews!!!", response);
            console.log(name);
            // name, phone, address, website
            for (var i = 0; i < response.length; i++) {
                var brewCard = $("<div>").addClass("brew-card");
                var brewContent = $("<div>").addClass("card-content");
                var brewName = $("<p>").text("Brewery: " + response[i].name);
                
                if (response[i].phone == null) {
                    var brewPhone = $("<p>").text("Phone: N/A");
                } else {
                    var brewPhone = $("<p>").text("Phone: " + response[i].phone);
                }

                if (response[i].street == null) {
                    var brewAddress = $("<p>").text("Address: N/A");
                } else {
                    var brewAddress = $("<p>").text("Address: " + response[i].street);
                }
                
                if (response[i].website_url == null) {
                    var brewSite = $("<p>").text("Website: N/A");
                } else {
                    var brewSite = $("<p>").text("Website: " + response[i].website_url);
                }

                brewContent.append(brewName, brewAddress, brewPhone, brewSite);
                brewCard.append(brewContent);
                breweriesDiv.append(brewCard);
            }    
               
        });
    }

// ==================================================================================================================================================
   // OpenWeather API

   // Global variables created
   var searchBtn = $("#searchBtn");
   var deleteBtn = $("#deleteBtn");
   var textArea = $("#textarea1");
   var cityList = $("#city-list");
   var breweriesDiv = $("#breweries-container");
   var weatherDiv = $("#weather");
   var weatherContent = $("#weather-content");
   var weatherCard = $("<div>").addClass("card");
   var title = $("<h3>").addClass('weather-title')
   // starting local storage
   var searchHistory = JSON.parse(window.localStorage.getItem("search-history")) || [];

   // Retrieves the longitude and latitude required for the getCurrentWeather function
   function getGeoLocation() {
      var apiKey = "b0786aaf2595b4e2380f01ed8f03a7a4";
      var searchInput = textArea.val().trim();
      var url = "https://api.openweathermap.org/geo/1.0/direct?q=" + searchInput + "&limit=1&appid=" + apiKey;
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
          weatherCard.empty();
          weatherDiv.empty();
          breweriesDiv.empty();
          console.log("Weather card:", weatherCard);
          console.log("Weather div:", weatherDiv);
          weatherDiv.append(weatherCard);
          getCurrentWeather(lat, lon);
          getBrews(name);
          historyList();
       });
   }

   // Gets the weather forecast using longitude and latitude from getGeoLocation
   function getCurrentWeather(lat, lon, name) {
       var apiKey = "b0786aaf2595b4e2380f01ed8f03a7a4";
       var queryUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial";
       $.ajax({
           url: queryUrl,
           method: "GET"
       }).then(function(response) {
           console.log("Current weather: ", response);
           weatherDiv.append(title);
           for (var i = 0; i < 5; i++) {
                var cardContent = $("<div>").addClass("card-content");
                var dt = response.daily[i].dt;
                var date = $("<p>").text(new Date(dt * 1000).toDateString());
                var icon = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + response.daily[i].weather[0].icon + ".png");
                var temp = $("<p>").text("Temp (F): " + Math.floor(response.daily[i].temp.day));
                var humidity = $("<p>").text("Humidity: " + Math.floor(response.daily[i].humidity));
                var windSpeed = $("<p>").text("Wind Speed (MPH): " + Math.floor(response.daily[i].wind_speed));
                cardContent.attr('style', "border-radius:20px;");
                cardContent.append(icon, date, temp, humidity, windSpeed);
                weatherCard.append(cardContent);
                weatherDiv.append(weatherCard);
           }
       });
   }

   function historyList() {
       var searchInput = textArea.val().trim();
       var button = $("<button>").addClass("btn").text(searchInput);
       cityList.append(button);
   }

   searchBtn.on("click", getGeoLocation);
   
});
