"use strict";

module.exports = ["$rootScope", "authService", function ($rootScope, authService) {
    $rootScope.isLoggedIn = true;

    // Log in
    $rootScope.logIn = function (login) {
        console.log(login);
        authService.loginConfirmed();
//        $rootScope.$emit("event:loginRequest", credentials);
    };

    $rootScope.$on("event:auth-loginConfirmed", function () {
        $rootScope.isLoggedIn = true;
    });

    // Log out
    $rootScope.logOut = function () {
        // TODO: Check if user has unsaved changes -> Check a variable in $rootScope?
//        $rootScope.$broadcast("event:logoutRequest");
        $rootScope.isLoggedIn = false;
    };

    $rootScope.$on("event:auth-loginRequired", function () {
        $rootScope.isLoggedIn = false;
    });
}];