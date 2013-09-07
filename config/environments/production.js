/*global require, module*/

var ga = require("node-ga");

module.exports = function () {
    this.use(ga("UA-43847807-1", {
        safe: true
    }));
};