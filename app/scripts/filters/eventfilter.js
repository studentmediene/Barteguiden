'use strict';

/**
 * @ngdoc filter
 * @name barteguidenMarkedsWebApp.filter:eventFilter
 * @function
 * @description
 * # eventFilter
 * Filter in the barteguidenMarkedsWebApp.
 */
angular.module('barteguidenMarkedsWebApp')
  .filter('eventFilter', function () {
    return function (input) {
      return 'eventFilter filter: ' + input;
    };
  });
