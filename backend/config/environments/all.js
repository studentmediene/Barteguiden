/*global __dirname*/

var fs = require("fs");
var express = require("express");
var poweredBy = require("connect-powered-by");
var util = require("util");
var passport = require("passport");
var analytics = require("analytics-node");

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
    this.use("/images", express.static(__dirname + "/../../data/images"));
    this.use(express.cookieParser());
    this.use(express.cookieSession({
        secret: "keyboard cat", // TODO: Set a better password
        cookie: { maxAge: 60*60*1000 }
    }));
    this.use(express.bodyParser());
    this.use(express.methodOverride());
//    this.use(express.session({ secret: "keyboard cat" })); // TODO: Set a better password
    this.use(passport.initialize());
    this.use(passport.session());
    
    // TODO: Temp fix
    // Set default response charset
//    this.use(function (req, res, next) {
//        res.charset = "utf-8";
//        next();
//    });

    this.use(function(req, res, next){
      res.header('Access-Control-Allow-Origin', 'http://localhost:9000');
      next();
    });
    
    this.use(function (req, res, next) {
        var userId = (req.user) ? req.user.username : "anonymous";
        
        var clientIp = req.socket.remoteAddress;
        var xffip  = req.header("X-Forwarded-For");
        var ip = xffip || clientIp;
        
        analytics.track({
            userId: userId,
            event: req.method,
            properties: {
                url: req.url,
                referrer: req.header("Referer")
            },
            context: {
                userAgent: req.header("User-Agent"),
                ip: ip
            }
        });
        
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
    
    // Configurations
    this.appVersion = getPackageVersion();
};

function getPackageVersion() {
    var packageFile = __dirname + "/../../package.json";
    var data = fs.readFileSync(packageFile);
    var package = JSON.parse(data);
    return package.version;
}
