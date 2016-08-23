/**
 * Created by majeed on 4/23/16.
 */

var chai = require('chai');
var should = require('chai').should();
var Backtory = require("./../index.js");
Backtory.setConfigFileLocation(__dirname + "/integrationInfoTest.json");

describe('test cloud code', function() {
    this.timeout(20000);

    it('test a function', function (done) {
        var func = new Backtory.Function("mashang");
        func.run({"event": "salam"}, {
            success: function(response, requestId) {
                console.log(response);
                console.log(requestId);
                done();
            }
        })
    });
});