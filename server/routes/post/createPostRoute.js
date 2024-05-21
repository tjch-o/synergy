const express = require("express");
const router = express.Router();
const controller = require("../../controllers/post/createPostController");
const authenticateToken = require("../../middleware/authenticateToken");

router.post("/post", authenticateToken, controller.createPost);

module.exports = router;
