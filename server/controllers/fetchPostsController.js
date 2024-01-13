const post = require("../models/post");

const fetchPosts = async (req, res) => {
    const posts = await post.find();
    try {
        return res.status(200).json({ posts });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { fetchPosts };
