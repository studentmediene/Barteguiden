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
  .controller('EditCtrl', function ($scope, $routeParams, Event, $location,
     notify, categoryOptions, dateOptions, timeOptions, minDate, maxDate, Venue) {

    $scope.datepicker = {};
    $scope.event = Event.get({id: $routeParams.id});

    var venues = Venue.query(function() {
      $scope.venues = _.map(venues,function(venue){
        return _.omit(venue, ['_id', '__v']);
      });
    });

    $scope.update = function() {
      $scope.event.$update({id:$routeParams.id }, function() {
        notify({message: 'Endingen er lagret!', classes: 'alert-success'});
        $location.path('/');
      }, function () {
        // failure
        notify({message: 'Noe gikk galt!', classes: 'alert-danger'});
      });
    };

    $scope.open = function($event, elementOpened) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.datepicker[elementOpened] = !$scope.datepicker[elementOpened];

    };

    $scope.dateOptions = dateOptions;
    $scope.timeOptions = timeOptions;
    $scope.categoryOptions = categoryOptions;
    $scope.minDate = minDate;
    $scope.maxDate = maxDate;

  });
