'use strict';

angular.module('barteguidenMarkedsWebApp')
  .controller('VenuesCtrl', function ($scope, Venue, $modal, $window, $location) {

    $scope.orderProperty = 'name';
    $scope.reverse = false;
    $scope.reverse1 = true;
    $scope.reverse2 = false;

    var venues = Venue.query(function() {
      $scope.venues = venues;
    });

    $scope.addVenue = function() {
      $location.path('/venue');
    };

    $scope.editVenue = function(id) {
      $location.path('/venue/' + id);
    };

    $scope.open = function (id) {
      var scope = $scope.$new(true);
      scope.params = {elementType: 'Stedet'};
      var modalInstance = $modal.open({
        scope: scope,
        templateUrl: 'views/modal.html',
        controller: 'VenuesCtrl',
        size: 'sm'
      });

      modalInstance.result.then(function (result) {
        if(result === 'ok'){
          Venue.delete({id: id});
          $window.location.reload();
        }
      });
    };

    $scope.ok = function () {
      $scope.$close('ok');
    };

    $scope.cancel = function () {
      $scope.$dismiss('cancel');
    };

  });
