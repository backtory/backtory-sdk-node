var config = require('./../config');
var connectivityRest = require('./rest/connectivityRest');

var connectivity = module.exports = {
    common: null,

    init: function (common) {
        connectivity.common = common;
    },

    Messages: function Messages() {
        this.messages = [];
    },

    DirectMessages: function DirectMessages() {
        this.messages = [];
    }
};

connectivity.Messages.prototype.add = function (challengeId, message) {
    if ((typeof challengeId != "string") || !(challengeId)) {
        throw new Error("First argument (challengeId) must be a valid string.")
    }
    else if ((typeof message != "object")) {
        throw new Error("Second argument (message) must be a valid json object.")
    }
    this.messages.push({"challengeId": challengeId, "message": message});
};

connectivity.Messages.prototype.send = function () {
    var messages = this.messages;
    if (messages.length == 0) {
        throw new Error("There is no message to send.")
    } else {
        connectivity.common.getInstance("game-connectivity", function (connectivityInstanceId) {
            connectivity.common.getAccessToken({
                error: function (error1) {
                    if (options && options.error) options.error(error1);
                },
                success: function (accessToken) {
                    connectivityRest.sendBulk(accessToken, connectivityInstanceId, messages, {
                        success: function() {
                            if (options && options.success) {
                                options.success();
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

connectivity.DirectMessages.prototype.add = function (challengeId, userId, message) {
    if ((typeof challengeId != "string") || !(challengeId)) {
        throw new Error("First argument (challengeId) must be a valid string.")
    }
    else if ((typeof userId != "string") || !(userId)) {
        throw new Error("Second argument (userId) must be a valid string.")
    }
    else if ((typeof message != "object")) {
        throw new Error("Third argument (message) must be a valid json object.")
    }
    this.messages.push({"challengeId": challengeId, "userId": userId, "message": message});
};

connectivity.DirectMessages.prototype.send = function () {
    var messages = this.messages;
    if (messages.length == 0) {
        throw new Error("There is no message to send.")
    } else {
        connectivity.common.getInstance("game-connectivity", function (connectivityInstanceId) {
            connectivity.common.getAccessToken({
                error: function (error1) {
                    if (options && options.error) options.error(error1);
                },
                success: function (accessToken) {
                    connectivityRest.sendEventBulk(accessToken, connectivityInstanceId, messages, {
                        success: function() {
                            if (options && options.success) {
                                options.success();
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
