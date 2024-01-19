const express = require("express");
const router = express.Router();
const controller = require("../controllers/getPostController");

router.get("/get-post/:id", controller.getPost);

module.exports = router;
