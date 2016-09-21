var request = require("request");
var xml2js = require("xml2js");
var mapper = require("object-mapper");
var serverSync = require("../server_sync");
var categoryMapping = require('./category_mapping.js');

var parser = new xml2js.Parser();

var externalURL = "https://trdevents.no/feed/";

exports.insertEvents = function getEventsFromExternalSource () {
    for (var i = 1; i <= 10; i++) {
        var query = {paged: i};
        request({
            method: "GET",
            uri: externalURL,
            qs: query,
            encoding: "utf8",
            headers: {
                'User-Agent': 'Barteguiden'
            }
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                parser.parseString(body);
            }
        });
    }
}

parser.on("end", function(result) {
    var data = mapper.getKeyValue(result, "rss.channel.0.item");
    var events = parseEvents(data);
    serverSync.sync(events);
});

function parseEvents (externalEvents) {
    var outputEvents = [];

    externalEvents.forEach(function(event) {
        var event = mapper.merge(event, {
            isPublished: false
        }, mapping);
        if (event.category !== 'REMOVE' && event.venue.name.trim() !== 'Studentersamfundet') {
            outputEvents.push(event);
        }
    });

    return outputEvents;
}

var mapping = {
    "title.0": {
        key: "title"
    },
    "ev:tribeEventMeta.0.ev:startdate.0": {
        key: "startAt",
        transform: function (value) {
            var date = new Date(value.trim());
            return date.toISOString();
        }
    },

    "ev:tribeEventMeta.0.ev:enddate.0": {
        key: "endAt",
        transform: function (value) {
            var date = new Date(value.trim());
            return date.toISOString();
        }
    },

    "ev:tribeEventMeta.0.ev:normalPrice.0": {
        key: "price"
    },

    "ev:tribeEventMeta.0.ev:ageRestriction.0": {
        key: "ageLimit",
        transform: function (value) {
            var ageLimit = parseInt(value, 10);
            return (!isNaN(ageLimit)) ? ageLimit : 0;
        }
    },
    "ev:tribeEventMeta.0.ev:categories.0.category.0.categoryName.0": {
        key: "category",
        transform: function (value) {
            if(!value) {
                value = 'Barn';
            }

            var category = value.trim();

            if (category === 'Barn' || category === 'Familie') {
                return 'REMOVE';
            }
            return categoryMapping[category] || 'OTHER';
        }
    },
    "description.0": {
        key: "description",
        transform: function(value){
            return String(value.trim());
	    }
    },
    "isPromoted.0": {
        key: "isPromoted",
        transform: function () {
            return false;
        }
    },
    "link.0": {
        key: "eventUrl",
        transform: function(value) {
            return String(value.trim());
        }
    },
    "ev:tribeEventMeta.0.ev:picture.0": {
        key: "imageUrl",
        transform: function(value){
            return String(value.trim());
	    }
    },
    "ev:tribeEventMeta.0.ev:venueName.0": {
        key: "venue.name",
        transform: function(value){
            return String(value.trim());
	    }
    },
    "ev:tribeEventMeta.0.ev:venueStreet.0": {
        key: "venue.address",
        transform: function(value){
            return String(value.trim());
	    }
    },
    "ev:tribeEventMeta.0.ev:venueLat.0": {
        key: "venue.latitude",
        transform: function (value) {
            return Number(value.trim());
        }
    },
    "ev:tribeEventMeta.0.ev:venueLng.0": {
        key: "venue.longitude",
        transform: function (value) {
            return Number(value.trim());
        }
    },
    "ev:tribeEventMeta.0.ev:id.0": {
        key: "externalId",
        transform: function (id) {
            return parseInt(id.trim());
        }
    }
};

