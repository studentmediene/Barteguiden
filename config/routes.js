/*global require, module*/

var app = require("locomotive");

// Draw routes.  Locomotive's router provides expressive syntax for drawing
// routes, including support for resourceful routes, namespaces, and nesting.
// MVC routes can be mapped mapped to controllers using convenient
// `controller#action` shorthand.  Standard middleware in the form of
// `function(req, res, next)` is also fully supported.  Consult the Locomotive
// Guide on [routing](http://locomotivejs.org/guide/routing.html) for additional
// information.
module.exports = function routes() {
    this.post("/login", app.logIn);
    
    this.post('/logout', app.logOut);
    
    this.get("/isloggedin", app.ensureAuthenticated, function (req, res) {
        console.log(req.user);
        res.json({ ok: true });
    });
    
    this.resources("events", {except: ["new", "edit"]});
    
    this.root("root#main");
};
