var config = require('./../config');
var connectivityRest = require('./rest/connectivityRest');

var connectivity = module.exports = {
    common: null,

    init: function (common) {
        connectivity.common = common;
        require("./connectivityPromisified")(connectivity);
    },

    Messages: function Messages() {
        this.messages = [];
    },

    DirectMessages: function DirectMessages() {
        this.messages = [];
    },

    ChatGroup: function ChatGroup(groupId) {
        this.groupId = groupId || null;
        this.type = "Public";
        this.ownerUserId = null;
        this.name = null;
    },

    ChatMessage: function ChatMessage(message) {
        if ((typeof message != "string") || !message) {
            throw new Error("First argument (message) of 'ChatMessage' constructor must be a valid string.");
        }
        this.message = message;
    },
    
    OnlineUsers: function OnlineUsers() {
    },

    MatchProperties: function MatchProperties() {
    },

    MatchResult: function MatchResult() {
    },

    Match: function Match() {
        this.eventPushList = [];
        this.pushList = [];
    }

};


// Online Users methods

connectivity.OnlineUsers.checkUserStatus = function (userId, options){
    var that = this;
    if ((typeof userId != "string") || !(userId)) {
        throw new Error("First argument of 'OnlineUsers.checkUserStatus' method (userId) must be a valid string.");
    }

    connectivity.common.getInstance("realtime", function (connectivityInstanceId) {
        connectivity.common.getAccessToken({
            error: function (error1) {
                if (options && options.error) options.error(error1);
            },
            success: function (accessToken) {
                connectivityRest.checkUserStatus(accessToken, connectivityInstanceId, userId, {
                    success: function(response) {
                        if (options && options.success) {
                            options.success(response);
                        }
                    },
                    error: function(error) {
                        if (options && options.error) options.error(error);
                    }
                });
            }
        });
    });
};

connectivity.OnlineUsers.checkUsersStatus = function (userIds, options){
    var that = this;
    if (!(userIds) || !(Array.isArray(userIds)) || (userIds.length == 0)) {
        throw new Error("First argument of method 'OnlineUsers.checkUsersStatus' (userIds) must be a valid non-empty Array.");
    }

    connectivity.common.getInstance("realtime", function (connectivityInstanceId) {
        connectivity.common.getAccessToken({
            error: function (error1) {
                if (options && options.error) options.error(error1);
            },
            success: function (accessToken) {
                connectivityRest.checkUsersStatus(accessToken, connectivityInstanceId, userIds, {
                    success: function(response) {
                        if (options && options.success) {
                            options.success(response);
                        }
                    },
                    error: function(error) {
                        if (options && options.error) options.error(error);
                    }
                });
            }
        });
    });
};


// ChatMessages methods

connectivity.ChatMessage.prototype.sendAsPushToUser = function (receiverUserId, options) {
    var that = this;

    if ((typeof receiverUserId != "string") || !(receiverUserId)) {
        throw new Error("First argument (receiverUserId) of 'ChatMessage.sendAsPushToUser' method must be a valid string.");
    }

    connectivity.common.getInstance("realtime", function (connectivityInstanceId) {
        connectivity.common.getAccessToken({
            error: function (error1) {
                if (options && options.error) options.error(error1);
            },
            success: function (accessToken) {
                connectivityRest.sendChatAsPushToUser(accessToken, connectivityInstanceId, receiverUserId, that.message, {
                        success: function() {
                            if (options && options.success) {
                                options.success();
                            }
                        },
                        error: function(error) {
                            if (options && options.error) options.error(error);
                        }
                    });
            }
        });
    });
};

connectivity.ChatMessage.prototype.sendFromUserToUser = function (senderUserId, receiverUserId, options) {
    var that = this;

    if ((typeof senderUserId != "string") || !(senderUserId)) {
        throw new Error("First argument (senderUserId) of 'ChatMessage.sendFromUserToUser' method must be a valid string.");
    }
    else if ((typeof receiverUserId != "string") || !(receiverUserId)) {
        throw new Error("Second argument (receiverUserId) of 'ChatMessage.sendFromUserToUser' method must be a valid string.");
    }

    connectivity.common.getInstance("realtime", function (connectivityInstanceId) {
        connectivity.common.getAccessToken({
            error: function (error1) {
                if (options && options.error) options.error(error1);
            },
            success: function (accessToken) {
                connectivityRest.sendChatFromUserToUser(accessToken, connectivityInstanceId, senderUserId,
                                                        receiverUserId, that.message, {
                    success: function() {
                        if (options && options.success) {
                            options.success();
                        }
                    },
                    error: function(error) {
                        if (options && options.error) options.error(error);
                    }
                });
            }
        });
    });
};

