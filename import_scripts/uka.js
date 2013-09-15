/*global require, __dirname*/

var fs = require("fs");
var request = require("request");
var mapper = require("object-mapper");
var extend = require("xtend");
var serverSync = require("../server_sync");


var sourceFile = __dirname + "/../data/examples/uka4.json";
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
    
    eventsSource.forEach(function (eventSource) {
        var baseEvent = mapper.merge(eventSource, {
            externalURL: externalURL,
            isPublished: true
        }, mapping);
        
        eventSource.showings.forEach(function (showing) {
            var showingEvent = mapper.merge(showing, {}, showingMapping);
            var outputEvent = extend(baseEvent, showingEvent);
            
            outputEvents.push(outputEvent);
        });
    });
    
    return outputEvents;
}

var showingMapping = {
    "date": {
        key: "startAt",
        transform: function (value) {
            if (value === null) {
                return undefined;
            }
            
            var currentTime = new Date();
            var timezoneOffset = currentTime.getTimezoneOffset();
            var date = new Date(Date.parse(value) + timezoneOffset * 60 * 1000);
            return date.toISOString();
        }
    },
    "place": [
        {
            key: "placeName",
            transform: getPlaceTransform("placeName")
        },
        {
            key: "address",
            transform: getPlaceTransform("address")
        },
        {
            key: "latitude",
            transform: getPlaceTransform("latitude")
        },
        {
            key: "longitude",
            transform: getPlaceTransform("longitude")
        }
    ],
    "price": {
        key: "price",
        transform: function (value) {
            var price = parseInt(value, 10);
            return (!isNaN(price)) ? price : 0;
        }
    },
    "url": {
        key: "eventURL",
        transform: addUKAPrefix
    },
    "id": {
        key: "externalID",
        transform: trimString
    },
};

var mapping = {
    "title": {
        key: "title",
        transform: trimString
    },
    "age_limit": {
        key: "ageLimit",
        transform: function (value) {
            var ageLimit = parseInt(value, 10);
            return (!isNaN(ageLimit)) ? ageLimit : 0;
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
    "image": {
        key: "imageURL",
        transform: addUKAPrefix
    },
};

var categoryMapping = {
    "Dagens bedrift": "PRESENTATIONS",
    "Fest og moro": "NIGHTLIFE",
    "Konsert": "MUSIC",
    "Kurs og events": "PRESENTATIONS",
    "Revy og teater": "PERFORMANCES",
};

var placeMapping = {
    "Samfundet": {
        "placeName": "Studentersamfundet",
        "address": "Elgeseter gate 1",
        "latitude": 63.422634,
        "longitude": 10.394697,
    },
    "Dødens Dal": {
        "placeName": "Dødens dal",
        "address": null,
        "latitude": 63.419322,
        "longitude": 10.406578,
    },
    "Elgesetergate 4": {
        "placeName": "Elgesetergate 4",
        "address": null,
        "latitude": 63.42177,
        "longitude": 10.394608,
    },
    "Gløshaugen": {
        "placeName": "Gløshaugen",
        "address": null,
        "latitude": 63.415366,
        "longitude": 10.408513,
    },
    "Høyskoleparken": {
        "placeName": "Høyskoleparken",
        "address": null,
        "latitude": 63.421223,
        "longitude": 10.396797,
    },
    "Vår Frue Kirke": {
        "placeName": "Vår Frue Kirke",
        "address": "Kongens gate 5",
        "latitude": 63.430227,
        "longitude": 10.397526,
    },
};

var aliasForPlaceMapping = {
    "Biblioteket": "Samfundet",
    "Bodegaen": "Samfundet",
    "Daglighallen": "Samfundet",
    "Edgar": "Samfundet",
    "Hele huset": "Samfundet",
    "Klubben": "Samfundet",
    "Knaus": "Samfundet",
    "Rundhallen": "Samfundet",
    "Selskapssiden": "Samfundet",
    "Storsalen": "Samfundet",
    "Strossa": "Samfundet",
    "Realfagsbygget - Gløshaugen": "Gløshaugen",
    "Stripa - Gløshaugen": "Gløshaugen",
};

function getPlaceTransform(attribute) {
    return function (value) {
        var place = getPlace(value);
        if (place) {
            return place[attribute];
        }
    };
}

function getPlace(place) {
    var aliasForPlace = aliasForPlaceMapping[place];
    if (aliasForPlace) {
        place = aliasForPlace;
    }
    
    var actualPlace = placeMapping[place];
    return actualPlace;
}

function addDescription(language) {
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

function trimString(value) {
    return value.toString().trim();
}

function addUKAPrefix(value) {
    return "https://www.uka.no" + trimString(value);
}

