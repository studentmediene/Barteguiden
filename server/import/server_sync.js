var Event = require('../models/Event.js');
var Venue = require('../models/Venue.js');

exports.sync = function(events) {
    events.map(function(evt) {

        if (evt.externalId) {
            Event.findOneAndUpdate(
                {'externalId': evt.externalId},
                evt,
                {'upsert': true},
                function(err, doc) {
                    if (err) {
                        console.error("Event error: ", err);
                    }
                }
            );
        }

        else {
            Event.findOne(
                {
                'title': evt.title,
                'startAt': evt.startAt
                },
                function (err, doc) {
                    if (!doc) {
                        Event.create(evt, function (err, doc) {
                                if (err) {
                                    console.error("Event error: ", err);
                                }
                            }
                        );
                    }

                }
            );
        }


        var venuequery = {
            'name': evt.venue.name
        };
        var venue = {
            'name': evt.venue.name,
            'address': evt.venue.address,
            'latitude': evt.venue.latitude,
            'longitude': evt.venue.longitude
        };

        Venue.findOneAndUpdate(
            venuequery,
            venue,
            {'upsert': true},
            function(err, doc) {
                if (err) {
                    console.error("Venue error: ", err);
                }
            }
        );
    });
};
