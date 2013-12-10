//var fs = require("fs");
var request = require("request");
var csv = require("csv");
var mapper = require("object-mapper");
var serverSync = require("../server_sync");

//var sourceFile = __dirname + "/../data/examples/Events.csv";
var externalURL = "https://docs.google.com/spreadsheet/pub?key=0As_yy93hIfpddFRwc2hhMnpoOXpMWFQyOC1WUFN1TkE&output=csv";

//var data = fs.createReadStream(sourceFile);
getEventsFromExternalSource(function (data) {
    parseEvents(data, function (events) {
//        console.log(events);
        
        serverSync.sync(events, externalURL);
    });
});

function getEventsFromExternalSource (callback) {
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

function parseEvents (eventData, callback) {
    var events = [];
    csv()
        .from(eventData)
        .transform(function(row) {
            var dateString = row[1] + " " + row[2];
            row.splice(1, 2, dateString);
            return row;
        })
        .on("record", function(row, index) {
            // Skip header row
            if (index === 0) {
                return;
            }
            
            var externalID = (index + 1).toString();
            var imageURL = "http://barteguiden.no/v1/images/" + externalID + ".jpg";
            
            var event = mapper.merge(row, {
                imageURL: imageURL,
                externalURL: externalURL,
                externalID: externalID
            }, mapping);
            events.push(event);
        })
        .on("end", function() {
            callback(events);
        })
        .on("error", function(error) {
            console.log(error.message);
        });
}

var mapping = {
    "0": {
        key: "title"
    },
    "1": {
        key: "startAt",
        transform: function (value) {
            var date = new Date(Date.parse(value));
            return date.toISOString();
        }
    },
    "2": {
        key: "placeName"
    },
    "3": {
        key: "address",
        transform: function (value) {
            if (value) {
                return value;
            }
        }
    },
    "4": {
        key: "latitude",
        transform: function (value) {
            var latitude = parseFloat(value);
            if (!isNaN(latitude)) {
                return latitude;
            }
        }
    },
    "5": {
        key: "longitude",
        transform: function (value) {
            var longitude = parseFloat(value);
            if (!isNaN(longitude)) {
                return longitude;
            }
        }
    },
    "6": {
        key: "ageLimit",
        transform: function (value) {
            var ageLimit = parseInt(value, 10);
            return (!isNaN(ageLimit)) ? ageLimit : undefined;
        }
    },
    "7": {
        key: "price",
        transform: function (value) {
            var cleanValue = value.replace("kr", "");
            var price = parseInt(cleanValue, 10);
            return (!isNaN(price)) ? price : undefined;
        }
    },
    "8": {
        key: "categoryID",
        transform: function (value) {
            return value.toUpperCase(); // TODO: Validate category?
        }
    },
    "9": {
        key: "descriptions",
        transform: addDescription("nb")
    },
    "10": {
        key: "descriptions",
        transform: addDescription("en")
    },
    "11": {
        key: "isRecommended",
        transform: function (value) {
            return (value.toLowerCase() === "yes") ? true: false;
        }
    },
    "12": {
        key: "eventURL",
        transform: function (value) {
            if (String(value).length === 0) {
                return undefined;
            }
            
            return String(value);
        }
    },
    "13": {
        key: "isPublished",
        transform: function (value) {
            return (value.toLowerCase() === "yes") ? true: false;
        }
    }
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
    return String(value).trim();
}