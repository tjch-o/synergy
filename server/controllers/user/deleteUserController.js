const bcrypt = require("bcryptjs");
const user = require("../../models/user");
const post = require("../../models/post");
const comment = require("../../models/comment");
const getUserId = require("../../utils/getUserId");

const deleteUser = async (req, res) => {
    const { username } = req.params;
    const { password } = req.body;

    const foundUser = await user.findOne({ username: username });

    if (!foundUser) {
        return res.status(404).json({ message: "User not found." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, foundUser.passwordHash);

    if (!isPasswordCorrect) {
        return res.status(401).json({ message: "Invalid credentials." });
    }

    const userId = await getUserId(username);

    await user.deleteOne({ username });
    await post.deleteMany({ userId });
    await comment.deleteMany({ userId });
    return res.status(200).json({ message: "Account deleted successfully." });
};

module.exports = { deleteUser };
