var Promise = require("bluebird");

var authPromisified = module.exports = function (auth) {

    auth.Users.signUpAsync = function(userInfo) {
        var that = this;
        return new Promise(function(resolve, reject) {
            auth.Users.signUp.call(that, userInfo, {"success": resolve, "error": reject});
        });
    };

    auth.Users.guestSignUpAsync = function() {
        var that = this;
        return new Promise(function(resolve, reject) {
            auth.Users.guestSignUp({"success": resolve, "error": reject});
        });
    };

    auth.Users.completeGuestRegistrationAsync = function(userInfo) {
        var that = this;
        return new Promise(function(resolve, reject) {
            auth.Users.completeGuestRegistration.call(that, userInfo, {"success": resolve, "error": reject});
        });
    };

    auth.Users.updateAsync = function(userId, userInfo) {
        var that = this;
        return new Promise(function(resolve, reject) {
            auth.Users.update.call(that, userId, userInfo, {"success": resolve, "error": reject});
        });
    };

    auth.Users.searchAsync = function(word, page, pageSize) {
        var that = this;
        return new Promise(function(resolve, reject) {
            auth.Users.search.call(that, word, page, pageSize, {"success": resolve, "error": reject});
        });
    };

    auth.Users.countAsync = function() {
        var that = this;
        return new Promise(function(resolve, reject) {
            auth.Users.count.call(that, {"success": resolve, "error": reject});
        });
    };

    auth.Users.getByUserNameAsync = function(username) {
        var that = this;
        return new Promise(function(resolve, reject) {
            auth.Users.getByUserName.call(that, username, {"success": resolve, "error": reject});
        });
    };

    auth.Users.getByUserIdAsync = function(userId) {
        var that = this;
        return new Promise(function(resolve, reject) {
            auth.Users.getByUserId.call(that, userId, {"success": resolve, "error": reject});
        });
    };

    auth.Users.getByUserIdsAsync = function(userIds) {
        var that = this;
        return new Promise(function(resolve, reject) {
            auth.Users.getByUserIds.call(that, userIds, {"success": resolve, "error": reject});
        });
    };

    auth.Users.deleteAsync = function(userId) {
        var that = this;
        return new Promise(function(resolve, reject) {
            auth.Users.delete.call(that, userId, {"success": resolve, "error": reject});
        });
    };

};

