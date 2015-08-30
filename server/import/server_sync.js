var Event = require('../models/Event.js');

exports.sync = function(events) {
    events.map(function(evt) {
        var query = {
            'eventUrl': evt.eventUrl
        };
        Event.findOneAndUpdate(
            query,
            evt,
            {upsert: true},
            function(err, doc) {
                if(err) {
                    console.log('Something wrong happened: ', evt.title);
                }
                else {
                    console.log('Finished: ', evt.title);
                }
            }
        );
    });
}

