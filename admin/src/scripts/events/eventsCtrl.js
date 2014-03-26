"use strict";

module.exports = ["$scope", "Events", function ($scope, Events) {
    $scope.text = "This is a test2." + Events.test;
}];
