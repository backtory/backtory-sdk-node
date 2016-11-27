var config = require('./../config');
var common = require('./../common');
var raven = require("raven");

var sentry = module.exports = {
    ravenClient: null,
    enabled: false,
    common: null,

    init: function(common) {
        sentry.common = common;
        if (config.sentry.enabled) {
            sentry.enabled = true;
            sentry.ravenClient = sentry.getClient();
        }
    },

    getClient: function() {
       if (sentry.ravenClient)
           return sentry.ravenClient;
       else {
           if ("cloud-code" in common.instances) {
               sentry.ravenClient = new raven.Client({
                   dataCallback: function(data) {
                       data.user = {
                           CloudCodeId: common.instances['cloud-code']
                       };
                       data.sdk = {
                           "name": "backtory-sdk",
                           "version": config.sdk.version
                       };
                       return data;
                   },
                   environment: 'production'
               });
           } else {
               return null;
           }
       }
    },

    checkAPICall: function(serviceName, serviceId, taskName, responseStatus, responseBody, responseTime, url, method) {
        var threshold = 500;
        //if (serviceName && (serviceName in config.sentry.criteria.responseTime))
        //    threshold = config.sentry.criteria.responseTime[serviceName];

        if (sentry.enabled && (responseStatus >= 500 || responseTime >= threshold)) {
            var client = sentry.getClient();
            if (client) {
                if (responseStatus >= 500) {
                    var message = serviceName + " | " + taskName.toLowerCase() + " | status=" + responseStatus;
                    try {
                        client.captureMessage(message, {
                            extra: {
                                responseTime: responseTime, responseBody: responseBody, responseStatus: responseStatus,
                                url: url, method: method
                            },
                            tags: {
                                service: serviceName
                            },
                            level: "error"
                        });
                    } catch (err) {
                        console.log(err);
                    }
                } else if (responseTime >= threshold) {
                    var level = "info";
                    if (threshold >= 1000) {
                        level = "warning";
                    }
                    var message = serviceName + " | " + taskName.toLowerCase() + " | late_response";
                    try {
                        client.captureMessage(message, {
                            extra: {
                                responseTime: responseTime, responseStatus: responseStatus,
                                url: url, method: method
                            },
                            tags: {
                                service: serviceName
                            },
                            level: level
                        });
                    } catch (err) {
                        console.log(err);
                    }
                }
            }
        }
    }

};
