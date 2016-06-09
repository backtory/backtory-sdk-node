var objectStorage = require("./lib/storage/objectStorage");
var game = require("./lib/game/game");
var connectivity = require("./lib/connectivity/connectivity");
var common = require("./lib/common");
var auth = require("./lib/auth/auth");
var error = require("./lib/errors");

var Backtory = module.exports = {
    common: common,
    Object: objectStorage.Object,
    Relation: objectStorage.Relation,
    Query: objectStorage.Query,
    Error: error,
    LeaderBoard: game.LeaderBoard,
    Event: game.Event,
    Messages: connectivity.Messages,
    DirectMessages: connectivity.DirectMessages,
    User: auth.User,

    setConfigFileLocation: function(path) {
        if (!path || (typeof path != "string"))
            throw new Error("Config file location must be a valid string.");
        common.setConfigFileLocation(path);
    }
};

objectStorage.init(Backtory.common);
game.init(Backtory.common);
connectivity.init(Backtory.common);
auth.init(Backtory.common);
