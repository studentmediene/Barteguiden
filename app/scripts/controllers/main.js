'use strict';

/**
 * @ngdoc function
 * @name barteguidenMarkedsWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the barteguidenMarkedsWebApp
 */
angular.module('barteguidenMarkedsWebApp.controllers')
  .controller('MainCtrl', ['$scope', 'Event', '$location', '$modal', '$window', function ($scope, Event, $location,$modal, $window) {

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

    $scope.open = function (id) {

      var modalInstance = $modal.open({
        templateUrl: 'views/modal.html',
        controller: 'MainCtrl',
        size: 'sm'
      });

      modalInstance.result.then(function (result) {
        if(result === 'ok'){
          Event.delete({id: id});
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
  }]);
