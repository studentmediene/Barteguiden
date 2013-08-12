/*global require, module*/

var app = require("locomotive");
var Controller = app.Controller;

var RootController = new Controller();

RootController.main = function () {
    this.res.json({ welcome: "1.0.2" });
};

module.exports = RootController;