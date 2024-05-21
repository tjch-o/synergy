const post = require("../../models/post");
const user = require("../../models/user");

const getPost = async (req, res) => {
    const { postId } = req.params;

    const foundPost = await post.findOne({ postId: postId });

    if (!foundPost) {
        return res.status(404).json({ message: "Post not found." });
    }

    let postObj = foundPost.toObject();
    const foundUser = await user.findOne({ userId: foundPost.userId });

    postObj.username = foundUser.username;
    delete postObj.userId;
    return res.status(200).json({ post: postObj });
};

module.exports = { getPost };
