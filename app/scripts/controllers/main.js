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

    $scope.orderProperty = 'shows[0].startDate';
    $scope.reverse = false;
    $scope.reverse2 = false;
    $scope.reverse3 = false;
    $scope.reverse4 = false;

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
