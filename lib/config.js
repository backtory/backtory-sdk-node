var config = {};

config.backtory = {};
config.backtory.baseUrl = "http://api.backtory.com/";

config.backtory.integrationInfo = "/home/dummy/integrationInfo.json";
config.debug = false;

if (process.env.BacktoryBaseUrl ) {
    config.backtory.baseUrl = process.env.BacktoryBaseUrl;
}

config.backtory.authApi = config.backtory.baseUrl + "auth/";
config.backtory.objectStorageApi = config.backtory.baseUrl + "object-storage/";
config.backtory.gameApi = config.backtory.baseUrl + "game/";
config.backtory.connectivityApi = config.backtory.baseUrl + "connectivity/";
config.backtory.cloudCodeApi = config.backtory.baseUrl + "cloud-code/";

module.exports = config;
