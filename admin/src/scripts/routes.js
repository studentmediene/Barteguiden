"use strict";

module.exports = ["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "partials/home.html",
            controller: "MainCtrl"
        })
        .when("/events/", {
            templateUrl: "partials/home.html",
            controller: "EventsCtrl"
        })
        .otherwise({
            redirectTo: "/"
        });
}];
