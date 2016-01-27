'use strict';

angular.module('barteguidenMarkedsWebApp')
  .controller('MenuCtrl', function ($scope, $location, Auth) {
    $scope.isCurrentView = function(e) {
      return e === $location.path();
    };

    $scope.isLoggedIn = function() {
      return Auth.isLoggedIn();
    };
  });
