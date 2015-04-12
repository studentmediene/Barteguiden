'use strict';

/**
 * @ngdoc function
 * @name barteguidenMarkedsWebApp.controller:EditCtrl
 * @description
 * # EditCtrl
 * Controller of the barteguidenMarkedsWebApp
 */
angular.module('barteguidenMarkedsWebApp.controllers')
  .controller('EditCtrl', function ($scope, $routeParams, Event, $location, notify) {

    notify.config({duration:3000})
    $scope.time = [];
    $scope.event = {};
    $scope.cat = {};

    var event = Event.get({id: $routeParams.id}, function() {
      $scope.event = event;
      for(var i = 0; i < $scope.event.shows.length; i++) {
        var start = new Date($scope.event.shows[i].startDate);
        var end = $scope.event.shows[i].endDate === null ? null : new Date($scope.event.shows[i].endDate);

        $scope.time.push({
          startTime: $scope.formatTime(start.getHours()) + ':' + $scope.formatTime(start.getMinutes()),
          endTime: end === null ? null : $scope.formatTime(end.getHours()) + ':' + $scope.formatTime(end.getMinutes())
        });
      }
      $scope.cat.id = $scope.event.tags.pop();
      $scope._id = event._id;

    });


    $scope.formatTime = function(time) {
      if (time < 10) {
        return '0'+ time;
      }
      return time;
    };

    $scope.update = function() {
      $scope.event.$update({id:$routeParams.id }, function() {
        // Success
        console.log('Success');
        notify({message: 'Endingen er lagret!', classes: 'alert-success'});
        $location.path('/');
      }, function () {
        // failure
        notify({message: 'Noe gikk galt!', classes: 'alert-danger'});
      });
    };


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
