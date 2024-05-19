const bcrypt = require("bcrypt");
const user = require("../models/user");

const deleteUser = async (req, res) => {
  const { username } = req.params;
  const { password } = req.body;

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

  await user.deleteOne({ username });
  return res.status(200).json({ message: "Account deleted successfully." });
};

module.exports = { deleteUser };
