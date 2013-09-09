/*global require, module*/

require("simple-errors");
var locomotive = require("locomotive");
var eventViewModel = require("../view_models/event");

var Controller = locomotive.Controller;
var EventsController = new Controller();

var Event = locomotive.models.Event;


EventsController.before(["create", "update", "destroy"], locomotive.ensureAuthenticated);

EventsController.index = function () {
    var controller = this;
    
    var publicQuery = { where: ["startAt > ? and isPublished = 1", getDate6HoursAgo()] };
    var query = (controller.req.isAuthenticated()) ? undefined : publicQuery;
    
    Event.findAll(query)
        .success(function(events) {
            var eventViewModelTransform = (controller.req.isAuthenticated()) ? eventViewModel.fromDatabaseToAdmin : eventViewModel.fromDatabaseToPublic;
            
            controller.res.charset = "utf8"; // TODO: Move to a more central place?
            controller.res.json({ events: events.map(eventViewModelTransform) });
        })
        .error(function(err) {
            controller.next(Error.http(500, null, err));
        });
};

EventsController.show = function () {
    var controller = this;
    var id = controller.req.param("id");
    
    findEvent(controller, id, function (event) {
        var eventViewModelTransform = (controller.req.isAuthenticated()) ? eventViewModel.fromDatabaseToAdmin : eventViewModel.fromDatabaseToPublic;
        
        controller.res.charset = "utf8"; // TODO: Move to a more central place?
        controller.res.json(eventViewModelTransform(event));
    });
};

EventsController.create = function() {
    var controller = this;
    var params = controller.req.body;
    
    Event.create(eventViewModel.fromAdminToDatabase(params))
        .success(function(event) {
            controller.res.charset = "utf8"; // TODO: Move to a more central place?
            controller.res.json(eventViewModel.fromDatabaseToAdmin(event));
        })
        .error(function(err) {
            controller.next(Error.http(500, null, err));
        });
};

EventsController.update = function() {
    var controller = this;
    var params = controller.req.body;
    var id = controller.req.param("id");
    
    findEvent(controller, id, function (event) {
        event.updateAttributes(eventViewModel.fromAdminToDatabase(params))
            .success(function(updatedEvent) {
                controller.res.charset = "utf8"; // TODO: Move to a more central place?
                controller.res.json(eventViewModel.fromDatabaseToAdmin(updatedEvent));
            })
            .error(function(err) {
                controller.next(500, null, err);
            });
    });
};

EventsController.destroy = function() {
    var controller = this;
    var id = controller.req.param("id");
    
    findEvent(controller, id, function (event) {
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

var findEvent = function (controller, id, callback) {
    var adminQuery = { where: ["id = ?", id] };
    var publicQuery = { where: ["id = ? and startAt > ? and isPublished = 1", id, getDate6HoursAgo()] };
    var query = (controller.req.isAuthenticated()) ? adminQuery : publicQuery;
    
    Event.find(query)
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

var getDate6HoursAgo = function () {
    var seconds = 1000;
    var minutes = 60 * seconds;
    var hours = 60 * minutes;
    
    return new Date(Date.now() - 6 * hours);
};

module.exports = EventsController;