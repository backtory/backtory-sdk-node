var config = require('./../config');
var cloudCodeRest = require('./rest/cloudCodeRest');

var cloudCode = module.exports = {
    common: null,

    init: function (common) {
        cloudCode.common = common;
    },

    Function: function Function(functionName) {
        if (!functionName || (typeof functionName != "string")) {
            throw new Error("First argument (function name) must be a valid string.")
        }
        this.functionName = functionName;
    }
};

cloudCode.Function.prototype.run = function (requestBody, options) {
    var func = this;
    if (typeof requestBody != "object") {
        throw new Error("First argument (requestBody) must be a valid json.")
    } else {
        cloudCode.common.getInstance("cloud-code", function (lambdaInstanceId) {
            cloudCode.common.getAccessToken({
                error: function (error1) {
                    if (options && options.error) options.error(error1);
                },
                success: function (accessToken) {
                    cloudCodeRest.run(accessToken, lambdaInstanceId, func.functionName, requestBody, {
                        success: function(response, requestId) {
                            if (options && options.success) {
                                options.success(response, requestId);
                            }
                        },
                        error: function(error) {
                            if (options && options.error) options.error(error);
                        }
                    });
                }
            });
        });
    }
};