const express = require("express");
const router = express.Router();
const controller = require("../controllers/createCommentController");

router.post("/create-comment", controller.createComment);

module.exports = router;
