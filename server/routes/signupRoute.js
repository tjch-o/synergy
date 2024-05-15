const express = require("express");
const router = express.Router();
const controller = require("../controllers/signupController");

router.post("/user", controller.signUp);

module.exports = router;
