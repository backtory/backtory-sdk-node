var Promise = require("bluebird");

var connectivityPromisified = module.exports = function (connectivity) {

    connectivity.ChatMessage.prototype.sendAsPushToUserAsync = function(receiverUserId) {
        return new Promise(function(resolve, reject) {
            connectivity.ChatMessage.prototype.sendAsPushToUser(receiverUserId, {"success": resolve, "error": reject});
        });
    };

    connectivity.ChatMessage.prototype.sendFromUserToUserAsync = function(senderUserId, receiverUserId) {
        return new Promise(function(resolve, reject) {
            connectivity.ChatMessage.prototype.sendFromUserToUser(senderUserId, receiverUserId,
                                                                  {"success": resolve, "error": reject});
        });
    };

    connectivity.ChatMessage.prototype.sendAsPushToGroupAsync = function(groupId) {
        return new Promise(function(resolve, reject) {
            connectivity.ChatMessage.prototype.sendAsPushToGroup(groupId, {"success": resolve, "error": reject});
        });
    };

    connectivity.ChatMessage.prototype.sendFromUserToGroupAsync = function(senderUserId, groupId) {
        return new Promise(function(resolve, reject) {
            connectivity.ChatMessage.prototype.sendFromUserToGroup(senderUserId, groupId,
                                                                   {"success": resolve, "error": reject});
        });
    };

    connectivity.ChatGroup.createAsync = function() {
        return new Promise(function(resolve, reject) {
            connectivity.ChatGroup.create({"success": resolve, "error": reject});
        });
    };

    connectivity.ChatGroup.addOwnerAsync = function(newOwnerUserId) {
        return new Promise(function(resolve, reject) {
            connectivity.ChatGroup.addOwner(newOwnerUserId, {"success": resolve, "error": reject});
        });
    };

    connectivity.ChatGroup.addMemberAsync = function(newMemberUserId) {
        return new Promise(function(resolve, reject) {
            connectivity.ChatGroup.addMember(newMemberUserId, {"success": resolve, "error": reject});
        });
    };

    connectivity.ChatGroup.removeMemberAsync = function(toBeRemovedMemberUserId) {
        return new Promise(function(resolve, reject) {
            connectivity.ChatGroup.removeMember(toBeRemovedMemberUserId, {"success": resolve, "error": reject});
        });
    };

    connectivity.Messages.prototype.sendAsync = function() {
        return new Promise(function(resolve, reject) {
            connectivity.Messages.prototype.send({"success": resolve, "error": reject});
        });
    };

    connectivity.DirectMessages.prototype.sendAsync = function() {
        return new Promise(function(resolve, reject) {
            connectivity.DirectMessages.prototype.send({"success": resolve, "error": reject});
        });
    };

};

