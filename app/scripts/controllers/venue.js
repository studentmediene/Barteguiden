'use strict';

/**
 * @ngdoc function
 * @name barteguidenMarkedsWebApp.controller:VenueCtrl
 * @description
 * # VenueCtrl
 * Controller of the barteguidenMarkedsWebApp
 */
angular.module('barteguidenMarkedsWebApp')
  .controller('VenueCtrl', function ($scope, Venue, $location, notify) {

    $scope.venue = new Venue();
    $scope.clicked = false;

    $scope.clickedMarker = {
      id:0,
      coords: {
        latitude: 63.422634,
        longitude:10.394697
      }
    };

    $scope.map = {
      center: {
        latitude: 63.43,
        longitude: 10.39
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

    $scope.hasClicked = function(){
      return $scope.clicked;
    };

    $scope.submit = function() {
      $scope.venue.$save(function () {
        notify({message: 'Stedet er lagret!', classes: 'alert-success'});
        $location.path('/');
      }, function () {
        // failure
        notify({message: 'Noe gikk galt!', classes: 'alert-danger'});
      });

    };


  });
