const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    postId: { type: Number, required: true, ref: "posts" },
    userId: { type: Number, required: true, ref: "users" },
    content: String,
    time: Date,
});

module.exports = mongoose.model("comments", commentSchema);
