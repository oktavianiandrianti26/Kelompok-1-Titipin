// routes_user/paymentUser_routes.js
const express = require("express");
const router = express.Router();
const {
  createPayment,
} = require("../controllers_user/paymentUser_controllers");

// Rute untuk membuat transaksi
router.post("/payment", createPayment);

module.exports = router;
