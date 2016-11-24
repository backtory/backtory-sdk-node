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
                           "version": "0.0.34"
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

    warnLongAPICall: function(taskName, responseTime, url, method) {
        var threshold = 500;
        if (sentry.enabled && (responseTime > threshold)) {
            var client = sentry.getClient();
            if (client) {
                var message = taskName + " is slow.";
                try {
                    client.captureMessage(message, {extra: {
                        responseTime: responseTime, url: url, method: method
                    }, level: "warning"});
                } catch (err) {
                    console.log(err);
                }
            }
        }
    }

};
