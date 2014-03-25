'use strict';

require('angular/angular');
require('angular-route/angular-route');

angular.module('sampleApp', [
        'ngRoute',
        require('./controllers').name
    ])
    .config(require('./routes'));
