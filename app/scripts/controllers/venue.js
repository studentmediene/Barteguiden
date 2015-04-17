'use strict';

/**
 * @ngdoc function
 * @name barteguidenMarkedsWebApp.controller:VenueCtrl
 * @description
 * # VenueCtrl
 * Controller of the barteguidenMarkedsWebApp
 */
angular.module('barteguidenMarkedsWebApp')
  .controller('VenueCtrl', function ($scope) {

    $scope.map = {
      center: {
        latitude: 63.43,
        longitude: 10.39
      },
      zoom: 13
    };

  });
