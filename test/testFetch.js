/**
 * Created by majeed on 4/23/16.
 */

var chai = require('chai');
var should = require('chai').should();
var Backtory = require("./../index.js");
//Backtory.setConfigFileLocation(__dirname + "/integrationInfoTest.json");

describe('fetch model', function() {
    this.timeout(20000);

    it('fetch a simple object', function (done) {
        var Test = Backtory.Object.extend("test");
        var test = new Test();
        test.set("_id", "57404d1aadbe1d000146dafd");
        test.fetch({
            success: function (fetched) {
                console.log(fetched);
                fetched.should.be.instanceof(Backtory.Object);
                fetched.should.be.instanceof(Test);
                done();
            },
            error: function(error) {
                console.log(error);
                "1".should.equal("2");
            }
        });
    });

    it('fetch an object without _id attribute', function (done) {
        var Test = Backtory.Object.extend("test");
        var test = new Test();
        test.fetch({
            error: function(error) {
                error.code.should.equal(104);
                done();
            }
        });
    });

    it('fetch an object with wrong _id attribute', function (done) {
        var Test = Backtory.Object.extend("test");
        var test = new Test();
        test.set("_id", "123");
        test.fetch({
            error: function(error) {
                console.log(error);
                error.responseCode.should.equal(400);
                done();
            }
        });
    });

    it('fetch an object with multiple pointers', function (done) {
        var Post = Backtory.Object.extend("Post");
        var Comment = Backtory.Object.extend("Comment");
        var Vote = Backtory.Object.extend("Vote");
        var vote = new Vote();
        vote.set("_id", "574ac1523cdea200018d4b81");
        vote.fetch({
            success: function (fetched) {
                fetched.should.be.instanceof(Vote);
                fetched.get("comment").should.be.instanceof(Backtory.Object);

                fetched.get("comment").fetch({
                    success: function (fetched) {
                        fetched.get("post").should.be.instanceof(Backtory.Object);
                        fetched.get("post").should.not.be.instanceof(Post);
                        done();
                    }
                });
            },
            error: function(error) {
                console.log(error);
                "1".should.equal("2");
            }
        });
    });

    it('fetch an object with relations', function (done) {
        var Comment = Backtory.Object.extend("Comment");
        var Vote = Backtory.Object.extend("Vote");
        var Voter = Backtory.Object.extend("Voter");
        Backtory.Object.registerSubclass("Voter", Voter);
        Backtory.Object.registerSubclass("Comment", Comment);
        Backtory.Object.registerSubclass("Vote", Vote);
        var voter = new Voter();
        voter.set("_id", "574ac82c3cdea200018d4b83");
        voter.fetch({
            success: function (fetched) {
                fetched.should.be.instanceof(Voter);
                fetched.get("votes").should.be.instanceof(Backtory.Relation);
                fetched.relation("votes").should.be.instanceof(Backtory.Relation);
                fetched.relation("votes").getById("574ac8c13cdea200018d4b84");
                fetched.relation("votes").getByIndex(0).fetch({
                   success: function(fetched) {
                       fetched.get("comment").should.be.instanceof(Comment);
                       done();
                   }
                });
            },
            error: function(error) {
                console.log(error);
                "1".should.equal("2");
            }
        });
    });
});