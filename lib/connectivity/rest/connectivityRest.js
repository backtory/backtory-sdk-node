var config = require('./../../config');
var unirest = require('unirest');


var rest = module.exports = {

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
            });
    },

    sendBulk: function(accessToken, connectivityInstanceId, bulk, options) {
        var old_time = new Date();
        var url = config.backtory.connectivityApi + "challenge/push-bulk/";
        unirest.post(url)
            .headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Backtory-Connectivity-Id': connectivityInstanceId,
                'Authorization': 'Bearer ' + accessToken
            })
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
            });
    },

    sendEventBulk: function(accessToken, connectivityInstanceId, bulk, options) {
        var old_time = new Date();
        var url = config.backtory.connectivityApi + "challenge/event-push-bulk/";
        unirest.post(url)
            .headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Backtory-Connectivity-Id': connectivityInstanceId,
                'Authorization': 'Bearer ' + accessToken
            })
            .send({
                "challengeEventMessages": bulk
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
            });
    }
};
