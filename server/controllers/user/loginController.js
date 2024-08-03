const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../../models/user");

const login = async (req, res) => {
    const { username, password } = req.body;
    const foundUser = await user.findOne({ username: username });

    if (!foundUser) {
        return res.status(404).json({ message: "User not found." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, foundUser.passwordHash);

    if (!isPasswordCorrect) {
        return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign({ userId: foundUser.userId }, process.env.SECRET, {
        expiresIn: "1h",
    });

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
    });

    return res.status(200).json({
        message: "Login successful.",
        username: foundUser.username,
        token: token,
    });
};

module.exports = { login };
