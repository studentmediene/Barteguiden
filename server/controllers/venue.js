var Venue = require('../models/Venue')

// POST /api/venues
exports.postVenues = function(req, res){
    var venue = new Venue(req.body);

    venue.save(function(err){
        if (err)
            res.send(err);

        res.json({message: 'Venue added.', data: venue});
    })
}

// GET /api/venues
exports.getVenues = function(req, res){
    Venue.find(function(err, venues){
        if (err)
            res.send(err);

        res.json(venues);
    });
};

// GET /api/venues/:venue_id
exports.getVenue = function(req, res){
    Venue.findById(req.params.venue_id, function(err, venue){
        if(err)
            res.send(err);
        res.json(venue);
    });
};

// PUT /api/venues/:venue_id
exports.putVenue = function(req, res){
    Venue.update({_id:req.params.venue_id},
        req.body,
        function(err, raw){
            if (err)
                res.send(err);

            res.json({message: 'Venue updated.'});
        });
};

// DELETE /api/venues/:venue_id
exports.deleteVenue = function(req, res){
    Venue.remove({_id: req.params.venue_id},
        function(err){
            if (err)
                res.send(err);
            res.json({message: 'Venue removed.'});
        });
};
