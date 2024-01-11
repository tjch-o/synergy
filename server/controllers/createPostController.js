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

    console.log(newPost);

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