connectivity.ChatMessage.prototype.sendAsPushToGroup = function (groupId, options) {
    var that = this;

    if ((typeof groupId != "string") || !(groupId)) {
        throw new Error("First argument (groupId) of 'ChatMessage.sendAsPushToGroup' method must be a valid string.");
    }

    connectivity.common.getInstance("realtime", function (connectivityInstanceId) {
        connectivity.common.getAccessToken({
            error: function (error1) {
                if (options && options.error) options.error(error1);
            },
            success: function (accessToken) {
                connectivityRest.sendChatAsPushToGroup(accessToken, connectivityInstanceId, groupId, that.message, {
                    success: function() {
                        if (options && options.success) {
                            options.success();
                        }
                    },
                    error: function(error) {
                        if (options && options.error) options.error(error);
                    }
                });
            }
        });
    });
};

connectivity.ChatMessage.prototype.sendFromUserToGroup = function (senderUserId, groupId, options) {
    var that = this;

    if ((typeof groupId != "string") || !(groupId)) {
        throw new Error("First argument (groupId) of 'ChatMessage.sendFromUserToGroup' method must be a valid string.");
    }

    connectivity.common.getInstance("realtime", function (connectivityInstanceId) {
        connectivity.common.getAccessToken({
            error: function (error1) {
                if (options && options.error) options.error(error1);
            },
            success: function (accessToken) {
                connectivityRest.sendChatFromUserToGroup(accessToken, connectivityInstanceId, senderUserId, groupId,
                                                         that.message, {
                    success: function() {
                        if (options && options.success) {
                            options.success();
                        }
                    },
                    error: function(error) {
                        if (options && options.error) options.error(error);
                    }
                });
            }
        });
    });
};


// ChatGroup methods

connectivity.ChatGroup.setName = function (groupName) {
    if ((typeof groupName != "string") || !(groupName)) {
        throw new Error("First argument (groupName) of 'ChatGroup.setName' method must be a valid string.");
    }
    this.name = groupName;
};

connectivity.ChatGroup.setGroupId = function (groupId) {
    if ((typeof groupId != "string") || !(groupId)) {
        throw new Error("First argument (groupId) of 'ChatGroup.setGroupId' method must be a valid string.");
    }
    this.groupId = groupId;
};

connectivity.ChatGroup.setOwnerUserId = function (ownerUserId) {
    if ((typeof ownerUserId != "string") || !(ownerUserId)) {
        throw new Error("First argument (ownerUserId) of 'ChatGroup.setOwnerUserId' method must be a valid string.");
    }
    this.ownerUserId = ownerUserId;
};

connectivity.ChatGroup.setPrivate = function (isPrivate) {
    if ((typeof isPrivate != "boolean")) {
        throw new Error("First argument (isPrivate) of 'ChatGroup.setPrivate' method must be a valid boolean.");
    }
    if (isPrivate)
        this.type = "Private";
    else
        this.type = "Public";
};

connectivity.ChatGroup.create = function (options) {
    var that = this;
    if (!that.name) {
        throw new Error("You must set 'groupName' of chatGroup before calling 'ChatGroup.create' method.");
    } else if (!that.ownerUserId) {
        throw new Error("You must set 'ownerUserId' of chatGroup before calling 'ChatGroup.create' method.");
    }

    connectivity.common.getInstance("realtime", function (connectivityInstanceId) {
        connectivity.common.getAccessToken({
            error: function (error1) {
                if (options && options.error) options.error(error1);
            },
            success: function (accessToken) {
                connectivityRest.createChatGroup(accessToken, connectivityInstanceId, that.name, that.type,
                                                 that.ownerUserId, {
                    success: function(groupId) {
                        if (options && options.success) {
                            that.groupId = groupId;
                            options.success(groupId);
                        }
                    },
                    error: function(error) {
                        if (options && options.error) options.error(error);
                    }
                });
            }
        });
    });
};

connectivity.ChatGroup.addOwner = function (newOwnerUserId, options) {
    var that = this;
    if ((typeof newOwnerUserId != "string") || !(newOwnerUserId)) {
        throw new Error("First argument (newOwnerUserId) of 'ChatGroup.addOwner' method must be a valid string.");
    } else if (!that.groupId) {
        throw new Error("You must set 'groupId' of chatGroup before calling 'ChatGroup.addOwner' method.");
    } else if (!that.ownerUserId) {
        throw new Error("You must set 'ownerUserId' of chatGroup before calling 'ChatGroup.addOwner' method.");
    }

    connectivity.common.getInstance("realtime", function (connectivityInstanceId) {
        connectivity.common.getAccessToken({
            error: function (error1) {
                if (options && options.error) options.error(error1);
            },
            success: function (accessToken) {
                connectivityRest.addOwnerToChatGroup(accessToken, connectivityInstanceId, that.groupId,
                                                     that.ownerUserId, newOwnerUserId, {
                        success: function() {
                            if (options && options.success) {
                                options.success();
                            }
                        },
                        error: function(error) {
                            if (options && options.error) options.error(error);
                        }
                    });
            }
        });
    });
};

