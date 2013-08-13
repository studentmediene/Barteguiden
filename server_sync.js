/*global require, module*/

var request = require("request");
var _ = require("underscore");
var eventSchema = require("./event_schema");

//var baseURL = "http://localhost:3000";
var baseURL = "http://barteguiden.no/v1";

var sync = function (externalEvents, externalURL) {
    logInAndGetEventsFromServer(function (serverEvents) {
        var relevantServerEvents = _.filter(serverEvents, function (serverEvent) {
            return (serverEvent.externalURL === externalURL);
        });
        
        externalEvents.forEach(function (externalEvent) {
            var isValid = eventSchema.validateAdminEvent(externalEvent);
            if (!isValid) {
                console.log(externalEvent);
                console.log("Validation failed for event: " + externalEvent.externalID);
                return;
            }
            
            var eventID = eventIDForExternalID(relevantServerEvents, externalEvent.externalID);
            if (eventID !== null) {
                updateEventOnServer(externalEvent, eventID);
            }
            else {
                addEventToServer(externalEvent);
            }
        });
    });
};

var eventIDForExternalID = function (events, externalID) {
    var event = _.find(events, function (event) {
        return (event.externalID === externalID);
    });
    
    return ((event) ? event.eventID : null);
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
        uri: baseURL + "/login",
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
        uri: baseURL + "/events",
        jar: j,
        encoding: "utf8"
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var data = JSON.parse(body);
            callback(data.events);
        }
    });
};

var addEventToServer = function (externalEvent) {
    request({
        method: "POST",
        uri: baseURL + "/events",
        json: externalEvent,
        jar: j,
        encoding: "utf8"
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("Added event: " + body.externalID);
        }
    });
};

var updateEventOnServer = function (externalEvent, eventID) {
    request({
        method: "PUT",
        uri: baseURL + "/events/" + eventID,
        json: externalEvent,
        jar: j,
        encoding: "utf8"
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("Updated event: " + body.externalID);
        }
    });
};

module.exports = {
    sync: sync
};