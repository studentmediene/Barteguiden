"use strict";

module.exports = ["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/events/", {
            templateUrl: "partials/events.html",
            controller: "EventsCtrl",
            resolve: {
                events: function ($q, Events) {
                    var deferred = $q.defer();
                    
                    Events.getAll().success(function (data) {
                        deferred.resolve(data.events);
                    }).error(function () {
                        deferred.reject();
                    });
                    
                    return deferred.promise;
                }
            }
        })
        .when("/import/", {
            templateUrl: "partials/import.html",
            controller: "ImportCtrl",
            resolve: {
                main: function ($http, $q) {
                    var deferrered = $q.defer();
                    
                    $http.get("http://localhost:10913/v1/").success(function (data) {
                        deferrered.resolve(data);
                    }).error(function () {
                        deferrered.reject();
                    });
                    
                    return deferrered.promise;
                }
            }
        })
        .otherwise({
            redirectTo: "/events/"
        });
}];