connectivity.ChatGroup.addMemberAsOwner = function (newMemberUserId, options) {
    var that = this;
    if ((typeof newMemberUserId != "string") || !(newMemberUserId)) {
        throw new Error("First argument (newMemberUserId) of 'ChatGroup.addMemberAsOwner' method must be a valid string.");
    } else if (!that.groupId) {
        throw new Error("You must set 'groupId' of chatGroup before calling 'ChatGroup.addMemberAsOwner' method.");
    } else if (!that.ownerUserId) {
        throw new Error("You must set 'ownerUserId' of chatGroup before calling 'ChatGroup.addMemberAsOwner' method.");
    }

    connectivity.common.getInstance("realtime", function (connectivityInstanceId) {
        connectivity.common.getAccessToken({
            error: function (error1) {
                if (options && options.error) options.error(error1);
            },
            success: function (accessToken) {
                connectivityRest.addMemberAsOwnerToChatGroup(accessToken, connectivityInstanceId, that.groupId,
                    that.ownerUserId, newMemberUserId, {
                        success: function() {
                            if (options && options.success) {
                                options.success();
                            }
                        },
                        error: function(error) {
                            if (options && options.error) options.error(error);
                        }
                    });
            }
        });
    });
}

connectivity.ChatGroup.addMember = function (newMemberUserId, options) {
    var that = this;
    if ((typeof newMemberUserId != "string") || !(newMemberUserId)) {
        throw new Error("First argument (newMemberUserId) of 'ChatGroup.addMember' method must be a valid string.");
    } else if (!that.groupId) {
        throw new Error("You must set 'groupId' of chatGroup before calling 'ChatGroup.addMember' method.");
    } else if (!that.ownerUserId) {
        throw new Error("You must set 'ownerUserId' of chatGroup before calling 'ChatGroup.addMember' method.");
    }

    connectivity.common.getInstance("realtime", function (connectivityInstanceId) {
        connectivity.common.getAccessToken({
            error: function (error1) {
                if (options && options.error) options.error(error1);
            },
            success: function (accessToken) {
                connectivityRest.addMemberToChatGroup(accessToken, connectivityInstanceId, that.groupId,
                                                      that.ownerUserId, newMemberUserId, {
                        success: function() {
                            if (options && options.success) {
                                options.success();
                            }
                        },
                        error: function(error) {
                            if (options && options.error) options.error(error);
                        }
                    });
            }
        });
    });
};

connectivity.ChatGroup.removeMember = function (toBeRemovedMemberUserId, options) {
    var that = this;
    if ((typeof toBeRemovedMemberUserId != "string") || !(toBeRemovedMemberUserId)) {
        throw new Error("First argument (toBeRemovedMemberUserId) of 'ChatGroup.removeMember' method must be a valid string.");
    } else if (!that.groupId) {
        throw new Error("You must set 'groupId' of chatGroup before calling 'ChatGroup.removeMember' method.");
    } else if (!that.ownerUserId) {
        throw new Error("You must set 'ownerUserId' of chatGroup before calling 'ChatGroup.removeMember' method.");
    }

    connectivity.common.getInstance("realtime", function (connectivityInstanceId) {
        connectivity.common.getAccessToken({
            error: function (error1) {
                if (options && options.error) options.error(error1);
            },
            success: function (accessToken) {
                connectivityRest.removeMemberFromChatGroup(accessToken, connectivityInstanceId, that.groupId,
                    that.ownerUserId, toBeRemovedMemberUserId, {
                        success: function() {
                            if (options && options.success) {
                                options.success();
                            }
                        },
                        error: function(error) {
                            if (options && options.error) options.error(error);
                        }
                    });
            }
        });
    });
};


