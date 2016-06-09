var config = require('./../../config');
var unirest = require('unirest');


var rest = module.exports = {

    run: function(accessToken, cloudCodeInstanceId, functionName, requestBody, options) {
        var old_time = new Date();
        var url = config.backtory.cloudCodeApi + cloudCodeInstanceId + "/" + functionName + "/";
        unirest.post(url)
            .headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            })
            .send(requestBody)
            .end(function (response){
                var new_time = new Date();
                var seconds_passed = new_time - old_time;
                if (config.debug) console.log("time spent: " + seconds_passed);
                if (response.status == 200) {
                    options.success(response.body, response.headers['x-backtory-requestid']);
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
