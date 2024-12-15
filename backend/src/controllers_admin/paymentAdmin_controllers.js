const Admin = require("../models/admin_model");
const Barang = require("../models/barang_model");
const Feedback = require("../models/feedback_model");
const Payment = require("../models/payment_model");
const Transaction = require("../models/transaction_model");
const User = require("../models/user_model");
const Warehouse = require("../models/warehouse_model");

// Mengambil Seluruh riwayat pembayaran
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find({})
      // Cek riwayat pembayaran
      .populate(
        "payment_id",
        "tanggal_pembayaran status_pembayaran jumlah_bayar"
      )
      .populate("user_id", "user_id nama email")
      .exec();
    if (!payments || payments.length === 0) {
      // jika pembayaran tidak ada
      return res.status(404).json({ message: "Tidak ada Pembayaran" });
    }
    res.status(200).json(payments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err });
  }
};

module.exports = {
  getAllPayments,
};
