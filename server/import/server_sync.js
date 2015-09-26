var Event = require('../models/Event.js');

exports.sync = function(events) {
    events.map(function(evt) {
        var query = {
            'eventUrl': evt.eventUrl
        };
        Event.findOne(
            query,
            function(err, doc) {
                if(!doc){
                    Event.create(evt , function(err, doc){
                        if(err){
                            console.log("Something went wrong in creating new event");
                        }
                    }
                );}
                
            }
        );

    });
}
