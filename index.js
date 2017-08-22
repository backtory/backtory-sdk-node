var objectStorage = require("./lib/storage/objectStorage");
var game = require("./lib/game/game");
var connectivity = require("./lib/connectivity/connectivity");
var common = require("./lib/common");
var auth = require("./lib/auth/auth");
var cloudCode = require("./lib/cloudCode/cloudCode");
var sentry = require("./lib/sentry/client");
var error = require("./lib/errors");
var config = require("./lib/config");

var Backtory = module.exports = {
    common: common,
    Object: objectStorage.Object,
    Relation: objectStorage.Relation,
    Query: objectStorage.Query,
    Error: error,
    LeaderBoard: game.LeaderBoard,
    Event: game.Event,
    EventBulk: game.EventBulk,
    Game: game.Game,
    Users: auth.Users,
    Function: cloudCode.Function,
    ChatGroup: connectivity.ChatGroup,
    ChatMessage: connectivity.ChatMessage,
    Messages: connectivity.Messages,
    DirectMessages: connectivity.DirectMessages,
    OnlineUsers: connectivity.OnlineUsers,
    MatchProperties: connectivity.MatchProperties,
    MatchResult: connectivity.MatchResult,
    RealtimeGame: connectivity.RealtimeGame,
    
    setConfigFileLocation: function(path) {
        if (!path || (typeof path != "string"))
            throw new Error("Config file location must be a valid string.");
        common.setConfigFileLocation(path);
    },

    getBaseUrl: function() {
        return config.backtory.baseUrl;
    },

    getVersion: function() {
        return config.sdk.version;
    }
};

auth.init(Backtory.common);
objectStorage.init(Backtory.common);
game.init(Backtory.common);
connectivity.init(Backtory.common);
cloudCode.init(Backtory.common);
sentry.init(Backtory.common);