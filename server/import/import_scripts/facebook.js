var Facebook = require('facebook-node-sdk');

var facebook = new Facebook({ appId: process.env.FACEBOOK_APPID, secret: process.env.FACEBOOK_SECRET});
var mapper = require("object-mapper");
var serverSync = require("../server_sync");
var categoryMapping = require('./category_mapping.js');


var OPTIONS = {fields: ['id', 'cover', 'category', 'description', 'end_time', 'start_time',
                'name', 'ticket_uri', 'type', 'updated_time', 'place', 'attending_count',
                'interested_count', 'owner', 'parent_group'
]};
var PLACES = ['standuptrondheim', 'brukbar.blaest', 'antikvarene', 'ByscenenTrondheim',
              'familientrondheim'];

var FACEBOOK_EVENT = 'https://facebook.com/events/';


exports.insertEvents = function getEventsFromExternalSource () {
    PLACES.map(function(place) {
        var events = [];
        facebook.api('/' + place + '/events', OPTIONS, function(err, data) {
            data.data.map(function(item) {
                var event = mapper.merge(item, {
                    eventUrl: FACEBOOK_EVENT + item.id
                }, mapping);
                events.push(event)
                serverSync.sync(events);
            });

        });
    });
}

var mapping = {
    "name": "title",
    "start_time": "startAt",
    "end_time": "endAt",
    "category": {
        key: "category",
        transform: function (value) {
            return categoryMapping[value] || 'OTHER';
        }
    },
    "description": "description",
    "cover.source": "imageUrl",
    "place.name": "venue.name",
    "place.location.street": "venue.address",
    "place.location.latitude": "venue.latitude",
    "place.location.longitude": "venue.longitude",
    "id": {
        key: "externalId",
        transform: function (id) {
            return parseInt(id.trim());
        }
    }
};
