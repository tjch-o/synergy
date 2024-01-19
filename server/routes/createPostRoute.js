const express = require("express");
const router = express.Router();
const controller = require("../controllers/createPostController");

router.post("/create-post", controller.createPost);

module.exports = router;
