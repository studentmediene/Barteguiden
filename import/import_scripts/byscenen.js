FEED_URL = "http://byscenen.no/?post_type=event&feed=rss2"

var mapper = require("object-mapper");
var feedParser = require('feedparser');
var request = require('request');

var serverSync = require("../server_sync");

var req = request(FEED_URL),
    feedparser = new feedParser([]);

req.on('error', function(error) {

});

req.on('response', function(res) {
    var stream = this;

    if (res.statusCode != 200) return this.emit('errror', new Error("Bad status code"));

    stream.pipe(feedparser);
});

feedparser.on('error', function(error) {
    console.log(error)
});

feedparser.on('readable', function() {
    var stream = this,
        meta = this.meta,
        item;
    items = [];
    while (item = stream.read()) {
        items.push(item);
    }
    events = parseEvents(items);
    console.log(events);

});

feedparser.on('end', function(result) {
    var data = mapper.getKeyValue(result, "rss.channel.0.item");
    var events = parseEvents(data);

    console.log(events);

    for (event in events)
        if (!event === undefined)
            serverSync.sync(event, externalURL);
});

function parseEvents(externalEvents) {
    var outputEvents = [];
    for (var i = 0; i < externalEvents.length; i++) {
        var externalEvent = externalEvents[i];
        var event = mapper.merge(externalEvent, {
            placeName: "Byscenen",
            address: "Kongens Gate 19, 7012 Trondheim",
            latitude: 63.430051,
            longitude: 10.391950,
            externalURL: FEED_URL,
            isPublished: true
        }, mapping);

        outputEvents.push(event);
    }
    return outputEvents;
}

var mapping = {
    "title": {
        key: "title",
        transform: function(value) {
            return value.replace(/^.*?-/, "").trim();
        }
    },
    "pubDate": {
        key: "startAt",
        transform: function(value) {
            if (value === undefined)
                return "";
            var currentTime = new Date();
            var timezoneOffset = currentTime.getTimezoneOffset();
            var date = new Date(Date.parse(value) + timezoneOffset * 60 * 1000);
            return date.toISOString();
        }
    },
    "agelimit": {
        key: "ageLimit",
        transform: function(value) {
            var ageLimit = parseInt(value, 10);
            return (!isNaN(ageLimit)) ? ageLimit : 0;
        }
    },
    "category.0": {
        key: "categoryID",
        transform: function(value) {
            return "OTHER";
        }
    },
    "description": {
        key: "descriptions",
    },
    "link": {
        key: "link"
    },
    "link.1.$.href": {
        key: "imageURL"
    },
    "guid": {
        key: "externalID"
    },
};
