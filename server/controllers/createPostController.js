const uuid = require("uuid");
const post = require("../models/post");

const createPost = async (req, res) => {
    const { title, content, userId, time, likeCount, commentCount, comments } =
        req.body;

    const postId = uuid.v4();

    const newPost = new post({
        title: title,
        postId: postId,
        content: content,
        userId: userId,
        time: time,
        likeCount: likeCount,
        commentCount: commentCount,
        comments: comments,
    });

    // cannot have two posts by the same user with the same title
    const foundPost = await post.findOne({ userId: userId, title: title });
    if (foundPost) {
        return res.status(400).json({ message: "Post already exists." });
    }

    try {
        await newPost.save();
        res.status(200).json({ message: "Post created successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error. Please try again later.",
        });
    }
};

module.exports = { createPost };
