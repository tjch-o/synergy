const bcrypt = require("bcrypt");
const user = require("../models/user");

const deleteAccount = async (req, res) => {
    const { userId, password } = req.body;
    const foundUser = await user.findOne({ username: username });

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

    await user.deleteOne({ userId: userId });
    return res.status(200).json({ message: "Account deleted successfully." });
};

module.exports = { deleteAccount };
