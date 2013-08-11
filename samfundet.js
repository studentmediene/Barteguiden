/*global require, __dirname*/

var fs = require("fs");
var eyes = require("eyes");
var xml2js = require("xml2js");
var mapper = require("object-mapper");

var parser = new xml2js.Parser();

parser.on("end", function(result) {
//    eyes.inspect(result);
    
    var eventsSource = mapper.getKeyValue(result, "rss.channel.0.item");

    var events = [];
    for (var i = 0; i < eventsSource.length; i++) {
        var eventSource = eventsSource[i];
        var event = mapper.merge(eventSource, {
//            "placeName": "Studentersamfundet",
//            "address": "Elgeseter gate 1",
//            "latitude": 63.422634,
//            "longitude": 10.394697,
            "descriptions": [],
//            "externalURL": "http://samfundet.no/rss"
        }, mapping);
        events.push(event);
    }
    eyes.inspect(events);
});

fs.readFile(__dirname + "/data/rss.rss", function(err, data) {
    parser.parseString(data);
});

var categoryMapping = {
    "Konsert": "MUSIC"
};

var createDescription = function (language) {
    return function (value, fromObject, toObject) {
        if (!value) {
            return undefined;
        }
        
        var output = mapper.getKeyValue(toObject, "descriptions") || [];
        
        output.push({
            language: language,
            text: value
        });
        
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
        key: "startAt"
    },
    "agelimit.0": {
        key: "ageLimit",
        transform: function (value) {
            var ageLimit = parseInt(value, 10);
            return (!isNaN(ageLimit)) ? ageLimit : null;
        }
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
        }
    },
    "category.0": {
        key: "categoryID",
        transform: function (value) {
            return categoryMapping[value];
        }
    },
    "description.0": {
        key: "descriptions",
        transform: createDescription("nb")
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