'use strict';

/**
 * @ngdoc function
 * @name barteguidenMarkedsWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the barteguidenMarkedsWebApp
 */
angular.module('barteguidenMarkedsWebApp')
  .controller('MainCtrl', ['$scope', 'eventService', function ($scope, eventService) {
    eventService.getAllEvents()
      .success(function(data) {
        $scope.events = data.events;
      })
      .error(function(data, status, headers) {
        console.log(data, status, headers);
      });


  }]);
