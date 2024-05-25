const uuid = require("uuid");
const post = require("../../models/post");
const getUserId = require("../../utils/getUserId");

const createPost = async (req, res) => {
    const { title, content, username, time, likes, likeCount, commentCount, comments } = req.body;

    const postId = uuid.v4();
    const userId = await getUserId(username);

    const newPost = new post({
        title: title,
        postId: postId,
        content: content,
        userId: userId,
        time: time,
        likes: likes,
        likeCount: likeCount,
        commentCount: commentCount,
        comments: comments,
    });

    const foundPost = await post.findOne({ userId: userId, title: title });
    if (foundPost) {
        return res.status(400).json({ message: "You already created a post with this title." });
    }

    try {
        await newPost.save();
        res.status(200).json({ message: "Post successfully created." });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error. Please try again later.",
        });
    }
};

module.exports = { createPost };
