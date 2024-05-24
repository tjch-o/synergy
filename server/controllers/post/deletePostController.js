const post = require("../../models/post");
const comment = require("../../models/comment");
const getUserId = require("../../utils/getUserId");

const deletePost = async (req, res) => {
    const { postId } = req.params;
    const { username } = req.body;

    const foundPost = await post.findOne({ postId });

    if (!foundPost) {
        return res.status(404).json({ message: "Post not found." });
    }

    const userId = await getUserId(username);

    if (foundPost.userId != userId) {
        return res.status(401).json({ message: "You are not authorized to delete this post." });
    }

    await post.deleteOne({ postId });
    await comment.deleteMany({ postId: postId });
    return res.status(200).json({ message: "Post deleted successfully." });
};

module.exports = { deletePost };
