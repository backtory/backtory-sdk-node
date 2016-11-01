var Promise = require("bluebird");

var connectivityPromisified = module.exports = function (connectivity) {

    connectivity.ChatMessage.prototype.sendAsPushToUserAsync = function(receiverUserId) {
        var that = this;
        return new Promise(function(resolve, reject) {
            connectivity.ChatMessage.prototype.sendAsPushToUser.call(that, receiverUserId,
                                                                     {"success": resolve, "error": reject});
        });
    };

    connectivity.ChatMessage.prototype.sendFromUserToUserAsync = function(senderUserId, receiverUserId) {
        var that = this;
        return new Promise(function(resolve, reject) {
            connectivity.ChatMessage.prototype.sendFromUserToUser.call(that, senderUserId, receiverUserId,
                                                                       {"success": resolve, "error": reject});
        });
    };

    connectivity.ChatMessage.prototype.sendAsPushToGroupAsync = function(groupId) {
        var that = this;
        return new Promise(function(resolve, reject) {
            connectivity.ChatMessage.prototype.sendAsPushToGroup.call(that, groupId,
                                                                      {"success": resolve, "error": reject});
        });
    };

    connectivity.ChatMessage.prototype.sendFromUserToGroupAsync = function(senderUserId, groupId) {
        var that = this;
        return new Promise(function(resolve, reject) {
            connectivity.ChatMessage.prototype.sendFromUserToGroup.call(that, senderUserId, groupId,
                                                                        {"success": resolve, "error": reject});
        });
    };

    connectivity.ChatGroup.createAsync = function() {
        var that = this;
        return new Promise(function(resolve, reject) {
            connectivity.ChatGroup.create.call(that, {"success": resolve, "error": reject});
        });
    };

    connectivity.ChatGroup.addOwnerAsync = function(newOwnerUserId) {
        var that = this;
        return new Promise(function(resolve, reject) {
            connectivity.ChatGroup.addOwner.call(that, newOwnerUserId, {"success": resolve, "error": reject});
        });
    };

    connectivity.ChatGroup.addMemberAsync = function(newMemberUserId) {
        var that = this;
        return new Promise(function(resolve, reject) {
            connectivity.ChatGroup.addMember.call(that, newMemberUserId, {"success": resolve, "error": reject});
        });
    };

    connectivity.ChatGroup.removeMemberAsync = function(toBeRemovedMemberUserId) {
        var that = this;
        return new Promise(function(resolve, reject) {
            connectivity.ChatGroup.removeMember.call(that, toBeRemovedMemberUserId, {"success": resolve, "error": reject});
        });
    };

    connectivity.Messages.prototype.sendAsync = function() {
        var that = this;
        return new Promise(function(resolve, reject) {
            connectivity.Messages.prototype.send.call(that, {"success": resolve, "error": reject});
        });
    };

    connectivity.DirectMessages.prototype.sendAsync = function() {
        var that = this;
        return new Promise(function(resolve, reject) {
            connectivity.DirectMessages.prototype.send.call(that, {"success": resolve, "error": reject});
        });
    };

};

