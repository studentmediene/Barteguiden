/*global require, module*/

var extend = require("xtend");
var Validator = require("jsonschema").Validator;

var descriptionSchema = {
    "id": "/Description",
    "type": "object",
    "properties": {
        "language": {
            "type": "string",
            "required": true
        },
        "text": {
            "type": "string",
            "required": true
        }
    }
};

var publicEventSchema = {
    id: "/PublicEvent",
    type: "object",
    properties: {
        eventID: {
            type: "string",
            required: true
        },
        title: {
            type: "string",
            required: true
        },
        startAt: {
            type: "string",
            require: true
        },
        placeName: {
            type: "string",
            required: true
        },
        address: {
            type: ["null", "string"],
            //required: true,
        },
        latitude: {
            type: ["null", "number"],
            //required: true,
        },
        longitude: {
            type: ["null", "number"],
            //required: true,
        },
        ageLimit: {
            type: ["null", "number"],
            //required: true,
        },
        price: {
            type: ["null", "number"],
            //required: true,
        },
        categoryID: {
            type: ["null", "string"],
            //required: true,
        },
        descriptions: {
            type: "array",
            items: {
                $ref: "/Description"
            }
        },
        isRecommended: {
            type: "boolean"
        },
        imageURL: {
            type: ["null", "string"],
            //required: true,
        },
        eventURL: {
            type: ["null", "string"],
            //required: true,
        },
    }
};

var adminEventSchema = {
    id: "/AdminEvent",
    type: "object",
    properties: extend(publicEventSchema.properties, {
        eventID: {
            type: "string",
            // Not required
        },
        isPublished: {
            type: "boolean"
        },
        externalURL: {
            type: ["null", "string"],
            //required: true,
        },
        externalID: {
            type: ["null", "string"],
            //required: true,
        },
        createdAt: {
            type: ["null", "string"],
            //required: true,
        },
        updatedAt: {
            type: ["null", "string"],
            //required: true,
        },
    })
};

//var event = {
//    eventID: "1",
//    title: "Test",
//    placeName: "Samfundet",
//    address: "Elgeseter gate 1",
//    latitude: 0.1,
//    longitude: 0.2,
//    ageLimit: 0.3,
//    price: 0.4,
//    categoryID: "abc",
//    descriptions: [
//        {
//            language: "tihi",
//            text: "abc"
//        }
//    ],
//    imageURL: "http://vg.no",
//    eventURL: "http://skohorn.net",
//    isRecommended: false
//};

//console.log(v.validate(event, publicEventSchema));
//console.log(v.validate(event, adminEventSchema));

var v = new Validator();
v.addSchema(descriptionSchema);

module.exports = {
    validatePublicEvent: function (event) {
        var validation = v.validate(event, publicEventSchema);
        if (validation.errors.length === 0) {
            return true;
        }
        else {
            console.log(validation.errors);
            return false;
        }
    },
    validateAdminEvent: function (event) {
        var validation = v.validate(event, adminEventSchema);
        if (validation.errors.length === 0) {
            return true;
        }
        else {
            console.log(validation.errors);
            return false;
        }
    }
};