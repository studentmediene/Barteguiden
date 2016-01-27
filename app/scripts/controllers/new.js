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
 * @name barteguidenMarkedsWebApp.controller:NewCtrl
 * @description
 * # NewCtrl
 * Controller of the barteguidenMarkedsWebApp
 */

/* globals _: false */

angular.module('barteguidenMarkedsWebApp.controllers')
  .controller('NewCtrl', function ($scope, Event, Venue, $location, notify,
    Imageservice, dateOptions, timeOptions, categoryOptions, minDate, maxDate) {

    $scope.datepicker = {};
    $scope.event = new Event();
    $scope.image = {};

    var venues = Venue.query(function() {
      $scope.venues = _.map(venues,function(venue){
        return _.omit(venue, ['_id', '__v']);
      });
    });

    $scope.uploadImage = function($event) {
      $event.preventDefault();
      var file = $scope.image.image;
      Imageservice.upload(file).success(function(data) {
        $scope.event.imageUrl = data.url;
      });
    };

    $scope.submit = function() {
      $scope.event.$save(function () {
        notify({message: 'Arrangementet er lagret!', classes: 'alert-success'});
        $location.path('/');
      }, function () {
        // failure
        notify({message: 'Noe gikk galt!', classes: 'alert-danger'});
      });
    };

    $scope.saveAndContinue = function(evt) {
      evt.preventDefault();
      evt.stopPropagation();

      delete $scope.event._id;
      delete $scope.event.__v;

      var eventcopy = $scope.event;

      $scope.event.$save(function() {
        notify({message: 'En kopi av dette arrangementet er lagret!', classes:'alert-success'});
      }, function() {
        notify({message: 'Noe gikk galt!', classes: 'alert-danger'});
      });
      $scope.event = new Event(eventcopy);
    };

    $scope.open = function($event, elementOpened) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.datepicker[elementOpened] = !$scope.datepicker[elementOpened];

    };

    $scope.timeOptions = timeOptions;
    $scope.dateOptions = dateOptions;
    $scope.categoryOptions = categoryOptions;
    $scope.minDate = minDate;
    $scope.maxDate = maxDate;

    $scope.addVenue = function(){
      $location.path('/venue');
    };

  });
