var castUtility = require("./cast");
var castAfterFetchQuery = castUtility.castAfterFetchQuery;

var queryMethods = module.exports = function (objectStorage, objectStorageRest) {

    objectStorage.Query.prototype.equalTo= function(key, value) {
        if (!key || typeof key != "string")
            throw new Error("First argument of 'equalTo' method must be a valid string.");
        if (value instanceof objectStorage.Object) {
            if (value.has("_id")) {
                this.json[key] = {
                    "_id": value.get("_id"),
                    "__type": "Pointer",
                    "className": value.className
                };
            } else {
                throw new Error("Your object must have '_id' field inorder to use in 'equalTo' method.")
            }
        } else if (value instanceof Date) {
            var iso = value.getFullYear() + "-" + (value.getMonth()+1) + "-" + value.getDate() + "T" +
                      value.getHours() + ":" + value.getMinutes() + ":" + value.getSeconds() + "." +
                      value.getMilliseconds() + "UTC";
            this.json[key] = {"type": "Date", "iso": iso};
        }
        else {
            this.json[key] = value;
        }
    };

    objectStorage.Query.prototype.relatedTo= function(key, value) {
        if (!key || typeof key != "string")
            throw new Error("First argument of 'relatedTo' method must be a valid string.");
        if (value instanceof objectStorage.Object) {
            if (value.has("_id")) {
                this.json["$relatedTo"] = {
                    "object": {
                        "_id": value.get("_id"), "__type": "Pointer", "className": value.className
                    },
                    "key": key
                };
            } else {
                throw new Error("Your object must have '_id' field inorder to use in 'relatedTo' method.")
            }
        } else {
            throw new Error("Second argument of 'relatedTo' method must be an instance of Backtory.Object class.")
        }
    };

    objectStorage.Query.prototype.notEqualTo= function(key, value) {
        if (!key || typeof key != "string")
            throw new Error("First argument of 'notEqualTo' method must be a valid string.");
        if (!(key in this.json) || (typeof this.json[key] == "string")) this.json[key] = {};
        if (value instanceof objectStorage.Object) {
            if (value.has("_id")) {
                this.json[key]["$ne"] = {
                    "_id": value.get("_id"),
                    "__type": "Pointer",
                    "className": value.className
                };
            } else {
                throw new Error("Your object must have '_id' field inorder to use in 'notEqualTo' method.")
            }
        } else if (value instanceof Date) {
            var iso = value.getFullYear() + "-" + (value.getMonth()+1) + "-" + value.getDate() + "T" +
                value.getHours() + ":" + value.getMinutes() + ":" + value.getSeconds() + "." +
                value.getMilliseconds() + "UTC";
            this.json[key]["$ne"] = {"type": "Date", "iso": iso};
        }
        else {
            this.json[key]["$ne"] = value;
        }

    };

    objectStorage.Query.prototype.greaterThan= function(key, value) {
        if (!key || typeof key != "string")
            throw new Error("First argument of 'greaterThan' method must be a valid string.");
        if (!(key in this.json) || (typeof this.json[key] == "string")) this.json[key] = {};
        if (value instanceof Date) {
            var iso = value.getFullYear() + "-" + (value.getMonth()+1) + "-" + value.getDate() + "T" +
                value.getHours() + ":" + value.getMinutes() + ":" + value.getSeconds() + "." +
                value.getMilliseconds() + "UTC";
            this.json[key]["$gt"] = {"type": "Date", "iso": iso};
        } else {
            this.json[key]["$gt"] = value;
        }
    };

    objectStorage.Query.prototype.lessThan= function(key, value) {
        if (!key || typeof key != "string")
            throw new Error("First argument of 'lessThan' method must be a valid string.");
        if (!(key in this.json) || (typeof this.json[key] == "string")) this.json[key] = {};
        if (value instanceof Date) {
            var iso = value.getFullYear() + "-" + (value.getMonth()+1) + "-" + value.getDate() + "T" +
                value.getHours() + ":" + value.getMinutes() + ":" + value.getSeconds() + "." +
                value.getMilliseconds() + "UTC";
            this.json[key]["$lt"] = {"type": "Date", "iso": iso};
        } else {
            this.json[key]["$lt"] = value;
        }
    };

    objectStorage.Query.prototype.lessThanOrEqualTo= function(key, value) {
        if (!key || typeof key != "string")
            throw new Error("First argument of 'lessThanOrEqualTo' method must be a valid string.");
        if (!(key in this.json) || (typeof this.json[key] == "string")) this.json[key] = {};
        if (value instanceof Date) {
            var iso = value.getFullYear() + "-" + (value.getMonth()+1) + "-" + value.getDate() + "T" +
                value.getHours() + ":" + value.getMinutes() + ":" + value.getSeconds() + "." +
                value.getMilliseconds() + "UTC";
            this.json[key]["$lte"] = {"type": "Date", "iso": iso};
        } else {
            this.json[key]["$lte"] = value;
        }
    };

    objectStorage.Query.prototype.greaterThanOrEqualTo= function(key, value) {
        if (!key || typeof key != "string")
            throw new Error("First argument of 'greaterThanOrEqualTo' method must be a valid string.");
        if (!(key in this.json) || (typeof this.json[key] == "string")) this.json[key] = {};
        if (value instanceof Date) {
            var iso = value.getFullYear() + "-" + (value.getMonth()+1) + "-" + value.getDate() + "T" +
                value.getHours() + ":" + value.getMinutes() + ":" + value.getSeconds() + "." +
                value.getMilliseconds() + "UTC";
            this.json[key]["$gte"] = {"type": "Date", "iso": iso};
        } else {
            this.json[key]["$gte"] = value;
        }
    };

    objectStorage.Query.prototype.containedIn= function(key, value) {
        if (!key || typeof key != "string")
            throw new Error("First argument of 'containedIn' method must be a valid string.");
        if (!(Array.isArray(value)))
            throw new Error("Second argument of 'containedIn' method must be an array.");
        if (!(key in this.json) || (typeof this.json[key] == "string")) this.json[key] = {};
        this.json[key]["$in"] = value;
    };

    objectStorage.Query.prototype.notContainedIn= function(key, value) {
        if (!key || typeof key != "string")
            throw new Error("First argument of 'notContainedIn' method must be a valid string.");
        if (!(Array.isArray(value)))
            throw new Error("Second argument of 'notContainedIn' method must be an array.");
        if (!(key in this.json) || (typeof this.json[key] == "string")) this.json[key] = {};
        this.json[key]["$nin"] = value;
    };

    objectStorage.Query.prototype.limit= function(num) {
        if ((typeof num != "number"))
            throw new Error("First argument of 'limit' method must be a number.");
        if (num<=0)
            throw new Error("First argument of 'limit' method must be greater than 0.");
        if (num>1000)
            throw new Error("First argument of 'limit' method must be less than or equal 1000.");
        this.params["limit"] = num;
    };

    objectStorage.Query.prototype.skip= function(num) {
        if ((typeof num != "number"))
            throw new Error("First argument of 'skip' method must be a number.");
        if (num<0)
            throw new Error("First argument of 'skip' method must greater than or equal 0.");
        this.params["skip"] = num;
    };

    objectStorage.Query.prototype.ascending= function(attr) {
        if (!attr || (typeof attr != "string"))
            throw new Error("First argument of 'ascending' method must be a string.");
        this.params["order"] = attr;
    };

    objectStorage.Query.prototype.descending= function(attr) {
        if (!attr || (typeof attr != "string"))
            throw new Error("First argument of 'descending' method must be a string.");
        this.params["order"] = "-" + attr;
    };

    objectStorage.Query.prototype.exists= function(attr) {
        if (!attr || (typeof attr != "string"))
            throw new Error("First argument of 'exists' method must be a string.");
        if (!(attr in this.json) || (typeof this.json[attr] == "string")) this.json[attr] = {};
        this.json[attr]["$exists"] = true;
    };

    objectStorage.Query.prototype.doesNotExist= function(attr) {
        if (!attr || (typeof attr != "string"))
            throw new Error("First argument of 'doesNotExist' method must be a string.");
        if (!(attr in this.json) || (typeof this.json[attr] == "string")) this.json[attr] = {};
        this.json[attr]["$exists"] = false;
    };

    objectStorage.Query.prototype.matchesKeyInQuery= function(key1, key2, innerQuery) {
        if (!key1 || typeof key1 != "string")
            throw new Error("First argument of 'matchesKeyInQuery' method must be a valid string.");
        if (!key2 || (typeof key2 != "string"))
            throw new Error("Second argument of 'matchesKeyInQuery' method must be a string.");
        if (!innerQuery || !(innerQuery instanceof objectStorage.Query))
            throw new Error("Third argument of 'matchesKeyInQuery' method must be an instance of Backtory.Query class.");
        if (!(key1 in this.json) || (typeof this.json[key1] == "string")) this.json[key1] = {};
        this.json[key1]["$select"] = {
            "query": {
                "className": innerQuery.targetClass.prototype.className,
                "where": innerQuery.json
             },
            "key": key2
        }
    };

    objectStorage.Query.prototype.doesNotMatchKeyInQuery= function(key1, key2, innerQuery) {
        if (!key1 || (typeof key1 != "string"))
            throw new Error("First argument of 'doesNotMatchKeyInQuery' method must be a valid string.");
        if (!key2 || (typeof key2 != "string"))
            throw new Error("Second argument of 'doesNotMatchKeyInQuery' method must be a valid string.");
        if (!innerQuery || !(innerQuery instanceof objectStorage.Query))
            throw new Error("Third argument of 'doesNotMatchKeyInQuery' method must be an instance of Backtory.Query class.");
        if (!(key1 in this.json) || (typeof this.json[key1] == "string")) this.json[key1] = {};
        this.json[key1]["$dontSelect"] = {
            "query": {
                "className": innerQuery.targetClass.prototype.className,
                 "where": innerQuery.json
            },
            "key": key2
        }
    };

    objectStorage.Query.prototype.matchesQuery= function(key, innerQuery) {
        if (!key || typeof key != "string")
            throw new Error("First argument of 'matchesQuery' method must be a valid string.");
        if (!(innerQuery instanceof objectStorage.Query))
            throw new Error("Second argument of 'matchesQuery' method must be an instance of Backtory.Query class.");
        if (!(key in this.json) || (typeof this.json[key] == "string")) this.json[key] = {};
        this.json[key]["$inQuery"] = {
            "where":innerQuery.json, "className": innerQuery.targetClass.prototype.className
        };
    };

    objectStorage.Query.prototype.doesNotMatchQuery= function(key, innerQuery) {
        if (!key || typeof key != "string")
            throw new Error("First argument of 'doesNotMatchQuery' method must be a valid string.");
        if (!(innerQuery instanceof objectStorage.Query))
            throw new Error("Second argument of 'doesNotMatchQuery' method must be an instance of Backtory.Query class.");
        if (!(key in this.json) || (typeof this.json[key] == "string")) this.json[key] = {};
        this.json[key]["$notInQuery"] = {
            "where":innerQuery.json, "className": innerQuery.targetClass.prototype.className
        };
    };

    objectStorage.Query.prototype.select= function() {
        if (arguments.length != 0) {
            var flag = 0;
            var keys = "";
            for (var key in arguments) {
                if (((typeof arguments[key]) != "string") || (arguments[key] == "")) {
                    throw new Error("You must specify a list of valid string values for 'select' method.")
                } else {
                    keys += arguments[key];
                    if (key != arguments.length -1) {
                        keys += ",";
                    }
                }
            }
            if ("keys" in this.params && this.params["keys"] && this.params["keys"] != "") {
                this.params['keys'] = this.params['keys'] + "," + keys;
            } else {
                this.params["keys"] = keys;
            }
        } else {
            throw new Error("You must specify at least one argument for 'select' method.");
        }
    };

    objectStorage.Query.prototype.include= function() {
        if (arguments.length != 0) {
            var keys = "";
            for (var key in arguments) {
                if (typeof arguments[key] != "string" || !arguments[key]) {
                    throw new Error("You must specify a list of valid string values for 'include' method.")
                } else {
                    keys += arguments[key];
                    if (key != arguments.length-1) {
                        keys += ",";
                    }
                }
            }
            if ("include" in this.params && this.params["include"] && this.params["include"] != "") {
                this.params['include'] = this.params['include'] + "," + keys;
            } else {
                this.params["include"] = keys;
            }
        } else {
            throw new Error("You must specify at least one argument for 'include' method.");
        }
    };

    objectStorage.Query.prototype.containsAll= function(key, value) {
        if (!key || typeof key != "string")
            throw new Error("First argument of 'containsAll' method must be a valid string.");
        if (!(Array.isArray(value)))
            throw new Error("Second argument of 'containsAll' method must be an array.");
        if (!(key in this.json) || (typeof this.json[key] == "string")) this.json[key] = {};
        this.json[key]["$all"] = value;
    };

    objectStorage.Query.prototype.startsWith= function(key, value) {
        if (!key || typeof key != "string")
            throw new Error("First argument of 'startsWith' method must be a valid string.");
        if (typeof value != "string")
            throw new Error("Second argument of 'startsWith' method must be a string.");
        if (!(key in this.json) || (typeof this.json[key] == "string")) this.json[key] = {};
        this.json[key]["$regex"] = "^" + value;
    };

    objectStorage.Query.prototype.regex= function(key, value) {
        if (!key || typeof key != "string")
            throw new Error("First argument of 'regex' method must be a valid string.");
        if (typeof value != "string")
            throw new Error("Second argument of 'regex' method must be a string.");
        if (!(key in this.json) || (typeof this.json[key] == "string")) this.json[key] = {};
        this.json[key]["$regex"] = value;
    };

    objectStorage.Query.prototype.contains= function(key, value) {
        if (!key || typeof key != "string")
            throw new Error("First argument of 'contains' method must be a valid string.");
        if (typeof value != "string")
            throw new Error("Second argument of 'contains' method must be a string.");
        if (!(key in this.json) || (typeof this.json[key] == "string")) this.json[key] = {};
        this.json[key]["$regex"] = value;
    };

    objectStorage.Query.prototype.find= function(options) {
        var query = this;
        objectStorage.common.getInstance("database", function (objectStorageInstanceId) {
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
        var params = {"count": 1, "limit": 1};
        var json = query.json;
        objectStorage.common.getInstance("database", function (objectStorageInstanceId) {
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
            throw new Error("You must specify at least 2 queries as arguments of 'Query.or' method.");
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

    objectStorage.Query.prototype.get = function(id, options) {
        if (!id || typeof id != "string")
            throw new Error("First argument of 'get' method (id) must be a valid string.");
        this.equalTo("_id", id);
        this.limit(1);
        this.find({
            success: function(list) {
                if (options && options.success) {
                    options.success(list[0]);
                }
            },
            error: function(error) {
                if (options && options.error) {
                    options.error(error);
                }
            }
        });
    };
};


