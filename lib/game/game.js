var config = require('./../config');
var errors = require('./../errors');
var gameRest = require('./rest/gameRest');

var game = module.exports = {
    common: null,

    init: function (common) {
        game.common = common;
        require("./gamePromisified")(game);
    },

    LeaderBoard: function LeaderBoard(leaderBoardId) {
        if ((typeof leaderBoardId != "string") || !(leaderBoardId)) {
            throw new Error("First argument (leaderBoardId) must be a valid string.")
        }
        this.leaderBoardId = leaderBoardId;
    },

    Event: function Event(eventName) {
        if ((typeof eventName != "string") || !(eventName)) {
            throw new Error("First argument (eventName) must be a valid string.")
        }
        this.eventName = eventName;
        this.fieldsAndValues = [];
    },

    Game: {}
};

game.Event.prototype.add = function (fieldName, value) {
    if ((typeof fieldName != "string") || !(fieldName)) {
        throw new Error("First argument (fieldName) must be a valid string.")
    }
    this.fieldsAndValues.push({"fieldName": fieldName, "value": value});
};

game.Event.prototype.sendFromUser = function (userId, options) {
    if ((typeof userId != "string") || !(userId)) {
        throw new Error("First argument (userId) must be a valid string.")
    }
    var event = this;
    var jsonEvent = {
        "eventName": event.eventName,
        "fieldsAndValues": event.fieldsAndValues
    };
    game.common.getInstance("game", function (gameInstanceId) {
        game.common.getAccessToken({
            error: function (error1) {
                if (options && options.error) options.error(error1);
            },
            success: function (accessToken) {
                gameRest.sendEvent(accessToken, gameInstanceId, userId, jsonEvent, {
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


game.LeaderBoard.prototype.getUserRank = function (userId, options) {
    if (!userId || (typeof userId != "string")) {
        throw new Error("First argument (userId) must be a valid string.")
    }
    var leaderBoardId = this.leaderBoardId;
    game.common.getInstance("game", function (gameInstanceId) {
        game.common.getAccessToken({
            error: function (error1) {
                if (options && options.error) options.error(error1);
            },
            success: function (accessToken) {
                gameRest.getUserRank(accessToken, gameInstanceId, leaderBoardId, userId, {
                    success: function(rank, scores) {
                        if (options && options.success) {
                            options.success(rank, scores);
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

game.LeaderBoard.prototype.getAroundUser = function (userId, count, options) {
    if (!userId || (typeof userId != "string")) {
        throw new Error("First argument (userId) must be a valid string.")
    }
    else if ((typeof count != "number") || (count <= 1)) {
        throw new Error("Second argument (count) must be a positive number greater than 1.")
    }
    var leaderBoardId = this.leaderBoardId;
    game.common.getInstance("game", function (gameInstanceId) {
        game.common.getAccessToken({
            error: function (error1) {
                if (options && options.error) options.error(error1);
            },
            success: function (accessToken) {
                gameRest.getAroundUser(accessToken, gameInstanceId, leaderBoardId, userId, count, {
                    success: function(list) {
                        if (options && options.success) {
                            options.success(list);
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

game.LeaderBoard.prototype.getTopUsers = function (count, options) {
    if ((typeof count != "number") || (count <= 0)) {
        throw new Error("First argument (count) must be a positive number.")
    }
    var leaderBoardId = this.leaderBoardId;
    game.common.getInstance("game", function (gameInstanceId) {
        game.common.getAccessToken({
            error: function (error1) {
                if (options && options.error) options.error(error1);
            },
            success: function (accessToken) {
                gameRest.getTopUsers(accessToken, gameInstanceId, leaderBoardId, count, {
                    success: function(list) {
                        if (options && options.success) {
                            options.success(list);
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

game.LeaderBoard.prototype.getTopUsersWithPagination = function (page, count, options) {
    if ((typeof count != "number") || (page < 0)) {
        throw new Error("First argument (page) must be a positive or zero number.")
    }
    if ((typeof count != "number") || (count <= 0)) {
        throw new Error("Second argument (count) must be a positive number.")
    }
    var leaderBoardId = this.leaderBoardId;
    game.common.getInstance("game", function (gameInstanceId) {
        game.common.getAccessToken({
            error: function (error1) {
                if (options && options.error) options.error(error1);
            },
            success: function (accessToken) {
                gameRest.getTopUsersWithPagination(accessToken, gameInstanceId, leaderBoardId, page, count, {
                    success: function(list) {
                        if (options && options.success) {
                            options.success(list);
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

game.Game.getUserLeaderBoards = function (userId, options) {
    if (!userId || (typeof userId != "string")) {
        throw new Error("First argument (userId) must be a valid string.")
    }
    game.common.getInstance("game", function (gameInstanceId) {
        game.common.getAccessToken({
            error: function (error1) {
                if (options && options.error) options.error(error1);
            },
            success: function (accessToken) {
                gameRest.getUserLeaderBoards(accessToken, gameInstanceId, userId, {
                    success: function(list) {
                        if (options && options.success) {
                            options.success(list.userLeaderbaordsId);
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

game.LeaderBoard.prototype.getUsersScore = function (usersScore, options) {
    if (!usersScore || (!Array.isArray(usersScore)) || (usersScore.length == 0)) {
        throw new Error("Second argument (usersScore) must be a non-empty array.")
    }
    var leaderBoardId = this.leaderBoardId;
    game.common.getInstance("game", function (gameInstanceId) {
        game.common.getAccessToken({
            error: function (error1) {
                if (options && options.error) options.error(error1);
            },
            success: function (accessToken) {
                gameRest.getUsersScore(accessToken, gameInstanceId, leaderBoardId, usersScore, {
                    success: function(list) {
                        if (options && options.success) {
                            options.success(list);
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


game.LeaderBoard.prototype.updateScore = function (userId, scores, options) {
    if (!userId || (typeof userId != "string")) {
        throw new Error("First argument (userId) must be a valid string.")
    }
    if (!scores || (!Array.isArray(scores)) || (scores.length == 0)) {
        throw new Error("Second argument (scores) must be a non-empty array.")
    }
    var leaderBoardId = this.leaderBoardId;
    game.common.getInstance("game", function (gameInstanceId) {
        game.common.getAccessToken({
            error: function (error1) {
                if (options && options.error) options.error(error1);
            },
            success: function (accessToken) {
                gameRest.updateScore(accessToken, gameInstanceId, leaderBoardId, userId, scores, {
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