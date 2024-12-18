const express = require("express");
const {
  getUserTransactionHistory,
  updateUserTransactionReview,
} = require("../controllers_user/riwayatPenitipanUser_controllers");

const router = express.Router();

router.get("/riwayat/:userId", getUserTransactionHistory);
router.put("/riwayat/:barangId", updateUserTransactionReview); // Rute untuk memperbarui ulasan

module.exports = router;
