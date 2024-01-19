const uuid = require("uuid");
const post = require("../models/post");
const comment = require("../models/comment");

const createComment = async (req, res) => {
    const { postId, content, time } = req.body;

    const foundPost = await post.findOne({ postId: postId });

    if (!foundPost) {
        return res.status(404).json({ message: "Post not found" });
    }

    const userId = foundPost.userId;
    const commentId = uuid.v4();

    const newComment = new comment({
        commentId: commentId,
        postId: postId,
        userId: userId,
        content: content,
        time: time,
    });

    try {
        await newComment.save();

        foundPost.comments.push(newComment);
        await foundPost.save();

        res.status(200).json({ message: "Comment created successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error. Please try again later.",
        });
    }
};

module.exports = { createComment };
