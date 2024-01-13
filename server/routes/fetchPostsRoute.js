const express = require("express");
const router = express.Router();
const controller = require("../controllers/fetchPostsController");

router.get("/fetch-posts", controller.fetchPosts);

module.exports = router;
