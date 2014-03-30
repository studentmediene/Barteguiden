"use strict";

module.exports = ["$http", "api", function ($http, api) {
    console.log("EventsService init'd");
    
    return {
        getAll: function () {
            return $http.get("http://localhost:10913/v1/events");
        }
    };
}];
