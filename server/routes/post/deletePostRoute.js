const express = require("express");
const router = express.Router();
const controller = require("../../controllers/deletePostController");
const authenticateToken = require("../../middleware/authenticateToken");

router.delete("/post/:postId", authenticateToken, controller.deletePost);

module.exports = router;
