const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");

router.get("/access-forum", authenticateToken, (req, res) => {
    res.status(200).json({ message: "Access granted" });
});

module.exports = router;
