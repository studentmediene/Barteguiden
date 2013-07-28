/*global require, module*/

var app = require("locomotive");
var Controller = app.Controller;

var RootController = new Controller();

RootController.main = function () {
    this.res.charset = "UTF-8";
    this.res.json({"welcome": "1.0.0"});
};

module.exports = RootController;