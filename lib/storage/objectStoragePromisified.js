var Promise = require("bluebird");

var objectStoragePromisified = module.exports = function (objectStorage) {

    objectStorage.Query.prototype.findAsync = function() {
        return new Promise(function(resolve, reject) {
            objectStorage.Query.prototype.find({"success": resolve, "error": reject});
        });
    };

    objectStorage.Query.prototype.countAsync = function() {
        return new Promise(function(resolve, reject) {
            objectStorage.Query.prototype.count({"success": resolve, "error": reject});
        });
    };

    objectStorage.Query.prototype.getAsync = function(id) {
        return new Promise(function(resolve, reject) {
            objectStorage.Query.prototype.get(id, {"success": resolve, "error": reject});
        });
    };
};

