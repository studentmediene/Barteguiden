'use strict';

/**
 * @ngdoc function
 * @name barteguidenMarkedsWebApp.controller:NewCtrl
 * @description
 * # NewCtrl
 * Controller of the barteguidenMarkedsWebApp
 */
angular.module('barteguidenMarkedsWebApp.controllers')
  .controller('NewCtrl', function ($scope, Event, $location, notify, Imageservice) {

    notify.config({duration:3000});
    $scope.datepicker = {};
    $scope.event = new Event();
    $scope.time = {};
    $scope.image = {};

    $scope.uploadImage = function($event) {
      $event.preventDefault();
      var file = $scope.image.image;
      Imageservice.upload(file).success(function(data) {
        $scope.event.imageUrl = data.url;
      });
    };

    $scope.submit = function() {
      $scope.event.$save(function () {
        // Success
        console.log('Success');
        notify({message: 'Arrangementet er lagret!', classes: 'alert-success'});
        $location.path('/');
      }, function () {
        // failure
        notify({message: 'Noe gikk galt!', classes: 'alert-danger'});
      });

    };
    //datepicker - startPicker
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
      $scope.maxDate.setFullYear($scope.minDate.getFullYear() + 1);  // sets max available date one year ahead
    };

    $scope.toggleMinMax();

    $scope.insertTimeIntoDate = function(time, date) {
      if(time !== undefined && $scope.event[date] !== undefined)  {
        $scope.event[date].setHours(parseInt(time.slice(0,2),10));
        $scope.event[date].setMinutes(parseInt(time.slice(3,5),10));
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
