/*global require, module, __dirname*/

var locomotive = require("locomotive");
var path = require("path");
var Sequelize = require("sequelize");

module.exports = function() {
    // Set up database
    var sequelize = new Sequelize(null, null, null, {
        dialect : "sqlite",
        storage : "data/barteguiden.db",
        logging : (this.env == "development" ? console.log : false)
    });
    
    // Import models
    var modelsdir = __dirname + "/../../app/models";
    var modelNames = ["User", "Event"];
    
    console.log(locomotive._helpers.underscore);
    var models = {};
    modelNames.forEach(function (modelName) {
        var model = sequelize.import(path.join(modelsdir, modelName.toLowerCase()));
        models[modelName] = model;
    });
    
    // Describe relationships
//    (function(m) {
//        m.PhoneNumber.belongsTo(m.User);
//        m.Task.belongsTo(m.User);
//        m.User.hasMany(m.Task);
//        m.User.hasMany(m.PhoneNumber);
//    })(models);

    // Store references in app instance
    this.sequelize = sequelize;
    this.models = models;
};