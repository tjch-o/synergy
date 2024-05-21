const post = require("../../models/post");
const user = require("../../models/user");
const mapUserIdsToUsernames = require("../../utils/mapUserIdsToUsernames");

const fetchPosts = async (req, res) => {
    // a join query with mongoose results in circular dependencies
    const allPosts = await post.find();
    const mapping = await mapUserIdsToUsernames();

    const postsWithAssociatedUsernames = allPosts.map((post) => {
        return {
            ...post.toObject(),
            username: mapping[post.userId],
        };
    });

    try {
        return res.status(200).json({ posts: postsWithAssociatedUsernames });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { fetchPosts };
