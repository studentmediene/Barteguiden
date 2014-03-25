module.exports = ['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'MainCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}];