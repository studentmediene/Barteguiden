/*global require, module*/

var locomotive = require("locomotive");
var Controller = locomotive.Controller;

module.exports = function() {
    Controller.prototype.success = function () {
        this.res.json({ok: true});
    };
    
    Controller.prototype.failure = function (code, msg, error) {
        this.next({code: code, msg: msg, error: error});
    };
};
