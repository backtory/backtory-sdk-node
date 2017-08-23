var config = require('./../config');
var connectivityRest = require('./rest/connectivityRest');

var connectivity = module.exports = {
    common: null,

    init: function (common) {
        connectivity.common = common;
        require("./connectivityPromisified")(connectivity);
    },


    OnlineUserNew: function OnlineUserNew() {
    },

    DirectChat: function DirectChat() {
    },

    // اینجا توضیح داده بشه که تو ممکنه موقعی که داری این آبجکت رو میسازی، بخوای ازش برا ساخت گروه استفاده کنی و درواقع هنوز groupId رو نمی‌دونی
    // در نتیجه میتونی پاس ندی و اجباری نشده که اینجا پاس داده بشه ولی اگه پاس ندی و گروه رو نسازی و بخوای توابعی مثل حذف عضو رو استفاده کنی،
    // چون هنوز groupId رو مشخص نکردی خطا میخوری و در این صورت لازمه که توسط تابع setGruopId این پارامتر رو ست کنی
    // اگه گروه رو create کنی، خودش groupId رو ست میکنه و روی اون آبجکت نمی‌خواد ست کنی
    GroupChat: function GroupChat(groupId) {
        this.groupId = null;
        if (groupId) {
            if (typeof groupId != "string") {
                throw new Error("First argument (groupId) of 'ChatGroup' constructor must be a valid string or empty.");
            } else {
                this.groupId = groupId;
            }
        }
        this.type = "Public";
        this.name = null;
    },

    RealtimeGame: function RealtimeGame(matchId) {
        if ((typeof matchId != "string") || !(matchId)) {
            throw new Error("First argument (matchId) of 'RealtimeGame' constructor must be a valid string.");
        }
        this.matchId = matchId;

        this.eventPushList = [];
        this.pushList = [];
    },

    // ====================================================
    // ============= Begin of Deprecated part =============
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
    }
    // ============== End of Deprecated part ==============
    // ====================================================
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
// Should be deleted
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

// DirectChat.sendMessage()
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

// Should be deleted
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

// GroupChat.sendMessage()
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

// GroupChat.createNewGroup()
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

// GroupChat.makeMemberOwner()
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

// GroupChat.addMember(role)
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

// ==============================================================================================
// =============================== Begin of body of new functions ===============================

