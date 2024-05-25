const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    postId: { type: String, required: true, unique: true },
    userId: { type: String, required: true, ref: "users" },
    // image: String,
    time: Date,
    likeCount: Number,
    likes: Array,
    commentCount: Number,
    comments: Array,
});

module.exports = mongoose.model("posts", postSchema);
