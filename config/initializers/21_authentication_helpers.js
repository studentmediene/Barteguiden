/*global require, module*/

require("simple-errors");
var passport = require("passport");

module.exports = function() {
    this.logIn = function(req, res, next) {
        passport.authenticate("local", function(err, user, info) {
            if (err) {
                return next(Error.http(401, "Authentication failed", err));
            }
            if (!user) {
                return next(Error.http(401, "Authentication failed"));
            }
            
            req.logIn(user, function(err) {
                if (err) {
                    return next(Error.http(401, "Authentication failed", err));
                }
                
                return res.json({ ok: true });
            });
        })(req, res, next);
    };
    
    this.logOut = function(req, res, next) {
        req.logOut();
        res.json({ ok: true });
    };
    
    this.ensureAuthenticated = function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        else {
            next(Error.http(401, "Authorization failed"));
        }
    };
};