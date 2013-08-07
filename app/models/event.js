/*global require, module*/

var util = require("util");

var createObjectForMapping = function (sourceObject, mapping) {
    var targetObject = {};
    
    mapping.forEach(function (field) {
        var value = sourceObject[field.fromKey];
        
        if (field.transform) {
            value = field.transform(value);
        }
        
        if (value !== undefined && value !== null) {
            if (field.type === "add") {
                var targetValue = targetObject[field.toKey];
                if (Object.prototype.toString.call(targetValue) !== "[object Array]") {
                    targetObject[field.toKey] = [];
                }
                
                targetObject[field.toKey].push(value);
            }
            // Default to: set
            else {
                targetObject[field.toKey] = value;
            }
        }
    });
    
    return targetObject;
};

module.exports = function(sequelize, Sequelize) {
    var createLanguageObject = function (language) {
        return function (text) {
            if (!text) {
                return null;
            }
            
            return {
                language: language,
                text: text
            };
        };
    };
    
    var baseURL = "http://barteguiden.no/v1";
    var createImageURL = function (id) {
        return util.format("%s/events/%s.jpg", baseURL, id);
    };
    
    return sequelize.define("Event", {
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        startAt: {
            type: Sequelize.DATE,
            allowNull: false,
            validate: {
                notNull: true
            }
        },
        placeName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        address: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        latitude: {
            type: Sequelize.FLOAT,
            allowNull: true
        },
        longitude: {
            type: Sequelize.FLOAT,
            allowNull: true
        },
        ageLimit: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        price: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: true
        },
        categoryID: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        description_en: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        description_nb: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        isRecommended: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        eventURL: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                isUrl: true
            }
        },
        externalID: {
            type: Sequelize.STRING,
            allowNull: true
        },
    }, {
        instanceMethods: {
            toJSON: function () {
                var mapping = [
                    { fromKey: "id", toKey: "eventID", transform: function (value) { return value.toString(); } },
                    { fromKey: "title", toKey: "title" },
                    { fromKey: "startAt", toKey: "startAt" },
                    { fromKey: "placeName", toKey: "placeName" },
                    { fromKey: "address", toKey: "address" },
                    { fromKey: "latitude", toKey: "latitude" },
                    { fromKey: "longitude", toKey: "longitude" },
                    { fromKey: "ageLimit", toKey: "ageLimit" },
                    { fromKey: "price", toKey: "price" },
                    { fromKey: "categoryID", toKey: "categoryID" },
                    { fromKey: "description_en", toKey: "descriptions", transform: createLanguageObject("en"), type: "add" },
                    { fromKey: "description_nb", toKey: "descriptions", transform: createLanguageObject("nb"), type: "add" },
                    { fromKey: "isRecommended", toKey: "isRecommended" },
                    { fromKey: "id", toKey: "imageURL", transform: createImageURL },
                    { fromKey: "eventURL", toKey: "eventURL" }
                ];
                
                return createObjectForMapping(this, mapping);
            }
        },
        fromJSON: function () {
            var convertToDate = function (dateString) {
                return Date.parse(dateString);
            };
            var mapping = [
                    { fromKey: "title", toKey: "title" },
                    { fromKey: "startAt", toKey: "startAt", transform: convertToDate },
                    { fromKey: "placeName", toKey: "placeName" },
                    { fromKey: "address", toKey: "address" },
                    { fromKey: "latitude", toKey: "latitude" },
                    { fromKey: "longitude", toKey: "longitude" },
                    { fromKey: "ageLimit", toKey: "ageLimit" },
                    { fromKey: "price", toKey: "price" },
                    { fromKey: "categoryID", toKey: "categoryID" }
                ];
            
            return createObjectForMapping(this, mapping);
        }
    }); 
};
