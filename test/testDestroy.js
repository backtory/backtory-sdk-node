var should = require('chai').should();
var Backtory = require("./../index.js");

//Backtory.setConfigFileLocation(__dirname + "/integrationInfoTest.json");


describe('test destroy', function() {
    this.timeout(20000);

    it('destroy after create', function (done) {
        var Test = Backtory.Object.extend("test");
        var test = new Test();
        test.set("content", "salam");
        test.save({
            success: function (testCreated) {
                var id = testCreated.get("_id");
                testCreated.destroy({
                    success: function () {
                        testCreated.fetch({
                            error: function(reason) {
                                console.log(reason);
                                done();
                            }
                        });
                    }, error: function(error) {
                        console.log(error);
                        "1".should.be.equal("2");
                    }
                });
            }
        });
    });

});