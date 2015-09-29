'use strict';

/**
 * @ngdoc service
 * @name barteguidenMarkedsWebApp.venueservice
 * @description
 * # venueservice
 * Service in the barteguidenMarkedsWebApp.
 */
angular.module('barteguidenMarkedsWebApp')
  .factory('Venue', function ($resource) {
    return $resource('http://localhost:4004/api/venues/:id', { id: '@_id' }, {
      update: {
        method: 'PUT'
      },
      query: {
        method: 'GET',
        isArray: true
      }
    });
  });
