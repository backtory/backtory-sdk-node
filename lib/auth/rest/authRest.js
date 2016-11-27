var config = require('./../../config');
var unirest = require('unirest');
var sentry = require("./../../sentry/client");


var rest = module.exports = {

    signUp: function(authInstanceId, userInfo, options) {
        var old_time = new Date();
        var url = config.backtory.authApi + "users/";
        unirest.post(url)
            .headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Backtory-Authentication-Id': authInstanceId
            })
            .forever(true)
            .send(userInfo)
            .end(function (response){
                var new_time = new Date();
                var seconds_passed = new_time - old_time;
                if (config.debug) console.log("time spent: " + seconds_passed);
                sentry.checkAPICall("auth", authInstanceId, "SIGN_UP",
                                    response.status, response.body, seconds_passed, url, "POST");
                if (response.status == 201) {
                    options.success(response.body);
                }
                else {
                    options.error({
                        responseCode: response.status,
                        responseBody: response.body
                    });
                }
            });
    },

    guestSignUp: function(authInstanceId, options) {
        var old_time = new Date();
        var url = config.backtory.authApi + "guest-users/";
        unirest.post(url)
            .headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Backtory-Authentication-Id': authInstanceId
            })
            .forever(true)
            .end(function (response){
                var new_time = new Date();
                var seconds_passed = new_time - old_time;
                if (config.debug) console.log("time spent: " + seconds_passed);
                sentry.checkAPICall("auth", authInstanceId, "GUEST_SIGN_UP",
                                    response.status, response.body, seconds_passed, url, "POST");
                if (response.status == 201) {
                    options.success(response.body);
                }
                else {
                    options.error({
                        responseCode: response.status,
                        responseBody: response.body
                    });
                }
            });
    },

    completeGuestRegistration: function(accessToken, authInstanceId, userInfo, options) {
        var old_time = new Date();
        var url = config.backtory.authApi + "guest-users/complete-registration/";
        unirest.post(url)
            .headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Backtory-Authentication-Id': authInstanceId,
                'Authorization': 'Bearer ' + accessToken
            })
            .forever(true)
            .send(userInfo)
            .end(function (response){
                var new_time = new Date();
                var seconds_passed = new_time - old_time;
                if (config.debug) console.log("time spent: " + seconds_passed);
                sentry.checkAPICall("auth", authInstanceId, "COMPLETE_GUEST_SIGN_UP",
                                    response.status, response.body, seconds_passed, url, "POST");
                if (response.status == 200) {
                    options.success(response.body);
                }
                else {
                    options.error({
                        responseCode: response.status,
                        responseBody: response.body
                    });
                }
            });
    },

    update: function(accessToken, authInstanceId, userId, userInfo, options) {
        var old_time = new Date();
        var url = config.backtory.authApi + "users/" + userId + "/";
        unirest.put(url)
            .headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Backtory-Authentication-Id': authInstanceId,
                'Authorization': 'Bearer ' + accessToken
            })
            .forever(true)
            .send(userInfo)
            .end(function (response){
                var new_time = new Date();
                var seconds_passed = new_time - old_time;
                if (config.debug) console.log("time spent: " + seconds_passed);
                sentry.checkAPICall("auth", authInstanceId, "UPDATE_USER",
                                    response.status, response.body, seconds_passed, url, "PUT");
                if (response.status == 200) {
                    options.success(response.body);
                }
                else {
                    options.error({
                        responseCode: response.status,
                        responseBody: response.body
                    });
                }
            });
    },

    search: function(accessToken, authInstanceId, word, page, pageSize, options) {
        var old_time = new Date();
        var url = config.backtory.authApi + "users/search/";
        unirest.get(url)
            .headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Backtory-Authentication-Id': authInstanceId,
                'Authorization': 'Bearer ' + accessToken
            })
            .forever(true)
            .query({
                "word": word,
                "page": page,
                "pageSize": pageSize
            })
            .end(function (response){
                var new_time = new Date();
                var seconds_passed = new_time - old_time;
                if (config.debug) console.log("time spent: " + seconds_passed);
                sentry.checkAPICall("auth", authInstanceId, "SEARCH_USERS",
                                    response.status, response.body, seconds_passed, url, "GET");
                if (response.status == 200) {
                    options.success(response.body);
                }
                else {
                    options.error({
                        responseCode: response.status,
                        responseBody: response.body
                    });
                }
            });
    },

    getByUserName: function(username, accessToken, authInstanceId, options) {
        var old_time = new Date();
        var url = config.backtory.authApi + "users/by-username/" + username + "/";
        unirest.get(url)
            .headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Backtory-Authentication-Id': authInstanceId,
                'Authorization': 'Bearer ' + accessToken
            })
            .forever(true)
            .end(function (response){
                var new_time = new Date();
                var seconds_passed = new_time - old_time;
                if (config.debug) console.log("time spent: " + seconds_passed);
                sentry.checkAPICall("auth", authInstanceId, "GET_USER_BY_NAME",
                                    response.status, response.body, seconds_passed, url, "GET");
                if (response.status == 200) {
                    options.success(response.body);
                }
                else {
                    options.error({
                        responseCode: response.status,
                        responseBody: response.body
                    });
                }
            });
    },

    getByUserId: function(userId, accessToken, authInstanceId, options) {
        var old_time = new Date();
        var url = config.backtory.authApi + "users/" + userId + "/";
        unirest.get(url)
            .headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Backtory-Authentication-Id': authInstanceId,
                'Authorization': 'Bearer ' + accessToken
            })
            .forever(true)
            .end(function (response){
                var new_time = new Date();
                var seconds_passed = new_time - old_time;
                if (config.debug) console.log("time spent: " + seconds_passed);
                sentry.checkAPICall("auth", authInstanceId, "GET_USER_BY_ID",
                                    response.status, response.body, seconds_passed, url, "GET");
                if (response.status == 200) {
                    options.success(response.body);
                }
                else {
                    options.error({
                        responseCode: response.status,
                        responseBody: response.body
                    });
                }
            });
    },

    getByUserIds: function(userIds, accessToken, authInstanceId, options) {
        var old_time = new Date();
        var url = config.backtory.authApi + "users/by-user-ids/";
        unirest.post(url)
            .headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Backtory-Authentication-Id': authInstanceId,
                'Authorization': 'Bearer ' + accessToken
            })
            .forever(true)
            .send({
                "userIds": userIds
            })
            .end(function (response){
                var new_time = new Date();
                var seconds_passed = new_time - old_time;
                if (config.debug) console.log("time spent: " + seconds_passed);
                sentry.checkAPICall("auth", authInstanceId, "GET_USERS_BY_ID",
                                    response.status, response.body, seconds_passed, url, "GET");
                if (response.status == 200) {
                    options.success(response.body);
                }
                else {
                    options.error({
                        responseCode: response.status,
                        responseBody: response.body
                    });
                }
            });
    },

    delete: function(userId, accessToken, authInstanceId, options) {
        var old_time = new Date();
        var url = config.backtory.authApi + "users/" + userId + "/";
        unirest.delete(url)
            .headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Backtory-Authentication-Id': authInstanceId,
                'Authorization': 'Bearer ' + accessToken
            })
            .forever(true)
            .end(function (response){
                var new_time = new Date();
                var seconds_passed = new_time - old_time;
                if (config.debug) console.log("time spent: " + seconds_passed);
                sentry.checkAPICall("auth", authInstanceId, "DELETE_USER",
                                    response.status, response.body, seconds_passed, url, "DELETE");
                if (response.status == 200) {
                    options.success();
                }
                else {
                    options.error({
                        responseCode: response.status,
                        responseBody: response.body
                    });
                }
            });
    },

    count: function(accessToken, authInstanceId, options) {
        var old_time = new Date();
        var url = config.backtory.authApi + "/users/get-number-of-user/";
        unirest.get(url)
            .headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Backtory-Authentication-Id': authInstanceId,
                'Authorization': 'Bearer ' + accessToken
            })
            .forever(true)
            .end(function (response){
                var new_time = new Date();
                var seconds_passed = new_time - old_time;
                if (config.debug) console.log("time spent: " + seconds_passed);
                sentry.checkAPICall("auth", authInstanceId, "COUNT_USERS",
                                    response.status, response.body, seconds_passed, url, "GET");
                if (response.status == 200) {
                    options.success(response.body);
                }
                else {
                    options.error({
                        responseCode: response.status,
                        responseBody: response.body
                    });
                }
            });
    }
};
