var objectStorage = require("./lib/storage/objectStorage");
var game = require("./lib/game/game");
var connectivity = require("./lib/connectivity/connectivity");
var common = require("./lib/common");
var auth = require("./lib/auth/auth");
var cloudCode = require("./lib/cloudCode/cloudCode");
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
    Game: game.Game,
    Users: auth.Users,
    Function: cloudCode.Function,
    ChatGroup: connectivity.ChatGroup,
    ChatMessage: connectivity.ChatMessage,
    Messages: connectivity.Messages,
    DirectMessages: connectivity.DirectMessages,

    setConfigFileLocation: function(path) {
        if (!path || (typeof path != "string"))
            throw new Error("Config file location must be a valid string.");
        common.setConfigFileLocation(path);
    },

    getBaseUrl: function() {
        return config.backtory.baseUrl;
    }
};

auth.init(Backtory.common);
objectStorage.init(Backtory.common);
game.init(Backtory.common);
connectivity.init(Backtory.common);
cloudCode.init(Backtory.common);
