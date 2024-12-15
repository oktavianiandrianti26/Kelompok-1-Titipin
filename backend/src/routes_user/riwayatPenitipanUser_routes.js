const express = require("express");
const {
  getUserTransactionHistory,
  updateUserTransactionReview,
} = require("../controllers_user/riwayatPenitipanUser_controllers");

const router = express.Router();

router.get("/riwayat/:userId", getUserTransactionHistory); //Rute untuk mendapatkan transaksi berdasarkan userId
router.put("/riwayat/:transactionId", updateUserTransactionReview); // Rute untuk memperbarui ulasan

module.exports = router;
