/* Originally written by Christian Rasmussen */

var Q = require("q");
var request = require("request");
var xml2js = require("xml2js");
var mapper = require("object-mapper");
var jsdom = require("jsdom");
var serverSync = require("../server_sync");
var categoryMapping = require('./category_mapping.js');

var parser = new xml2js.Parser();

var externalURL = "http://samfundet.no/rss";

exports.insertEvents = function getEventsFromExternalSource () {
    request({
        method: "GET",
        uri: externalURL,
        encoding: "utf8"
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            parser.parseString(body);
        }
    });
}

parser.on("end", function(result) {
    var data = mapper.getKeyValue(result, "rss.channel.0.item");
    var events = parseEvents(data);

    updateEventsWithPrices(events, function () {
        serverSync.sync(events);
    });
});

function parseEvents (externalEvents) {
    var outputEvents = [];
    for (var i = 0; i < externalEvents.length; i++) {
        var externalEvent = externalEvents[i];
        var event = mapper.merge(externalEvent, {
            venue: {
                name: "Studentersamfundet",
                address: "Elgeseter gate 1",
                latitude: 63.422634,
                longitude: 10.394697
            },
            isPublished: true
        }, mapping);

        outputEvents.push(event);
    }

    return outputEvents;
}

function updateEventsWithPrices (events, callback) {
    var promise_chain = Q.fcall(function(){});

    events.forEach(function (event) {
        var promise_link = function () {
            var deferred = Q.defer();

            jsdom.env({
                url: event.eventUrl,
                scripts: ['http://code.jquery.com/jquery.js'],
                done: function (err, window) {
                    event.price = findPrice(window.$);

                    deferred.resolve();
                }
            });

            return deferred.promise;
        };

        promise_chain = promise_chain.then(promise_link);
    });

    promise_chain.done(function () {
        callback();
    });
}

function findPrice($) {
    return parseInt($("td:contains('Billett') + td").text()) || 0;
}

var mapping = {
    "title.0": {
        key: "title"
    },
    "pubDate.0": {
        key: "startAt",
        transform: function (value) {
            var date = new Date(Date.parse(value));
            return date.toISOString();
        }
    },
    "agelimit.0": {

        key: "ageLimit",
        transform: function (value) {
            var ageLimit = parseInt(value, 10);
            return (!isNaN(ageLimit)) ? ageLimit : 0;
        }
    },
    "category.0": {
        key: "category",
        transform: function (value) {
            return categoryMapping[value];
        }
    },
    "description.0": {
        key: "description"
    },
    "isPromoted.0": {
        key: "isPromoted",
        transform: function () {
            return false;
        }
    },
    "link.0": {
        key: "eventUrl"
    },
    "link.1.$.href": {
        key: "imageUrl",
        transform: function(value) {
            return value.replace("/large/", "/medium/");
        }
    },
    "guid": {
        key: "externalId",
        transform: function(link) {
            return parseInt(link.replace("https://www.samfundet.no/arrangement/", "").split("-", 1)[0]);
        }
    }
};
