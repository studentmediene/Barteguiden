/*global require, module*/

var app = require("locomotive");

var User = app.models.User;
var Event = app.models.Event;

module.exports = function (done) {
    app.sequelize.sync({force: true}).then(function () {
        User.create({
            username: "pablo",
            password: "pablo"
        });
        Event.create({
            title: "a",
            startAt: new Date(Date.parse("2013-07-28 16:00")),
        });
        Event.create({
            title: "b",
            startAt: new Date(Date.parse("2013-07-28 16:00")),
        });
    }).then(function () {
        done();
    });
};