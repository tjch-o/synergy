const express = require("express");
const router = express.Router();
const controller = require("../controllers/signupController");

router.post("/signup", controller.signUp);

module.exports = router;
