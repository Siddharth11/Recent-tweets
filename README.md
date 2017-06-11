### [Demo](https://recent-tweets.herokuapp.com/)

This is a small web app made using [socket.io](http://socket.io/), [mapbox.js](https://www.mapbox.com/mapbox.js/api/v2.4.0/) and [Twitter Search API](https://dev.twitter.com/rest/public/search). The app gets users' geolocation data and shows recent tweets within 100 miles of radius from him. The search API will first attempt to find tweets which have lat/long within the queried geocode, and in case of not having success, it will attempt to find tweets created by users whose profile location can be reverse geocoded into a lat/long within the queried geocode.

Currently, there's an **[unresolved bug](https://twittercommunity.com/t/geo-null-in-all-search-api-results/65691)** in Twitter API which shows less data than expected. 
