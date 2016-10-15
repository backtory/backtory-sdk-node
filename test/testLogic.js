var should = require('chai').should();
var Backtory = require("./../index.js");
//Backtory.setConfigFileLocation(__dirname + "/integrationInfoTest.json");

describe('logic in model', function() {

    it('monster example', function (done) {
        var Monster = Backtory.Object.extend("Monster", {
            hasSuperHumanStrength: function () {
                return this.get("strength") > 18;
            },
            initialize: function (attrs, options) {
                this.set("sound", "Rawr");
            }
        },
        {
            // Class methods
            spawn: function(strength) {
                var monster = new Monster();
                monster.set("strength", strength);
                return monster;
            }
        });
        var monster = Monster.spawn(200);
        monster.should.be.instanceof(Monster);
        monster.get("strength").should.equal(200);
        monster.get("sound").should.equal("Rawr");
        monster.hasSuperHumanStrength().should.equal(true);
        done();
    });

});