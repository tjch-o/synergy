const express = require("express");
const router = express.Router();
const controller = require("../controllers/createPostController");

router.post("/createPost", controller.createPost);

module.exports = router;
