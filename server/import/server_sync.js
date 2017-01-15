var Event = require('../models/Event.js');
var Venue = require('../models/Venue.js');

function escapeString(string){ //Makes string possible to match with regex
  return string.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
}

exports.sync = function(events) {
    events.map(function(evt) {

        if (evt.externalId) {
            Event.findOne({'externalId': evt.externalId}, function(err, doc) {
                if (!doc) {
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
                    delete evt.category;
                    Event.findOneAndUpdate(
                        {'externalId': evt.externalId},
                        evt,
                        function(err, doc) {
                            if (err) {
                                console.error("Event error: ", err);
                            }
                        }
                    );
                }
            });
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

        if(evt.venue.name == null)
          return;

        //Match venues with same name or whose aliases-list contains name,
        //or venues with same, non-null address
        var venuequery = {
          $or: [
            {'name':
              { $regex: new RegExp('^' +
              escapeString(evt.venue.name) +
              '$', "i")}
            },
            {'aliases':
              { $regex: new RegExp('^' +
              escapeString(evt.venue.name) +
              '$', "i")}
            },
            { $and: [
              {
                'address':
                evt.venue.address == null ? null :
                { $regex: new RegExp('^' +
                escapeString(evt.venue.address) +
                '$', "i")}
              },
              {
                'address':
                {$ne: null}
              }
              ]
            }
          ]
        };

        var venue = {
            'name': evt.venue.name,
            'address': evt.venue.address,
            'latitude': evt.venue.latitude,
            'longitude': evt.venue.longitude
        };

        Venue.findOneAndUpdate(
          venuequery,
          {$setOnInsert: venue},
          {'upsert': true, 'new': true},
          function(err, doc){
            if (err) {
              console.error("Venue error: ", err);
            }else if (doc.name) {
              evt.venue.name = doc.name;
            }
          }
        )
    });
};
