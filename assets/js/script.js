$(document).ready(function() {
   // yelp api
var queryUrl = "https://api.yelp.com/v3/businesses/{id}/reviews";

$.ajax({
   url: queryUrl,
   method: "GET"
}).then(function(response) {
   console.log(response);
   var businessId = response.id;
   console.log(businessId);
});
//====================================================================================================
   // openweather api

   // global variables
   var searchBtn = $("#searchBtn");
   var deleteBtn = $("#deleteBtn");
   var textArea = $("#textarea1");
   var cityList = $("#city-list");
   var restaurantsDiv = $("#restaurants");
   var weatherDiv = $("#weather");
   // starting local storage
   var searchHistory = JSON.parse(window.localStorage.getItem("search-history")) || [];

   function getGeoLocation () {
       var apiKey = "b0786aaf2595b4e2380f01ed8f03a7a4";
       var searchInput = textArea.val().trim();
       var url = "http://api.openweathermap.org/geo/1.0/direct?q=" + searchInput + "&limit=1&appid=" + apiKey;
       console.log(searchInput);
       $.ajax({
         url: url,
         method: "GET"
       }).then(function(response) {
          console.log(response);
          var lat = response[0].lat;
          var lon = response[0].lon;
          console.log(lat, lon);
          getCurrentWeather(lat, lon);
       });
       
   }

   function getCurrentWeather(lat, lon) {
       var apiKey = "b0786aaf2595b4e2380f01ed8f03a7a4";
       var queryUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial";
       $.ajax({
           url: queryUrl,
           method: "GET"
       }).then(function(response) {
           console.log(response);
           var weatherCard = $("<div>").addClass("card");
           var name = response[0].name
           weatherCard.text(name);
           console.log(name);
           weatherDiv.append(weatherCard);
       });
   }

   searchBtn.on("click", getGeoLocation);
});