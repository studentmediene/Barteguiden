/*global process*/

var locomotive = require("locomotive");
var util = require("util");

var env = (process.env.NODE_ENV === "production") ? "production" : "development";

var config = {
    production: {
        host: "127.0.0.1",
        port: 3000,
    },
    development: {
        host: "0.0.0.0",
        port: 3000,
    }
};

locomotive.boot(".", env, function (err, server) {
    if (err) {
        throw err;
    }
    
    console.log(util.format("Locomotive %s application starting in %s...", locomotive.version, env));
    
    server.listen(config[env].port, config[env].host, function () { 
        var addr = this.address();
        console.log("Listening on %s:%d", addr.address, addr.port);
    });
});