// ========================== Match functions ==========================
// Push to match (as MasterMessage)
connectivity.Match.sendMasterPush = function (matchId, message, data, options) {
    if ((typeof matchId != "string") || !(matchId)) {
        throw new Error("First argument (matchId) must be a valid string.");
    }
    else if ((typeof message != "object")) {
        throw new Error("Second argument (message) must be a valid json object.");
    }
    // ToDo: check data validity
    connectivity.common.getInstance("realtime", function (connectivityInstanceId) {
        connectivity.common.getAccessToken({
            error: function (error1) {
                if (options && options.error) options.error(error1);
            },
            success: function (accessToken) {
                connectivityRest.sendPush(accessToken, connectivityInstanceId, matchId, message, data, {
                    success: function() {
                        if (options && options.success) {
                            options.success();
                        }
                    },
                    error: function(error) {
                        if (options && options.error) options.error(error);
                    }
                });
            }
        });
    });

};

// PushBulk to match (as MasterMessage)
connectivity.Match.prototype.addToMasterPushBulk = function (matchId, message, data) {
    if ((typeof matchId != "string") || !(matchId)) {
        throw new Error("First argument (matchId) must be a valid string.");
    }
    else if ((typeof message != "object")) {
        throw new Error("Second argument (message) must be a valid json object.");
    }
    // ToDo: check data validity
    this.pushList.push({"challengeId": matchId, "message": message, "data": data});
};
connectivity.Match.prototype.sendMasterPushBulk = function (options) {
    var pushList = this.pushList;
    if (pushList.length == 0) {
        throw new Error("There is no message to send.")
    } else {
        connectivity.common.getInstance("realtime", function (connectivityInstanceId) {
            connectivity.common.getAccessToken({
                error: function (error1) {
                    if (options && options.error) options.error(error1);
                },
                success: function (accessToken) {
                    connectivityRest.sendPushBulk(accessToken, connectivityInstanceId, pushList, {
                        success: function() {
                            if (options && options.success) {
                                options.success();
                            }
                        },
                        error: function(error) {
                            if (options && options.error) options.error(error);
                        }
                    });
                }
            });
        });
    }
};

// EventPush to match (as ChallengeMessage)
connectivity.Match.sendEventPush = function (matchId, userId, message, data, options) {
    if ((typeof matchId != "string") || !(matchId)) {
        throw new Error("First argument (matchId) must be a valid string.");
    }
    else if ((typeof userId != "string") || !(userId)) {
        throw new Error("Second argument (userId) must be a valid string.");
    }
    else if ((typeof message != "object")) {
        throw new Error("Third argument (message) must be a valid json object.");
    }
    // ToDo: check data validity
    connectivity.common.getInstance("realtime", function (connectivityInstanceId) {
        connectivity.common.getAccessToken({
            error: function (error1) {
                if (options && options.error) options.error(error1);
            },
            success: function (accessToken) {
                connectivityRest.sendEventPush(accessToken, connectivityInstanceId, matchId, userId, message, data, {
                    success: function() {
                        if (options && options.success) {
                            options.success();
                        }
                    },
                    error: function(error) {
                        if (options && options.error) options.error(error);
                    }
                });
            }
        });
    });
};

// EventPushBulk to match (as ChallengeMessage)
connectivity.Match.prototype.addToEventPushBulk = function (matchId, userId, message, data) {
    if ((typeof matchId != "string") || !(matchId)) {
        throw new Error("First argument (matchId) must be a valid string.");
    }
    else if ((typeof userId != "string") || !(userId)) {
        throw new Error("Second argument (userId) must be a valid string.");
    }
    else if ((typeof message != "object")) {
        throw new Error("Third argument (message) must be a valid json object.");
    }
    this.eventPushList.push({"challengeId": matchId, "userId": userId, "message": message, "data": data});
};
connectivity.Match.prototype.sendEventPushBulk = function (options) {
    var eventPushList = this.eventPushList;
    if (eventPushList.length == 0) {
        throw new Error("There is no message to send.")
    } else {
        connectivity.common.getInstance("realtime", function (connectivityInstanceId) {
            connectivity.common.getAccessToken({
                error: function (error1) {
                    if (options && options.error) options.error(error1);
                },
                success: function (accessToken) {
                    connectivityRest.sendEventPushBulk(accessToken, connectivityInstanceId, eventPushList, {
                        success: function() {
                            if (options && options.success) {
                                options.success();
                            }
                        },
                        error: function(error) {
                            if (options && options.error) options.error(error);
                        }
                    });
                }
            });
        });
    }
};


// ---------------------------------------------------------------------------------------------------------------------
// Suggestion: deprecate this body and use better names instead of connectivity.Messages and connectivity.DirectMessages
// Messages methods

connectivity.Messages.prototype.add = function (challengeId, message) {
    if ((typeof challengeId != "string") || !(challengeId)) {
        throw new Error("First argument (challengeId) must be a valid string.");
    }
    else if ((typeof message != "object")) {
        throw new Error("Second argument (message) must be a valid json object.");
    }
    this.messages.push({"challengeId": challengeId, "message": message});
};

