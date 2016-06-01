var unirest = require('unirest');
var config = require('./config');


module.exports = {

    loginMaster: function(authId, masterKey, callback) {
        var old_time = new Date();
        unirest.post(config.backtory.authApi + "login/")
            .headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Backtory-Authentication-Id': authId,
                'X-Backtory-Authentication-Key': masterKey
            })
            .end(function (response) {
                var new_time = new Date();
                var seconds_passed = new_time - old_time;
                if (config.debug) console.log("time spent in login master: " + seconds_passed + "\n");
                if (response.status == 200) {
                    callback.success(response.body.access_token);
                } else {
                    callback.failure(response.status, response.body);
                }
        });
    }
};
