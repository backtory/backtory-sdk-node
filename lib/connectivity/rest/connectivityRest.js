var config = require('./../../config');
var unirest = require('unirest');
var sentry = require("./../../sentry/client");


var rest = module.exports = {

    checkUserStatus: function(accessToken, connectivityInstanceId, userId, options) {
        var old_time = new Date();
        var url = config.backtory.connectivityApi + "check-user-status/";
        unirest.get(url)
            .headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Backtory-Connectivity-Id': connectivityInstanceId,
                'X-Backtory-User-Id': userId,
                'Authorization': 'Bearer ' + accessToken
            })
            .forever(true)
            .end(function (response){
                var new_time = new Date();
                var seconds_passed = new_time - old_time;
                if (config.debug) console.log("time spent: " + seconds_passed);
                if (response.status == 200) {
                    options.success(response.body);
                }
                else {
                    options.error({
                        responseCode: response.status,
                        responseBody: response.body
                    });
                }
                sentry.checkAPICall("connectivity", connectivityInstanceId, "CHECK_USER_STATUS",
                    response.status, response.body, seconds_passed, url, "GET");
            });
    },

    checkUsersStatus: function(accessToken, connectivityInstanceId, userIds, options) {
        var old_time = new Date();
        var url = config.backtory.connectivityApi + "check-user-status/";
        unirest.post(url)
            .headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Backtory-Connectivity-Id': connectivityInstanceId,
                'Authorization': 'Bearer ' + accessToken
            })
            .forever(true)
            .send({
                "userIdList" : userIds
            })
            .end(function (response){
                var new_time = new Date();
                var seconds_passed = new_time - old_time;
                if (config.debug) console.log("time spent: " + seconds_passed);
                if (response.status == 200) {
                    options.success(response.body);
                }
                else {
                    options.error({
                        responseCode: response.status,
                        responseBody: response.body
                    });
                }
                sentry.checkAPICall("connectivity", connectivityInstanceId, "CHECK_USERS_STATUS",
                    response.status, response.body, seconds_passed, url, "POST");
            });
    },

    sendChatAsPushToUser: function(accessToken, connectivityInstanceId, receiverUserId, message, options) {
        var old_time = new Date();
        var url = config.backtory.connectivityApi + "chat/push/";
        unirest.post(url)
            .headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Backtory-Connectivity-Id': connectivityInstanceId,
                'Authorization': 'Bearer ' + accessToken
            })
            .forever(true)
            .send({
                "userId": receiverUserId,
                "message": message
            })
            .end(function (response){
                var new_time = new Date();
                var seconds_passed = new_time - old_time;
                if (config.debug) console.log("time spent: " + seconds_passed);
                if (response.status == 200) {
                    options.success();
                }
                else {
                    options.error({
                        responseCode: response.status,
                        responseBody: response.body
                    });
                }
                sentry.checkAPICall("connectivity", connectivityInstanceId, "CHAT_PUSH",
                    response.status, response.body, seconds_passed, url, "POST");
            });
    },

    sendChatFromUserToUser: function(accessToken, connectivityInstanceId, senderUserId, receiverUserId, message, options) {
        var old_time = new Date();
        var url = config.backtory.connectivityApi + "chat/send/";
        unirest.post(url)
            .headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Backtory-Connectivity-Id': connectivityInstanceId,
                'X-Backtory-User-Id': senderUserId,
                'Authorization': 'Bearer ' + accessToken
            })
            .forever(true)
            .send({
                "userId": receiverUserId,
                "message": message
            })
            .end(function (response){
                var new_time = new Date();
                var seconds_passed = new_time - old_time;
                if (config.debug) console.log("time spent: " + seconds_passed);
                if (response.status == 200) {
                    options.success();
                }
                else {
                    options.error({
                        responseCode: response.status,
                        responseBody: response.body
                    });
                }
                sentry.checkAPICall("connectivity", connectivityInstanceId, "CHAT_SEND",
                    response.status, response.body, seconds_passed, url, "POST");
            });
    },

    sendChatAsPushToGroup: function(accessToken, connectivityInstanceId, groupId, message, options) {
        var old_time = new Date();
        var url = config.backtory.connectivityApi + "chat/group/push/";
        unirest.post(url)
            .headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Backtory-Connectivity-Id': connectivityInstanceId,
                'Authorization': 'Bearer ' + accessToken
            })
            .forever(true)
            .send({
                "groupId": groupId,
                "message": message
            })
            .end(function (response){
                var new_time = new Date();
                var seconds_passed = new_time - old_time;
                if (config.debug) console.log("time spent: " + seconds_passed);
                if (response.status == 200) {
                    options.success();
                }
                else {
                    options.error({
                        responseCode: response.status,
                        responseBody: response.body
                    });
                }
                sentry.checkAPICall("connectivity", connectivityInstanceId, "CHAT_GROUP_PUSH",
                    response.status, response.body, seconds_passed, url, "POST");
            });
    },

    sendChatFromUserToGroup: function(accessToken, connectivityInstanceId, senderUserId, groupId, message, options) {
        var old_time = new Date();
        var url = config.backtory.connectivityApi + "chat/group/send/";
        unirest.post(url)
            .headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Backtory-Connectivity-Id': connectivityInstanceId,
                'X-Backtory-User-Id': senderUserId,
                'Authorization': 'Bearer ' + accessToken
            })
            .forever(true)
            .send({
                "groupId": groupId,
                "message": message
            })
            .end(function (response){
                var new_time = new Date();
                var seconds_passed = new_time - old_time;
                if (config.debug) console.log("time spent: " + seconds_passed);
                if (response.status == 200) {
                    options.success();
                }
                else {
                    options.error({
                        responseCode: response.status,
                        responseBody: response.body
                    });
                }
                sentry.checkAPICall("connectivity", connectivityInstanceId, "CHAT_GROUP_SEND",
                    response.status, response.body, seconds_passed, url, "POST");
            });
    },


    // chat group methods

    createChatGroup: function(accessToken, connectivityInstanceId, name, type, owner, options) {
        var old_time = new Date();
        var url = config.backtory.connectivityApi + "chat/group/create/";
        unirest.post(url)
            .headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Backtory-Connectivity-Id': connectivityInstanceId,
                'X-Backtory-User-Id': owner,
                'Authorization': 'Bearer ' + accessToken
            })
            .forever(true)
            .send({
                "name": name,
                "type": type
            })
            .end(function (response){
                var new_time = new Date();
                var seconds_passed = new_time - old_time;
                if (config.debug) console.log("time spent: " + seconds_passed);
                if (response.status == 200) {
                    options.success(response.body.groupId);
                }
                else {
                    options.error({
                        responseCode: response.status,
                        responseBody: response.body
                    });
                }
                sentry.checkAPICall("connectivity", connectivityInstanceId, "CREATE_CHAT_GROUP",
                    response.status, response.body, seconds_passed, url, "POST");
            });
    },

    addOwnerToChatGroup: function(accessToken, connectivityInstanceId, groupId, owner, newOwner, options) {
        var old_time = new Date();
        var url = config.backtory.connectivityApi + "chat/group/addOwner/";
        unirest.post(url)
            .headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Backtory-Connectivity-Id': connectivityInstanceId,
                'X-Backtory-User-Id': owner,
                'Authorization': 'Bearer ' + accessToken
            })
            .forever(true)
            .send({
                "groupId": groupId,
                "userId": newOwner
            })
            .end(function (response){
                var new_time = new Date();
                var seconds_passed = new_time - old_time;
                if (config.debug) console.log("time spent: " + seconds_passed);
                if (response.status == 200) {
                    options.success();
                }
                else {
                    options.error({
                        responseCode: response.status,
                        responseBody: response.body
                    });
                }
                sentry.checkAPICall("connectivity", connectivityInstanceId, "ADD_OWNER_CHAT_GROUP",
                    response.status, response.body, seconds_passed, url, "POST");
            });
    },

    addMemberAsOwnerToChatGroup: function(accessToken, connectivityInstanceId, groupId, owner, newMember, options) {
        var old_time = new Date();
        var url = config.backtory.connectivityApi + "chat/group/addMember/";
        unirest.post(url)
            .headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Backtory-Connectivity-Id': connectivityInstanceId,
                'X-Backtory-User-Id': owner,
                'Authorization': 'Bearer ' + accessToken
            })
            .forever(true)
            .send({
                "groupId": groupId,
                "userId": newMember,
                "addAsOwner": true
            })
            .end(function (response){
                var new_time = new Date();
                var seconds_passed = new_time - old_time;
                if (config.debug) console.log("time spent: " + seconds_passed);
                if (response.status == 200) {
                    options.success();
                }
                else {
                    options.error({
                        responseCode: response.status,
                        responseBody: response.body
                    });
                }
                sentry.checkAPICall("connectivity", connectivityInstanceId, "ADD_MEMBER_AS_OWNER_CHAT_GROUP",
                    response.status, response.body, seconds_passed, url, "POST");
            });
    },

    addMemberToChatGroup: function(accessToken, connectivityInstanceId, groupId, owner, newMember, options) {
        var old_time = new Date();
        var url = config.backtory.connectivityApi + "chat/group/addMember/";
        unirest.post(url)
            .headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Backtory-Connectivity-Id': connectivityInstanceId,
                'X-Backtory-User-Id': owner,
                'Authorization': 'Bearer ' + accessToken
            })
            .forever(true)
            .send({
                "groupId": groupId,
                "userId": newMember
            })
            .end(function (response){
                var new_time = new Date();
                var seconds_passed = new_time - old_time;
                if (config.debug) console.log("time spent: " + seconds_passed);
                if (response.status == 200) {
                    options.success();
                }
                else {
                    options.error({
                        responseCode: response.status,
                        responseBody: response.body
                    });
                }
                sentry.checkAPICall("connectivity", connectivityInstanceId, "ADD_MEMBER_CHAT_GROUP",
                    response.status, response.body, seconds_passed, url, "POST");
            });
    },

    removeMemberFromChatGroup: function(accessToken, connectivityInstanceId, groupId, owner, toBeRemoved, options) {
        var old_time = new Date();
        var url = config.backtory.connectivityApi + "chat/group/removeMember/";
        unirest.post(url)
            .headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Backtory-Connectivity-Id': connectivityInstanceId,
                'X-Backtory-User-Id': owner,
                'Authorization': 'Bearer ' + accessToken
            })
            .forever(true)
            .send({
                "groupId": groupId,
                "userId": toBeRemoved
            })
            .end(function (response){
                var new_time = new Date();
                var seconds_passed = new_time - old_time;
                if (config.debug) console.log("time spent: " + seconds_passed);
                if (response.status == 200) {
                    options.success();
                }
                else {
                    options.error({
                        responseCode: response.status,
                        responseBody: response.body
                    });
                }
                sentry.checkAPICall("connectivity", connectivityInstanceId, "REMOVE_MEMBER_CHAT_GROUP",
                    response.status, response.body, seconds_passed, url, "POST");
            });
    },

    sendMasterDirect: function(accessToken, connectivityInstanceId, matchId, userId, message, data, options) {
        var old_time = new Date();
        var url = config.backtory.connectivityApi + "challenge/" + matchId + "/user/" + userId + "/";
        unirest.post(url)
            .headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Backtory-Connectivity-Id': connectivityInstanceId,
                'Authorization': 'Bearer ' + accessToken
            })
            .forever(true)
            .send({
                "message": message,
                "data": data
            })
            .end(function (response){
                var new_time = new Date();
                var seconds_passed = new_time - old_time;
                if (config.debug) console.log("time spent: " + seconds_passed);
                if (response.status == 200) {
                    options.success();
                }
                else {
                    options.error({
                        responseCode: response.status,
                        responseBody: response.body
                    });
                }
                sentry.checkAPICall("connectivity", connectivityInstanceId, "CHALLENGE_DIRECT",
                    response.status, response.body, seconds_passed, url, "POST");
            });
    },

    sendMasterPush: function(accessToken, connectivityInstanceId, matchId, message, data, options) {
        var old_time = new Date();
        var url = config.backtory.connectivityApi + "challenge/" + matchId + "/push/";
        unirest.post(url)
            .headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Backtory-Connectivity-Id': connectivityInstanceId,
                'Authorization': 'Bearer ' + accessToken
            })
            .forever(true)
            .send({
                "message": message,
                "data": data
            })
            .end(function (response){
                var new_time = new Date();
                var seconds_passed = new_time - old_time;
                if (config.debug) console.log("time spent: " + seconds_passed);
                if (response.status == 200) {
                    options.success();
                }
                else {
                    options.error({
                        responseCode: response.status,
                        responseBody: response.body
                    });
                }
                sentry.checkAPICall("connectivity", connectivityInstanceId, "CHALLENGE_PUSH",
                    response.status, response.body, seconds_passed, url, "POST");
            });
    },

    sendMasterPushBulk: function(accessToken, connectivityInstanceId, bulk, options) {
        var old_time = new Date();
        var url = config.backtory.connectivityApi + "challenge/push-bulk/";
        unirest.post(url)
            .headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Backtory-Connectivity-Id': connectivityInstanceId,
                'Authorization': 'Bearer ' + accessToken
            })
            .forever(true)
            .send({
                "challengeMessages": bulk
            })
            .end(function (response){
                var new_time = new Date();
                var seconds_passed = new_time - old_time;
                if (config.debug) console.log("time spent: " + seconds_passed);
                if (response.status == 200) {
                    options.success();
                }
                else {
                    options.error({
                        responseCode: response.status,
                        responseBody: response.body
                    });
                }
                sentry.checkAPICall("connectivity", connectivityInstanceId, "CHALLENGE_PUSH_BULK",
                    response.status, response.body, seconds_passed, url, "POST");
            });
    },

    sendEventPush: function(accessToken, connectivityInstanceId, matchId, userId, message, data, options) {
        var old_time = new Date();
        var url = config.backtory.connectivityApi + "challenge/" + matchId + "/event-push/";
        unirest.post(url)
            .headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Backtory-Connectivity-Id': connectivityInstanceId,
                'Authorization': 'Bearer ' + accessToken
            })
            .forever(true)
            .send({
                "userId": userId,
                "message": message,
                "data": data
            })
            .end(function (response){
                var new_time = new Date();
                var seconds_passed = new_time - old_time;
                if (config.debug) console.log("time spent: " + seconds_passed);
                sentry.checkAPICall("connectivity", connectivityInstanceId, "CHALLENGE_PUSH_EVENT",
                    response.status, response.body, seconds_passed, url, "POST");
                if (response.status == 200) {
                    options.success();
                }
                else {
                    options.error({
                        responseCode: response.status,
                        responseBody: response.body
                    });
                }
            });
    },

    sendEventPushBulk: function(accessToken, connectivityInstanceId, bulk, options) {
        var old_time = new Date();
        var url = config.backtory.connectivityApi + "challenge/event-push-bulk/";
        unirest.post(url)
            .headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Backtory-Connectivity-Id': connectivityInstanceId,
                'Authorization': 'Bearer ' + accessToken
            })
            .forever(true)
            .send({
                "challengeEventMessages": bulk
            })
            .end(function (response){
                var new_time = new Date();
                var seconds_passed = new_time - old_time;
                if (config.debug) console.log("time spent: " + seconds_passed);
                sentry.checkAPICall("connectivity", connectivityInstanceId, "CHALLENGE_PUSH_EVENT_BULK",
                    response.status, response.body, seconds_passed, url, "POST");
                if (response.status == 200) {
                    options.success();
                }
                else {
                    options.error({
                        responseCode: response.status,
                        responseBody: response.body
                    });
                }
            });
    },

    sendMatchResult: function(accessToken, connectivityInstanceId, matchId, winners, options) {
        var old_time = new Date();
        var url = config.backtory.connectivityApi + "challenge/" + matchId + "/result/";
        unirest.post(url)
            .headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Backtory-Connectivity-Id': connectivityInstanceId,
                'Authorization': 'Bearer ' + accessToken
            })
            .forever(true)
            .send({
                "winners" : winners
            })
            .end(function (response){
                var new_time = new Date();
                var seconds_passed = new_time - old_time;
                if (config.debug) console.log("time spent: " + seconds_passed);
                if (response.status == 200) {
                    options.success(response.body);
                }
                else {
                    options.error({
                        responseCode: response.status,
                        responseBody: response.body
                    });
                }
                sentry.checkAPICall("connectivity", connectivityInstanceId, "SEND_MATCH_RESULT",
                    response.status, response.body, seconds_passed, url, "POST");
            });
    },

    setMatchProperties: function(accessToken, connectivityInstanceId, matchId, properties, options) {
        var old_time = new Date();
        var url = config.backtory.connectivityApi + "challenge/" + matchId + "/match-properties/";
        unirest.post(url)
            .headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Backtory-Connectivity-Id': connectivityInstanceId,
                'Authorization': 'Bearer ' + accessToken
            })
            .forever(true)
            .send({
                "properties" : properties
            })
            .end(function (response){
                var new_time = new Date();
                var seconds_passed = new_time - old_time;
                if (config.debug) console.log("time spent: " + seconds_passed);
                if (response.status == 200) {
                    options.success(response.body);
                }
                else {
                    options.error({
                        responseCode: response.status,
                        responseBody: response.body
                    });
                }
                sentry.checkAPICall("connectivity", connectivityInstanceId, "SET_MATCH_PROPERTIES",
                    response.status, response.body, seconds_passed, url, "POST");
            });
    },

    getMatchProperties: function(accessToken, connectivityInstanceId, matchId, options) {
        var old_time = new Date();
        var url = config.backtory.connectivityApi + "challenge/" + matchId + "/match-properties/";
        unirest.get(url)
            .headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Backtory-Connectivity-Id': connectivityInstanceId,
                'Authorization': 'Bearer ' + accessToken
            })
            .forever(true)
            .end(function (response){
                var new_time = new Date();
                var seconds_passed = new_time - old_time;
                if (config.debug) console.log("time spent: " + seconds_passed);
                if (response.status == 200) {
                    options.success(response.body);
                }
                else {
                    options.error({
                        responseCode: response.status,
                        responseBody: response.body
                    });
                }
                sentry.checkAPICall("connectivity", connectivityInstanceId, "GET_MATCH_PROPERTIES",
                    response.status, response.body, seconds_passed, url, "GET");
            });
    },

    getMatchInfo: function(accessToken, connectivityInstanceId, matchId, options) {
        var old_time = new Date();
        var url = config.backtory.connectivityApi + "challenge/" + matchId;
        unirest.get(url)
            .headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Backtory-Connectivity-Id': connectivityInstanceId,
                'Authorization': 'Bearer ' + accessToken
            })
            .forever(true)
            .end(function (response){
                var new_time = new Date();
                var seconds_passed = new_time - old_time;
                if (config.debug) console.log("time spent: " + seconds_passed);
                if (response.status == 200) {
                    options.success(response.body);
                }
                else {
                    options.error({
                        responseCode: response.status,
                        responseBody: response.body
                    });
                }
                sentry.checkAPICall("connectivity", connectivityInstanceId, "GET_MATCH_PROPERTIES",
                    response.status, response.body, seconds_passed, url, "GET");
            });
    },

    addPlayerToMatch: function(accessToken, connectivityInstanceId, matchId, userId, options) {
        var old_time = new Date();
        var url = config.backtory.connectivityApi + "challenge/" + matchId + "/add-player/";
        unirest.post(url)
            .headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Backtory-Connectivity-Id': connectivityInstanceId,
                'Authorization': 'Bearer ' + accessToken
            })
            .forever(true)
            .send({
                "userId" : userId
            })
            .end(function (response){
                var new_time = new Date();
                var seconds_passed = new_time - old_time;
                if (config.debug) console.log("time spent: " + seconds_passed);
                if (response.status == 200) {
                    options.success(response.body);
                }
                else {
                    options.error({
                        responseCode: response.status,
                        responseBody: response.body
                    });
                }
                sentry.checkAPICall("connectivity", connectivityInstanceId, "GET_MATCH_PROPERTIES",
                    response.status, response.body, seconds_passed, url, "GET");
            });
    }
};
