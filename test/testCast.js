/**
 * Created by majeed on 4/23/16.
 */

var chai = require('chai');
var should = require('chai').should();
var Backtory = require("./../index");
var Object = Backtory.Object;
var Relation = Backtory.Relation;
var castAfterFetch = require("./../lib/storage/utils/cast").castAfterFetchObject;

//Backtory.setConfigFileLocation(__dirname + "/integrationInfoTest.json");

describe('cast after fetch', function() {

    it('cast with pointer and relation', function (done) {
        var json = {
            "_id": "032132",
            "content": "im a comment",
            "user": {
                "_id": "123",
                "className": "User",
                "__type": "Pointer"
            },
            "posts": [
                {
                    "_id": "456",
                    "className": "Post",
                    "__type": "Pointer"
                }
            ]
        };
        var registeredClasses = [];
        var model = castAfterFetch(Object, Relation, "Comment", json, registeredClasses);
        model.should.hasOwnProperty("content");
        model.should.hasOwnProperty("user");
        model.should.hasOwnProperty("posts");
        model.should.be.instanceof(Object);
        model.get("user").should.be.instanceof(Object);
        model.get("posts").should.be.instanceof(Relation);
        model.get("posts").getByIndex(0).should.be.instanceof(Object);
        done();
    });


    it('cast with registered classes', function (done) {
        var json = {
            "_id": "032132",
            "content": "im a comment",
            "user": {
                "_id": "123",
                "className": "User",
                "__type": "Pointer"
            },
            "posts": [
                {
                    "_id": "41156",
                    "className": "Post",
                    "__type": "Pointer"
                },
                {
                    "_id": "45161",
                    "className": "Post",
                    "__type": "Pointer"
                },
                {
                    "_id": "41526",
                    "className": "Post",
                    "__type": "Pointer"
                }
            ]
        };
        var User = Object.extend("User");
        var Post = Object.extend("Post");
        var registeredClasses = {"User": User, "Post": Post};
        var model = castAfterFetch(Object, Relation, "Comment", json, registeredClasses);
        model.should.hasOwnProperty("content");
        model.should.hasOwnProperty("user");
        model.should.hasOwnProperty("posts");
        model.should.be.instanceof(Object);
        model.get("user").should.be.instanceof(User);
        model.get("posts").should.be.instanceof(Relation);
        model.get("posts").getByIndex(0).should.be.instanceof(Post);
        model.get("posts").getByIndex(2).should.be.instanceof(Post);
        done();
    });


    it('cast big object', function (done) {
        var json = {
            "_id": "032132",
            "content": "im a comment",
            "user": {
                "_id": "123",
                "className": "User",
                "__type": "Pointer"
            },
            "sampleArray": [
                {"x": 123}, "salam", 23
            ]
        };
        var registeredClasses = {};
        var model = castAfterFetch(Object, Relation, "Comment", json, registeredClasses);

        model.should.hasOwnProperty("content");
        model.should.hasOwnProperty("user");
        model.should.hasOwnProperty("sampleArray");
        model.should.be.instanceof(Object);
        model.get("sampleArray").should.be.instanceof(Array);
        model.get("sampleArray").should.have.lengthOf(3);
        model.get("sampleArray")[0].should.not.be.instanceof(Object);
        done();
    });

    it('cast empty object', function (done) {
        var json = {
            "_id": "032132"
        };
        var registeredClasses = {};
        var model = castAfterFetch(Object, Relation, "Comment", json, registeredClasses);

        model.should.be.instanceof(Object);
        done();
    });


});