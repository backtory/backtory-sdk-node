var utils = module.exports = {

    prepareModelForSavePointer: function(Object, Relation, model, options) {
        var hasPointerNeededToSave = false;
        var timeToSaveRelation = false;
        var relationToSave = undefined;
        for (var key in model.attributes) {
            if (model.get(key) instanceof Object) {
                if (model.get(key).has("_done")) {
                } else {
                    hasPointerNeededToSave = true;
                    break;
                }
            } else if (model.get(key) instanceof Relation) {
                if (model.get(key).has("_done")) {
                    model.get(key).set("_done", model.get(key).get("_done") + 1);

                    if (model.get(key).get("_done") < model.get(key).get("values").length) {
                        hasPointerNeededToSave = true;
                        break;
                    } else if (model.get(key).get("_done") == model.get(key).get("values").length) {
                        //todo
                        break;
                        //model.get(key).set("_done", model.get(key).get("_done")+1);
                        //timeToSaveRelation = true;
                        //relationToSave = {"model": model, "relation": model.get(key).get("values"), "key": key};
                    }
                } else {
                    model.get(key).set("_done", 0);
                    if (model.get(key).get("values").length > 0) {
                        hasPointerNeededToSave = true;
                        break;
                    }
                }
            }
        }

        if (timeToSaveRelation) {
            var url = config.backtory.objectStorageApi + "classes/" +model.className + "/" + model.get("_id") + "/";
            utils.saveRelations(relationToSave.model, relationToSave.key, relationToSave.relation, {
                success: function() {
                    utils.prepareModelForSavePointer(Object, Relation, model, {
                        success: function() {
                            options.success();
                        },
                        error: function(error2) {
                            options.error(error2)
                        }
                    });
                },
                error: function(error2) {
                    options.error(error2);
                }
            });
        } else if (!hasPointerNeededToSave) {
            options.success();
        } else {
            utils.prepareModelPointerAttribute(Object, Relation, model, {
                success: function() {
                    utils.prepareModelForSavePointer(Object, Relation, model, {
                        success: function() {
                            options.success();
                        },
                        error: function(error2) {
                            options.error(error2)
                        }
                    });
                },
                error: function(error2) {
                    options.error(error2);
                }
            });
        }
    },

    prepareModelPointerAttribute: function(Object, Relation, model, options) {
        for (var key in model.attributes) {
            if (model.get(key) instanceof Object) {
                if (!model.get(key).has("_done")) {
                    var pointer = model.get(key);
                    pointer.set("_done", true);
                    pointer.savePointers({
                        success: function(modelReturned) {
                            for (var attr in modelReturned.attributes){
                                pointer.set(attr, modelReturned.get(attr));
                            }
                            pointer._changedAttributes = {};
                            options.success();
                        },
                        error: function (error) {
                            options.error(error);
                        }
                    });
                    break;
                }
            } else if (model.get(key) instanceof Relation) {
                var relation = model.get(key);
                var pointer = relation.get("values")[relation.get("_done")];

                pointer.savePointers({
                    success: function(modelReturned) {
                        for (var attr in modelReturned.attributes){
                            pointer.set(attr, modelReturned.get(attr));
                        }
                        pointer._changedAttributes = {};
                        options.success();
                    },
                    error: function (error) {
                        options.error(error);
                    }
                });
                break;
            }
        }
    }

};