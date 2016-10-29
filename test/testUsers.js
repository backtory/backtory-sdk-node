/**
 * Created by majeed on 4/23/16.
 */

var chai = require('chai');
var should = require('chai').should();
var Backtory = require("./../index.js");
//Backtory.setConfigFileLocation(__dirname + "/integrationInfoTest.json");

describe('auth', function() {
    this.timeout(20000);

    it('test signUp', function (done) {
        var userInfo = {
            "firstName": "majidam",
            "lastName": "majidam",
            "email": "majid2@am.com",
            "password": "majidam",
            "username": "majida2m"
        };
        //Backtory.Users.signUp(userInfo, {
        //    success: function(userInfo) {
        //        ("userId" in userInfo).should.equal(true);
        //        done();
        //    },
        //    error: function(error) {
        //        //console.log(error);
        //        done();
        //    }
        //})
        Backtory.Users.signUpAsync(userInfo).then(function() {
            ("userId" in userInfo).should.equal(true);
            done();
        }).catch(function(e) {
            console.log("error="+ JSON.stringify(e));
            done();
        });
    });

    it('test update', function (done) {
        var userInfo = {
            "firstName": "majidam1111111",
            "lastName": "majidam11111111",
            "username": "majida2m11111111"
        };
        Backtory.Users.update("57629c38e4b0ad38567f88e0", userInfo, {
            success: function(userInfo) {
                ("userId" in userInfo).should.equal(true);
                console.log(userInfo);
                done();
            },
            error: function(error) {
                console.log(error);
                "1".should.equal("2");
            }
        })
    });

    it('test search', function (done) {
        Backtory.Users.search("a", 1, 1, {
            success: function(users) {
                users.should.be.instanceof(Array);
                done();
            },
            error: function(error) {
                console.log(error);
                "1".should.equal("2");
            }
        })
    });

    it('test search by userId', function (done) {
        Backtory.Users.getByUserId("57596532e4b05a176d5bb52d", {
            success: function(user) {
                console.log(user);
                user.email.should.equal("mobini.majid@gmail.com");
                done();
            },
            error: function(error) {
                console.log(error);
                "1".should.equal("2");
            }
        })
    });

    it('test search by userIds', function (done) {
        Backtory.Users.getByUserIds(["57596532e4b05a176d5bb52d"], {
            success: function(user) {
                console.log(user);
                done();
            },
            error: function(error) {
                console.log(error);
                "1".should.equal("2");
            }
        })
    });

    it('delete user', function (done) {
        Backtory.Users.delete("57629904e4b0ad38567f88de", {
            error: function() {
                done();
            }
        })
    });

    it('test search by username', function (done) {
        Backtory.Users.getByUserName("majid1", {
            success: function(user) {
                console.log(user);
                user.email.should.equal("mobini.majid@gmail.com");
                done();
            },
            error: function(error) {
                console.log(error);
                "1".should.equal("2");
            }
        })
    });

    it('test count', function (done) {
        Backtory.Users.count({
            success: function(count) {
                (typeof count == "number").should.equal(true);
                console.log(count);
                done();
            },
            error: function(error) {
                console.log(error);
                "1".should.equal("2");
            }
        })
    });

    it('test guest signUp and complete', function (done) {
        Backtory.Users.guestSignUp({
            success: function(userInfo) {
                console.log(userInfo);
                ("id" in userInfo).should.equal(true);
                ("username" in userInfo).should.equal(true);
                ("password" in userInfo).should.equal(true);
                var userInfo = {
                    "userId": userInfo.id,
                    "newUsername": "guestammmm",
                    "lastPassword": userInfo.password,
                    "newPassword": userInfo.password,
                    "firstName": "majidam1111sddsa111111",
                    "lastName": "majidam11111dsasad11111111",
                    "email": "majidam1111111111111@gmail.com"
                };
                Backtory.Users.completeGuestRegistration(userInfo, {
                   success: function(userInfo) {
                       console.log(userInfo);
                       "1".should.equal("2");
                   },
                    error: function(error) {
                        console.log(error);
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