const post = require("../models/post");
const user = require("../models/user");

const getPost = async (req, res) => {
    const { id } = req.params;

    const foundPost = await post.findOne({ postId: id });

    if (foundPost) {
        let foundPostComments = await Promise.all(
            foundPost.comments.map(async (comment) => {
                const commentUserId = comment.userId;
                const commentUser = await user.findOne({
                    userId: commentUserId,
                });
                comment.username = commentUser.username;
                return comment;
            }),
        );

        const foundUserId = foundPost.userId;
        const foundUser = await user.findOne({ userId: foundUserId });

        const foundPostWithUsername = {
            ...foundPost.toObject(),
            comments: foundPostComments,
            username: foundUser.username,
        };

        return res.status(200).json({ foundPostWithUsername });
    } else {
        return res.status(404).json({ message: "Post not found" });
    }
};

module.exports = { getPost };
