const comment = require("../../models/comment");
const post = require("../../models/post");
const getUserId = require("../../utils/getUserId");

const deleteComment = async (req, res) => {
    const { commentId } = req.params;
    const { username } = req.body;

    const foundComment = await comment.findOne({ commentId: commentId });

    if (!foundComment) {
        return res.status(404).json({ message: "Comment not found." });
    }

    const userId = await getUserId(username);

    if (foundComment.userId != userId) {
        return res.status(401).json({ message: "You are not authorized to delete this comment." });
    }

    await comment.deleteOne({ commentId: commentId });
    await post.updateOne(
        { postId: foundComment.postId },
        { $pull: { comments: commentId }, $inc: { commentCount: -1 } },
    );
    return res.status(200).json({ message: "Comment deleted successfully." });
};

module.exports = { deleteComment };
