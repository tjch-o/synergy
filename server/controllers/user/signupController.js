const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const user = require("../../models/user");

const saltRounds = 10;

const signUp = async (req, res) => {
    const { username, name, email, password } = req.body;

    // generate a unique userId
    const userId = uuid.v4();
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = new user({
        username: username,
        userId: userId,
        name: name,
        email: email,
        passwordHash: passwordHash,
    });

    try {
        await newUser.save();
        const token = jwt.sign({ userId: userId }, process.env.SECRET, {
            expiresIn: "1h",
        });

        return res.status(200).json({
            message: "Account created successfully.",
            username: newUser.username,
            token: token,
        });
    } catch (error) {
        console.error(error);
        dupKeyErrorCode = 11000;
        if (error.code === dupKeyErrorCode) {
            return res.status(409).json({
                message: "Username or email already exists.",
            });
        } else {
            return res.status(500).json({
                message: "Internal server error. Please try again later.",
            });
        }
    }
};

module.exports = { signUp };
