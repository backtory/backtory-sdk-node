var config = require('./../../config');
var unirest = require('unirest');
var sentry = require("./../../sentry/client");


var rest = module.exports = {

    getUserRank: function(accessToken, gameInstanceId, leaderBoardId, userId, options) {
        var old_time = new Date();
        var url = config.backtory.gameApi + "leaderboards/" + leaderBoardId + "/";
        var param = {
            "userId": userId
        };
        unirest.get(url)
            .headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Backtory-Game-Id': gameInstanceId,
                'Authorization': 'Bearer ' + accessToken
            })
            .forever(true)
            .query(param)
            .end(function (response){
                var new_time = new Date();
                var seconds_passed = new_time - old_time;
                if (config.debug) console.log("time spent: " + seconds_passed);
                if (response.status == 200) {
                    if (config.debug) console.log("getUserRank response is " + JSON.stringify(response.body) + "\n");
                    options.success(response.body.rank, response.body.scores);
                }
                else {
                    options.error({
                        responseCode: response.status,
                        responseBody: response.body
                    });
                }
                sentry.checkAPICall("game", gameInstanceId, "USER_RANK",
                    response.status, response.body, seconds_passed, url, "GET");
            });
    },

    getAroundUser: function(accessToken, gameInstanceId, leaderBoardId, userId, count, options) {
        var old_time = new Date();
        var url = config.backtory.gameApi + "leaderboards/around-me/" + leaderBoardId + "/";
        var param = {
            "count": count,
            "userId": userId
        };
        unirest.get(url)
            .headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Backtory-Game-Id': gameInstanceId,
                'Authorization': 'Bearer ' + accessToken
            })
            .forever(true)
            .query(param)
            .end(function (response){
                var new_time = new Date();
                var seconds_passed = new_time - old_time;
                if (config.debug) console.log("time spent: " + seconds_passed);
                if (response.status == 200) {
                    if (config.debug) console.log("getAroundUser response is " + JSON.stringify(response.body) + "\n");
                    options.success(response.body);
                }
                else {
                    options.error({
                        responseCode: response.status,
                        responseBody: response.body
                    });
                }
                sentry.checkAPICall("game", gameInstanceId, "AROUND_USER",
                    response.status, response.body, seconds_passed, url, "GET");
            });
    },

    getTopUsers: function(accessToken, gameInstanceId, leaderBoardId, count, options) {
        var old_time = new Date();
        var url = config.backtory.gameApi + "leaderboards/top/" + leaderBoardId + "/";
        var param = {"count": count};
        unirest.get(url)
            .headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Backtory-Game-Id': gameInstanceId,
                'Authorization': 'Bearer ' + accessToken
            })
            .query(param)
            .forever(true)
            .end(function (response){
                var new_time = new Date();
                var seconds_passed = new_time - old_time;
                if (config.debug) console.log("time spent: " + seconds_passed);
                if (response.status == 200) {
                    if (config.debug) console.log("getTopUsers response is " + JSON.stringify(response.body) + "\n");
                    options.success(response.body);
                }
                else {
                    options.error({
                        responseCode: response.status,
                        responseBody: response.body
                    });
                }
                sentry.checkAPICall("game", gameInstanceId, "TOP_USERS",
                    response.status, response.body, seconds_passed, url, "GET");
            });
    },

    getTopUsersWithPagination: function(accessToken, gameInstanceId, leaderBoardId, page, count, options) {
        var old_time = new Date();
        var url = config.backtory.gameApi + "leaderboards/topPage/" + leaderBoardId + "/";
        var param = {"count": count, "page": page};
        unirest.get(url)
            .headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Backtory-Game-Id': gameInstanceId,
                'Authorization': 'Bearer ' + accessToken
            })
            .forever(true)
            .query(param)
            .end(function (response){
                var new_time = new Date();
                var seconds_passed = new_time - old_time;
                if (config.debug) console.log("time spent: " + seconds_passed);
                if (response.status == 200) {
                    if (config.debug) console.log("getTopUsersWithPagination response is " + JSON.stringify(response.body) + "\n");
                    options.success(response.body);
                }
                else {
                    options.error({
                        responseCode: response.status,
                        responseBody: response.body
                    });
                }
                sentry.checkAPICall("game", gameInstanceId, "TOP_USERS",
                    response.status, response.body, seconds_passed, url, "GET");
            });
    },

    sendEvent: function(accessToken, gameInstanceId, userId, jsonEvent, options) {
        var old_time = new Date();
        var url = config.backtory.gameApi + "events/";
        var param = {
            "userId": userId
        };
        unirest.post(url)
            .headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Backtory-Game-Id': gameInstanceId,
                'Authorization': 'Bearer ' + accessToken
            })
            .forever(true)
            .query(param)
            .send(jsonEvent)
            .end(function (response){
                var new_time = new Date();
                var seconds_passed = new_time - old_time;
                if (config.debug) console.log("time spent: " + seconds_passed);
                if (response.status == 200) {
                    if (config.debug) console.log("sendEvent response is " + JSON.stringify(response.body) + "\n");
                    options.success();
                }
                else {
                    options.error({
                        responseCode: response.status,
                        responseBody: response.body
                    });
                }
                sentry.checkAPICall("game", gameInstanceId, "SEND_EVENT",
                    response.status, response.body, seconds_passed, url, "POST");
            });
    },

    getUserLeaderBoards: function(accessToken, gameInstanceId, userId, options) {
        var old_time = new Date();
        var url = config.backtory.gameApi + "leaderboards/myLeaderboards/";
        var param = {"userId": userId};
        unirest.get(url)
            .headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Backtory-Game-Id': gameInstanceId,
                'Authorization': 'Bearer ' + accessToken
            })
            .forever(true)
            .query(param)
            .end(function (response){
                var new_time = new Date();
                var seconds_passed = new_time - old_time;
                if (config.debug) console.log("time spent: " + seconds_passed);
                if (response.status == 200) {
                    if (config.debug) console.log("getUserLeaderBoards response is " + JSON.stringify(response.body) + "\n");
                    options.success(response.body);
                }
                else {
                    options.error({
                        responseCode: response.status,
                        responseBody: response.body
                    });
                }
                sentry.checkAPICall("game", gameInstanceId, "USER_LEADERBOARDS",
                    response.status, response.body, seconds_passed, url, "GET");
            });
    },

    getUsersScore: function(accessToken, gameInstanceId, leaderBoardId, usersScore, options) {
        var old_time = new Date();
        var url = config.backtory.gameApi + "leaderboards/usersScore/" + leaderBoardId + "/";
        unirest.post(url)
            .headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Backtory-Game-Id': gameInstanceId,
                'Authorization': 'Bearer ' + accessToken
            })
            .forever(true)
            .send({
                "userIdList": usersScore
            })
            .end(function (response){
                var new_time = new Date();
                var seconds_passed = new_time - old_time;
                if (config.debug) console.log("time spent: " + seconds_passed);
                if (response.status == 200) {
                    if (config.debug) console.log("getUsersScore response is " + JSON.stringify(response.body) + "\n");
                    options.success(response.body.leaderboardInfoList);
                }
                else {
                    options.error({
                        responseCode: response.status,
                        responseBody: response.body
                    });
                }
                sentry.checkAPICall("game", gameInstanceId, "USERS_SCORE",
                    response.status, response.body, seconds_passed, url, "POST");
            });
    },

    updateScore: function(accessToken, gameInstanceId, leaderBoardId, userId, scores, options) {
        var old_time = new Date();
        var url = config.backtory.gameApi + "leaderboards/" + leaderBoardId + "/scores/";
        unirest.put(url)
            .headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Backtory-Game-Id': gameInstanceId,
                'Authorization': 'Bearer ' + accessToken
            })
            .forever(true)
            .send({
                "userId": userId,
                "scores": scores
            })
            .end(function (response){
                var new_time = new Date();
                var seconds_passed = new_time - old_time;
                if (config.debug) console.log("time spent: " + seconds_passed);
                if (response.status == 200) {
                    if (config.debug) console.log("updateScore response is " + JSON.stringify(response.body) + "\n");
                    options.success();
                }
                else {
                    options.error({
                        responseCode: response.status,
                        responseBody: response.body
                    });
                }
                sentry.checkAPICall("game", gameInstanceId, "UPDATE_SCORE",
                    response.status, response.body, seconds_passed, url, "PUT");
            });
    }
};
