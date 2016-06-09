var config = require('./../config');
var authRest = require('./rest/authRest');

var auth = module.exports = {
    common: null,

    init: function (common) {
        auth.common = common;
    },

    User: function User() {
        this.userName = "";
        this.lastName = "";
        this.userName = "";
        this.password = "";
        this.email = "";
    }

};

auth.User.prototype.setFirstName = function (firstName) {
    if ((typeof firstName != "string") || !(firstName)) {
        throw new Error("First name must be a valid string.")
    }
    this.firstName = firstName;
};

auth.User.prototype.setLastName = function (lastName) {
    if ((typeof lastName != "string") || !(lastName)) {
        throw new Error("Last name must be a valid string.")
    }
    this.lastName = lastName;
};

auth.User.prototype.setUserName = function (userName) {
    if ((typeof userName != "string") || !(userName)) {
        throw new Error("User name must be a valid string.")
    }
    this.userName = userName;
};

auth.User.prototype.setPassword = function (password) {
    if ((typeof password != "string") || !(password)) {
        throw new Error("Password must be a valid string.")
    }
    this.password = password;
};

auth.User.prototype.setEmail = function (email) {
    if ((typeof email != "string") || !(email)) {
        throw new Error("Email must be a valid string.")
    }
    this.email = email;
};

auth.User.prototype.signUp = function (options) {
    //todo check information of user valid
    var userInfo = {
        "firstName": this.firstName,
        "lastName": this.lastName,
        "username": this.userName,
        "password": this.password,
        "email": this.email
    };
    auth.common.getInstance("auth", function (authInstanceId) {
        authRest.signUp(authInstanceId, userInfo, {
            success: function(userInfo) {
                if (options && options.success) {
                    options.success(userInfo);
                }
            },
            error: function(error) {
                if (options && options.error) options.error(error);
            }
        });
    });

};
