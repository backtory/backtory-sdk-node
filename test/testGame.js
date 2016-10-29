/**
 * Created by majeed on 4/23/16.
 */

var chai = require('chai');
var should = require('chai').should();
var Backtory = require("./../index.js");
//Backtory.setConfigFileLocation(__dirname + "/integrationInfoTest.json");

describe('event and leaderboard', function() {
    this.timeout(20000);

    it('test send an event', function (done) {
        var event = new Backtory.Event("event1");
        event.add("field1", 25);
        event.sendFromUser("57591f91e4b05a176d5bb52a", {
            success: function() {
                done();
            },
            error: function(error) {
                console.log(error);
                "1".should.equal("2");
            }
        })

    });

    it('test leaderboard rank', function (done) {
        var leaderboard = new Backtory.LeaderBoard("57591f45e4b0a77c8c92b7a2");
        leaderboard.getUserRank("57404048e4b0b9378c0272d3", {
            success: function(rank, scores) {
                console.log(rank, scores);
                scores[0].should.equal(500);
                done();
            },
            error: function(error) {
                console.log(error);
                "1".should.equal("2");
            }
        });
    });

    it('test leaderboard top', function (done) {
        var leaderboard = new Backtory.LeaderBoard("57591f45e4b0a77c8c92b7a2");
        leaderboard.getTopUsers(2, {
            success: function(tops) {
                tops.usersProfile.length.should.equal(2);
                done();
            },
            error: function(error) {
                console.log(error);
                "1".should.equal("2");
            }
        });
    });

    it('test leaderboard top with pagination', function (done) {
        var leaderboard = new Backtory.LeaderBoard("57591f45e4b0a77c8c92b7a2");
        leaderboard.getTopUsersWithPagination(0, 2, {
            success: function(tops) {
                tops.usersProfile.length.should.be.equal(2);
                done();
            },
            error: function(error) {
                console.log(error);
                "1".should.equal("2");
            }
        });
    });

    it('test get my leaderboards', function (done) {
        Backtory.Game.getUserLeaderBoards("57404048e4b0b9378c0272d3", {
            success: function(leaderboards) {
                console.log(leaderboards);
                done();
            },
            error: function(error) {
                console.log(error);
                "1".should.equal("2");
            }
        });
    });

    it('test get users scores', function (done) {
        var leaderboard = new Backtory.LeaderBoard("57591f45e4b0a77c8c92b7a2");
        leaderboard.getUsersScore(["57404048e4b0b9378c0272d3"], {
            success: function(leaderboards) {
                console.log(leaderboards);
                leaderboards[0].userId.should.be.equal("57404048e4b0b9378c0272d3");
                done();
            },
            error: function(error) {
                console.log(error);
                "1".should.equal("2");
            }
        });
    });

    it('test leaderboard around user', function (done) {
        var leaderboard = new Backtory.LeaderBoard("57591f45e4b0a77c8c92b7a2");
        leaderboard.getAroundUser("57404048e4b0b9378c0272d3", 2, {
            success: function(arounds) {
                console.log(JSON.stringify(arounds, null, 4));
                done();
            },
            error: function(error) {
                console.log(error);
                "1".should.equal("2");
            }
        });
    });

    it('test update scores', function (done) {
        var leaderboard = new Backtory.LeaderBoard("57591f45e4b0a77c8c92b7a2");
        leaderboard.updateScore("57404048e4b0b9378c0272d3", [500, 400, 300], {
            success: function(response) {

                leaderboard.getUsersScore(["57404048e4b0b9378c0272d3"], {
                    success: function(leaderboards) {
                        leaderboards[0].scores[0].should.be.equal(500);
                        leaderboards[0].scores[1].should.be.equal(400);
                        leaderboards[0].scores[2].should.be.equal(300);
                        done();
                    },
                    error: function(error) {
                        console.log(error);
                        "1".should.equal("2");
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