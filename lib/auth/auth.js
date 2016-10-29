var config = require('./../config');
var authRest = require('./rest/authRest');

var auth = module.exports = {
    common: null,

    init: function (common) {
        auth.common = common;
        require("./authPromisified")(auth);
    },

    Users: function Users() {
    }
};

auth.Users.signUp = function (userInfo, options) {
    if ((typeof userInfo != "object") || (Object.keys(userInfo).length == 0)) {
        throw new Error("First argument of method 'signUp' (userInfo) must be a valid json.")
    }
    auth.common.getInstance("auth", function (authInstanceId) {
        authRest.signUp(authInstanceId, userInfo, {
            success: function(userInfo) {
                if (options && options.success) {
                    options.success(userInfo);
                }
            },
            error: function(error) {
                if (options && options.error) options.error(error);
            }
        });
    });
};

auth.Users.guestSignUp = function (options) {
    auth.common.getInstance("auth", function (authInstanceId) {
        authRest.guestSignUp(authInstanceId, {
            success: function(userInfo) {
                if (options && options.success) {
                    options.success(userInfo);
                }
            },
            error: function(error) {
                if (options && options.error) options.error(error);
            }
        });
    });
};


auth.Users.completeGuestRegistration = function (userInfo, options) {
    if ((typeof userInfo != "object") || (Object.keys(userInfo).length == 0)) {
        throw new Error("Second argument of method 'update' (userInfo) must be a valid json.")
    }
    auth.common.getInstance("auth", function (authInstanceId) {
        auth.common.getAccessToken({
            error: function (error1) {
                if (options && options.error) options.error(error1);
            },
            success: function (accessToken) {
                authRest.completeGuestRegistration(accessToken, authInstanceId, userInfo, {
                    success: function(userInfo) {
                        if (options && options.success) {
                            options.success(userInfo);
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

auth.Users.update = function (userId, userInfo, options) {
    if ((typeof userId != "string") || !(userId)) {
        throw new Error("First argument of method 'update' (userId) must be a valid string.")
    }
    if ((typeof userInfo != "object") || (Object.keys(userInfo).length == 0)) {
        throw new Error("Second argument of method 'update' (userInfo) must be a valid json.")
    }
    auth.common.getInstance("auth", function (authInstanceId) {
        auth.common.getAccessToken({
            error: function (error1) {
                if (options && options.error) options.error(error1);
            },
            success: function (accessToken) {
                authRest.update(accessToken, authInstanceId, userId, userInfo, {
                    success: function(userInfo) {
                        if (options && options.success) {
                            options.success(userInfo);
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

auth.Users.search = function (word, page, pageSize, options) {
    if ((typeof word != "string") || !(word)) {
        throw new Error("First argument of method 'search' (search key) must be a valid string.")
    }
    if (typeof page != "number") {
        throw new Error("Second argument of method 'search' (page number) must be a valid string.")
    }
    if (typeof pageSize != "number") {
        throw new Error("Third argument of method 'search' (page size) must be a valid string.")
    }
    auth.common.getInstance("auth", function (authInstanceId) {
        auth.common.getAccessToken({
            error: function (error1) {
                if (options && options.error) options.error(error1);
            },
            success: function (accessToken) {
                authRest.search(accessToken, authInstanceId, word, page, pageSize, {
                    success: function(response) {
                        if (options && options.success) {
                            options.success(response.users, response.userCount);
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

auth.Users.count = function (options) {
    auth.common.getInstance("auth", function (authInstanceId) {
        auth.common.getAccessToken({
            error: function (error1) {
                if (options && options.error) options.error(error1);
            },
            success: function (accessToken) {
                authRest.count(accessToken, authInstanceId, {
                    success: function(count) {
                        if (options && options.success) {
                            options.success(count.numberOfUser);
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

auth.Users.getByUserName = function (username, options) {
    if ((typeof username != "string") || !(username)) {
        throw new Error("First argument of method 'getByUserName' (username) must be a valid string.")
    }
    auth.common.getInstance("auth", function (authInstanceId) {
        auth.common.getAccessToken({
            error: function (error1) {
                if (options && options.error) options.error(error1);
            },
            success: function (accessToken) {
                authRest.getByUserName(username, accessToken, authInstanceId, {
                    success: function(userInfo) {
                        if (options && options.success) {
                            options.success(userInfo);
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

auth.Users.getByUserId = function (userId, options) {
    if ((typeof userId != "string") || !(userId)) {
        throw new Error("First argument of method 'getByUserId' (userId) must be a valid string.")
    }
    auth.common.getInstance("auth", function (authInstanceId) {
        auth.common.getAccessToken({
            error: function (error1) {
                if (options && options.error) options.error(error1);
            },
            success: function (accessToken) {
                authRest.getByUserId(userId, accessToken, authInstanceId, {
                    success: function(userInfo) {
                        if (options && options.success) {
                            options.success(userInfo);
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


auth.Users.getByUserIds = function (userIds, options) {
    if (!(userIds) || !(Array.isArray(userIds)) || (userIds.length == 0)) {
        throw new Error("First argument of method 'getByUserIds' (userIds) must be a valid Array.")
    }
    auth.common.getInstance("auth", function (authInstanceId) {
        auth.common.getAccessToken({
            error: function (error1) {
                if (options && options.error) options.error(error1);
            },
            success: function (accessToken) {
                authRest.getByUserIds(userIds, accessToken, authInstanceId, {
                    success: function(userInfos) {
                        if (options && options.success) {
                            options.success(userInfos.users);
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

auth.Users.delete = function (userId, options) {
    if ((typeof userId != "string") || !(userId)) {
        throw new Error("First argument of method 'delete' (userId) must be a valid string.")
    }
    auth.common.getInstance("auth", function (authInstanceId) {
        auth.common.getAccessToken({
            error: function (error1) {
                if (options && options.error) options.error(error1);
            },
            success: function (accessToken) {
                authRest.delete(userId, accessToken, authInstanceId, {
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