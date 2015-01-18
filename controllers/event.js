var Event = require('../models/Event')

// /api/events POST
exports.postEvents = function(req, res){
    var evnt = new Event();

    evnt.title = req.body.title;
    evnt.desc = req.body.desc;
    evnt.ownerId = req.user._id;

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
    });
};

// /api/events/:id GET
exports.getEvent = function(req, res){
    Event.findById(req.params.event_id, function(err, evnt){
        if(err)
            res.send(err);
        res.json(evnt);
    });
};

// /api/events/:id PUT
exports.putEvent = function(req, res){
    Event.update({ownerId: req.user._id, _id:req.params.event_id},
                 function(err, raw){
                     if (err)
                         res.send(err);
                    
                     res.json({message: 'Event updated.'});
                 });
};

// /api/events/:id DELETE
exports.deleteEvent = function(req, res){
    Event.remove({ownerId: req.user._id, _id: req.params.event_id},
            function(err){
                if (err)
                    res.send(err);
                res.json({message: 'Event removed.'});
            });
};
