'use strict';

/**
 * @ngdoc function
 * @name barteguidenMarkedsWebApp.controller:VenueCtrl
 * @description
 * # VenueCtrl
 * Controller of the barteguidenMarkedsWebApp
 */
angular.module('barteguidenMarkedsWebApp')
  .controller('VenueCtrl', function ($scope, Venue, $location, notify, $routeParams) {

    $scope.clicked = false;
    $scope.newVenue = Object.keys($routeParams).length === 0;

    $scope.clickedMarker = {
      id:0
    };

    function loadMap(startLat, startLong) {
      $scope.map = {
        center: {
          latitude: startLat,
          longitude: startLong
        },
        zoom: 13,
        events: {
          tilesloaded: function (map, eventName, originalEventArgs) {
            //map is truly ready then this callback is hit
          },
          click: function (mapModel, eventName, originalEventArgs) {

            var e = originalEventArgs[0];
            var lat = e.latLng.lat(),
              lon = e.latLng.lng();
            $scope.clickedMarker = {
              id: 0,
              title: 'You clicked here ' + 'lat: ' + lat + ' lon: ' + lon,
              latitude: lat,
              longitude: lon
            };
            $scope.venue.latitude = lat;
            $scope.venue.longitude = lon;
            $scope.clicked = true;
            //scope apply required because this event handler is outside of the angular domain
            $scope.$apply();
          }
        }
      };
    }

    if($scope.newVenue) {
      $scope.venue = new Venue(); // create empty venue
      $scope.venueAction = "Legg til"; // change header text in view
      loadMap(63.43,10.39);
    }
    else { // editing existing venue
      $scope.venueAction = "Endre"; // change header text in view
      $scope.venue = Venue.get({id: $routeParams.id}, function(venue) {
        $scope.clickedMarker.longitude = venue.longitude;
        $scope.clickedMarker.latitude = venue.latitude;
        $scope.clicked = true; // allow saving existing venue
        loadMap(venue.latitude, venue.longitude); // center map around existing pin
      });
    }

    $scope.hasClicked = function(){
      return $scope.clicked;
    };

    $scope.submit = function() {
      if($scope.newVenue) {
        $scope.venue.$save(function () {
          notify({message: 'Stedet er lagret!', classes: 'alert-success'});
          $location.path('/venues');
        }, function () {
          // failure
          notify({message: 'Noe gikk galt!', classes: 'alert-danger'});
        });
      }
      else {
        $scope.venue.$update({id: $routeParams.id}, function () {
          notify({message: 'Endringen er lagret!', classes: 'alert-success'});
          $location.path('/venues');
        }, function () {
          // failure
          notify({message: 'Noe gikk galt!', classes: 'alert-danger'});
        });
      }
    };


  });
