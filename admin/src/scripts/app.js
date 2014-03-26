/*globals window*/
'use strict';

require('angular/angular');
require('angular-route/angular-route');
require('jquery/dist/jquery')(window);
require('bootstrap/dist/js/bootstrap');

angular.module('barteguidenAdminApp', [
        'ngRoute',
        require('./main').name,
        require('./events').name
    ])
    .config(require('./routes'));
