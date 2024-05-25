const express = require("express");
const router = express.Router();
const controller = require("../../controllers/post/unlikePostController");
const authenticateToken = require("../../middleware/authenticateToken");

router.delete("/post/like/:postId", authenticateToken, controller.unlikePost);

module.exports = router;
