const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    postId: { type: String, required: true, ref: "posts" },
    userId: { type: String, required: true, ref: "users" },
    commentId: { type: String, required: true, unique: true },
    content: String,
    time: Date,
});

module.exports = mongoose.model("comments", commentSchema);
