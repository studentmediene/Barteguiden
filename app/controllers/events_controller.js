/*global require, module*/

require("simple-errors");
var app = require("locomotive");

var Controller = app.Controller;

var EventsController = new Controller();

var Event = app.models.Event;


//EventsController.before("show", app.ensureAuthenticated);

EventsController.index = function () {
    var self = this;
    Event.findAll()
        .success(function(events) {
            self.res.charset = "utf8"; // TODO: Move to a more central place?
            self.res.json({ events: events });
        })
        .error(function(err) {
            self.next(Error.http(500, null, err));
        });
};

EventsController.show = function () {
    var self = this;
    var id = this.req.param("id");
    
    Event.find(id)
        .success(function (event) {
            if (event === null) {
                self.next(Error.http(404));
                return;
            }
            
            self.res.charset = "utf8"; // TODO: Move to a more central place?
            self.res.json(event);
        }).error(function(err) {
            self.next(Error.http(500, null, err));
        });
};

EventsController.create = function() {
    var self = this;
    var params = this.req.body;
    
    Event.create(Event.fromJSON(params))
        .success(function(event) {
            self.res.charset = "utf8"; // TODO: Move to a more central place?
            self.res.json(event);
        })
        .error(function(err) {
            self.next(Error.http(500, null, err));
        });
};

EventsController.update = function() {
    var self = this;
    var params = this.req.body;
    var id = this.req.param("id");
    
    Event.find(id)
        .success(function(event) {
            if (event === null) {
                self.next(Error.http(404));
                return;
            }
            
            event.updateAttributes(Event.fromJSON(params))
                .success(function(updatedEvent) {
                    self.res.charset = "utf8"; // TODO: Move to a more central place?
                    self.res.json(updatedEvent);
                })
                .error(function(err) {
                    self.next(500, null, err);
                });
        })
        .error(function(err) {
            self.next(500, null, err);
        });
};

module.exports = EventsController;