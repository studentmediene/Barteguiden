/*global require, module*/

var locomotive = require("locomotive");
var Controller = locomotive.Controller;

var EventsController = new Controller();

var User = require("../models").User;

EventsController.index = function () {
//    this.res.json(events);
    var self = this;
    
    var path = this.eventsPath();
    this.res.json(path);
    console.log("stopped?");
    User.findAll()
        .success(function(users) {
            self.res.json({users : users});
        })
        .error(function(error) {
            self.next(error);
        });
};

EventsController.show = function () {
    var self = this;
//    var params  = this.req.body;
    var path = this.eventsPath();
    
    this.res.json("test");
    User.create({username: 32, password: "hemmelig"})
        .success(function(user) {
            self.success();
        })
        .error(function(error) {
            self.failure(403, "test", error);
        });
};

//EventsController.before("*", function(next) {
//    this.res.charset = "UTF-8";
//    next();
//});

//EventsController.before(["index", "show"], function(next) {
//    this.failure(404, "Not found");
//});

module.exports = EventsController;