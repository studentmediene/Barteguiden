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
    'cgNotify'
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
