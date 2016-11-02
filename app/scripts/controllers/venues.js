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
  .controller('VenuesCtrl', function ($scope, Venue, notify, $modal, $window, $location) {

    $scope.orderProperty = 'name';
    $scope.reverse = false;

    $scope.numberToMerge = 0;

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

    $scope.toggleToMerge = function(venue) {
      if(venue.selectedForMerge) {
        $scope.numberToMerge += 1;
      }else{
        $scope.numberToMerge -= 1;
      }
    }

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

    $scope.okMergeVenues = function () {
      $scope.$close($scope.representativeVenue);
    }

    $scope.openModalMergeVenues = function () {
      var scope = $scope.$new(true);
      var selectedVenues = $scope.venues.filter(function(venue) {return venue.selectedForMerge});
      scope.selectedVenues = selectedVenues;
      var modalInstance = $modal.open({
        scope: scope,
        templateUrl: 'views/venuemergemodal.html',
        controller: 'VenuesCtrl',
        size: 'lg'
      });
      modalInstance.result.then(function (representativeVenue) {
        selectedVenues.splice(selectedVenues.indexOf(representativeVenue), 1);
        selectedVenues.forEach((venue) => {
          if(representativeVenue.aliases.indexOf(venue.name) == -1){
            representativeVenue.aliases.push(venue.name);
          }
          venue.aliases.forEach((otherAlias) => {
            if(representativeVenue.aliases.indexOf(otherAlias) == -1){
              representativeVenue.aliases.push(otherAlias);
            }
          });
          Venue.delete({id: venue._id});
          var index;
          if((index = $scope.venues.indexOf(venue)) >=0){
            $scope.venues.splice($scope.venues.indexOf(venue), 1);
          }
        });

        representativeVenue.selectedForMerge = false;
        $scope.numberToMerge = 0;

        var venueObject = new Venue(representativeVenue);

        venueObject.$update({id: representativeVenue._id}, function() {
          notify({message: 'Stedene er slått sammen!', classes: 'alert-success'});
        }, function () {
          notify({message: 'Noe gikk galt!', classes: 'alert-danger'});
        });
      });
    }

    $scope.setRepresentative = function (venue) {
      $scope.representativeVenue = venue;
    }

  });
