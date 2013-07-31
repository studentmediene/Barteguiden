/*global require, module*/

require("simple-errors");
var app = require("locomotive");

var Controller = app.Controller;

var EventsController = new Controller();

var Event = app.models.Event;


//EventsController.before("show", app.ensureAuthenticated);

EventsController.index = function () {
//    this.res.json(events);
    var self = this;
    
    Event.findAll()
        .success(function(events) {
            self.res.json({ events: events });
        })
        .error(function(err) {
            self.next(Error.http(500, null, err));
        });
};

EventsController.show = function () {
//    var params  = this.req.body;
//    var path = this.eventsPath();
    this.res.json("Show");
};

//EventsController.create = function() {
//    var self = this;
//    var params = this.req.body;
//    
//    Event.create(params)
//        .success(function(event) {
//            self.success();
//        })
//        .error(function(err) {
//            self.failure(404, "TODO", err);
//        });
//};
//
//EventsController.update = function() {
//    var self   = this;
//    var params  = this.req.body;
//    
//    Event.find(this.param("id"))
//        .success(function(event) {
//            event.updateAttributes(params)
//                .success(function() {
//                    self.success();
//                })
//                .error(function(err) {
//                    self.failure(404, "TODO", err);
//                });
//        })
//        .error(function(err) {
//            self.failure(404, "TODO", err);
//        });
//};


module.exports = EventsController;