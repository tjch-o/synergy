const express = require("express");
const router = express.Router();
const controller = require("../controllers/deleteAccountController");

router.post("/delete-account", controller.deleteAccount);

module.exports = router;
