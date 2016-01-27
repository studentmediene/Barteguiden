'use strict';

angular.module('barteguidenMarkedsWebApp.controllers')
  .controller('AdminCtrl', function ($scope, $location) {
    $scope.showVenues = function() {
      $location.path('/venues');
    };
  });
