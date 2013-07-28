/*global require, module*/

var app = require("locomotive");

var Controller = app.Controller;

var EventsController = new Controller();

var Event = app.models.Event;

EventsController.index = function () {
//    this.res.json(events);
    var self = this;
    
    Event.findAll()
        .success(function(events) {
            self.res.json({events: events});
        })
        .error(function(error) {
            self.next(error);
        });
};

EventsController.show = function () {
//    var params  = this.req.body;
//    var path = this.eventsPath();
    this.res.json("Show");
};

//EventsController.before("*", function(next) {
//    this.res.charset = "UTF-8";
//    next();
//});

//EventsController.before(["index", "show"], function(next) {
//    this.failure(404, "Not found");
//});

EventsController.create = function() {
    var self = this;
    var params = this.req.body;
//    var path = this.eventsPath();
    
    Event.create(params)
        .success(function(event) {
            self.success();
        })
        .error(function(error) {
            self.failure(404, "TODO", error);
        });
};

EventsController.update = function() {
    var self   = this;
    var params  = this.req.body;
//    var path    = this.eventsPath();
    
    Event.find(this.param("id"))
        .success(function(event) {
            event.updateAttributes(params)
                .success(function() {
                    self.success();
                })
                .error(function(error) {
                    self.failure(404, "TODO", error);
                });
        })
        .error(function(error) {
            self.failure(404, "TODO", error);
        });
};


module.exports = EventsController;