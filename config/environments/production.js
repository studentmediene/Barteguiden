/*global require, module*/

var ga = require("node-ga");

module.exports = function () {
    // Set up middleware
    this.use(ga("UA-43847807-1", {
        safe: true
    }));
    
    // Configurations
    this.baseURL = "http://barteguiden.no/v1";
};