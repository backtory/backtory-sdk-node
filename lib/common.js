var config = require('./config');
var auth = require('./auth');
var fs = require('fs');
var errors = require('./errors');

var readIntegrationInfo = function(fileName, callback) {
    fs.readFile(fileName, 'utf8', function (err,data) {
        if (err) {
            throw new Error("Config file does not exist.");
        }
        var array;
        try {
            array = JSON.parse(data);
        } catch (err) {
            throw new Error("Not a valid config file.");
        }
        if (!("integratedInstances" in array)) {
            throw new Error("There is no field 'integratedInstances' in config file.");
        }
        if (!(Array.isArray(array.integratedInstances)) || (array.integratedInstances.length == 0)) {
            throw new Error("'integratedInstances' field in config file is an empty array.");
        }
        array.integratedInstances.forEach(function(item) {
            if (!(item.type in common.instances))
                common.instances[item.type] = item.id;
        });
        if (!("integratedMasterKey" in array)) {
            throw new Error("There is no field 'integratedMasterKey' in config file.");
        }
        common.masterKey = array.integratedMasterKey;
        callback();
    });
};


var common = module.exports = {
    instances: {},
    masterKey: undefined,
    accessToken: undefined,
    integrationInfoPath: config.backtory.integrationInfo,

    setConfigFileLocation: function(path) {
        common.integrationInfoPath = path;
    },

    getConfigFileLocation: function() {
        return common.integrationInfoPath;
    },

    getInstance: function(name, callback) {
        if (Object.keys(common.instances).length == 0) {
            readIntegrationInfo(common.getConfigFileLocation(), function () {
                if (!(name in common.instances)) {
                    var message = "There is no instance available for " + name + ". Maybe you've forgot to add " + name +
                        " instanceId to integration Info file or your instance is not enabled yet.";
                    throw new Error(message);
                } else {
                    callback(common.instances[name]);
                }
            });
        } else {
            if (!(name in common.instances)) {
                var message = "There is no instance available for " + name + ". Maybe you've forgot to add " + name +
                    " instanceId to integration Info file or your instance is not enabled yet.";
                throw new Error(message);
            } else {
                callback(common.instances[name]);
            }
        }
    },

    getMasterKey: function(callback) {
        if (!common.masterKey) {
            readIntegrationInfo(common.getConfigFileLocation(),function () {
                callback(common.masterKey);
            });
        } else {
            callback(common.masterKey);
        }
    },

    getAccessToken: function(callback) {
        if (common.accessToken) {
            callback.success(common.accessToken);
        } else {
            common.getInstance("auth", function (authInstanceId) {
                if (null == authInstanceId) {
                    callback.error({
                        code: errors.ServiceUnavailable,
                        message: "There is no authentication instance integrated."
                    })
                } else {
                    common.getMasterKey(function (masterKey) {
                        auth.loginMaster(authInstanceId, masterKey,{
                                success: function (accessToken) {
                                    common.accessToken = accessToken;
                                    callback.success(accessToken);
                                },
                                failure: function (status, body) {
                                    callback.error(body);
                                }
                            }
                        )
                    });
                }
            });
        }
    }
};