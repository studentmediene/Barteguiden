angular.module('barteguidenMarkedsWebApp')
  .controller('MenuCtrl', function ($scope, $location) {
    $scope.isCurrentView = function(e) {
      return e === $location.path();
    }});
