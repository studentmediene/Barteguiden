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
    var id  = parseInt(this.req.param("id"), 10);
    if (isNaN(id)) {
        this.next(Error.http(400));
        return;
    }
    
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