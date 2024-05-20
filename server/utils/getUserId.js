const user = require("../models/user");

const getUserId = async (username) => {
    const foundUser = await user.findOne({ username: username });
    if (!foundUser) {
        return null;
    }
    return foundUser.userId;
};

module.exports = getUserId;
