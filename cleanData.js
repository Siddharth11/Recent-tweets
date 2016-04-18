module.exports = function(data) {

    var initJSON = {
        "type": "FeatureCollection"
    };

    var arr = data.statuses.filter(function(el) {
        return el.coordinates !== null;
    });

    arr = arr.map(function(el) {
        var t = {
            "type": "Feature",
            "geometry": {
                "type": "Point"
            },
            "properties": {
                "marker-color": "#2e2e2e",
                "marker-size": "medium",
                "marker-symbol": "circle"
            }
        };

        // long - lat
        t.geometry.coordinates = el.coordinates.coordinates;
        t.properties.name = el.user.name;
        t.properties.handle = el.user.screen_name;
        t.properties.text = el.text;
        t.properties.img = el.user.profile_image_url.slice(5);

        return t;
    });

    initJSON.features = arr;
    return initJSON;

}
