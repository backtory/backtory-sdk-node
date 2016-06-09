var config = require('./../../config');
var unirest = require('unirest');


var rest = module.exports = {

    sendBulk: function(accessToken, connectivityInstanceId, bulk, options) {
        var old_time = new Date();
        var url = config.backtory.connectivityApi + "challenge/push-bulk/";
        unirest.post(url)
            .headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Backtory-Connectivity-Id': connectivityInstanceId,
                'Authorization': 'Bearer ' + accessToken
            })
            .send({
                "challengeMessages": bulk
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

    sendEventBulk: function(accessToken, connectivityInstanceId, bulk, options) {
        var old_time = new Date();
        var url = config.backtory.connectivityApi + "challenge/event-push-bulk/";
        unirest.post(url)
            .headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Backtory-Connectivity-Id': connectivityInstanceId,
                'Authorization': 'Bearer ' + accessToken
            })
            .send({
                "challengeEventMessages": bulk
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
    }
};
