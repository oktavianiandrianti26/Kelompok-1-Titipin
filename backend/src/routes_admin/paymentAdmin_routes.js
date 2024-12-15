const express = require("express");
const router = express.Router();
const paymentAdminController = require("../controllers_admin/paymentAdmin_controllers");

// Rute untuk mendapatkan semua pembayaran
router.get("/payments", paymentAdminController.getAllPayments);

module.exports = router;
