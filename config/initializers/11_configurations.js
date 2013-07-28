/*global require, module*/

var app = require("locomotive");

var User = app.models.User;
var Event = app.models.Event;

module.exports = function() {
    app.sequelize.sync({force: true});
    
    Event.create({
        title: "b",
        startAt: Date.parse("2013-07-28T16:00:00Z"),
    });
};