'use strict';

/**
 * @ngdoc function
 * @name barteguidenMarkedsWebApp.controller:VenueCtrl
 * @description
 * # VenueCtrl
 * Controller of the barteguidenMarkedsWebApp
 */
angular.module('barteguidenMarkedsWebApp')
  .controller('VenueCtrl', function ($scope, Venue, $location, notify, $routeParams, Event) {

    $scope.clicked = false;
    $scope.newVenue = Object.keys($routeParams).length === 0;
    $scope.trondheim = new google.maps.LatLng(63.43,10.39);

    var events = Event.query(function() {
      $scope.events = events;
    });

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

        $scope.originalVenue = {};//Used for updating events after updating venue
        angular.copy($scope.venue, $scope.originalVenue);
        $scope.oldvenue = $scope.venue;
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
      else {//Update events refering to this venue
        $scope.updatedvenue = {};//Used to preserve venue changes
        angular.copy($scope.venue, $scope.updatedvenue);

        $scope.venue.$update({id: $routeParams.id}, function () {
          notify({message: 'Endringen er lagret!', classes: 'alert-success'});
          var count = 0;
          for(var i = 0; i<$scope.events.length; i++){
            var venue = $scope.events[i].venue;
            $scope.originalVenue = _.omit($scope.originalVenue, ['$promise', '$resolved','__v', '_id']);
            if(angular.equals($scope.originalVenue, venue)
            ){
                $scope.events[i].venue = $scope.updatedvenue;
                $scope.events[i].$update({id: $scope.events[i]._id})
                count++;
              }

          }
          notify({message: count.toString()+ (count==1 ? ' arrangement' : ' arrangementer') + ' ble oppdatert'});
          $location.path('/venues');
        }, function () {
          // failure
          notify({message: 'Noe gikk galt!', classes: 'alert-danger'});
        });
      }
    };

    $scope.search = function(address){
      var searchmap = new google.maps.Map(document.getElementById('marker'), {
        center: $scope.trondheim,
        zoom: 15
      });
      var request = {
        location: $scope.trondheim,
        radius: '20000',
        query: address
      };
      var service = new google.maps.places.PlacesService(searchmap);
      service.textSearch(request, function callback(results, status) {
        var place = results[0];
        if(place){
          var lat = place.geometry.location.lat();
          var lng = place.geometry.location.lng();
          $scope.clickedMarker.longitude = lng;
          $scope.clickedMarker.latitude = lat;
          $scope.venue.latitude = lat;
          $scope.venue.longitude = lng;
          $scope.clicked = true;
          $scope.map.center.latitude = lat;
          $scope.map.center.longitude = lng;
          $scope.$apply();
        }else{
          notify({message: 'Fant ingen resultater!', classes: 'alert-danger'});
        }
      });

    }



  });
