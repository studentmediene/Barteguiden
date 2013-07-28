/*global require, module*/

var app = require("locomotive");
var Controller = app.Controller;

module.exports = function() {
    Controller.prototype.success = function () {
        this.res.json({ok: true});
    };
    
    Controller.prototype.failure = function (code, msg, error) {
        this.next({code: code, msg: msg, error: error});
    };
};