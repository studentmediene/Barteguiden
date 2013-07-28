/*global require, module*/

var app = require("locomotive");
var Controller = app.Controller;

var EventsController = new Controller();

var Event = app.models.Event;

EventsController.index = function () {
//    this.res.json(events);
    var self = this;
    
    Event.findAll()
        .success(function(users) {
            self.res.json({users: users});
        })
        .error(function(error) {
            self.next(error);
        });
};

EventsController.show = function () {
    var self = this;
//    var params  = this.req.body;
//    var path = this.eventsPath();
    
    Event.create({
        title: "b",
        startAt: Date.parse("2013-07-28T16:00:00Z"),
    })
        .success(function(event) {
            self.success();
        })
        .error(function(error) {
            self.failure(404, "TODO" + error, error);
        });
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
    
    Event.find(this.param('id'))
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