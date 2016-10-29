var chai = require('chai');
var should = require('chai').should();
var Backtory = require("./../index.js");
//Backtory.setConfigFileLocation(__dirname + "/integrationInfoTest.json");


describe('test save', function() {
    this.timeout(20000);

    it('test save and remove relation', function (done) {
        var Voter = Backtory.Object.extend("Voter");
        var Vote = Backtory.Object.extend("Vote");
        var voter = new Voter();
        voter.set("_id", "5780baa83e068e0001cf234a");
        voter.fetch({
            success: function (fetched) {
                console.log(fetched);
                var votes = fetched.relation("votes");
                votes.remove(votes.getByIndex(0));
                votes.remove(votes.getByIndex(1));
                var vote1 = new Vote();
                vote1.set("content", "hahaha 11");
                votes.add(vote1);
                var vote2 = new Vote();
                vote2.set("content", "hahaha 22");
                votes.add(vote2);
                fetched.save({
                    success: function(saved) {
                        console.log(saved);
                        done();
                    },
                    error: function(error) {
                        console.log(error);
                        "1".should.equal("2");
                    }
                });
            }
        });
    });

});