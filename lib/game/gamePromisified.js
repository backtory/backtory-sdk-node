var Promise = require("bluebird");

var gamePromisified = module.exports = function (game) {

    game.Event.prototype.sendFromUserAsync = function(userId) {
        var that = this;
        return new Promise(function(resolve, reject) {
            game.Event.prototype.sendFromUser.call(that, userId, {"success": resolve, "error": reject});
        });
    };

    game.LeaderBoard.prototype.getUserRankAsync = function(userId) {
        var that = this;
        return new Promise(function(resolve, reject) {
            game.LeaderBoard.prototype.getUserRank.call(that, userId, {"success": resolve, "error": reject});
        });
    };

    game.LeaderBoard.prototype.getAroundUserAsync = function(userId, count) {
        var that = this;
        return new Promise(function(resolve, reject) {
            game.LeaderBoard.prototype.getAroundUser.call(that, userId, count, {"success": resolve, "error": reject});
        });
    };

    game.LeaderBoard.prototype.getTopUsersAsync = function(count) {
        var that = this;
        return new Promise(function(resolve, reject) {
            game.LeaderBoard.prototype.getTopUsers.call(that, count, {"success": resolve, "error": reject});
        });
    };

    game.LeaderBoard.prototype.getTopUsersWithPaginationAsync = function(page, count) {
        var that = this;
        return new Promise(function(resolve, reject) {
            game.LeaderBoard.prototype.getTopUsersWithPagination.call(that, page, count, {"success": resolve, "error": reject});
        });
    };

    game.LeaderBoard.prototype.getUserLeaderBoardsAsync = function(userId) {
        var that = this;
        return new Promise(function(resolve, reject) {
            game.LeaderBoard.prototype.getUserLeaderBoards.call(that, userId, {"success": resolve, "error": reject});
        });
    };

    game.LeaderBoard.prototype.getUsersScoreAsync = function(usersScore) {
        var that = this;
        return new Promise(function(resolve, reject) {
            game.LeaderBoard.prototype.getUsersScore.call(that, usersScore, {"success": resolve, "error": reject});
        });
    };

    game.LeaderBoard.prototype.updateScoreAsync = function(userId, scores) {
        var that = this;
        return new Promise(function(resolve, reject) {
            game.LeaderBoard.prototype.updateScore.call(that, userId, scores, {"success": resolve, "error": reject});
        });
    };

};

