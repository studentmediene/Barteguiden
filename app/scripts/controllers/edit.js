'use strict';

/**
 * @ngdoc function
 * @name barteguidenMarkedsWebApp.controller:EditCtrl
 * @description
 * # EditCtrl
 * Controller of the barteguidenMarkedsWebApp
 */
angular.module('barteguidenMarkedsWebApp')
  .controller('EditCtrl', function ($scope) {

    //datepicker - startPicker

    $scope.format = 'dd. MMMM yyyy';

    $scope.event = {
      startDate: undefined,
      endDate: undefined,
      descriptions: [
        {
          "language": "nb", "text": ""
        } //add another element if we want to implement english
      ]
  };

    $scope.today = function() {
      $scope.event.startDate = new Date();
      $scope.event.endDate = new Date();
    };
    $scope.today();



    $scope.clear = function () {
      $scope.event.startDate = null;
      $scope.event.endDate = null;
    };

    $scope.openStart = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.startPickerOpened = true;
    };

    $scope.openEnd = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.endPickerOpened = true;
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

    $scope.insertTimeIntoEndDate = function(time) {
      if(time !== undefined && $scope.event.endDate !== undefined)  {
        $scope.event.endDate.setHours(parseInt(time.slice(0,2),10));
        $scope.event.endDate.setMinutes(parseInt(time.slice(3,5),10));
        $scope.event.endDate = $scope.event.endDate;
      }

    };

    $scope.insertTimeIntoStartDate = function(time) {
      if (time !== undefined && $scope.event.startDate !== undefined) {
        $scope.event.startDate.setHours(parseInt(time.slice(0, 2), 10));
        $scope.event.startDate.setMinutes(parseInt(time.slice(3, 5), 10));
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
