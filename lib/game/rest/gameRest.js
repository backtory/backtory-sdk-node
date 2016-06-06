var config = require('./../../config');
var unirest = require('unirest');


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
            });
    },

    sendEvent: function(accessToken, gameInstanceId, userId, jsonEvent, options) {
        var old_time = new Date();
        var url = config.backtory.gameApi + "events/";
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
            });
    }
};
