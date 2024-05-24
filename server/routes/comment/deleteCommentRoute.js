const express = require("express");
const router = express.Router();
const controller = require("../../controllers/comment/deleteCommentController");
const authenticateToken = require("../../middleware/authenticateToken");

router.delete("/comment/:commentId", authenticateToken, controller.deleteComment);

module.exports = router;
