/*global require, module*/

var app = require("locomotive");
var passport = require("passport");
var passportLocal = require("passport-local");

var LocalStrategy = passportLocal.Strategy;

var User = app.models.User;

module.exports = function() {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
    
    passport.use(new LocalStrategy(function(username, password, done) {
        User.findOne({ username: username }, function(err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (!user.validPassword(password)) { return done(null, false); }
            return done(null, user);
        });
    }));
};