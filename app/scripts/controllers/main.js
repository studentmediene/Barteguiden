'use strict';

/**
 * @ngdoc function
 * @name barteguidenMarkedsWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the barteguidenMarkedsWebApp
 */
angular.module('barteguidenMarkedsWebApp.controllers')
  .controller('MainCtrl', ['$scope', 'Event', '$location', function ($scope, Event, $location) {

    var events = Event.query(function() {
      $scope.events = events;
    });
    $scope.editEvent = function(id) {
      $location.path('/edit/' + id);
    };
    $scope.createEvent = function() {
      $location.path('/new');
    };

    $scope.deleteEvent = function(id) {
      Event.delete({id: id});
    };
  }]);
