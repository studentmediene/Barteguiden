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
 * @ngdoc service
 * @name barteguidenMarkedsWebApp.Imageservice
 * @description
 * # Imageservice
 * Service in the barteguidenMarkedsWebApp.
 */
angular.module('barteguidenMarkedsWebApp')
  .service('Imageservice', function ($http) {
      // from here: https://uncorkedstudios.com/blog/multipartformdata-file-upload-with-angularjs
      this.upload = function(file){
        var uploadUrl = 'http://localhost:4004/api/images';
        var fd = new FormData();
        fd.append('file', file);
        return $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        });
    }
  });
