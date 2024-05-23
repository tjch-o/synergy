const express = require("express");
const router = express.Router();
const controller = require("../../controllers/user/logoutController");
const authenticateToken = require("../../middleware/authenticateToken");

router.post("/logout", authenticateToken, controller.logout);

module.exports = router;
