const comment = require("../../models/comment");
const user = require("../../models/user");

const getComment = async (req, res) => {
    const { commentId } = req.params;

    const foundComment = await comment.findOne({ commentId: commentId });

    if (!foundComment) {
        return res.status(400).json({ message: "Comment does not exist." });
    }

    let commentObj = foundComment.toObject();
    const foundUser = await user.findOne({ userId: foundComment.userId });
    delete commentObj.userId;
    commentObj.username = foundUser.username;

    try {
        res.status(200).json(commentObj);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getComment };