connectivity.Messages.prototype.send = function (options) {
    var messages = this.messages;
    if (messages.length == 0) {
        throw new Error("There is no message to send.")
    } else {
        connectivity.common.getInstance("realtime", function (connectivityInstanceId) {
            connectivity.common.getAccessToken({
                error: function (error1) {
                    if (options && options.error) options.error(error1);
                },
                success: function (accessToken) {
                    connectivityRest.sendPushBulk(accessToken, connectivityInstanceId, messages, {
                        success: function() {
                            if (options && options.success) {
                                options.success();
                            }
                        },
                        error: function(error) {
                            if (options && options.error) options.error(error);
                        }
                    });
                }
            });
        });
    }
};


// DirectMessages method

connectivity.DirectMessages.prototype.add = function (challengeId, userId, message) {
    if ((typeof challengeId != "string") || !(challengeId)) {
        throw new Error("First argument (challengeId) must be a valid string.");
    }
    else if ((typeof userId != "string") || !(userId)) {
        throw new Error("Second argument (userId) must be a valid string.");
    }
    else if ((typeof message != "object")) {
        throw new Error("Third argument (message) must be a valid json object.");
    }
    this.messages.push({"challengeId": challengeId, "userId": userId, "message": message});
};

connectivity.DirectMessages.prototype.send = function (options) {
    var messages = this.messages;
    if (messages.length == 0) {
        throw new Error("There is no message to send.")
    } else {
        connectivity.common.getInstance("realtime", function (connectivityInstanceId) {
            connectivity.common.getAccessToken({
                error: function (error1) {
                    if (options && options.error) options.error(error1);
                },
                success: function (accessToken) {
                    connectivityRest.sendEventPushBulk(accessToken, connectivityInstanceId, messages, {
                        success: function() {
                            if (options && options.success) {
                                options.success();
                            }
                        },
                        error: function(error) {
                            if (options && options.error) options.error(error);
                        }
                    });
                }
            });
        });
    }
};
// ---------------------------------------------------------------------------------------------------------------------

// Match Result method

connectivity.MatchResult.sendResult = function (matchId, winners, options){
    var that = this;

    if ((typeof matchId != "string") || !(matchId)) {
        throw new Error("First argument of 'MatchResult.sendResult' method (matchId) must be a valid string.");
    }
    if (!Array.isArray(winners)) {
        throw new Error("Second argument of 'MatchResult.sendResult' method (winners) must be a valid array.");
    }

    connectivity.common.getInstance("realtime", function (connectivityInstanceId) {
        connectivity.common.getAccessToken({
            error: function (error1) {
                if (options && options.error) options.error(error1);
            },
            success: function (accessToken) {
                connectivityRest.sendMatchResult(accessToken, connectivityInstanceId, matchId, winners, {
                    success: function(response) {
                        if (options && options.success) {
                            options.success(response);
                        }
                    },
                    error: function(error) {
                        if (options && options.error) options.error(error);
                    }
                });
            }
        });
    });
};


// Match Properties methods

connectivity.MatchProperties.setProperties = function (matchId, properties, options){
    var that = this;
    if ((typeof matchId != "string") || !(matchId)) {
        throw new Error("First argument of 'MatchProperties.setProperties' method (matchId) must be a valid string.");
    }

    connectivity.common.getInstance("realtime", function (connectivityInstanceId) {
        connectivity.common.getAccessToken({
            error: function (error1) {
                if (options && options.error) options.error(error1);
            },
            success: function (accessToken) {
                connectivityRest.setMatchProperties(accessToken, connectivityInstanceId, matchId, properties, {
                    success: function(response) {
                        if (options && options.success) {
                            options.success(response);
                        }
                    },
                    error: function(error) {
                        if (options && options.error) options.error(error);
                    }
                });
            }
        });
    });
};

// =====================
connectivity.MatchProperties.getProperties = function (matchId, options){
    var that = this;
    if ((typeof matchId != "string") || !(matchId)) {
        throw new Error("First argument of 'MatchProperties.getProperties' method (matchId) must be a valid string.");
    }

    connectivity.common.getInstance("realtime", function (connectivityInstanceId) {
        connectivity.common.getAccessToken({
            error: function (error1) {
                if (options && options.error) options.error(error1);
            },
            success: function (accessToken) {
                connectivityRest.getMatchProperties(accessToken, connectivityInstanceId, matchId, {
                    success: function(response) {
                        if (options && options.success) {
                            options.success(response);
                        }
                    },
                    error: function(error) {
                        if (options && options.error) options.error(error);
                    }
                });
            }
        });
    });
};
