var Promise = require("bluebird");

var gamePromisified = module.exports = function (game) {

    game.Event.prototype.sendFromUserAsync = function(userId) {
        return new Promise(function(resolve, reject) {
            game.Event.prototype.sendFromUser(userId, {"success": resolve, "error": reject});
        });
    };

    game.LeaderBoard.prototype.getUserRankAsync = function(userId) {
        return new Promise(function(resolve, reject) {
            game.LeaderBoard.prototype.getUserRank(userId, {"success": resolve, "error": reject});
        });
    };

    game.LeaderBoard.prototype.getAroundUserAsync = function(userId, count) {
        return new Promise(function(resolve, reject) {
            game.LeaderBoard.prototype.getAroundUser(userId, count, {"success": resolve, "error": reject});
        });
    };

    game.LeaderBoard.prototype.getTopUsersAsync = function(count) {
        return new Promise(function(resolve, reject) {
            game.LeaderBoard.prototype.getTopUsers(count, {"success": resolve, "error": reject});
        });
    };

    game.LeaderBoard.prototype.getTopUsersWithPaginationAsync = function(page, count) {
        return new Promise(function(resolve, reject) {
            game.LeaderBoard.prototype.getTopUsersWithPagination(page, count, {"success": resolve, "error": reject});
        });
    };

    game.LeaderBoard.prototype.getUserLeaderBoardsAsync = function(userId) {
        return new Promise(function(resolve, reject) {
            game.LeaderBoard.prototype.getUserLeaderBoards(userId, {"success": resolve, "error": reject});
        });
    };

    game.LeaderBoard.prototype.getUsersScoreAsync = function(usersScore) {
        return new Promise(function(resolve, reject) {
            game.LeaderBoard.prototype.getUsersScore(usersScore, {"success": resolve, "error": reject});
        });
    };

    game.LeaderBoard.prototype.updateScoreAsync = function(userId, scores) {
        return new Promise(function(resolve, reject) {
            game.LeaderBoard.prototype.updateScore(userId, scores, {"success": resolve, "error": reject});
        });
    };

};

