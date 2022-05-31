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

var apiKey = "rFlPqBV_66EyE8ZnW2gPlA1uKfHNFf8b9h-4yEQZuOdqSis4_VOBnA-jWORLf2oc_-DBUAdDK6tw3J6_rKR7P9ZJv-pFi76s9G5vPw72ppObfaA9YngRrix74DaWYnYx";
var queryUrl = "https://api.yelp.com/v3/businesses/{id}/reviews";

$.ajax({
   url: queryUrl,
   method: "GET"
}).then(function(response) {
   console.log(response);
});