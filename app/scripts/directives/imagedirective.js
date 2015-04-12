'use strict';

/**
 * @ngdoc directive
 * @name barteguidenMarkedsWebApp.directive:imagedirective
 * @description
 * # imagedirective
 */
angular.module('barteguidenMarkedsWebApp')
  .directive('fileModel', function ($parse) {
    // From here: https://uncorkedstudios.com/blog/multipartformdata-file-upload-with-angularjs
     return {
          restrict: 'A',
          link: function(scope, element, attrs) {
              var model = $parse(attrs.fileModel);
              var modelSetter = model.assign;

              element.bind('change', function(){
                  scope.$apply(function(){
                      modelSetter(scope, element[0].files[0]);
                  });
              });
          }
      };
  });
