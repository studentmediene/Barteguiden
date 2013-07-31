/*global require, module*/

var app = require("locomotive");
var passport = require("passport");
var passportLocal = require("passport-local");

var LocalStrategy = passportLocal.Strategy;

var User = app.models.User;

module.exports = function() {
    passport.use(new LocalStrategy(function(username, password, done) {
        User.find({ where: { username: username } }).success(function (user) {
            if (!user) {
                return done(null, false);
            }
            if (!user.validPassword(password)) {
                return done(null, false);
            }
            return done(null, user);
        }).error(function (err) {
            return done(err, false);
        });
    }));
    
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done) {
        User.find(id).success(function (user) {
            done(null, user);
        }).error(function (err) {
            done(err);
        });
    });
};