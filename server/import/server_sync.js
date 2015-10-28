var Event = require('../models/Event.js');

exports.sync = function(events) {
    events.map(function(evt) {
        var query = {
            'title': evt.title,
            'startAt': evt.startAt
        };
        
        Event.findOne(
            query,
            function(err, doc) {
                if(!doc){
                    Event.create(evt , function(err, doc){
                        if(err){
                            console.log("Something went wrong in creating new event");
                        }
                    });
                }else{
                  var newevt = new Event(evt);
                  doc.remove();
                  newevt.save();
                }

            }
        );

    });
}
