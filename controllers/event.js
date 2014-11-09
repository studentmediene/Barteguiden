var Event = require('../models/Event')

// /api/events POST
exports.postEvents = function(req, res){
    var evnt = new Event();

    evnt.title = req.body.title;
    evnt.desc = req.body.desc;

    evnt.save(function(err){
        if (err)
            res.send(err);

        res.json({message: 'Event added.', data: evnt});
    })
}

// /api/events GET
exports.getEvents = function(req, res){
    Event.find(function(err, events) {
        if(err)
            res.send(err);
        res.json(events);
    })
};

// /api/events/id GET
exports.getEvent = function(req, res){
    Event.findById(req.params.event_id, function(err, evnt){
        if(err)
            res.send(err);
        res.json(evnt);
    })
};

