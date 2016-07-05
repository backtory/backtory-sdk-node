var utils = module.exports = {

    castAfterFetchQuery: function (Object, Relation, targetObjectClassName, listOfObjects, registeredClasses) {
      for (var index=0; index<listOfObjects.length; index+=1) {
          listOfObjects[index] = utils.castAfterFetchObject(Object, Relation, targetObjectClassName, listOfObjects[index], registeredClasses);
      }
    },

    // this method is responsible for casting json to backbone model or registered classes
    castAfterFetchObject: function (Object, Relation, className, model, registeredClasses) {

        if (model && model instanceof Object) {
        }
        else {
            var className = model["className"] || className;
            delete model['className'];
            delete model['__type'];
            try {
                model = new registeredClasses[className](model);
            } catch (err) {
                model = new Object(model);
                model.className = className;
            }
            //delete model['cid'];
            delete model['id'];
        }

        var hasChildrenToFix = false;
        for (var key in model.attributes) {
            if (isPointer(model.get(key))) {
                hasChildrenToFix = true;
                break;
            } else if (isRelation(model.get(key))) {
                hasChildrenToFix = true;
                break;
            }
        }
        if (hasChildrenToFix == false) {
            return model;
        }

        for (var key in model.attributes) {
            //if (isDate(model.get(key))) {
            //    model.__sync_set(key, new Date(model.get(key).replace("UTC", "Z")), {silent: true});
            //}
            //else
            if (isPointer(model.get(key))) {
                var x = utils.castAfterFetchObject(Object, Relation, undefined, model.get(key), registeredClasses);
                model.__sync_set(key, x, {silent: true});
                //x['__parent'] = model;
            } else if (isRelation(model.get(key))) {
                var list = model.get(key);
                var relatedList = new Relation();
                delete relatedList['cid'];
                relatedList.__sync_set("values", list, {silent: true});
                model.__sync_set(key, relatedList, {silent: true});
                for (var index = 0; index < list.length; index += 1) {
                    if (isPointer(list[index])) {
                        model.get(key).get("values")[index] = utils.castAfterFetchObject(Object, Relation, undefined, list[index], registeredClasses);
                    }
                }
            }
        }
        return model;
    },

    castBeforeCreate: function (Object, Relation, model) {
        var json = {};
        for (var key in model.attributes) {
            if (model.get(key) instanceof Object) {
                json[key] = {
                    "_id": model.get(key).get("_id"),
                    "__type": "Pointer",
                    "className": model.get(key).className
                }
            } else if (model._changedAttributes[key] instanceof Date) {
                json[key] = {
                    "__type": "Date",
                    "iso": model._changedAttributes[key].toISOString().replace("Z", "UTC")
                }
            } else if (model.get(key) instanceof Relation) {
                // todo
            } else {
                if ((key != "createdAt") && (key != "_done") && (key != "updatedAt") && (key != "_id")) {
                    json[key] = model.get(key);
                }
            }
        }
        return json;
    },

    castBeforeUpdate: function (Object, Relation, model) {
        var json = {};
        for (var key in model._changedAttributes) {
            if (model._changedAttributes[key] instanceof Object) {
                json[key] = {
                    "_id": model.get(key).get("_id"),
                    "__type": "Pointer",
                    "className": model._changedAttributes[key].className
                }
            } else if (model._changedAttributes[key] instanceof Date) {
                json[key] = {
                    "__type": "Date",
                    "iso": model._changedAttributes[key].toISOString().replace("Z", "UTC")
                }
            } else if (model._changedAttributes[key] instanceof Relation) {
                // todo
            } else {
                if ((key != "createdAt") && (key != "_done") && (key != "updatedAt") && (key != "_id")) {
                    json[key] = model._changedAttributes[key];
                }
            }
        }
        return json;
    },

    clearAfterCreate: function (Object, Relation, model) {
        if (model.has("_done")) model.unset("_done", { silent: true });
        for (var key in model.attributes) {
            if (model.get(key) instanceof Object)
                utils.clearAfterCreate(Object, Relation, model.get(key));
            else if (model.get(key) instanceof Relation) {
                var relation = model.get(key);
                relation._removedRelations = {};
                relation._addedRelations = {};
                if (relation.has("_done")){
                    relation.unset("_done", {silent: true});
                }
                for (var index=0; index<relation.size(); index+=1){
                    utils.clearAfterCreate(Object, Relation, relation.getByIndex(index));
                }
            }
        }
    }
};

//var isPointer = function(model) {
//    return (((typeof model)=="object") && "className" in model && "__type" in model && model["__type"] == "Pointer");
//};

var isPointer = function(model) {
    return ((model != null) && ((typeof model)=="object") && "className" in model && "__type" in model && ((model["__type"] == "Pointer") || (model["__type"] == "Object")));
};

var isRelation = function(model) {
    return ((model != null) && model instanceof Array && model.length > 0 && isPointer(model[0]));
};

var isDate = function(model) {
    return ((model != null) && ((typeof model)=="object") && "iso" in model && "__type" in model && (model["__type"] == "Date"));
};



