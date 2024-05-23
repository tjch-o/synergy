const logout = async (req, res) => {
    return res.status(200).json({ message: "Successfully logged out" });
};

module.exports = { logout };
