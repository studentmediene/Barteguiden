/*global require, module*/

var util = require("util");

module.exports = function(sequelize, Sequelize) {
    var createLanguageObject = function (lang) {
        return function (text) {
            return {
                lang: lang,
                text: text
            };
        };
    };
    
    var baseURL = "http://localhost:3000";
//    var baseURL = "http://barteguiden.no/v1";
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
//        placeName: {
//            type: Sequelize.STRING,
//            allowNull: false,
//            validate: {
//                notNull: true,
//                notEmpty: true
//            }
//        },
//        address: {
//            type: Sequelize.STRING
//        },
//        latitude: {
//            type: Sequelize.FLOAT
//        },
//        longitude: {
//            type: Sequelize.FLOAT
//        },
//        ageLimit: {
//            type: Sequelize.INTEGER
//        },
//        price: {
//            type: Sequelize.DECIMAL(10, 2)
//        },
//        categoryID: {
//            type: Sequelize.STRING
//        },
//        description_en: {
//            type: Sequelize.TEXT
//        },
//        description_no: {
//            type: Sequelize.TEXT
//        },
//        isRecommended: {
//            type: Sequelize.BOOLEAN
//        },
//        imageURL: {
//            type: Sequelize.STRING,
//            validate: {
//                isUrl: true
//            }
//        },
//        eventURL: {
//            type: Sequelize.STRING,
//            validate: {
//                isUrl: false
//            }
//        }
    }, {
        instanceMethods: {
            toJSON: function () {
                var fields = [
                    { source: "id", target: "eventID" },
                    { source: "title", target: "title" },
                    { source: "startAt", target: "startAt" },
                    { source: "placeName", target: "placeName" },
                    { source: "address", target: "address" },
                    { source: "latitude", target: "latitude" },
                    { source: "longitude", target: "longitude" },
                    { source: "ageLimit", target: "ageLimit" },
                    { source: "price", target: "price" },
                    { source: "categoryID", target: "categoryID" },
                    { source: "description_en", target: "description", transform: createLanguageObject("en"), type: "add" },
                    { source: "description_no", target: "description", transform: createLanguageObject("no"), type: "add" },
                    { source: "id", target: "imageURL", transform: createImageURL },
                    { source: "eventURL", target: "eventURL" }
                ];
                
                var self = this;
                var output = {};
                fields.forEach(function (field) {
                    var value = self[field.source];
                    
                    if (value) {
                        if (field.transform) {
                            value = field.transform(value);
                        }
                        
                        if (field.type === "add") {
                            if (typeof(output[field.target]) !== "array") {
                                output[field.target] = [];
                            }
                            
                            output[field.target].push(value);
                        }
                        // Default to: set
                        else {
                            output[field.target] = value;
                        }
                    }
                });
                
                return output;
            }
        }
    }); 
};
