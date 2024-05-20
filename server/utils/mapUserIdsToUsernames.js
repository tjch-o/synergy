const user = require("../models/user");

const mapUserIdsToUsernames = async () => {
    const users = await user.find();
    const mapping = {};

    users.forEach((user) => {
        mapping[user.userId] = user.username;
    });
    return mapping;
};

module.exports = mapUserIdsToUsernames;
