var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);
var twitter = require('simple-twitter');
var cleanData = require('./cleanData');
var config = require('./config');


twitter = new twitter(
    config.consumerKey,
    config.consumerSecret,
    config.token,
    config.tokenSecret
);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {

    res.sendFile(__dirname + 'public/index.html');
});

io.on('connection', function(socket) {
    console.log('Yoohoo! We have a user');

    socket.on('locationData', twitterQuery);

    function twitterQuery(location) {

        twitter.on('get:search/tweets', function(error, data) {
            console.log('data emmited to frontend');

            socket.emit('twitterData', cleanData(JSON.parse(data)));
        });

        twitter.get("search/tweets", '?geocode=' + location[0] + ',' + location[1] + ',100mi&result_type=recent&count=100');
    }

    socket.on('disconnect', function() {
        console.log('User disconnected (._.)');
    });
});

http.listen((process.env.PORT || 5000), function() {
    console.log('listening on port 5000....');
});
