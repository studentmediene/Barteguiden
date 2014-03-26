"use strict";

module.exports = angular.module("barteguidenAdminApp.events", [])
    .factory("Events", require("./eventsService"))
    .controller("EventsCtrl", require("./eventsCtrl"));
