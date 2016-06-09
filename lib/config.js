var config = {};

config.backtory = {};
config.backtory.baseUrl = "http://api.backtory.com/";
config.backtory.authApi = config.backtory.baseUrl + "auth/";
config.backtory.objectStorageApi = config.backtory.baseUrl + "object-storage/";
config.backtory.gameApi = config.backtory.baseUrl + "game/";
config.backtory.connectivityApi = config.backtory.baseUrl + "connectivity/";
config.backtory.cloudCodeApi = config.backtory.baseUrl + "lambda/";

config.backtory.integrationInfo = "/home/dummy/integrationInfo.json";
config.debug = false;

module.exports = config;
