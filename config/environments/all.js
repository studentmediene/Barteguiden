/*global require, module, console*/

var express = require("express");
var poweredBy = require("connect-powered-by");
var util = require("util");
var passport = require("passport");

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
    this.use(express.cookieParser());
    this.use(express.bodyParser());
    this.use(express.methodOverride());
    this.use(express.session({secret: "keyboard cat"})); // TODO: Set a better password
    this.use(passport.initialize());
    this.use(passport.session());
    
    // TODO: Temp fix
    // Set default response charset
    this.use(function (req, res, next) {
        res.charset = "utf-8";
        next();
    });
    
    this.use(this.router);
    
    
    
    
    // Error handling
    this.use(function(err, req, res, next) {
        console.log(err);
        if (err) {
            var statusCode = parseInt(err.status, 10);
            if (typeof(err.message) === "string" && isNaN(statusCode) === false) {
                res.json(statusCode, { error: err.message });
                return;
            }
        }
        
        res.json(500, { error: "Internal server error" });
    });
};