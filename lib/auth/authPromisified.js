var Promise = require("bluebird");

var authPromisified = module.exports = function (auth) {

    auth.Users.signUpAsync = function(userInfo) {
        return new Promise(function(resolve, reject) {
            auth.Users.signUp(userInfo, {"success": resolve, "error": reject});
        });
    };

    auth.Users.guestSignUpAsync = function() {
        return new Promise(function(resolve, reject) {
            auth.Users.guestSignUp({"success": resolve, "error": reject});
        });
    };

    auth.Users.completeGuestRegistrationAsync = function(userInfo) {
        return new Promise(function(resolve, reject) {
            auth.Users.completeGuestRegistration(userInfo, {"success": resolve, "error": reject});
        });
    };

    auth.Users.updateAsync = function(userId, userInfo) {
        return new Promise(function(resolve, reject) {
            auth.Users.update(userId, userInfo, {"success": resolve, "error": reject});
        });
    };

    auth.Users.searchAsync = function(word, page, pageSize) {
        return new Promise(function(resolve, reject) {
            auth.Users.search(word, page, pageSize, {"success": resolve, "error": reject});
        });
    };

    auth.Users.countAsync = function() {
        return new Promise(function(resolve, reject) {
            auth.Users.count({"success": resolve, "error": reject});
        });
    };

    auth.Users.getByUserNameAsync = function(username) {
        return new Promise(function(resolve, reject) {
            auth.Users.getByUserName(username, {"success": resolve, "error": reject});
        });
    };

    auth.Users.getByUserIdAsync = function(userId) {
        return new Promise(function(resolve, reject) {
            auth.Users.getByUserId(userId, {"success": resolve, "error": reject});
        });
    };

    auth.Users.getByUserIdsAsync = function(userIds) {
        return new Promise(function(resolve, reject) {
            auth.Users.getByUserIds(userIds, {"success": resolve, "error": reject});
        });
    };

    auth.Users.deleteAsync = function(userId) {
        return new Promise(function(resolve, reject) {
            auth.Users.delete(userId, {"success": resolve, "error": reject});
        });
    };

};

