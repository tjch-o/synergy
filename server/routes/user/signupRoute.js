const express = require("express");
const router = express.Router();
const controller = require("../../controllers/user/signupController");

router.post("/user", controller.signUp);

module.exports = router;
