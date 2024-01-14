const post = require("../models/post");
const user = require("../models/user");

const fetchPosts = async (req, res) => {
    // a join query with mongoose results in circular dependencies
    const posts = await post.find();
    const users = await user.find();

    const usernamesOnly = {};
    users.forEach((user) => {
        usernamesOnly[user.userId] = user.username;
    });

    const postsWithUsernames = posts.map((post) => {
        return {
            ...post.toObject(),
            username: usernamesOnly[post.userId],
        };
    });

    try {
        return res.status(200).json({ postsWithUsernames });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { fetchPosts };
