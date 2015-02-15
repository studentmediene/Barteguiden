'use strict';

/**
 * @ngdoc function
 * @name barteguidenMarkedsWebApp.controller:EditCtrl
 * @description
 * # EditCtrl
 * Controller of the barteguidenMarkedsWebApp
 */
angular.module('barteguidenMarkedsWebApp.controllers')
  .controller('EditCtrl', function ($scope, $routeParams, Event) {

    $scope.event = {};

    var event = Event.get({id: $routeParams.id}, function() {
      console.log(event);
      $scope.event = event;
    });


    $scope.format = 'dd. MMMM yyyy';

    $scope.open = function($event, elementOpened) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.datepicker[elementOpened] = !$scope.datepicker[elementOpened];

    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    $scope.toggleMinMax = function() {
      $scope.minDate = new Date();

      $scope.maxDate = new Date();
      $scope.maxDate.setFullYear($scope.minDate.getFullYear() + 1);
      // sets max available date one year ahead

    };
    $scope.toggleMinMax();


    $scope.insertTimeIntoDate = function(time, index, date) {
      if(time !== undefined && $scope.event.shows[index][date] !== undefined)  {
        $scope.event.shows[index][date].setHours(parseInt(time.slice(0,2),10));
        $scope.event.shows[index][date].setMinutes(parseInt(time.slice(3,5),10));
      }

    };

    // categories
    $scope.categoryOptions = [
    {name: 'Debatter', id: 'DEBATE'},
    {name: 'Utstillinger', id: 'EXHIBITIONS'},
    {name: 'Musikk', id: 'MUSIC'},
    {name: 'Uteliv', id: 'NIGHTLIFE'},
    {name: 'Forestillinger', id: 'PERFORMANCES'},
    {name: 'Presentasjoner', id: 'PRESENTATIONS'},
    {name: 'Sport', id: 'SPORT'},
    {name: 'Andre', id: 'OTHER'}
    ];
  });
