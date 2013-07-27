/*global require, module*/

var locomotive = require("locomotive");
var Controller = locomotive.Controller;

var RootController = new Controller();

RootController.main = function () {
    this.res.charset = "UTF-8";
    this.res.json({"welcome": "1.0.0"});
};

module.exports = RootController;