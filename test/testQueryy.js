/**
 * Created by majeed on 4/23/16.
 */

var chai = require('chai');
var should = require('chai').should();
var Backtory = require("./../index.js");
//Backtory.setConfigFileLocation("/home/majeed/Workspace/IdeaProjects/javascript/test/integrationInfo3.json");


describe('query', function() {
    this.timeout(20000);

    it('check limit', function (done) {
        var Test = Backtory.Object.extend("test");
        var query = new Backtory.Query(Test);
        query.limit(13);
        query.find({
            success: function (list) {
                list[0].should.be.instanceof(Test);
                list.length.should.equal(13);
                done()
            },
            error: function(error) {
                console.log(error);
                "1".should.equal("2");
            }
        })
    });

    it('check cast', function (done) {
        var Comment = Backtory.Object.extend("Comment");
        var Post = Backtory.Object.extend("Post");
        Backtory.Object.registerSubclass("Comment", Comment);
        Backtory.Object.registerSubclass("Post", Post);
        var query = new Backtory.Query(Comment);
        query.limit(1);
        query.find({
            success: function (list) {
                console.log(list);
                list[0].should.be.instanceof(Comment);
                list[0].get("post").should.be.instanceof(Post);
                done()
            },
            error: function(error) {
                console.log(error);
                "1".should.equal("2");
            }
        })
    });

    // in case of include doesn't return className so i cant cast.
    // cast if _id available ???
    it('check include', function (done) {
        var Comment = Backtory.Object.extend("Comment");
        var Post = Backtory.Object.extend("Post");
        Backtory.Object.registerSubclass("Comment", Comment);
        Backtory.Object.registerSubclass("Post", Post);
        var query = new Backtory.Query(Comment);
        query.limit(1);
        query.include("post");
        query.find({
            success: function (list) {
                list[0].should.be.instanceof(Comment);
                list[0].get("post").should.be.instanceof(Post);
                (list[0].get("post").has("createdAt")).should.equal(true);
                done()
            },
            error: function(error) {
                console.log(error);
                "1".should.equal("2");
            }
        })
    });

    it('check greater than or equal', function (done) {
        var Test = Backtory.Object.extend("test3");
        var query = new Backtory.Query(Test);
        query.greaterThanOrEqualTo("num", 4);
        query.find({
            success: function (list) {
                list.length.should.equal(2);
                done()
            },
            error: function(error) {
                console.log(error);
                "1".should.equal("2");
            }
        })
    });

    it('check less', function (done) {
        var Test = Backtory.Object.extend("test3");
        var query = new Backtory.Query(Test);
        query.lessThan("num", 3);
        query.find({
            success: function (list) {
                list.length.should.equal(2);
                done()
            },
            error: function(error) {
                console.log(error);
                "1".should.equal("2");
            }
        })
    });

    it('check notEqualTo', function (done) {
        var Test = Backtory.Object.extend("test3");
        var query = new Backtory.Query(Test);
        query.notEqualTo("num", 3);
        query.find({
            success: function (list) {
                list.length.should.equal(4);
                done()
            },
            error: function(error) {
                console.log(error);
                "1".should.equal("2");
            }
        })
    });

    it('check equalTo', function (done) {
        var Test = Backtory.Object.extend("test3");
        var query = new Backtory.Query(Test);
        query.equalTo("num", 3);
        query.find({
            success: function (list) {
                list.length.should.equal(1);
                done()
            },
            error: function(error) {
                console.log(error);
                "1".should.equal("2");
            }
        })
    });

    it('check ascending', function (done) {
        var Test = Backtory.Object.extend("test3");
        var query = new Backtory.Query(Test);
        query.ascending("num");
        query.find({
            success: function (list) {
                list[0].get("num").should.equal(1);
                done()
            },
            error: function(error) {
                console.log(error);
                "1".should.equal("2");
            }
        })
    });

    it('check containedIn', function (done) {
        var Test = Backtory.Object.extend("test3");
        var query = new Backtory.Query(Test);
        query.containedIn("num", [1, 2]);
        query.find({
            success: function (list) {
                list.length.should.equal(2);
                done()
            },
            error: function(error) {
                console.log(error);
                "1".should.equal("2");
            }
        })
    });

    it('check notContainedIn', function (done) {
        var Test = Backtory.Object.extend("test3");
        var query = new Backtory.Query(Test);
        query.notContainedIn("num", [1, 2]);
        query.find({
            success: function (list) {
                list.length.should.equal(3);
                done()
            },
            error: function(error) {
                console.log(error);
                "1".should.equal("2");
            }
        })
    });

    it('check containedIn and notContainedIn together', function (done) {
        var Test = Backtory.Object.extend("test3");
        var query = new Backtory.Query(Test);
        query.notContainedIn("num", [1, 2]);
        query.containedIn("num", [3, 2]);
        query.find({
            success: function (list) {
                list.length.should.equal(1);
                done()
            },
            error: function(error) {
                console.log(error);
                "1".should.equal("2");
            }
        })
    });

    it('check select', function (done) {
        var Comment = Backtory.Object.extend("Comment");
        var query = new Backtory.Query(Comment);
        query.select("_id");
        query.find({
            success: function (list) {
                list[0].should.be.instanceof(Comment);
                done()
            },
            error: function(error) {
                console.log(error);
                "1".should.equal("2");
            }
        })
    });

    it('check equal pointer', function (done) {
        var Comment = Backtory.Object.extend("Comment");
        var Post = Backtory.Object.extend("Post");
        var query = new Backtory.Query(Comment);
        var post = new Post();
        post.set("_id", "574b5ab63cdea200018d4c09");
        query.equalTo("post", post);
        query.descending("createdAt");
        query.find({
            success: function (list) {
                done()
            },
            error: function(error) {
                console.log(error);
                "1".should.equal("2");
            }
        })
    });

    it('check relation', function (done) {
        var Vote = Backtory.Object.extend("Vote");
        var Voter = Backtory.Object.extend("Voter");
        var query = new Backtory.Query(Vote);
        var voter = new Voter();
        voter.set("_id", "574c3129d20c2900018371ee");
        query.relatedTo("votes", voter);
        query.find({
            success: function (list) {
                list.length.should.equal(2);
                list[0].should.be.instanceof(Vote);
                done()
            },
            error: function(error) {
                console.log(error);
                "1".should.equal("2");
            }
        })
    });


    it('check count', function (done) {
        var x = Backtory.Object.extend("test");
        var query = new Backtory.Query(x);

        var Vote = Backtory.Object.extend("Vote");
        var Voter = Backtory.Object.extend("Voter");
        var query = new Backtory.Query(Vote);
        query.count({
            success: function (count) {
                console.log(count);
                done()
            },
            error: function(error) {
                console.log(error);
                "1".should.equal("2");
            }
        })
    });

    it('check query get', function (done) {
        var Test = Backtory.Object.extend("test");
        var query = new Backtory.Query(Test);
        query.get("57404d1aadbe1d000146dafd", {
            success: function (object) {
                console.log(object);
                object.should.be.instanceof(Test);
                done()
            },
            error: function(error) {
                console.log(error);
                "1".should.equal("2");
            }
        });
    });

});