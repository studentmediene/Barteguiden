'use strict';

/**
 * @ngdoc service
 * @name barteguidenMarkedsWebApp.eventService
 * @description
 * # eventService
 * Factory in the barteguidenMarkedsWebApp.
 */
angular.module('barteguidenMarkedsWebApp')
  .service('eventService', function ($http) {
    var baseURL = 'http://barteguiden.no/v2/';
    //$http.get(baseURL + 'events');
    return {
      getAllEvents: function() {
        //just get the json file locally now
        return $http.get(baseURL + 'events');
      },
      getEventById: function(id) {
        return $http.get(baseURL + 'events/' + id.toString());
      }
    };
  });

