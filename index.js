var objectStorage = require("./lib/storage/objectStorage");
var common = require("./lib/common");
var error = require("./lib/errors");

var Backtory = module.exports = {
    common: common,
    Object: objectStorage.Object,
    Relation: objectStorage.Relation,
    Query: objectStorage.Query,
    Error: error,

    setConfigFileLocation: function(path) {
        if (!path || (typeof path != "string"))
            throw new Error("Config file location must be a string.");
        common.setConfigFileLocation(path);
    }
};

objectStorage.init(Backtory.common);
