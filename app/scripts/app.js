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
    'ui.bootstrap.datetimepicker',
    'barteguidenMarkedsWebApp.controllers',
    'barteguidenMarkedsWebApp.filters',
    'barteguidenMarkedsWebApp.services',
    'barteguidenMarkedsWebApp.directives',
    'cgNotify',
    'uiGmapgoogle-maps',
    'ab-base64'
  ])
  .config(function ($routeProvider) {


    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        access: {
          requiresLogin: true
        }
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        access: {
          requiresLogin: false
        }
      })
      .when('/edit/:id', {
        templateUrl: 'views/edit.html',
        controller: 'EditCtrl',
        access: {
          requiresLogin: true
        }
      })
      .when('/new', {
        templateUrl: 'views/new.html',
        controller: 'NewCtrl',
        access: {
          requiresLogin: true
        }
      }).when('/venue', {
        templateUrl: 'views/venue.html',
        controller: 'VenueCtrl',
        access: {
          requiresLogin: true
        }
      })
      .when('/admin', {
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl',
        access: {
          requiresLogin: true
        }
      })
      .otherwise({
        redirectTo: '/',
        access: {
          requiresLogin: true
        }
      });
  })
  .run(function (notify) {
    notify.config({duration:3000});
  })
  .constant('categoryOptions',
    [
      {name: 'Debatter', id: 'DEBATE'},
      {name: 'Utstillinger', id: 'EXHIBITIONS'},
      {name: 'Musikk', id: 'MUSIC'},
      {name: 'Uteliv', id: 'NIGHTLIFE'},
      {name: 'Forestillinger', id: 'PERFORMANCES'},
      {name: 'Presentasjoner', id: 'PRESENTATIONS'},
      {name: 'Sport', id: 'SPORT'},
      {name: 'Andre', id: 'OTHER'}
    ]
  )
  .constant('dateOptions', {
    formatYear: 'yy',
    startingDay: 1
  })
  .constant('timeOptions', {
    'show-meridian': false,
    'minute-step': 15
  })
  .factory('minDate', function() {
    return new Date();
  })
  .factory('maxDate', function() {
    var date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    return date;
  })
  .config(function($locationProvider, $httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  })

  .run(function ($rootScope, $location, Auth) {
    $rootScope.currentUser = null;
    Auth.setUserFromCookie();
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$routeChangeStart', function (event, next) {
      if(!Auth.isLoggedIn() && next.access.requiresLogin) {
        $location.path('/login');
      }
    });
  });
