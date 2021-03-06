var config = require('./../../config');
var unirest = require('unirest');
var sentry = require("./../../sentry/client");

var rest = module.exports = {

    fetch: function (accessToken, objectStorageInstanceId, url, options) {
        if (config.debug) console.log(url);
        var old_time = new Date();
        unirest.get(url)
            .headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Backtory-Object-Storage-Id': objectStorageInstanceId,
                'Authorization': 'Bearer ' + accessToken
            })
            .forever(true)
            .end(function (response) {
                var new_time = new Date();
                var seconds_passed = new_time - old_time;
                if (config.debug) console.log("time spent: " + seconds_passed);
                if (response.status == 200) {
                    options.success(response.body);
                    if (config.debug) console.log("model.get response is " + JSON.stringify(response.body) + "\n");
                }
                else {
                    options.error({
                        path: url,
                        method: "GET",
                        action: "fetchObject",
                        responseCode: response.status,
                        responseBody: response.body
                    });
                }
                sentry.checkAPICall("database", objectStorageInstanceId, "GET_OBJECT",
                    response.status, response.body, seconds_passed, url, "GET");
            });
    },

    filterObjects: function(accessToken, objectStorageInstanceId, collectionName,
                            filterParams, filterBody, options) {
        var url = config.backtory.objectStorageApi + "classes/query/" + collectionName + "/";
        if (config.debug) console.log(url);
        var old_time = new Date();
        unirest.post(url)
            .headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Backtory-Object-Storage-Id': objectStorageInstanceId,
                'Authorization': 'Bearer ' + accessToken
            })
            .forever(true)
            .query(filterParams)
            .send(filterBody)
            .end(function (response) {
                var new_time = new Date();
                var seconds_passed = new_time - old_time;
                if (config.debug) console.log("time spent: " + seconds_passed);
                if (response.status == 200) {
                    options.success(response.body);
                    if (config.debug) console.log("model.filter response is " + JSON.stringify(response.body) + "\n");
                }
                else {
                    options.error({
                        path: url,
                        method: "POST",
                        action: "filterObjects",
                        requestParams: filterParams,
                        requestBody: filterBody,
                        responseCode: response.status,
                        responseBody: response.body
                    });
                }
                sentry.checkAPICall("database", objectStorageInstanceId, "QUERY_OBJECTS["+collectionName+"]",
                    response.status, response.body, seconds_passed, url, "POST");
            });
    },

    save: function (accessToken, objectStorageInstanceId, url, json, options) {
        if (config.debug) console.log(url);
        if (config.debug) console.log("model sent to save is " + JSON.stringify(json));
        if (!("ACL" in json)) {
            json["ACL"] = {
                "*": {
                    "read": true,
                    "write": true
                }
            };
        }
        var old_time = new Date();
        unirest.post(url)
            .headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Backtory-Object-Storage-Id': objectStorageInstanceId,
                'Authorization': 'Bearer ' + accessToken
            })
            .forever(true)
            .send(json)
            .end(function (response) {
                var new_time = new Date();
                var seconds_passed = new_time - old_time;
                if (config.debug) console.log("time spent: " + seconds_passed);
                if (response.status == 200) {
                    options.success(response.body);
                    if (config.debug) console.log("model.save response is " + JSON.stringify(response.body));
                }
                else {
                    options.error({
                        path: url,
                        method: "POST",
                        action: "createObject",
                        requestBody: json,
                        responseCode: response.status,
                        responseBody: response.body
                    });
                }
                sentry.checkAPICall("database", objectStorageInstanceId, "SAVE_OBJECT",
                    response.status, response.body, seconds_passed, url, "POST");
            });
    },

    update: function (accessToken, objectStorageInstanceId, url, json, options) {
        if (config.debug) console.log(url);
        if (config.debug) console.log("model sent to update is " + JSON.stringify(json));
        var old_time = new Date();
        unirest.put(url)
            .headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Backtory-Object-Storage-Id': objectStorageInstanceId,
                'Authorization': 'Bearer ' + accessToken
            })
            .forever(true)
            .send(json)
            .end(function (response) {
                var new_time = new Date();
                var seconds_passed = new_time - old_time;
                if (config.debug) console.log("time spent: " + seconds_passed);
                if (response.status == 200) {
                    options.success(response.body);
                    if (config.debug) console.log("model.update response is " + JSON.stringify(response.body));
                }
                else {
                    options.error({
                        path: url,
                        method: "PUT",
                        action: "updateObject",
                        requestBody: json,
                        responseCode: response.status,
                        responseBody: response.body
                    });
                }
                sentry.checkAPICall("database", objectStorageInstanceId, "UPDATE_OBJECT",
                    response.status, response.body, seconds_passed, url, "POST");
            });
    },

    destroy: function (accessToken, objectStorageInstanceId, url, options) {
        if (config.debug) console.log(url);
        var old_time = new Date();
        unirest.delete(url)
            .headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Backtory-Object-Storage-Id': objectStorageInstanceId,
                'Authorization': 'Bearer ' + accessToken
            })
            .forever(true)
            .end(function (response) {
                var new_time = new Date();
                var seconds_passed = new_time - old_time;
                if (config.debug) console.log("time spent: " + seconds_passed);
                if (response.status == 200) {
                    options.success();
                    if (config.debug) console.log("model.destroy response is " + JSON.stringify(response.body));
                }
                else {
                    options.error({
                        path: url,
                        method: "DELETE",
                        action: "deleteObject",
                        responseCode: response.status,
                        responseBody: response.body
                    });
                }
                sentry.checkAPICall("database", objectStorageInstanceId, "DELETE_OBJECT",
                    response.status, response.body, seconds_passed, url, "DELETE");
            });
    },

    addOrRemoveRelation: function(accessToken, objectStorageInstanceId, url, key, action, relationList, options) {
        if (config.debug) console.log(url);
        var old_time = new Date();
        var toSend = {};
        toSend[key] = {"__op":action, "objects": relationList};
        if (config.debug) console.log(url);
        if (config.debug) console.log("model sent to " + action + " is " + JSON.stringify(toSend));
        unirest.put(url)
            .headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Backtory-Object-Storage-Id': objectStorageInstanceId,
                'Authorization': 'Bearer ' + accessToken
            })
            .forever(true)
            .send(toSend)
            .end(function (response) {
                var new_time = new Date();
                var seconds_passed = new_time - old_time;
                if (response.status == 200) {
                    options.success(response.body);
                    if (config.debug) console.log("model.updateRelation response is " + JSON.stringify(response.body));
                }
                else {
                    options.error({
                        path: url,
                        method: "POST",
                        action: action,
                        requestBody: toSend,
                        responseCode: response.status,
                        responseBody: response.body
                    });
                }
                sentry.checkAPICall("database", objectStorageInstanceId, "UPDATE_OBJECT[" + action + "]",
                    response.status, response.body, seconds_passed, url, "UPDATE");
            });
    }
};
