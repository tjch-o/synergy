const express = require("express");
const router = express.Router();
const controller = require("../../controllers/post/likePostController");
const authenticateToken = require("../../middleware/authenticateToken");

router.post("/post/like/:postId", authenticateToken, controller.likePost);

module.exports = router;
