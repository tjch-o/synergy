const express = require("express");
const router = express.Router();
const controller = require("../../controllers/comment/getCommentController");
const authenticateToken = require("../../middleware/authenticateToken");

router.get("/comment/:commentId", authenticateToken, controller.getComment);

module.exports = router;
