var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var User = require('../models/User');

passport.use(new BasicStrategy(
    function(username, password, callback){
        User.findOne({ username: username }, function(err, user){
            if (err){
                Console.log("Error finding user.");
                return callback(err);
            }
            if (!user){
                return callback(null, false);
                Console.log("Coult not find user.");
            }

            user.verifyPassword(password, function(err, isMatch){
                if (err)
                    return callback(err);
                if (!isMatch)
                    return callback(null, false);
                return callback(null, user);
            });
        });
    }
));
exports.isAuthenticated = passport.authenticate('basic', {session: false});
