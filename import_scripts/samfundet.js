/*global require, __dirname*/

var fs = require("fs");
var xml2js = require("xml2js");
var mapper = require("object-mapper");
var serverSync = require("../server_sync");


var sourceFile = __dirname + "/../data/examples/rss3.rss";

var parser = new xml2js.Parser();

fs.readFile(sourceFile, function(err, data) {
    parser.parseString(data);
});

parser.on("end", function(result) {
    var eventsSource = mapper.getKeyValue(result, "rss.channel.0.item");
    var externalEvents = getEventsFromEventsSource(eventsSource);
    
//    fs.writeFile(__dirname + "/data/sync/samfundet.json", JSON.stringify(samfundetEvents));
    serverSync.sync(externalEvents, "http://samfundet.no/rss");
});

var getEventsFromEventsSource = function (eventsSource) {
    var samfundetEvents = [];
    for (var i = 0; i < eventsSource.length; i++) {
        var eventSource = eventsSource[i];
        var event = mapper.merge(eventSource, {
            placeName: "Studentersamfundet",
            address: "Elgeseter gate 1",
            latitude: 63.422634,
            longitude: 10.394697,
            externalURL: "http://samfundet.no/rss",
            isPublished: true
        }, mapping);
        samfundetEvents.push(event);
    }
    
    return samfundetEvents;
};

var categoryMapping = {
    "Konsert": "MUSIC",
    "Film": "PRESENTATIONS",
    "Møte": "DEBATE",
    "Happening": "NIGHTLIFE",
    "Samfundsmøte": "DEBATE",
    "Excenteraften": "DEBATE",
    "Temafest": "NIGHTLIFE",
    "Bokstavelig talt": "DEBATE",
    "Quiz": "NIGHTLIFE",
    "Show": "PERFORMANCES"
};

var addDescription = function (language) {
    return function (value, fromObject, toObject) {
        var output = mapper.getKeyValue(toObject, "descriptions") || [];
        if (value) {
            output.push({
                language: language,
                text: value
            });
        }
        
        return output;
    };
};

var mapping = {
    "title.0": {
        key: "title",
        transform: function (value) {
            return value.replace(/^.*?-/, "").trim();
        }
    },
    "pubDate.0": {
        key: "startAt",
        transform: function (value) {
            var currentTime = new Date();
            var timezoneOffset = currentTime.getTimezoneOffset();
            var date = new Date(Date.parse(value) + timezoneOffset * 60 * 1000);
            return date.toISOString();
        }
    },
    "agelimit.0": {
        key: "ageLimit",
        transform: function (value) {
            var ageLimit = parseInt(value, 10);
            return (!isNaN(ageLimit)) ? ageLimit : undefined;
        },
        default: function () { return 0; } // TODO: Remove when iOS-application supports null-values
    },
    "prices.0.price": {
        key: "price",
        transform: function (value) {
            if (!value) {
                return undefined;
            }
            
            for (var i = 0; i < value.length; i++) {
                var priceSource = value[i];
                var priceType = mapper.getKeyValue(priceSource, "$.rel");
                if (priceType === "For envher pris") {
                    var price = parseInt(mapper.getKeyValue(priceSource, "_"), 10);
                    if (!isNaN(price)) {
                        return price;
                    }
                }
            }
            
            return undefined;
        },
        default: function () { return 0; } // TODO: Remove when iOS-application supports null-values
    },
    "category.0": {
        key: "categoryID",
        transform: function (value) {
            return categoryMapping[value];
        }
    },
    "description.0": {
        key: "descriptions",
        transform: addDescription("nb")
    },
    "link.0": {
        key: "eventURL"
    },
    "link.1.$.href": {
        key: "imageURL"
    },
    "guid.0": {
        key: "externalID"
    },
};