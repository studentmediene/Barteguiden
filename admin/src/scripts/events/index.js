"use strict";

module.exports = angular.module("barteguidenAdminApp.events", [
        require("../api").name
    ])
    .filter("categoryImageSrc", require("./category-image-src-filter"))
    .factory("Events", require("./events-service"))
    .controller("EventsCtrl", require("./events-ctrl"));
