"use strict";

module.exports = ["Restangular", function (Restangular) {
    console.log("api init'd");
    
    var baseURL = Restangular.all("v1");
    console.log(baseURL);
    
    return {
        isLoggedIn: function () {
            
        },
        logIn: function () {
        
        },
        logOut: function () {
            
        },
        getEvents: function () {
            return [];
        }
    };
}];
