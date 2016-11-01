var Promise = require("bluebird");

var objectStoragePromisified = module.exports = function (objectStorage) {

    objectStorage.Query.prototype.findAsync = function() {
        var that = this;
        return new Promise(function(resolve, reject) {
            objectStorage.Query.prototype.find.call(that, {"success": resolve, "error": reject});
        });
    };

    objectStorage.Query.prototype.countAsync = function() {
        var that = this;
        return new Promise(function(resolve, reject) {
            objectStorage.Query.prototype.count.call(that, {"success": resolve, "error": reject});
        });
    };

    objectStorage.Query.prototype.getAsync = function(id) {
        var that = this;
        return new Promise(function(resolve, reject) {
            objectStorage.Query.prototype.get.call(that, id, {"success": resolve, "error": reject});
        });
    };
};

