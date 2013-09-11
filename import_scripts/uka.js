/*global require*/

var request = require("request");
var mapper = require("object-mapper");
var serverSync = require("../server_sync");


//var sourceFile = __dirname + "/../data/examples/uka.json";
var externalURL = "https://www.uka.no/program/?format=json";


getEventsFromExternalSource(function (data) {
    var externalEvents = JSON.parse(data);
    var events = parseEventsWithData(externalEvents);
    
    serverSync.sync(events, externalURL);
});

function getEventsFromExternalSource (callback) {
//    fs.readFile(sourceFile, function(err, data) {
//        callback(data);
//    });
    request({
        method: "GET",
        uri: externalURL,
        encoding: "utf8"
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            callback(body);
        }
    });
}

function parseEventsWithData (eventsSource) {
    var outputEvents = [];
    for (var i = 0; i < eventsSource.length; i++) {
        var eventSource = eventsSource[i];
        var baseEvent = mapper.merge(eventSource, {
            externalURL: externalURL,
            isPublished: true
        }, mapping);
        
//        var data = mapper.getKeyValue(eventSource, "showings");
        
        outputEvents.push(baseEvent);
    }
    
    return outputEvents;
}

var mapping = {
    "title": {
        key: "title",
        transform: trimString
    },
    "showings.0.date": { // TODO: There might exist more than one show
        key: "startAt",
        transform: function (value) {
            var currentTime = new Date();
            var timezoneOffset = currentTime.getTimezoneOffset();
            var date = new Date(Date.parse(value) + timezoneOffset * 60 * 1000);
            return date.toISOString();
        }
    },
    "showings.0.place": [
        {
            key: "placeName",
            transform: function (value) {
                return placeNameMapping[value];
            }
        },
        {
            key: "address",
            transform: function (value) {
                return addressMapping[value];
            }
        },
        {
            key: "latitude",
            transform: function (value) {
                return latitudeMapping[value];
            }
        },
        {
            key: "longitude",
            transform: function (value) {
                return longitudeMapping[value];
            }
        }
    ],
    "age_limit": {
        key: "ageLimit",
        transform: function (value) {
            var ageLimit = parseInt(value, 10);
            return (!isNaN(ageLimit)) ? ageLimit : 0;
        }
    },
    "showings.0.price": {
        key: "price",
        transform: function (value) {
            var price = parseInt(value, 10);
            return (!isNaN(price)) ? price : 0;
        }
    },
    "event_type": {
        key: "categoryID",
        transform: function (value) {
            return categoryMapping[value];
        }
    },
    "text": {
        key: "descriptions",
        transform: addDescription("nb")
    },
    "showings.0.url": {
        key: "eventURL",
        transform: addUKAPrefix
    },
    "image": {
        key: "imageURL",
        transform: addUKAPrefix
    },
    "showings.0.id": {
        key: "externalID",
        transform: trimString
    },
};

var categoryMapping = {
    "Konsert": "MUSIC",
    "Fest og moro": "NIGHTLIFE",
    "Revy og teater": "PERFORMANCES"
};

var placeNameMapping = {
    "Storsalen": "Studentersamfundet",
    "Knaus": "Studentersamfundet",
    "Dødens Dal": "Dødens dal"
};

var addressMapping = {
    "Storsalen": "Elgeseter gate 1",
    "Knaus": "Elgeseter gate 1",
    "Dødens Dal": undefined
};

var latitudeMapping = {
    "Storsalen": 63.422634,
    "Knaus": 63.422634,
    "Dødens Dal": 63.419322
};

var longitudeMapping = {
    "Storsalen": 10.394697,
    "Knaus": 10.394697,
    "Dødens Dal": 10.406578
};

function addDescription (language) {
    return function (value, fromObject, toObject) {
        var output = mapper.getKeyValue(toObject, "descriptions") || [];
        if (value) {
            output.push({
                language: language,
                text: trimString(value)
            });
        }
        
        return output;
    };
}

function trimString (value) {
    return value.toString().trim();
}

function addUKAPrefix (value) {
    return "https://www.uka.no" + trimString(value);
}

