'use strict';

/**
 * @ngdoc service
 * @name barteguidenMarkedsWebApp.eventService
 * @description
 * # eventService
 * Factory in the barteguidenMarkedsWebApp.
 */
angular.module('barteguidenMarkedsWebApp.services')
  .factory('Event', function ($resource) {
    return $resource('http://barteguiden.no/v2/events/:id', { id: '@_id' }, {
      update: {
        method: 'PUT'
      },
      query: {
        method: 'GET',
        isArray: false
      }
    });
  });


