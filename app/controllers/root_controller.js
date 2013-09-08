/*global require, module, __dirname*/

var fs = require("fs");
var app = require("locomotive");
var Controller = app.Controller;

var RootController = new Controller();


var packageFile = __dirname + "/../../package.json";


RootController.main = function () {
    this.res.json({ welcome: getVersion() });
};

function getVersion() {
    var data = fs.readFileSync(packageFile);
    var package = JSON.parse(data);
    return package.version;
}

module.exports = RootController;