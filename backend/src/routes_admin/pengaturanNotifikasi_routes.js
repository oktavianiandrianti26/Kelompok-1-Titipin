const express = require("express");
const router = express.Router();
const { sendNotification } = require("../controllers_admin/pengaturanNotifikasi_controllers");

router.post("/send-notification", sendNotification);

module.exports = router;
