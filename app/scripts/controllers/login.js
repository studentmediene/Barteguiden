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
 * @ngdoc function
 * @name barteguidenMarkedsWebApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the barteguidenMarkedsWebApp
 */
angular.module('barteguidenMarkedsWebApp.controllers')
  .controller('LoginCtrl', function ($scope, $rootScope, Auth) {

    $scope.logout = function() {
      Auth.logout();
    };

    $scope.login = function() {
      Auth.login({
        username: $scope.user.username,
        password: $scope.user.password
      });
    };

    $scope.isLoggedIn = function() {
      $scope.currentUser = $rootScope.currentUser;
      return Auth.isLoggedIn();
    };
  });
