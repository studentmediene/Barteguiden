/*global require, module, console*/

var express = require("express");
var poweredBy = require("connect-powered-by");
var util = require("util");

module.exports = function () {
    // Warn of version mismatch between global "lcm" binary and local installation
    // of Locomotive.
    if (this.version !== require("locomotive").version) {
        console.warn(util.format("version mismatch between local (%s) and global (%s) Locomotive module", require("locomotive").version, this.version));
    }
    
    // Use middleware.  Standard [Connect](http://www.senchalabs.org/connect/)
    // middleware is built-in, with additional [third-party](https://github.com/senchalabs/connect/wiki)
    // middleware available as separate modules.
    this.use(poweredBy(null));
    this.use(express.logger());
//    this.use(express.favicon());
    this.use(express.bodyParser());
    this.use(express.methodOverride());
    this.use(this.router);
    
    // Error handling
    this.use(function(err, req, res, next) {
//        console.error("Error: " + err.code + " " + err.msg + " (" + err.error + ")");
        res.json(err.code, {error: err.msg});
    });
};