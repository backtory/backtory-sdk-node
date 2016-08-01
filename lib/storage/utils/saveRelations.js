var async = require("async");
var fs = require("fs");
var objectStorageRest = require("./../rest/storageRest");
var config = require('./../../config');

var utils = module.exports = {

    bfsToFindRelations: function(Object, Relation, model, relationsFound) {
        for (var key in model.attributes) {
            if (model.get(key) instanceof Object)
                utils.bfsToFindRelations(Object, Relation, model.get(key), relationsFound);
            else if (model.get(key) instanceof Relation) {
                var relation = model.get(key);
                if (relation._addedRelations.length > 0) {
                    relation._addedRelations.forEach(function(val, index){
                        relationsFound.push({action: "AddRelation", model: [{
                            _id: val.get("_id"),
                            __type: "Pointer",
                            className: val.className
                        }], ownerClassName: model.className, ownerKey: key, ownerId: model.get("_id")});
                    });
                }
                if (relation._removedRelations.length > 0) {
                    relation._removedRelations.forEach(function(val, index){
                        relationsFound.push({action: "RemoveRelation", model: [{
                            _id: val.get("_id"),
                            __type: "Pointer",
                            className: val.className
                        }], ownerClassName: model.className, ownerKey: key, ownerId: model.get("_id")});
                    });
                }
                for (var index=0; index<relation.size(); index+=1){
                    utils.bfsToFindRelations(Object, Relation, relation.getByIndex(index), relationsFound);
                }
            }
        }
    },

    saveRelationsSerial: function(common, tasks, options) {
        var counter = 0;
        if (tasks.length==0)  options.success();
        async.eachSeries(tasks, function iteratee(task, callback) {
            counter += 1;
            var ownerClassName = task.ownerClassName;
            var ownerId = task.ownerId;
            var ownerKey = task.ownerKey;
            var action = task.action;
            var relation = task.model;
            common.getInstance("database", function(objectStorageInstanceId) {
                common.getAccessToken({
                    error: function (error) {
                        options.error(error);
                    },
                    success: function (accessToken) {
                        var url = config.backtory.objectStorageApi + "classes/" + ownerClassName + "/" + ownerId + "/";
                        objectStorageRest.addOrRemoveRelation(accessToken, objectStorageInstanceId, url, ownerKey, action, relation, {
                            success: function() {
                                if (counter == tasks.length) options.success();
                                callback();
                            }, error: function(error1) {
                                options.error(error1);
                            }
                        })
                    }
                })
            });
        });
    }
};
