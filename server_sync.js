/*global require, module*/

var Q = require("q");
var request = require("request");
var eventSchema = require("./event_schema");

var baseURL = "http://localhost:3000";
//var baseURL = "http://barteguiden.no/v1";

function sync(externalEvents) {
    console.log("Started updating at " + baseURL);
    
    logInAndGetEventsFromServer(function (serverEvents) {
        var promise_chain = Q.fcall(function (){});
        
        externalEvents.forEach(function (externalEvent) {
            var eventID = eventIDForExternalEvent(serverEvents, externalEvent);
            var promise_link = processEvent(externalEvent, eventID);
            
            promise_chain = promise_chain.then(promise_link);
        });
        
        promise_chain.done(function () {
            console.log("Finished!");
        });
    });
}

function processEvent(externalEvent, eventID) {
    return function () {
        var deferred = Q.defer();
        
        if (!validateEvent(externalEvent)) {
//            deferred.reject();
            return;// deferred.promise;
        }
        
        if (eventID !== null) {
            updateEventOnServer(externalEvent, eventID, deferred);
        }
        else {
            addEventToServer(externalEvent, deferred);
        }
        
        return deferred.promise;
    };
}

function validateEvent(externalEvent) {
    var isValid = eventSchema.validateAdminEvent(externalEvent);
    if (!isValid) {
        console.log("Failed to validate event: " + externalEvent.externalID);
        console.log(externalEvent);
    }
    
    return isValid;
}

function eventIDForExternalEvent(serverEvents, externalEvent) {
    var filteredEvents = serverEvents.filter(function (serverEvent) {
        return (serverEvent.externalURL === externalEvent.externalURL && serverEvent.externalID === externalEvent.externalID);
    });
    
    return (filteredEvents.length > 0) ? filteredEvents[0].eventID : null;
}

function logInAndGetEventsFromServer(callback) {
    logIn(function () {
        getEventsFromServer(callback);
    });
}

var j = request.jar();

function logIn(callback) {
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
}

function getEventsFromServer(callback) {
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
}

function addEventToServer(event, deferred) {
    request({
        method: "POST",
        uri: (baseURL + "/events"),
        json: event,
        jar: j,
        encoding: "utf8"
    }, function (error, response, body) {
        if (!error && response.statusCode === 200 && body) {
            console.log("Added event: " + event.externalID);
            
            deferred.resolve();
        }
        else {
            console.log("Failed to add event: " + event.externalID);
            console.log(event);
            
            deferred.reject();
        }
    });
}

function updateEventOnServer(event, eventID, deferred) {
    request({
        method: "PUT",
        uri: (baseURL + "/events/" + eventID),
        json: event,
        jar: j,
        encoding: "utf8"
    }, function (error, response, body) {
        if (!error && response.statusCode === 200 && body) {
            console.log("Updated event: " + event.externalID);
            
            deferred.resolve();
        }
        else {
            console.log("Failed to update event: " + event.externalID);
            
            deferred.reject();
        }
    });
}

module.exports = {
    sync: sync
};