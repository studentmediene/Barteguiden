"use strict";

require("angular-http-auth");

module.exports = angular.module("barteguidenAdminApp.auth", [
        "http-auth-interceptor"
    ])
    .factory("Auth", require("./auth-service"))
    .run(require("./set-up-root-scope"));
