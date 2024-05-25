const post = require("../../models/post");
const getUserId = require("../../utils/getUserId");

const likePost = async (req, res) => {
    const { postId } = req.params;
    const { username } = req.body;

    try {
        if (!username) {
            return res.status(400).json({ message: "Username is required" });
        }

        const foundPost = await post.findOne({ postId });
        const userId = await getUserId(username);

        if (!foundPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (foundPost.likes.includes(userId)) {
            return res.status(400).json({ message: "Post already liked" });
        }

        await post.updateOne(
            { postId: postId },
            { $push: { likes: userId }, $inc: { likeCount: 1 } },
        );

        return res.status(200).json({ message: "Post liked" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { likePost };
