"use strict";

require("angular");
require("angular-route");
require("bootstrap");

angular.module("barteguidenAdminApp", [
        "ngRoute",
        require("./auth").name,
        require("./events").name,
        require("./import").name
    ])
    .config(require("./routes"));
