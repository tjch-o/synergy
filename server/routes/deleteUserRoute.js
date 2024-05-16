const express = require("express");
const router = express.Router();
const controller = require("../controllers/deleteUserController");
const authenticateToken = require("../middleware/authenticateToken");

router.delete("/user/:username", authenticateToken, controller.deleteUser);

module.exports = router;
