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

angular.module('barteguidenMarkedsWebApp')
  .controller('VenuesCtrl', function ($scope, Venue, $modal, $window, $location) {

    $scope.orderProperty = 'name';
    $scope.reverse = false;

    $scope.order = function(orderProperty){
      $scope.reverse = ($scope.orderProperty === orderProperty) ? !$scope.reverse : false;
      $scope.orderProperty = orderProperty;
    };

    var venues = Venue.query(function() {
      $scope.venues = venues;
    });

    $scope.addVenue = function() {
      $location.path('/venue');
    };

    $scope.editVenue = function(id) {
      $location.path('/venue/' + id);
    };

    $scope.open = function (id) {
      var scope = $scope.$new(true);
      scope.params = {elementType: 'Stedet'};
      var modalInstance = $modal.open({
        scope: scope,
        templateUrl: 'views/modal.html',
        controller: 'VenuesCtrl',
        size: 'sm'
      });

      modalInstance.result.then(function (result) {
        if(result === 'ok'){
          Venue.delete({id: id});
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

  });
