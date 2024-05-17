const express = require("express");
const router = express.Router();
const controller = require("../controllers/forumPostsController");
const authenticateToken = require("../middleware/authenticateToken");

router.get("/forum-posts", authenticateToken, controller.fetchPosts);

module.exports = router;
