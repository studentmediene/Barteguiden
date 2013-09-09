/*global require, module*/

var locomotive = require("locomotive");
var Controller = locomotive.Controller;

var RootController = new Controller();

RootController.main = function () {
    var controller = this;
    
    this.res.json({
        version: controller.app.appVersion,
        events: controller.app.baseURL + "/events"
    });
};

module.exports = RootController;