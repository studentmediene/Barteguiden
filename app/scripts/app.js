'use strict';

/**
 * @ngdoc overview
 * @name barteguidenMarkedsWebApp
 * @description
 * # barteguidenMarkedsWebApp
 *
 * Main module of the application.
 */
angular
  .module('barteguidenMarkedsWebApp', [
    'ngCookies',
    'ngResource',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
