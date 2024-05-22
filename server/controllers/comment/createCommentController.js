const uuid = require("uuid");
const user = require("../../models/user");
const post = require("../../models/post");
const comment = require("../../models/comment");
const getUserId = require("../../utils/getUserId");

const createComment = async (req, res) => {
    const { username, postId, content, time } = req.body;
    const commentId = uuid.v4();
    const userId = await getUserId(username);

    const newComment = new comment({
        commentId: commentId,
        userId: userId,
        postId: postId,
        content: content,
        time: time,
    });

    const foundUser = await user.findOne({ username: username });

    if (!foundUser) {
        return res.status(400).json({ message: "User does not exist." });
    }

    const foundPost = await post.findOne({ postId: postId });

    if (!foundPost) {
        return res.status(400).json({ message: "Post does not exist." });
    }

    try {
        await newComment.save();

        await post.updateOne(
            { postId: postId },
            { $push: { comments: commentId }, $inc: { commentCount: 1 } },
        );

        res.status(200).json({ message: "Comment successfully created." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createComment };
