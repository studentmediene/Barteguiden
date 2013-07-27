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

var events = [
    {
        eventID: "1234-5678",
        title: "Tirsdagskviss",
        startAt: "2013-01-15T19:00:00+0200",
        placeName: "Samfundet",
        featured: true
    },
    {
        eventID: "2345-6789",
        title: "Glassblåsing",
        startAt: "2013-01-17T17:00:00+0200",
        placeName: "Trondheim Glassblåseri",
        featured: false
    },
    {
        eventID: "3456-7890",
        title: "LUKA",
        startAt: "2013-01-19T20:00:00+0200",
        placeName: "Samfundet",
        featured: false
    },
    {
        eventID: "3456-7890",
        title: "LUKA",
        startAt: "2013-01-19T20:00:00+0200",
        placeName: "Samfundet",
        featured: false
    },
    {
        eventID: "3456-7890",
        title: "LUKA",
        startAt: "2013-01-19T20:00:00+0200",
        placeName: "Samfundet",
        featured: true
    }
];