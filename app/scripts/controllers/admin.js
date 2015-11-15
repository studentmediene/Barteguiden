/**
 * Created by annakastet on 25/10/15.
 */
angular.module('barteguidenMarkedsWebApp.controllers')
  .controller('AdminCtrl', function ($scope, $location) {
    $scope.showVenues = function() {
      $location.path('/venues')
    }
  });
