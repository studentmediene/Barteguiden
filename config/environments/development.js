/*global require, module*/

var express = require("express");

module.exports = function () {
    this.use(express.errorHandler());
};