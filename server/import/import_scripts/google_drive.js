/* Originally written by Christian Rasmussen */

var request = require("request");
var csv = require("csv");
var mapper = require("object-mapper");
var serverSync = require("../server_sync");

var externalURL = "https://docs.google.com/spreadsheet/pub?key=0As_yy93hIfpddFRwc2hhMnpoOXpMWFQyOC1WUFN1TkE&output=csv";


exports.insertEvents = function getEventsFromExternalSource () {
    request({
        method: "GET",
        uri: externalURL,
        encoding: "utf8"
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
             parseEvents(body, function (events) {
                serverSync.sync(events, externalURL);
            });
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
            var imageUrl = "http://barteguiden.no/v1/images/" + externalID + ".jpg";

            var event = mapper.merge(row, {
                imageUrl: imageUrl
            }, mapping);


            if(new Date(Date.parse(event.startAt)) > new Date()) {
                events.push(event);
            }
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
        key: "title",
        transform: function(value) {
            return trimString(value);
        }
    },
    "1": {
        key: "startAt",
        transform: function (value) {
            var date = new Date(Date.parse(value));
            if (date == 'Invalid Date')
                return new Date().toISOString();
            return date.toISOString();
        }
    },
    "2": {
        key: "venue.name"
    },
    "3": {
        key: "venue.address",
        transform: function (value) {
            if (value) {
                return value;
            }
        }
    },
    "4": {
        key: "venue.latitude",
        transform: function (value) {
            var latitude = parseFloat(value);
            if (!isNaN(latitude)) {
                return latitude;
            }
        }
    },
    "5": {
        key: "venue.longitude",
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
            return (!isNaN(ageLimit)) ? ageLimit : 0;
        }
    },
    "7": {
        key: "price",
        transform: function (value) {
            var cleanValue = value.replace("kr", "");
            var price = parseInt(cleanValue, 10);
            return (!isNaN(price)) ? price : 0;
        }
    },
    "8": {
        key: "category",
        transform: function (value) {
            return value.toUpperCase(); // TODO: Validate category?
        }
    },
    "9": {
        key: "description",
        transform: function(value) {
            return trimString(value);
        }
    },
    "11": {
        key: "isPromoted",
        transform: function (value) {
            return (value.toLowerCase() === "yes") ? true: false;
        }
    },
    "12": {
        key: "eventUrl",
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

function trimString (value) {
    return String(value).trim();
}
