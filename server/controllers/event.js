var Event = require('../models/Event');
var _ = require('lodash');

// POST /api/events
exports.postEvents = function(req, res){
    var evnt = new Event(req.body);

    evnt.save(function(err){
        if (err)
            res.send(err);

        res.json({message: 'Event added.', data: evnt});
    })
}

// GET /api/events
exports.getEvents = function(req, res){
    var time = new Date().getTime();
    Event.find()
    .where('startAt').gt(time)
    .exec(function(err, events) {
        if(err)
            res.send(err);
        res.json(events);
    });
};

// GET /api/events/:event_id
exports.getEvent = function(req, res){
    Event.findById(req.params.event_id, function(err, evnt){
        if(err)
            res.send(err);
        res.json(evnt);
    });
};

// PUT /api/events/:event_id
exports.putEvent = function(req, res){
    Event.update({_id:req.params.event_id},
                  req.body,
         function(err, raw){
             if (err)
                 res.send(err);

             res.json({message: 'Event updated.'});
         });
};

// DELETE /api/events/:event_id
exports.deleteEvent = function(req, res){
    Event.remove({_id: req.params.event_id},
        function(err){
            if (err)
                res.send(err);
            res.json({message: 'Event removed.'});
        });
};

// GET /api/v1/events
exports.oldEvents = function(req, res) {
   var time = new Date().getTime();
   Event.find()
    .where('startAt').gt(time)
    .exec(function(err, events) {
        if(err)
            res.send(err);
        var events_old =
            _.map(events, function(evt) {
                return {
                    "eventID": evt._id,
                    "title": evt.title,
                    "startAt": evt.startAt,
                    "placeName": evt.venue.name,
                    "address": evt.venue.address,
                    "latitude": evt.venue.latitude,
                    "longitude": evt.venue.longitude,
                    "ageLimit": evt.ageLimit,
                    "price": evt.price,
                    "categoryID": evt.category,
                    "descriptions": [{
                        "language":"nb",
                        "text": evt.description.replace(/\s+/g, " ")
                    }],
                    "isRecommended": evt.isPromoted || false,
                    "imageURL": evt.imageUrl,
                    "eventURL": evt.eventUrl
                };
            });
        res.json({
            "events": events_old
        });
    });

}
