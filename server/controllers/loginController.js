const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../models/user");

const login = async (req, res) => {
    const { username, password } = req.body;
    const foundUser = await user.findOne({ username: username });

    if (!foundUser) {
        return res.status(404).json({ message: "User not found." });
    }

    // compare passwordHash with passwordHash in database
    const isPasswordCorrect = await bcrypt.compare(
        password,
        foundUser.passwordHash,
    );

    if (!isPasswordCorrect) {
        return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign({ userId: foundUser.userId }, process.env.SECRET, {
        expiresIn: "1m",
    });

    // cannot send both a json response and a token seperately
    return res.status(200).json({
        message: "Login successful.",
        loggedUsername: foundUser.username,
        loggedUserId: foundUser.userId,
        token: token,
    });
};

module.exports = { login };
