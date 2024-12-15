const express = require("express");
const {
  getAllTransactions,
} = require("../controllers_admin/riwayatPenitipanAdmin_controllers");
const router = express.Router();

// Rute untuk mendapatkan semua transaksi
router.get("/riwayat", getAllTransactions);

module.exports = router;
