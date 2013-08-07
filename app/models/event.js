/*global require, module*/

var util = require("util");
var mapper = require("../libs/mapper.js");

module.exports = function(sequelize, Sequelize) {
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
                isDate: true
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
            allowNull: true,
            validate: {
                min: -90,
                max: 90
            }
        },
        longitude: {
            type: Sequelize.FLOAT,
            allowNull: true,
            validate: {
                min: -180,
                max: 180
            }
        },
        ageLimit: {
            type: Sequelize.INTEGER,
            allowNull: true,
            validate: {
                isInt: true,
                min: 0,
                max: 100
            }
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: true,
            validate: {
                isInt: true,
                min: 0,
                max: 10000
            }
        },
        categoryID: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                isIn: [["MUSIC", "NIGHTLIFE", "SPORT", "PERFORMANCES", "PRESENTATIONS", "EXHIBITIONS", "DEBATE", "OTHER"]]
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
        validate: {
            bothCoordinatesOrNone: function () {
                var bothIsSet = (this.latitude && this.longitude);
                var noneIsSet = (!this.latitude && !this.longitude);
                if (!(bothIsSet || noneIsSet)) {
                    throw new Error("Require either both latitude and longitude or neither");
                }
            }
        },
        classMethods: {
            fromJSON: function (event) {
                var convertToDate = function (dateString) {
                    return new Date(Date.parse(dateString));
                };
                
                var getDescription = function (language) {
                    return function (descriptions) {
                        if (Object.prototype.toString.call(descriptions) !== "[object Array]") {
                            return null;
                        }
                        
                        for (var i = 0; i < descriptions.length; i++) {
                            var description = descriptions[i];
                            if (description.language === language) {
                                return description.text;
                            }
                        }
                    };
                };
                
                var mapping = [
                    { fromKey: "eventID", toKey: "id" },
                    { fromKey: "title", toKey: "title" },
                    { fromKey: "startAt", toKey: "startAt", transform: convertToDate },
                    { fromKey: "placeName", toKey: "placeName" },
                    { fromKey: "address", toKey: "address" },
                    { fromKey: "latitude", toKey: "latitude" },
                    { fromKey: "longitude", toKey: "longitude" },
                    { fromKey: "ageLimit", toKey: "ageLimit" },
                    { fromKey: "price", toKey: "price" },
                    { fromKey: "categoryID", toKey: "categoryID" },
                    { fromKey: "descriptions", toKey: "description_en", transform: getDescription("en") },
                    { fromKey: "descriptions", toKey: "description_nb", transform: getDescription("nb") },
                    { fromKey: "isRecommended", toKey: "isRecommended" },
//                    { fromKey: "imageURL", toKey: "imageURL", transform: createImageURL },
                    { fromKey: "eventURL", toKey: "eventURL" }
                ];
                
                return mapper.createObjectForMapping(event, mapping);
            }
        },
        instanceMethods: {
            toJSON: function () {
                var createDescription = function (language) {
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
                    { fromKey: "description_en", toKey: "descriptions", transform: createDescription("en"), type: "add" },
                    { fromKey: "description_nb", toKey: "descriptions", transform: createDescription("nb"), type: "add" },
                    { fromKey: "isRecommended", toKey: "isRecommended" },
                    { fromKey: "id", toKey: "imageURL", transform: createImageURL },
                    { fromKey: "eventURL", toKey: "eventURL" }
                ];
                
                return mapper.createObjectForMapping(this, mapping);
            }
        }
    }); 
};
