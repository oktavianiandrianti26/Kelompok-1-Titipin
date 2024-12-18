const express = require("express");
const {
  getAllHistory,
} = require("../controllers_admin/riwayatPenitipanAdmin_controllers");
const router = express.Router();

router.get("/riwayat", getAllHistory);

module.exports = router;
