const post = require("../models/post");

const getPost = async (req, res) => {
    const { id } = req.params;

    const foundPost = await post.findOne({ postId: id });
    if (foundPost) {
        return res.status(200).json(foundPost);
    } else {
        return res.status(404).json({ message: "Post not found" });
    }
};

module.exports = { getPost };
