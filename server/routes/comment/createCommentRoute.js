const express = require("express");
const router = express.Router();
const controller = require("../../controllers/comment/createCommentController");
const authenticateToken = require("../../middleware/authenticateToken");

router.post("/comment", authenticateToken, controller.createComment);

module.exports = router;
