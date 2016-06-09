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
    }
};
