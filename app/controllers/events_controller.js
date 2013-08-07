/*global require, module*/

require("simple-errors");
var app = require("locomotive");

var Controller = app.Controller;

var EventsController = new Controller();

var Event = app.models.Event;


//EventsController.before(["create", "update", "destroy"], app.ensureAuthenticated);

EventsController.index = function () {
    var controller = this;
    
    Event.findAll()
        .success(function(events) {
            controller.res.charset = "utf8"; // TODO: Move to a more central place?
            controller.res.json({ events: events });
        })
        .error(function(err) {
            controller.next(Error.http(500, null, err));
        });
};

EventsController.show = function () {
    var controller = this;
    var id = controller.req.param("id");
    
    findEvent(id, controller, function (event) {
        controller.res.charset = "utf8"; // TODO: Move to a more central place?
        controller.res.json(event);
    });
};

EventsController.create = function() {
    var controller = this;
    var params = controller.req.body;
    
    Event.create(Event.fromJSON(params))
        .success(function(event) {
            controller.res.charset = "utf8"; // TODO: Move to a more central place?
            controller.res.json(event);
        })
        .error(function(err) {
            controller.next(Error.http(500, null, err));
        });
};

// TODO: Fix that an update removes fields that are not filled in...
EventsController.update = function() {
    var controller = this;
    var params = controller.req.body;
    var id = controller.req.param("id");
    
    findEvent(id, controller, function (event) {
        event.updateAttributes(Event.fromJSON(params))
            .success(function(updatedEvent) {
                controller.res.charset = "utf8"; // TODO: Move to a more central place?
                controller.res.json(updatedEvent);
            })
            .error(function(err) {
                controller.next(500, null, err);
            });
    });
};

EventsController.destroy = function() {
    var controller = this;
    var id = controller.req.param("id");
    
    findEvent(id, controller, function (event) {
        event.destroy()
                .success(function() {
                    controller.res.charset = "utf8"; // TODO: Move to a more central place?
                    controller.res.json({ ok: true });
                })
                .error(function(err) {
                    controller.next(500, null, err);
                });
    });
};

var findEvent = function (id, controller, callback) {
    Event.find(id)
        .success(function(event) {
            if (event === null) {
                controller.next(Error.http(404));
                return;
            }
            
            callback(event);
        })
        .error(function(err) {
            controller.next(500, null, err);
        });
};

module.exports = EventsController;