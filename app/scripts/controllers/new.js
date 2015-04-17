'use strict';

/**
 * @ngdoc function
 * @name barteguidenMarkedsWebApp.controller:NewCtrl
 * @description
 * # NewCtrl
 * Controller of the barteguidenMarkedsWebApp
 */
angular.module('barteguidenMarkedsWebApp.controllers')
  .controller('NewCtrl', function ($scope, Event, $location, notify) {

    notify.config({duration:3000});
    $scope.datepicker = {};
    $scope.event = new Event();
    $scope.time = [];
    $scope.cat = {};

    $scope.image = {};

    $scope.uploadImage = function($event) {
      $event.preventDefault();
      var file = $scope.image.image;
      Imageservice.upload(file).success(function(data) {
        $scope.event.imageUrl = data.url;
      });
    };

    $scope.event.shows = [{
      startDate: new Date(),
      endDate: null
    }];

    $scope.add = function () {
      $scope.event.shows.push({
          startDate: new Date(),
          endDate: null
      });
    };

    $scope.remove = function(index) {
      if(index !== 0) {
        $scope.event.shows.splice(index, 1);
      }
    };

    $scope.submit = function() {
      if($scope.cat.id) {
        $scope.event.tags.push($scope.cat.id);
      }
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
