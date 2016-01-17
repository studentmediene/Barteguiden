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
 * @name barteguidenMarkedsWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the barteguidenMarkedsWebApp
 */
angular.module('barteguidenMarkedsWebApp.controllers')
  .controller('MainCtrl', ['$scope', 'Event', 'notify', '$location', '$modal', '$window', function ($scope, Event, notify, $location,$modal, $window) {

    $scope.orderProperty = 'startAt';
    $scope.reverse = false;

    $scope.pageSize = 15;
    $scope.currentPage = 1;

    $scope.eventSelection = [];

    $scope.togglePublished = function(id){
      $scope.ev = Event.get({id : id}, function(){
        $scope.ev.isPublished = !$scope.ev.isPublished;
        $scope.ev.$update({id: id}, function(res) {
          notify({message: 'Endringen er lagret!', classes: 'alert-success'});
        }, function () {
          notify({message: 'Noe gikk galt!', classes: 'alert-danger'});
        });
      });
    };

    $scope.toggleSelection = function(event){
      var ind = $scope.eventSelection.indexOf(event);
      if(ind>-1){
        $scope.eventSelection.splice(ind, 1);
      }else{
        $scope.eventSelection.push(event);
      }
    };

    $scope.order = function(orderProperty){
      $scope.reverse = ($scope.orderProperty === orderProperty) ? !$scope.reverse : false;
      $scope.orderProperty = orderProperty;
    };

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
      var scope = $scope.$new(true);
      scope.params = {elementType: 'Arrangementet'};
      var modalInstance = $modal.open({
        scope: scope,
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

    $scope.deleteMultipleEvents = function () {
      $scope.numDelete = $scope.eventSelection.length;
      var scope = $scope.$new(true);
      scope.params = {elementType: $scope.numDelete + ' arrangement'};
      var modalInstance = $modal.open({
        scope: scope,
        templateUrl: 'views/modal.html',
        controller: 'MainCtrl',
        size: 'sm'
      });

      modalInstance.result.then(function (result) {
        if(result === 'ok'){
          var l = $scope.eventSelection.length;
          for(var i = 0; i<l; i++){
            Event.delete({id: $scope.eventSelection[0]._id});
            $scope.events.splice($scope.events.indexOf($scope.eventSelection[0]), 1);
            $scope.eventSelection.splice(0, 1);
          }
        }
      });
    };

    $scope.disableDeleteButton = function(){
      return $scope.eventSelection.length === 0;
    }

    $scope.ok = function () {
      $scope.$close('ok');
    };

    $scope.cancel = function () {
      $scope.$dismiss('cancel');
    };
  }]);
