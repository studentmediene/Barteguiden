/*global require, __dirname*/

var fs = require("fs");
//var mapper = require("object-mapper");
var jsdom = require("jsdom");
var jquery = fs.readFileSync("./libs/jquery-1.7.min.js", "utf-8");

//fs.readFile(__dirname + "/data/examples/3673.html", function(err, data) {
//
//});


jsdom.env({
//        html: data,
    url: "http://www.samfundet.no/arrangement/vis/3673",
    src: [jquery],
    done: function (err, window) {
        var $ = window.$;
        
        var price = parseInt($(".eventbox td:contains('Ikke-medlem')").next().text(), 10);
        console.log(price);
    }
});