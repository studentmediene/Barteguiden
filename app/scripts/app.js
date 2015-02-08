'use strict';

/**
 * @ngdoc overview
 * @name barteguidenMarkedsWebApp
 * @description
 * # barteguidenMarkedsWebApp
 *
 * Main module of the application.
 */

angular.module('barteguidenMarkedsWebApp.controllers', []);
angular.module('barteguidenMarkedsWebApp.filters', []);
angular.module('barteguidenMarkedsWebApp.services', []);
angular.module('barteguidenMarkedsWebApp.directives', []);


angular
  .module('barteguidenMarkedsWebApp', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ui.bootstrap',
    'barteguidenMarkedsWebApp.controllers',
    'barteguidenMarkedsWebApp.filters',
    'barteguidenMarkedsWebApp.services',
    'barteguidenMarkedsWebApp.directives'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/edit/:id', {
        templateUrl: 'views/edit.html',
        controller: 'EditCtrl'
      })
      .when('/new', {
        templateUrl: 'views/new.html',
        controller: 'NewCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
