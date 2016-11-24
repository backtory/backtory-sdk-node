var config = require('./../config');
var common = require('./../common');
var raven = require("raven");

var sentry = module.exports = {
    ravenClient: null,
    enabled: false,

    init: function() {
        if (config.sentry.enabled) {
            sentry.enabled = true;
            sentry.ravenClient = sentry.getClient();
        }
    },

    getClient: function() {
       if (sentry.ravenClient)
           return sentry.ravenClient;
       else {
           if ("lambda" in common.instances) {
               sentry.ravenClient = new raven.Client({
                   dataCallback: function(data) {
                       data.user = {
                           CloudCodeId: common.instances['lambda']
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
        var threshold = 50;
        if (sentry.enabled && (responseTime > threshold)) {
            var client = sentry.getClient();
            if (client) {
                var message = taskName + " was very slow. (responseTime = " + responseTime + ")";
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
