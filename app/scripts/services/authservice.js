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

angular.module('barteguidenMarkedsWebApp.services')
  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Intercept 401s and remove user data
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          $cookieStore.remove('authdata');
          $rootScope.currentUser = null;
        }
        return $q.reject(response);
      }
    };
  })

  .factory('Auth', function($location, $rootScope, $http, $cookieStore, $q, base64, notify) {
    $http.defaults.headers.common.Authorization = 'Basic ' + $cookieStore.get('authdata');

    function logout() {
      $cookieStore.remove('authdata');
      $rootScope.currentUser = null;
      $location.path('/login');
    }

    return {
      login: function(user) {
        var encoded = base64.encode(user.username + ':' + user.password);
        $http.defaults.headers.common.Authorization = 'Basic ' + encoded;
        $http.get('http://localhost:4004/api/login')
          .then(function() {
            $cookieStore.put('authdata', encoded);
            $rootScope.currentUser = user.username;
            $location.path('/');
          }, function(error) {
            if(error.status === 401) {
              notify({message: 'Feil brukernavn og/eller passord', classes: 'alert-danger'});
            }
            else {
              notify({message: 'Noe gikk galt under innlogging', classes: 'alert-danger'});
            }
            logout();
          });
      },

      logout: function() {
        logout();
        notify({message: 'Du er nå logget ut', classes: 'alert-info'});
      },

      isLoggedIn: function() {
        return $rootScope.currentUser !== null;
      },

      // Set current user from cookie when page is refreshed after login
      setUserFromCookie: function() {
        var cookie = $cookieStore.get('authdata');
        if(cookie !== undefined) {
          $rootScope.currentUser = base64.decode(cookie).split(':')[0];
        }
        else {
          $rootScope.currentUser = null;
        }
      }
    };
  });
