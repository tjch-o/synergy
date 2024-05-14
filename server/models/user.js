const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    userId: { type: String, unique: true },
    name: { type: String },
    passwordHash: { type: String },
    email: { type: String, unique: true },
});

// export the model not an object storing the model
module.exports = mongoose.model("users", userSchema);
