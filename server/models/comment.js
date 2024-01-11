const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    postId: Number,
    userId: Number,
    content: String,
    time: Date,
});

module.exports = mongoose.model("comments", commentSchema);
