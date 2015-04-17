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
