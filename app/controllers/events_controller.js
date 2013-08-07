/*global require, module*/

require("simple-errors");
var app = require("locomotive");

var Controller = app.Controller;

var EventsController = new Controller();

var Event = app.models.Event;


//EventsController.before(["create", "update", "destroy"], app.ensureAuthenticated);

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
    
    findEvent(id, this, function (event) {
        self.res.charset = "utf8"; // TODO: Move to a more central place?
        self.res.json(event);
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
    
    findEvent(id, this, function (event) {
        event.updateAttributes(Event.fromJSON(params))
            .success(function(updatedEvent) {
                self.res.charset = "utf8"; // TODO: Move to a more central place?
                self.res.json(updatedEvent);
            })
            .error(function(err) {
                self.next(500, null, err);
            });
    });
};

EventsController.destroy = function() {
    var self = this;
    var id = this.req.param("id");
    
    findEvent(id, this, function (event) {
        event.destroy()
                .success(function() {
                    self.res.charset = "utf8"; // TODO: Move to a more central place?
                    self.res.json({ ok: true });
                })
                .error(function(err) {
                    self.next(500, null, err);
                });
    });
};

var findEvent = function (id, self, callback) {
    Event.find(id)
        .success(function(event) {
            if (event === null) {
                self.next(Error.http(404));
                return;
            }
            
            callback(event);
        })
        .error(function(err) {
            self.next(500, null, err);
        });
};

module.exports = EventsController;