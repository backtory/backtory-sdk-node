var config = require('./../../config');
var unirest = require('unirest');


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
            .send(userInfo)
            .end(function (response){
                var new_time = new Date();
                var seconds_passed = new_time - old_time;
                if (config.debug) console.log("time spent: " + seconds_passed);
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
            .end(function (response){
                var new_time = new Date();
                var seconds_passed = new_time - old_time;
                if (config.debug) console.log("time spent: " + seconds_passed);
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
            .send(userInfo)
            .end(function (response){
                var new_time = new Date();
                var seconds_passed = new_time - old_time;
                if (config.debug) console.log("time spent: " + seconds_passed);
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
            .send(userInfo)
            .end(function (response){
                var new_time = new Date();
                var seconds_passed = new_time - old_time;
                if (config.debug) console.log("time spent: " + seconds_passed);
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
            .query({
                "word": word,
                "page": page,
                "pageSize": pageSize
            })
            .end(function (response){
                var new_time = new Date();
                var seconds_passed = new_time - old_time;
                if (config.debug) console.log("time spent: " + seconds_passed);
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
            .end(function (response){
                var new_time = new Date();
                var seconds_passed = new_time - old_time;
                if (config.debug) console.log("time spent: " + seconds_passed);
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
            .end(function (response){
                var new_time = new Date();
                var seconds_passed = new_time - old_time;
                if (config.debug) console.log("time spent: " + seconds_passed);
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
            .send({
                "userIds": userIds
            })
            .end(function (response){
                var new_time = new Date();
                var seconds_passed = new_time - old_time;
                if (config.debug) console.log("time spent: " + seconds_passed);
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
            .end(function (response){
                var new_time = new Date();
                var seconds_passed = new_time - old_time;
                if (config.debug) console.log("time spent: " + seconds_passed);
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
            .end(function (response){
                var new_time = new Date();
                var seconds_passed = new_time - old_time;
                if (config.debug) console.log("time spent: " + seconds_passed);
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
