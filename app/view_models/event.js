/*global require, module*/

var mapper = require("object-mapper");
var extend = require("xtend");

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

var addDescription = function (language) {
    return function (value, fromObject, toObject) {
        var output = mapper.getKeyValue(toObject, "descriptions") || [];
        if (value) {
            output.push({
                language: language,
                text: value
            });
        }
        
        return output;
    };
};

var fromDatabaseToPublicMapping = {
    id: { key: "eventID", transform: function (value) { return value.toString(); } },
    title: { key: "title" },
    startAt: { key: "startAt" },
    placeName: { key: "placeName" },
    address: { key: "address" },
    latitude: { key: "latitude" },
    longitude: { key: "longitude" },
    ageLimit: { key: "ageLimit" },
    price: { key: "price" },
    categoryID: { key: "categoryID" },
    description_en: { key: "descriptions", transform: addDescription("en") },
    description_nb: { key: "descriptions", transform: addDescription("nb") },
    isRecommended: { key: "isRecommended" },
    imageURL: { key: "imageURL" },
    eventURL: { key: "eventURL" },
};

var fromDatabaseToAdminMapping = extend(fromDatabaseToPublicMapping, {
    isPublished: { key: "isPublished" },
    externalURL: { key: "externalURL" },
    externalID: { key: "externalID" },
    createdAt: { key: "createdAt" },
    updatedAt: { key: "updatedAt" }
});

var fromAdminToDatabaseMapping = {
    title: { key: "title" },
    startAt: { key: "startAt", transform: convertToDate },
    placeName: { key: "placeName" },
    address:  { key: "address" },
    latitude: { key: "latitude" },
    longitude: { key: "longitude" },
    ageLimit: { key: "ageLimit" },
    price: { key: "price" },
    categoryID: { key: "categoryID" },
    descriptions: [
        { key: "description_en", transform: getDescription("en") },
        { key: "description_nb", transform: getDescription("nb") }
    ],
    isRecommended: { key: "isRecommended" },
    imageURL: { key: "imageURL" },
    eventURL: { key: "eventURL" },
    externalURL: { key: "externalURL" },
    externalID: { key: "externalID" }
};

module.exports = {
    fromDatabaseToPublic: function (event) {
        return mapper.merge(event, {}, fromDatabaseToPublicMapping);
    },
    
    fromDatabaseToAdmin: function (event) {
        return mapper.merge(event, {}, fromDatabaseToAdminMapping);
    },
    
    fromAdminToDatabase: function (event) {
        return mapper.merge(event, {}, fromAdminToDatabaseMapping);
    }
};