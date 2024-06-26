const express = require("express");
const router = express.Router();
const controller = require("../../controllers/post/getPostController");
const authenticateToken = require("../../middleware/authenticateToken");

router.get("/post/:postId", authenticateToken, controller.getPost);

module.exports = router;
