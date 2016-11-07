var Backbone = require("backbone");
var config = require('./../config');
var errors = require('./../errors');

var castUtility = require("./utils/cast");
var objectStorageRest = require("./rest/storageRest");
var pointersUtility = require("./utils/savePointers");
var relationUtility = require("./utils/saveRelations");

var castAfterFetchObject = castUtility.castAfterFetchObject;
var castBeforeCreate = castUtility.castBeforeCreate;
var clearAfterCreate = castUtility.clearAfterCreate;
var castBeforeUpdate = castUtility.castBeforeUpdate;

var prepareModelForSavePointer = pointersUtility.prepareModelForSavePointer;
var bfsToFindRelations = relationUtility.bfsToFindRelations;
var saveRelationsSerial = relationUtility.saveRelationsSerial;

var objectStorage = module.exports = {

    common: null,
    registeredClasses: {},

    init: function (common) {
        objectStorage.common = common;

        require("./utils/queryMethods")(objectStorage, objectStorageRest); // this line will add Query methods.
        require("./objectStoragePromisified")(objectStorage);
    },

    Object: Backbone.Model.extend({

        idAttribute: "_id",

        initialize: function(args){
            // todo check classname set if could be
            this._changedAttributes = {};
        },

        defaults: {
        },

        destroy: function (options) {
            var model = this;
            if (!model.className) {
                if (options && options.error)
                    options.error({
                        code: errors.InvalidClassName,
                        message: "className attribute of Backtory.Object instance must not be null."
                    });
            } else if (typeof model.className !== 'string') {
                if (options && options.error)
                    options.error({
                        code: errors.InvalidClassName,
                        message: "className attribute of Backtory.Object instance must be a string."
                    });
            } else if (!(model.has("_id"))) {
                if (options && options.error)
                    options.error({
                        code: errors.IllegalArguments,
                        message: "Can not destroy a Backtory.Object without _id attribute."
                    });
            }
            else {
                objectStorage.common.getInstance("database", function(objectStorageInstanceId) {
                    objectStorage.common.getAccessToken({
                        error: function(error1) {
                            if (options && options.error) options.error(error1);
                        },
                        success: function(accessToken) {
                            var url = config.backtory.objectStorageApi + "classes/" +
                                model.className + "/" + model.get("_id") + "/";
                            objectStorageRest.destroy(accessToken, objectStorageInstanceId, url, {
                                success: function () {
                                    if (options && options.success) options.success();
                                },
                                error: function (error3) {
                                    if (options && options.error) options.error(error3);
                                }

                            });
                        }
                    });
                });
            }
        },

        save: function (options) {
            var model = this;
            model.savePointers({
                success: function(modelResult) {
                    if (options && options.success) {
                        var relationsFound = [];
                        bfsToFindRelations(objectStorage.Object, objectStorage.Relation, modelResult, relationsFound);
                        saveRelationsSerial(objectStorage.common, relationsFound, {
                            success: function() {
                                clearAfterCreate(objectStorage.Object, objectStorage.Relation, modelResult);
                                if (options && options.success) options.success(modelResult);
                            },
                            error: function(error) {
                                if (options && options.error) options.error(error);
                            }
                        });
                    }
                },
                error: function(error) {
                    if (options && options.error) options.error(error);
                }
            })
        },

        savePointers: function(options) {
            var model = this;
            if (!model.className) {
                if (options && options.error)
                    options.error({
                        code: errors.InvalidClassName,
                        message: "className attribute of Backtory.Object instance must not be null."
                    });
            } else if (typeof model.className !== 'string') {
                if (options && options.error)
                    options.error({
                        code: errors.InvalidClassName,
                        message: "className attribute of Backtory.Object instance must be a string."
                    });
            }
            else {
                objectStorage.common.getInstance("database", function(objectStorageInstanceId) {
                    objectStorage.common.getAccessToken({
                        error: function(error1) {
                            if (options && options.error) options.error(error1);
                        },
                        success: function(accessToken) {
                            var modelCopy = model.__clone();
                            prepareModelForSavePointer(objectStorage.Object, objectStorage.Relation, modelCopy, {
                                error: function(error2) {
                                    if (options && options.error) options.error(error2);
                                },
                                success: function() {
                                    if (modelCopy.has("_id")) {
                                        if (Object.keys(modelCopy._changedAttributes).length !== 0) {
                                            var url = config.backtory.objectStorageApi + "classes/" + modelCopy.className + "/" + modelCopy.get("_id") + "/";
                                            var json = castBeforeUpdate(objectStorage.Object, objectStorage.Relation, modelCopy);
                                            objectStorageRest.update(accessToken, objectStorageInstanceId, url, json, {
                                                success: function(json) {
                                                    modelCopy.__sync_set(json, {"silent": true});
                                                    modelCopy._changedAttributes = {};
                                                    options.success(modelCopy);
                                                },
                                                error: function(error3) {
                                                    if (options && options.error) options.error(error3);
                                                }
                                            });
                                        } else {
                                            modelCopy._changedAttributes = {};
                                            if (options && options.success) options.success(modelCopy);
                                        }

                                    } else {
                                        var url = config.backtory.objectStorageApi + "classes/" + modelCopy.className + "/";
                                        var json = castBeforeCreate(objectStorage.Object, objectStorage.Relation, modelCopy);
                                        objectStorageRest.save(accessToken, objectStorageInstanceId, url, json, {
                                            success: function(jsonResult) {
                                                modelCopy.__sync_set(jsonResult, {"silent": true});
                                                modelCopy._changedAttributes = {};
                                                if (options && options.success) options.success(modelCopy);
                                            },
                                            error: function(error3) {
                                                if (options && options.error) options.error(error3);
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    });
                });
            }
        },

        fetch: function(options) {
            var model = this;
            if (!model.className) {
                if (options && options.error)
                    options.error({
                        code: errors.InvalidClassName,
                        message: "className attribute of Backtory.Object instance must not be null."
                    });
            } else if (typeof model.className !== 'string') {
                if (options && options.error)
                    options.error({
                        code: errors.InvalidClassName,
                        message: "className attribute of Backtory.Object instance must be a string."
                    });
            } else if (!(model.has("_id"))) {
                if (options && options.error)
                    options.error({
                        code: errors.IllegalArguments,
                        message: "Your object _id field must be set before fetching it."
                    });
            }
            else {
                objectStorage.common.getInstance("database", function (objectStorageInstanceId) {
                    objectStorage.common.getAccessToken({
                        error: function (error1) {
                            if (options && options.error) options.error(error1);
                        },
                        success: function (accessToken) {
                            var url = config.backtory.objectStorageApi + "classes/" + model.className + "/" + model.get("_id") + "/";
                            objectStorageRest.fetch(accessToken, objectStorageInstanceId, url, {
                                success: function(json) {
                                    var result = castAfterFetchObject(objectStorage.Object, objectStorage.Relation,
                                                                model.className, json, objectStorage.registeredClasses);
                                    var tmp = new (model.constructor)();
                                    tmp.__sync_set(result.attributes, {"silent": true});
                                    if (options && options.success) options.success(tmp);

                                },
                                error: function(error1) {
                                    if (options && options.error)
                                        options.error(error1);
                                }
                            });
                        }
                    });
                });
            }
        },

        __clone: function () {
            var model = this;
            var result = new model.constructor();
            result._changedAttributes = model._changedAttributes;
            result.className = model.className;
            for (var attr in model.attributes) {
                if (model.get(attr) instanceof objectStorage.Object) {
                    result.__sync_set(attr, model.get(attr).__clone());
                } else {
                    result.__sync_set(attr, model.get(attr));
                }
            }
            return result;
        },

        __sync_set: function(attributes, options) {
            var attrs = attributes || {};
            //if (options.parse) {
            //    attrs = this.parse(attrs, options) || {}
            //}
            Backbone.Model.prototype.set.call(this, attributes, options);
            this.changed = {};
            this._previousAttributes = {};
            //this.trigger('sync', this, attributes, options);
            return this;
        },

        set: function(attributes, options) {
            // todo error checking
            if (attributes && (typeof attributes === "string")) {
                var tmp = {};
                tmp[attributes] = options;
                if (!(this._changedAttributes)) this._changedAttributes = {};
                //if (!this.has(attributes) || this.get(attributes)!=options) {
                    if (attributes != "_id" && attributes != "_done") {
                        if (!(tmp[attributes] instanceof objectStorage.Relation))
                            this._changedAttributes[attributes] = tmp[attributes];
                    }
                    return this.__sync_set(tmp, {"silent": true});
                //}
            } else if (attributes && (typeof attributes === "object")) {
                if (!(this._changedAttributes)) this._changedAttributes = {};
                for (var key in attributes) {
                    if (!this.has(key) || this.get(key)!=attributes[key]) {
                        if (key != "_id" && key != "_done") {
                            if (!(attributes[key] instanceof objectStorage.Relation)) {
                                this._changedAttributes[key] = attributes[key];
                            }
                        }
                    }
                }
                options.silent = true;
                return this.__sync_set(attributes, options);
            }
        },

        relation: function(key) {
            var model = this;
            if (!key || (typeof key != "string")) {
                throw new Error("Bad value for relation name. (it must be a string)")
            } else {
                if (model.has(key)) {
                    if (model.get(key) instanceof objectStorage.Relation) {
                        return model.get(key);
                    } else {
                        if (Array.isArray(model.get(key)) && model.get(key).length == 0) {
                            var relatedList = new objectStorage.Relation();
                            delete relatedList['cid'];
                            model.set(key, relatedList);
                            return relatedList;
                        } else {
                            throw new Error("Specified attribute is not a relation.")
                        }
                    }
                } else {
                    var relatedList = new objectStorage.Relation();
                    delete relatedList['cid'];
                    model.set(key, relatedList);
                    return relatedList;
                }
            }
        },

        increment: function(key, amount) {
            var model = this;
            if (!key || (typeof key != "string")) {
                throw new Error("Bad value for increment first argument. (it must be a valid string)")
            } else {
                if (typeof amount == "number") {
                    model._changedAttributes[key] = {
                        "__op": "Increment",
                        "amount": amount
                    };
                    if (model.has(key)) {
                        model.__sync_set(key, model.get(key) + amount, {"silent": true});
                    }
                } else {
                    model._changedAttributes[key] = {
                        "__op": "Increment",
                        "amount": 1
                    };
                    if (model.has(key)) {
                        model.__sync_set(key, model.get(key) + 1, {"silent": true});
                    }
                }
            }
        },

        destroyAsync: function() {
            var that = this;
            return new Promise(function(resolve, reject) {
                that.destroy({"success": resolve, "error": reject});
            });
        },

        saveAsync: function() {
            var that = this;
            return new Promise(function(resolve, reject) {
                that.save({"success": resolve, "error": reject});
            });
        },

        fetchAsync: function() {
            var that = this;
            return new Promise(function(resolve, reject) {
                that.fetch({"success": resolve, "error": reject});
            });
        }

}, {
        registerSubclass: function(className, classObject) {
            if (!className)
                throw new Error("Bad class name for registering subclass.");
            if (classObject.prototype instanceof objectStorage.Object || classObject === objectStorage.Object)
                objectStorage.registeredClasses[className] = classObject;
            else
                throw new Error("Class must be subclass of Backtory.Object")
        },
        extend:  function() {
            var model = this;
            var args = arguments;
            //todo recheck
            if (args.length == 0) {
                throw new Error("You must specify className (first argument) in extend");
            } else if (args.length == 2 && (typeof args[1] != "object")) {
                throw new Error("Second argument must be an object.");
            } else if (args.length == 3 && (typeof args[2] != "object")) {
                throw new Error("Third argument must be an object.");
            } else if (args.length > 3) {
                throw new Error("Too many arguments for extend.");
            } else {
                if (args[0] && (typeof args[0] == "string")) {
                    var tmp = [];
                    for (var key in args) {
                        if (key > 0) {
                            tmp.push(args[key]);
                        }
                    }
                    if (tmp.length == 0) tmp[0] = {};
                    tmp[0].className = args[0];
                    return Backbone.Model.extend.apply(model, tmp);
                } else {
                    throw new Error("first argument (className) must be a valid string.");
                }
            }
        }
    }),

    Relation: Backbone.Model.extend({

        initialize: function(args){
           if (!(this.has("values"))) {
               this.set("values", []);
           }
           this._removedRelations = [];
           this._addedRelations = [];
        },

        getByIndex: function(index) {
            if (index < 0 || index >= this.get("values").length) {
                throw new Error("Index out of bound. (index="+index+", length="+this.get("values").length+")");
            }
            return this.get("values")[index];
        },

        getById: function(id) {
            var relation = this;
            if (!id ) {
                throw new Error("You must specify _id value as first argument.");
            } else if (typeof id !== "string") {
                throw new Error("first argument (id) must be a string.");
            } else {
                var index = -1;
                for (var i=0; i<relation.get("values").length; i++) {
                    if (relation.get("values")[i].has("_id"))
                        if (relation.get("values")[i].get("_id") == id) {
                            index = i;
                            break;
                        }
                }
                if (index == -1) {
                    throw Error("No object with such _id in relation.");
                } else {
                    return relation.get("values")[index];
                }
            }
        },

        contain: function(id) {
            var relation = this;
            if (!id ) {
                throw new Error("You must specify _id value as first argument.");
            } else if (typeof id !== "string") {
                throw new Error("first argument (id) must be a string.");
            } else {
                var index = -1;
                for (var i=0; i<relation.get("values").length; i++) {
                    if (relation.get("values")[i].has("_id"))
                        if (relation.get("values")[i].get("_id") == id) {
                            index = i;
                            break;
                        }
                }
                return (index != -1);
            }
        },

        size: function() {
            return this.get("values").length;
        },

        add: function(model) {
            var relation = this;
            if (!(model instanceof objectStorage.Object))
                throw new Error("Your relation object must be instance of Backtory.Object");
            else{
                if (model.has("_id")) {
                    if (relation.contain(model.get("_id"))) {
                        throw new Error("There is already an object with this _id in this relation");
                    } else {
                        var index = -1;
                        for (var i=0; i<relation._addedRelations.length; i++) {
                            if (relation._addedRelations[i].has("_id"))
                                if (relation._addedRelations[i].get("_id") == model.get("_id")) {
                                    index = i;
                                    break;
                                }
                        }
                        if (index!=-1)
                            throw new Error("You have already added an object with same id to this relation.");
                        else {
                            this.get("values").push(model);
                            this._addedRelations.push(model);
                        }
                    }
                } else {
                    this.get("values").push(model);
                    this._addedRelations.push(model);
                }
            }
        },

        remove: function(model) {
            var relation = this;
            if (!(model instanceof objectStorage.Object))
                throw new Error("Your relation object must be instance of Backtory.Object");
            else if (!(model.has("_id"))) {
                throw new Error("You can not remove an object with out _id attribute.");
            } else {
                var index = -1;
                for (var i=0; i<relation.get("values").length; i++) {
                    if (relation.get("values")[i].has("_id"))
                        if (relation.get("values")[i].get("_id") == model.get("_id")) {
                           index = i;
                           break;
                        }
                }
                if (index>-1) {
                    var index2 = -1;
                    for (var i=0; i<relation._removedRelations.length; i++) {
                        if (relation._removedRelations[i].has("_id"))
                            if (relation._removedRelations[i].get("_id") == model.get("_id")) {
                                index2 = i;
                                break;
                            }
                    }
                    if (index2 > -1) {
                        throw new Error("Object already in remove list.")
                    } else {
                        relation._removedRelations.push(relation.get("values")[index]);
                    }
                } else {
                    throw new Error("No object with such _id in relation.");
                }
            }
        },

        __sync_set: function(attributes, options) {
            var attrs = attributes || {};
            if (options.parse) {
                attrs = this.parse(attrs, options) || {}
            }

            this.set(attrs, options);
            this.changed = {};
            this._previousAttributes = {};
            //this.trigger('sync', this, attributes, options);
            return this;
        }
    }),

    Query: function Query(targetClass) {
        if ((typeof targetClass != "function") || !("prototype" in targetClass) || !(targetClass.prototype instanceof objectStorage.Object)) {
            throw new Error("First argument must be a subclass of Backtory.Object class.")
        }
        this.targetClass = targetClass;
        this.json = {};
        this.params = {};
    }


};

