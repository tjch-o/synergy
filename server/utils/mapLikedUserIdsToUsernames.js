const user = require("../models/user");
const mapUserIdsToUsernames = require("./mapUserIdsToUsernames");

const mapLikedUserIdsToUsernames = async (likedUserIds) => {
    const mapping = await mapUserIdsToUsernames();
    const usernames = likedUserIds.map((userId) => mapping[userId]);
    return usernames;
};

module.exports = mapLikedUserIdsToUsernames;
