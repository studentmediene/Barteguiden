/*global require, module*/

var passport = require("passport");

module.exports = function() {
    this.logIn = function(req, res, next) {
        passport.authenticate("local", function(err, user, info) {
            if (err) { res.json(403, { error: "Authentication failed" }); }
            if (!user) { res.json(403, { error: "Authentication failed" }); }
            
            req.logIn(user, function(err) {
                if (err) { res.json(403, { error: "Authentication failed" }); }
                
                res.json({ ok: true });
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
            res.send(403, "Authorization failed");
        }
    };
};