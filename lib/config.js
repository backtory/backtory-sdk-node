var config = {};

config.backtory = {};
config.backtory.baseUrl = "http://api.backtory.com/";

config.backtory.integrationInfo = "/home/dummy/integrationInfo.json";
config.debug = false;

if (process.env.BacktoryBaseUrl ) {
    config.backtory.baseUrl = process.env.BacktoryBaseUrl;
}

config.sentry = {
    enabled: false,
    criteria: {
        responseTime: {
            "database": 500,
            "auth": 500,
            "game": 500,
            "connectivity": 500
        }
    },
    level: "fatal"
};

if (process.env.SENTRY_DSN) {
    config.sentry.enabled = true;
}

if (process.env.SENTRY_WARN_LEVEL) {
    config.sentry.level = process.env.SENTRY_WARN_LEVEL;
}

config.sdk = {
    version: "0.0.34"
};

config.backtory.authApi = config.backtory.baseUrl + "auth/";
config.backtory.objectStorageApi = config.backtory.baseUrl + "object-storage/";
config.backtory.gameApi = config.backtory.baseUrl + "game/";
config.backtory.connectivityApi = config.backtory.baseUrl + "connectivity/";
config.backtory.cloudCodeApi = config.backtory.baseUrl + "cloud-code/";

module.exports = config;
