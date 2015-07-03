/*
 * Copyright 2015 Studentmediene i Trondheim AS
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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

    notify.config({duration:3000});
    $scope.time = {};
    $scope.event = {};
    $scope.cat = {};

    var event = Event.get({id: $routeParams.id}, function() {
      $scope.event = event;
      var start = new Date($scope.event.startAt);
      var end = $scope.event.endAt === null ? null : new Date($scope.event.endAt);

      $scope.time.startTime = $scope.formatTime(start.getHours()) + ':' + $scope.formatTime(start.getMinutes());
      $scope.time.endTime = end === null ? null : $scope.formatTime(end.getHours()) + ':' + $scope.formatTime(end.getMinutes());
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
