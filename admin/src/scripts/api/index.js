"use strict";

require("restangular");

module.exports = angular.module("barteguidenAdminApp.api", ["restangular"])
    .factory("api", require("./api-service"));
