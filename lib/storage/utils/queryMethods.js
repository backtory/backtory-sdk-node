var castUtility = require("./cast");
var castAfterFetchQuery = castUtility.castAfterFetchQuery;

var queryMethods = module.exports = function (objectStorage, objectStorageRest) {

    objectStorage.Query.prototype.__check = function (key, value) {
        if (!key || !value)
            throw new Error("You must specify two valid arguments for notEqualTo.");
        else if (typeof key != "string")
            throw new Error("First argument key must be a string.");
    };

    objectStorage.Query.prototype.equalTo= function(key, value) {
        this.__check(key, value);
        if (value instanceof objectStorage.Object) {
            if (value.has("_id")) {
                this.json[key] = {
                    "_id": value.get("_id"),
                    "__type": "Pointer",
                    "className": value.className
                };
            } else {
                throw new Error("Your object must have _id field.")
            }
        } else {
            this.json[key] = value;
        }
    };

    objectStorage.Query.prototype.relatedTo= function(key, value) {
        this.__check(key, value);
        if (value instanceof objectStorage.Object) {
            if (value.has("_id")) {
                this.json["$relatedTo"] = {"object":
                {"_id":value.get("_id"), "__type":"Pointer","className":value.className},
                    "key": key
                };
            } else {
                throw new Error("Your object must have _id field.")
            }
        } else {
            throw new Error("Second argument must be instanceof Backtory.Object class.")
        }
    };

    objectStorage.Query.prototype.notEqualTo= function(key, value) {
        this.__check(key, value);
        if (!(key in this.json) || (typeof this.json[key] == "string")) this.json[key] = {};
        this.json[key]["$ne"] = value;
    };

    objectStorage.Query.prototype.greaterThan= function(key, value) {
        this.__check(key, value);
        if (!(key in this.json) || (typeof this.json[key] == "string")) this.json[key] = {};
        this.json[key]["$gt"] = value;
    };

    objectStorage.Query.prototype.lessThan= function(key, value) {
        this.__check(key, value);
        if (!(key in this.json) || (typeof this.json[key] == "string")) this.json[key] = {};
        this.json[key]["$lt"] = value;
    };

    objectStorage.Query.prototype.lessThanOrEqualTo= function(key, value) {
        this.__check(key, value);
        if (!(key in this.json) || (typeof this.json[key] == "string")) this.json[key] = {};
        this.json[key]["$lte"] = value;
    };

    objectStorage.Query.prototype.greaterThanOrEqualTo= function(key, value) {
        this.__check(key, value);
        if (!(key in this.json) || (typeof this.json[key] == "string")) this.json[key] = {};
        this.json[key]["$gte"] = value;
    };

    objectStorage.Query.prototype.containedIn= function(key, value) {
        this.__check(key, value);
        if (!(Array.isArray(value))) throw new Error("Second argument must be an array.");
        if (!(key in this.json) || (typeof this.json[key] == "string")) this.json[key] = {};
        this.json[key]["$in"] = value;
    };

    objectStorage.Query.prototype.notContainedIn= function(key, value) {
        this.__check(key, value);
        if (!(Array.isArray(value))) throw new Error("Second argument must be an array.");
        if (!(key in this.json) || (typeof this.json[key] == "string")) this.json[key] = {};
        this.json[key]["$nin"] = value;
    };

    objectStorage.Query.prototype.limit= function(num) {
        if (!num || (typeof num != "number")) throw new Error("First argument must be a number.");
        if (num<0) throw new Error("Limit must be greater than or equal 0.");
        if (num>1000) throw new Error("Limit must be less than or equal 1000.");
        this.params["limit"] = num;
    };

    objectStorage.Query.prototype.skip= function(num) {
        if (!num || (typeof num != "number")) throw new Error("First argument must be a number.");
        if (num<0) throw new Error("Skip must greater than or equal 0.");
        this.params["skip"] = num;
    };

    objectStorage.Query.prototype.ascending= function(attr) {
        if (!attr || (typeof attr != "string")) throw new Error("First argument must be a string.");
        this.params["order"] = attr;
    };

    objectStorage.Query.prototype.descending= function(attr) {
        if (!attr || (typeof attr != "string")) throw new Error("First argument must be a string.");
        this.params["order"] = "-" + attr;
    };

    objectStorage.Query.prototype.exists= function(attr) {
        if (!attr || (typeof attr != "string")) throw new Error("First argument must be a string.");
        if (!(attr in this.json) || (typeof this.json[attr] == "string")) this.json[attr] = {};
        this.json[attr]["$exists"] = true;
    };

    objectStorage.Query.prototype.doesNotExist= function(attr) {
        if (!attr || (typeof attr != "string")) throw new Error("First argument must be a string.");
        if (!(attr in this.json) || (typeof this.json[attr] == "string")) this.json[attr] = {};
        this.json[attr]["$exists"] = false;
    };

    objectStorage.Query.prototype.matchesKeyInQuery= function(key1, key2, innerQuery) {
        this.__check(key1, key2);
        if (!key2 || (typeof key2 != "string")) throw new Error("Second argument must be a string.");
        if (!innerQuery || !(innerQuery instanceof objectStorage.Query))
            throw new Error("Third argument must be instanceof Backtory.Query class.");
        if (!(key1 in this.json) || (typeof this.json[key1] == "string")) this.json[key1] = {};
        this.json[key1] = {
            "$select": {
                "query": {"className": innerQuery.targetClass.prototype.className,
                          "where": innerQuery.json
                         },
                "key": key2
            }
        }
    };

    objectStorage.Query.prototype.doesNotMatchKeyInQuery= function(key1, key2, innerQuery) {
        this.__check(key1, key2);
        if (!key2 || (typeof key2 != "string")) throw new Error("Second argument must be a string.");
        if (!innerQuery || !(innerQuery instanceof objectStorage.Query))
            throw new Error("Third argument must be instanceof Backtory.Query class.");
        if (!(key1 in this.json) || (typeof this.json[key1] == "string")) this.json[key1] = {};
        this.json[key1] = {
            "$dontSelect": {
                "query": {"className": innerQuery.targetClass.prototype.className,
                    "where": innerQuery.json
                },
                "key": key2
            }
        }
    };

    objectStorage.Query.prototype.matchesQuery= function(key, innerQuery) {
        this.__check(key, innerQuery);
        if (!(innerQuery instanceof objectStorage.Query))
            throw new Error("Second argument must be instanceof Backtory.Query class.");
        if (!(key in this.json) || (typeof this.json[key] == "string")) this.json[key] = {};
        this.json[key] = {"$inQuery": {
            "where":innerQuery.json, "className": innerQuery.targetClass.prototype.className }
        };
    };

    objectStorage.Query.prototype.doesNotMatchQuery= function(key, innerQuery) {
        this.__check(key, innerQuery);
        if (!(innerQuery instanceof objectStorage.Query))
            throw new Error("Second argument must be instanceof Backtory.Query class.");
        this.json[key]["$notInQuery"] = {
            "where":innerQuery.json, "className": innerQuery.targetClass.prototype.className };
    };

    objectStorage.Query.prototype.select= function() {
        if (arguments.length != 0) {
            var flag = 0;
            var keys = "";
            for (var key in arguments) {
                if (typeof arguments[key] != "string" || !arguments[key]) {
                    throw new Error("You must specify a list of valid string values.")
                } else {
                    keys += arguments[key];
                    if (key != arguments.length -1) {
                        keys += ",";
                    }
                }
            }
            this.params["keys"] = keys;
        } else {
            throw new Error("You must specify at least one argument.");
        }
    };

    objectStorage.Query.prototype.include= function() {
        if (arguments.length != 0) {
            var flag = 0;
            var keys = "";
            for (var key in arguments) {
                if (typeof arguments[key] != "string" || !arguments[key]) {
                    throw new Error("You must specify a list of valid string values.")
                } else {
                    keys += arguments[key];
                    if (key != arguments.length-1) {
                        keys += ",";
                    }
                }
            }
            this.params["include"] = keys;
        } else {
            throw new Error("You must specify at least one argument.");
        }
    };

    objectStorage.Query.prototype.containsAll= function(key, value) {
        this.__check(key, value);
        if (!(Array.isArray(value))) throw new Error("Second argument must be an array.");
        if (!(key in this.json) || (typeof this.json[key] == "string")) this.json[key] = {};
        this.json[key]["$all"] = value;
    };

    objectStorage.Query.prototype.startsWith= function(key, value) {
        this.__check(key, value);
        if (typeof value != "string") throw new Error("Second argument key must be a string.");
        if (!(key in this.json) || (typeof this.json[key] == "string")) this.json[key] = {};
        this.json[key]["$regex"] = "^" + value;
    };

    objectStorage.Query.prototype.find= function(options) {
        var query = this;
        objectStorage.common.getInstance("object-storage", function (objectStorageInstanceId) {
            objectStorage.common.getAccessToken({
                error: function (error1) {
                    if (options && options.error) options.error(error1);
                },
                success: function (accessToken) {
                    objectStorageRest.filterObjects(accessToken, objectStorageInstanceId,
                        query.targetClass.prototype.className, query.params, query.json, {
                            success: function(list) {
                                if (options && options.success) {
                                    var result = list.results;
                                    objectStorage.Object.registerSubclass(query.targetClass.prototype.className, query.targetClass);
                                    castAfterFetchQuery(objectStorage.Object, objectStorage.Relation,
                                        query.targetClass.prototype.className, result, objectStorage.registeredClasses);
                                    options.success(result);
                                }
                            },
                            error: function(error1) {
                                if (options && options.error) options.error(error1);
                            }
                        });
                }
            });
        });
    };

    objectStorage.Query.prototype.count = function(options) {
        var query = this;
        var params = {"count": 1, "limit": 0};
        var json = query.json;
        objectStorage.common.getInstance("object-storage", function (objectStorageInstanceId) {
            objectStorage.common.getAccessToken({
                error: function (error1) {
                    if (options && options.error) options.error(error1);
                },
                success: function (accessToken) {
                    objectStorageRest.filterObjects(accessToken, objectStorageInstanceId,
                        query.targetClass.prototype.className, params, json, {
                            success: function(list) {
                                if (options && options.success) {
                                    var count = list.count;
                                    options.success(count);
                                }
                            },
                            error: function(error1) {
                                if (options && options.error) options.error(error1);
                            }
                        });
                }
            });
        });
    };

    objectStorage.Query.or = function () {
        var queries = arguments;
        var result = [];
        if (!arguments || arguments.length < 2)
            throw new Error("You must specify at least 2 queries as arguments.");
        var className = queries[0].targetClass.prototype.className;
        for (var key in queries) {
            if (!(queries[key] instanceof objectStorage.Query)) {
                throw new Error("All arguments of Backtory.Query.or must be instance of Backtory.Query class.");
            } else {
                if (className == queries[key].targetClass.prototype.className)
                    result.push(queries[key].json);
                else
                    throw new Error("All queries given to error must have save class.");
            }
        }
        var final = new objectStorage.Query(queries[0].targetClass);
        final.json = { "$or": result };
        return final;
    };
};


