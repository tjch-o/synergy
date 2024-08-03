const logout = async (req, res) => {
    // clear the cookie
    res.cookie("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
    })

    return res.status(200).json({ message: "Successfully logged out" });
};

module.exports = { logout };
