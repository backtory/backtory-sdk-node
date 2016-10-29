/**
 * Created by majeed on 4/23/16.
 */

var chai = require('chai');
var should = require('chai').should();
var Backtory = require("./../index.js");
//Backtory.setConfigFileLocation(__dirname + "/integrationInfoTest.json");


describe('test relations', function() {
    this.timeout(20000);

    it('simple test', function (done) {
        var Player = Backtory.Object.extend("Player");
        var query = new Backtory.Query(Player);
        query.get("576b97dd3e068e00011c64d8", {
            success: function (object) {
                console.log(JSON.stringify(object, null, 4));
                done()
            },
            error: function(error) {
                console.log(error);
                "1".should.equal("2");
            }
        })
    });

    it('test relation', function (done) {
        var Player = Backtory.Object.extend("Player");
        var query = new Backtory.Query(Player);
        //query.equalTo("weaponArray", "m4");
        //query.containedIn("weaponArray", ["m41dsadsa", "klashinkof"]);
        query.json = {
            "weaponRelation": [
                {
                    "_id": "576b99283e068e00011c64da",
                    "__type": "Pointer",
                    "className": "Weapon"
                }
            ]
        };
        query.find({
            success: function (object) {
                console.log(JSON.stringify(object, null, 4));
                done()
            },
            error: function(error) {
                console.log(JSON.stringify(error, null, 4));
                done();
            }
        })
    });

});