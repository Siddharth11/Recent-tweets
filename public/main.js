'use strict';

var socket = io();

// mapbox access token
L.mapbox.accessToken = 'pk.eyJ1Ijoic2lkZGhhcnRoMTEiLCJhIjoiY2lteGhmNzg3MDBlN3Z3bTE2cm9qc3UyYiJ9.uRYdzCGK9Z5tJPqLrI-QsQ';

// get geolocation
navigator.geolocation.getCurrentPosition(emitLoc);

// emit geolocation to server
function emitLoc(pos) {

    var location = [pos.coords.latitude, pos.coords.longitude];

    // draw map (lat - long)
    var map = L.mapbox.map('map', 'mapbox.streets').setView(location, 9);

    // 100 miles
    var radius = 160934;

    // draw bounding circle
    var circle = L.circle(location, radius).addTo(map);
    circle._container.classList.add("overlay-circle");

    // emit location coordinates to server for fetching data using twitter api
    socket.emit('locationData', location);

    // receive tweets
    socket.on('twitterData', function (tweets) {

        console.log('data received');
        console.log(tweets);

        // add pins
        var myLayer = L.mapbox.featureLayer().setGeoJSON(tweets).addTo(map);

        // bind popup to each pin
        myLayer.eachLayer(function (layer) {

            var profURL = encodeURI('//twitter.com/' + layer.feature.properties.handle);

            var text = urlify(layer.feature.properties.text);

            var content = '\n                <div class="left">\n                    <a href="' + profURL + '" target="_blank">\n                        <img src="' + layer.feature.properties.img + '" alt="user-img" />\n                    </a>\n                </div>\n                <div class="right">\n                    <span class=\'name\'>\n                        <a href="' + profURL + '" target="_blank">' + layer.feature.properties.name + '</a>\n                    </span>\n                    <span class=\'handle\'>@' + layer.feature.properties.handle + '</span>\n                    <div class=\'tweet\'>' + text + '</div>\n                </div>                                                     \n                ';
            layer.bindPopup(content);
        });

        var loaderWrapper = document.querySelector('.loader-wrapper');
        loaderWrapper.style.opacity = 0;
        setTimeout(function () {

            loaderWrapper.parentNode.removeChild(loaderWrapper);
        }, 2100);
    });

    function urlify(text) {
        var urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.replace(urlRegex, function (url) {
            return '<a href=\'' + url + '\' target=\'_blank\'>' + url + '</a>';
        });
    }
}
//# sourceMappingURL=main.js.map
