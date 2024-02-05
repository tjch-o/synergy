const bcrypt = require("bcrypt");
const user = require("../models/user");
const posts = require("../models/post");
const comments = require("../models/comment");

const deleteAccount = async (req, res) => {
    const { userId, password } = req.body;
    const foundUser = await user.findOne({ userId: userId });

    if (!foundUser) {
        return res.status(404).json({ message: "User not found." });
    }

    const isPasswordCorrect = await bcrypt.compare(
        password,
        foundUser.passwordHash,
    );

    if (!isPasswordCorrect) {
        return res.status(401).json({ message: "Invalid credentials." });
    }

    await Promise.all([
        user.deleteOne({ userId: userId }),
        posts.deleteMany({ userId: userId }),
        comments.deleteMany({ userId: userId }),
    ]);

    // after deletion update the comment counts
    const allPosts = await posts.find();
    for (let i = 0; i < allPosts.length; i += 1) {
        const post = allPosts[i];
        post.comments = post.comments.filter(
            (comment) => comment.userId != userId,
        );
        post.commentCount = post.comments.length;
        await post.save();
    }

    return res.status(200).json({ message: "Account deleted successfully." });
};

module.exports = { deleteAccount };
