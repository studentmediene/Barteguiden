/*global require, module*/

var request = require("request");
var eventSchema = require("./event_schema");

var baseURL = "http://localhost:3000";
//var baseURL = "http://barteguiden.no/v1";

var sync = function (externalEvents) {
    logInAndGetEventsFromServer(function (serverEvents) {
        var next = function () {
            console.log("Finished!");
        };
        
        while (externalEvents.length > 0) {
            var externalEvent = externalEvents.pop();
            var eventID = eventIDForExternalEvent(serverEvents, externalEvent);
            next = processEvent(externalEvent, eventID, next);
        }
        
        next();
    });
};

var processEvent = function (externalEvent, eventID, next) {
    return function () {
        if (!validateEvent(externalEvent)) {
            next();
            return;
        }
        
        if (eventID !== null) {
            updateEventOnServer(externalEvent, eventID, next);
        }
        else {
            addEventToServer(externalEvent, next);
        }
    };
};

var validateEvent = function (externalEvent) {
    var isValid = eventSchema.validateAdminEvent(externalEvent);
    if (!isValid) {
        console.log("Failed to validate event: " + externalEvent.externalID);
        console.log(externalEvent);
    }
    
    return isValid;
};

var eventIDForExternalEvent = function (serverEvents, externalEvent) {
    var filteredEvents = serverEvents.filter(function (serverEvent) {
        return (serverEvent.externalURL === externalEvent.externalURL && serverEvent.externalID === externalEvent.externalID);
    });
    
    return (filteredEvents.length > 0) ? filteredEvents[0].eventID : null;
};

var logInAndGetEventsFromServer = function (callback) {
    logIn(function () {
        getEventsFromServer(callback);
    });
};

var j = request.jar();

var logIn = function (callback) {
    request({
        method: "POST",
        uri: (baseURL + "/login"),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded" 
        },
        body: "username=pablo&password=pablo!12345",
        jar: j,
        encoding: "utf8"
    }, function (error, response) {
        if (!error && response.statusCode === 200) {
            callback();
        }
    });
};

var getEventsFromServer = function (callback) {
    request({
        method: "GET",
        uri: (baseURL + "/events"),
        jar: j,
        encoding: "utf8"
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var data = JSON.parse(body);
            callback(data.events);
        }
    });
};

var addEventToServer = function (event, next) {
    request({
        method: "POST",
        uri: (baseURL + "/events"),
        json: event,
        jar: j,
        encoding: "utf8"
    }, function (error, response, body) {
        if (!error && response.statusCode === 200 && body) {
            console.log("Added event: " + event.externalID);
        }
        else {
            console.log("Failed to add event: " + event.externalID);
            console.log(event);
        }
        
        next();
    });
};

var updateEventOnServer = function (event, eventID, next) {
    request({
        method: "PUT",
        uri: (baseURL + "/events/" + eventID),
        json: event,
        jar: j,
        encoding: "utf8"
    }, function (error, response, body) {
        if (!error && response.statusCode === 200 && body) {
            console.log("Updated event: " + event.externalID);
        }
        else {
            console.log("Failed to update event: " + event.externalID);
        }
        
        next();
    });
};

module.exports = {
    sync: sync
};