// ------------------------------------ Online User functions -----------------------------------
// Check status of single user
connectivity.OnlineUserNew.prototype.checkUserStatus = function (userId, options){
    if ((typeof userId != "string") || !(userId)) {
        // ToDo: fix the error text
        throw new Error("First argument of 'OnlineUsers.checkUserStatus****' method (userId) must be a valid string.");
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

// Check status of list of users
connectivity.OnlineUserNew.prototype.checkUserListStatus = function (userIdList, options){
    if (!(userIdList) || !(Array.isArray(userIdList)) || (userIdList.length == 0)) {
        // ToDo: fix the error text
        throw new Error("First argument of method 'OnlineUsers.checkUsersStatus' (userIdList) must be a valid non-empty Array.");
    }

    connectivity.common.getInstance("realtime", function (connectivityInstanceId) {
        connectivity.common.getAccessToken({
            error: function (error1) {
                if (options && options.error) options.error(error1);
            },
            success: function (accessToken) {
                connectivityRest.checkUsersStatus(accessToken, connectivityInstanceId, userIdList, {
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

// ------------------------------------ DirectChat functions ------------------------------------
// ToDo: comment this
// Send direct chat message to a user as push (without sender)
connectivity.DirectChat.prototype.sendMessageAsPush = function (message, receiverUserId, options) {
    if ((typeof message != "string") || !message) {
        throw new Error("First argument (message) of 'DirectChat.sendMessageAsPush' method must be a valid string.");
    } else if ((typeof receiverUserId != "string") || !(receiverUserId)) {
        throw new Error("Second argument (receiverUserId) of 'DirectChat.sendMessageAsPush' method must be a valid string.");
    }

    connectivity.common.getInstance("realtime", function (connectivityInstanceId) {
        connectivity.common.getAccessToken({
            error: function (error1) {
                if (options && options.error) options.error(error1);
            },
            success: function (accessToken) {
                connectivityRest.sendChatAsPushToUser(accessToken, connectivityInstanceId, receiverUserId, message, {
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

// ToDo: comment this
// Send direct chat message from one user to another
connectivity.DirectChat.prototype.sendMessage = function (message, senderUserId, receiverUserId, options) {
    if ((typeof message != "string") || !message) {
        throw new Error("First argument (message) of 'DirectChat.sendMessage' method must be a valid string.");
    } else if ((typeof senderUserId != "string") || !(senderUserId)) {
        throw new Error("Second argument (senderUserId) of 'DirectChat.sendMessage' method must be a valid string.");
    } else if ((typeof receiverUserId != "string") || !(receiverUserId)) {
        throw new Error("Third argument (receiverUserId) of 'DirectChat.sendMessage' method must be a valid string.");
    }

    connectivity.common.getInstance("realtime", function (connectivityInstanceId) {
        connectivity.common.getAccessToken({
            error: function (error1) {
                if (options && options.error) options.error(error1);
            },
            success: function (accessToken) {
                connectivityRest.sendChatFromUserToUser(accessToken, connectivityInstanceId, senderUserId, receiverUserId, message, {
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

// ------------------------------------- GroupChat functions ------------------------------------
// Function for setting groupId, if not set in constructor
connectivity.GroupChat.prototype.setGroupId = function (groupId) {
    if ((typeof groupId != "string") || !(groupId)) {
        throw new Error("First argument (groupId) of 'GroupChat.setGroupId' method must be a valid string.");
    }
    this.groupId = groupId;
    return this;
};

// اینجا توضیح داده بشه که این دو تابع اسم و شخصی بودن گروهی که میخوای تولید کنی رو تنظیم می‌کنند و مستقلا هم میشه صدا زد برا این که اسم گروهت رو داشته باشی تو اون آبجکت
// اما اگه میخوای گروه بسازی حتما باید قبلش نامش رو تنظیم کنی
// Set groupName
connectivity.GroupChat.prototype.setName = function (groupName) {
    if ((typeof groupName != "string") || !(groupName)) {
        throw new Error("First argument (groupName) of 'GroupChat.setName' method must be a valid string.");
    }
    this.name = groupName;
    return this;
};

// فقط وقتی صدا زده میشه که میخوای گروه شخصی باشه و در غیر این صورت نیازی به این کار نیست
// Making private the group that will be created
connectivity.GroupChat.prototype.setPrivate = function (isPrivate) {
    if ((typeof isPrivate != "boolean")) {
        throw new Error("First argument (isPrivate) of 'GroupChat.setPrivate' method must be a valid boolean.");
    }
    if (isPrivate)
        this.type = "Private";

    return this;
};

// ToDo: comment this
// Send direct chat message to a group as push (without sender)
connectivity.GroupChat.prototype.sendAsPushToGroup = function (message, options) {
    var groupId = this.groupId;
    if (!groupId) {
        throw new Error("You must set 'groupId' of groupChat before calling 'GroupChat.sendAsPushToGroup' method.");
    } else if ((typeof message != "string") || !message) {
        throw new Error("First argument (message) of 'GroupChat.sendAsPushToGroup' method must be a valid string.");
    }

    connectivity.common.getInstance("realtime", function (connectivityInstanceId) {
        connectivity.common.getAccessToken({
            error: function (error1) {
                if (options && options.error) options.error(error1);
            },
            success: function (accessToken) {
                connectivityRest.sendChatAsPushToGroup(accessToken, connectivityInstanceId, groupId, message, {
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

// ToDo: comment this
// Send direct chat message from one user to group
connectivity.GroupChat.prototype.sendMessage = function (message, senderUserId, options) {
    var that = this;
    if (!that.groupId) {
        throw new Error("You must set 'groupId' of groupChat before calling 'GroupChat.sendAsPushToGroup' method.");
    } else if ((typeof message != "string") || !message) {
        throw new Error("First argument (message) of 'ChatMessage' constructor must be a valid string.");
    } else if ((typeof senderUserId != "string") || !(senderUserId)) {
        throw new Error("First argument (groupId) of 'ChatMessage.sendFromUserToGroup' method must be a valid string.");
    }

    connectivity.common.getInstance("realtime", function (connectivityInstanceId) {
        connectivity.common.getAccessToken({
            error: function (error1) {
                if (options && options.error) options.error(error1);
            },
            success: function (accessToken) {
                connectivityRest.sendChatFromUserToGroup(accessToken, connectivityInstanceId, senderUserId, that.groupId, message, {
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

// Create new chat group
connectivity.GroupChat.prototype.createNewGroup = function (ownerUserId, options) {
    var that = this;
    if (!that.name) {
        throw new Error("You must set 'groupName' of chatGroup before calling 'GroupChat.createNewGroup' method.");
    } else if ((typeof ownerUserId != "string") || !(ownerUserId)) {
        throw new Error("First argument (ownerUserId) of 'GroupChat.createNewGroup' method must be a valid string.");
    }

    connectivity.common.getInstance("realtime", function (connectivityInstanceId) {
        connectivity.common.getAccessToken({
            error: function (error1) {
                if (options && options.error) options.error(error1);
            },
            success: function (accessToken) {
                connectivityRest.createChatGroup(accessToken, connectivityInstanceId, that.name, that.type, ownerUserId, {
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

// Changing the role of a member to owner
connectivity.GroupChat.prototype.makeMemberOwner = function (newOwnerUserId, options) {
    var that = this;
    if ((typeof newOwnerUserId != "string") || !(newOwnerUserId)) {
        throw new Error("First argument (newOwnerUserId) of 'GroupChat.makeMemberOwner' method must be a valid string.");
    } else if (!that.groupId) {
        throw new Error("You must set 'groupId' of chatGroup before calling 'GroupChat.makeMemberOwner' method.");
    } else if (!that.ownerUserId) {
        throw new Error("You must set 'ownerUserId' of chatGroup before calling 'GroupChat.makeMemberOwner' method.");
    }

    connectivity.common.getInstance("realtime", function (connectivityInstanceId) {
        connectivity.common.getAccessToken({
            error: function (error1) {
                if (options && options.error) options.error(error1);
            },
            success: function (accessToken) {
                connectivityRest.addOwnerToChatGroup(accessToken, connectivityInstanceId, that.groupId, that.ownerUserId, newOwnerUserId, {
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

// connectivity.GroupChat.prototype.addMemberAsOwner = function (newMemberUserId, options) {
//     var that = this;
//     if ((typeof newMemberUserId != "string") || !(newMemberUserId)) {
//         throw new Error("First argument (newMemberUserId) of 'ChatGroup.addMemberAsOwner' method must be a valid string.");
//     } else if (!that.groupId) {
//         throw new Error("You must set 'groupId' of chatGroup before calling 'ChatGroup.addMemberAsOwner' method.");
//     } else if (!that.ownerUserId) {
//         throw new Error("You must set 'ownerUserId' of chatGroup before calling 'ChatGroup.addMemberAsOwner' method.");
//     }
//
//     connectivity.common.getInstance("realtime", function (connectivityInstanceId) {
//         connectivity.common.getAccessToken({
//             error: function (error1) {
//                 if (options && options.error) options.error(error1);
//             },
//             success: function (accessToken) {
//                 connectivityRest.addMemberAsOwnerToChatGroup(accessToken, connectivityInstanceId, that.groupId,
//                     that.ownerUserId, newMemberUserId, {
//                         success: function() {
//                             if (options && options.success) {
//                                 options.success();
//                             }
//                         },
//                         error: function(error) {
//                             if (options && options.error) options.error(error);
//                         }
//                     });
//             }
//         });
//     });
// }

// Add a member to chat group as member or owner
connectivity.GroupChat.prototype.addMember = function (newMemberUserId, adderUserId, addAsOwner, options) {
    var that = this;
    var beOwner = false;
    if ((typeof newMemberUserId != "string") || !(newMemberUserId)) {
        throw new Error("First argument (newMemberUserId) of 'GroupChat.addMember' method must be a valid string.");
    } else if ((typeof adderUserId != "string") || !(adderUserId)) {
        throw new Error("Second argument (adderUserId) of 'GroupChat.addMember' method must be a valid string.");
    }
    if (addAsOwner) {
        if (typeof addAsOwner != "boolean") {
            throw new Error("Second argument (addAsOwner) of 'GroupChat.addMember' method must be a valid boolean or empty.");
        } else {
            beOwner = addAsOwner;
        }
    }
    if (!that.groupId) {
        throw new Error("You must set 'groupId' of chatGroup before calling 'GroupChat.addMember' method.");
    }

    connectivity.common.getInstance("realtime", function (connectivityInstanceId) {
        connectivity.common.getAccessToken({
            error: function (error1) {
                if (options && options.error) options.error(error1);
            },
            success: function (accessToken) {
                if (beOwner) {
                    connectivityRest.addMemberAsOwnerToChatGroup(accessToken, connectivityInstanceId, that.groupId, adderUserId, newMemberUserId, {
                        success: function() {
                            if (options && options.success) {
                                options.success();
                            }
                        },
                        error: function(error) {
                            if (options && options.error) options.error(error);
                        }
                    });
                } else {
                    connectivityRest.addMemberToChatGroup(accessToken, connectivityInstanceId, that.groupId, adderUserId, newMemberUserId, {
                        success: function () {
                            if (options && options.success) {
                                options.success();
                            }
                        },
                        error: function (error) {
                            if (options && options.error) options.error(error);
                        }
                    });
                }
            }
        });
    });
};

// ToDo: اینو چک کنم و به مصباح کامنت بدم که شروط حذف‌کننده چیه؟
// Remove a member from chat group (remover should be owner)
connectivity.GroupChat.prototype.removeMember = function (toBeRemovedMemberUserId, removerUserId, options) {
    var that = this;
    if ((typeof toBeRemovedMemberUserId != "string") || !(toBeRemovedMemberUserId)) {
        throw new Error("First argument (toBeRemovedMemberUserId) of 'GroupChat.removeMember' method must be a valid string.");
    } else if ((typeof removerUserId != "string") || !(removerUserId)) {
        throw new Error("Second argument (removerUserId) of 'GroupChat.removeMember' method must be a valid string.");
    }else if (!that.groupId) {
        throw new Error("You must set 'groupId' of chatGroup before calling 'ChatGroup.removeMember' method.");
    }

    connectivity.common.getInstance("realtime", function (connectivityInstanceId) {
        connectivity.common.getAccessToken({
            error: function (error1) {
                if (options && options.error) options.error(error1);
            },
            success: function (accessToken) {
                connectivityRest.removeMemberFromChatGroup(accessToken, connectivityInstanceId, that.groupId, removerUserId, toBeRemovedMemberUserId, {
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

// --------------------------------------- Match functions --------------------------------------
// Send ServerMessage to specific user in RealtimeGame
connectivity.RealtimeGame.prototype.sendServerMessage = function (userId, message, data, options) {
    var matchId = this.matchId;
    if ((typeof userId != "string") || !(userId)) {
        throw new Error("Second argument (userId) must be a valid string.");
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
                connectivityRest.sendMasterDirect(accessToken, connectivityInstanceId, matchId, userId, message, data, {
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

// Send ServerMessage to all members of RealtimeGame
connectivity.RealtimeGame.prototype.sendServerMessage = function (message, data, options) {
    var matchId = this.matchId;
    if ((typeof message != "object")) {
        throw new Error("Second argument (message) must be a valid json object.");
    }
    // ToDo: check data validity
    connectivity.common.getInstance("realtime", function (connectivityInstanceId) {
        connectivity.common.getAccessToken({
            error: function (error1) {
                if (options && options.error) options.error(error1);
            },
            success: function (accessToken) {
                connectivityRest.sendMasterPush(accessToken, connectivityInstanceId, matchId, message, data, {
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

// Add one message to ServerMessage bulk to send later
connectivity.RealtimeGame.prototype.addToServerMessageBulk = function (matchId, message, data) {
    if ((typeof matchId != "string") || !(matchId)) {
        throw new Error("First argument (matchId) must be a valid string.");
    }
    else if ((typeof message != "object")) {
        throw new Error("Second argument (message) must be a valid json object.");
    }
    // ToDo: check data validity
    this.pushList.push({"challengeId": matchId, "message": message, "data": data});
};

// Send all added message to ServerMessage bulk to all members of RealtimeGame
connectivity.RealtimeGame.prototype.sendServerMessageBulk = function (options) {
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
                    connectivityRest.sendMasterPushBulk(accessToken, connectivityInstanceId, pushList, {
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

// Send GameEvent to all members of RealtimeGame (clients consider userId as id of user which event is triggered by him)
connectivity.RealtimeGame.prototype.sendEvent = function (userId, message, data, options) {
    var matchId = this.matchId;
    if ((typeof userId != "string") || !(userId)) {
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

// Add one message to GameEvent bulk to send later (clients consider userId as id of user which event is triggered by him)
connectivity.RealtimeGame.prototype.addToEventBulk = function (userId, message, data) {
    var matchId = this.matchId;
    if ((typeof userId != "string") || !(userId)) {
        throw new Error("Second argument (userId) must be a valid string.");
    }
    else if ((typeof message != "object")) {
        throw new Error("Third argument (message) must be a valid json object.");
    }
    this.eventPushList.push({"challengeId": matchId, "userId": userId, "message": message, "data": data});
};

// Send all added message to GameEvent bulk to all members of RealtimeGame
connectivity.RealtimeGame.prototype.sendEventBulk = function (options) {
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

// Send winners of RealtimeGame and finish the game
connectivity.RealtimeGame.prototype.sendWinners = function (winners, options){
    var matchId = this.matchId;
    if (!Array.isArray(winners)) {
        throw new Error("First argument of 'RealtimeGame.sendResult' method (winners) must be a valid array.");
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


// Set properties of RealtimeGame
connectivity.RealtimeGame.prototype.setProperties = function (properties, options){
    var matchId = this.matchId;
    // ToDo: check properties validity
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

// Get properties of RealtimeGame
connectivity.RealtimeGame.prototype.getProperties = function (options){
    var matchId = this.matchId;
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

// ================================ End of body of new functions ================================
// ==============================================================================================

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
                    connectivityRest.sendMasterPushBulk(accessToken, connectivityInstanceId, messages, {
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
    // ToDo: check properties validity
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
