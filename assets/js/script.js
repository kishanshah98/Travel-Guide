// var apiKey = "GmxPIEUb9z8zNRhQnxIXbycTDjTogloh";

// $.ajax({
//     type:"GET",
//     url:"https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=GmxPIEUb9z8zNRhQnxIXbycTDjTogloh",
//     async:true,
//     dataType: "json",
//     success: function(json) {
//                 console.log(json);
//                 // Parse the response.
//                 // Do other things.
//              }
//   });


// yelp api
var apiKey = "rFlPqBV_66EyE8ZnW2gPlA1uKfHNFf8b9h-4yEQZuOdqSis4_VOBnA-jWORLf2oc_-DBUAdDK6tw3J6_rKR7P9ZJv-pFi76s9G5vPw72ppObfaA9YngRrix74DaWYnYx";
var queryUrl = "https://api.yelp.com/v3/businesses/{id}/reviews";

$.ajax({
   url: queryUrl,
   method: "GET"
}).then(function(response) {
   console.log(response);
});
// ==================================================================================================================================================

// openweather api

$(document).ready(function() {
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

   searchBtn.on("click", getGeoLocation);

   function getCurrentWeather(lat, lon) {
       var apiKey = "b0786aaf2595b4e2380f01ed8f03a7a4";
       var queryUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial";
       $.ajax({
           url: queryUrl,
           method: "GET"
       }).then(function(response) {
           console.log(response);
       });
   }

   // searchBtn.on("click", getCurrentWeather);
});