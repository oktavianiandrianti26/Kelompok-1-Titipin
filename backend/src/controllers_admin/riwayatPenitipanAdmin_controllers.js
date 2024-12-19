const Admin = require("../models/admin_model");
const Barang = require("../models/barang_model");
const Feedback = require("../models/feedback_model");
const Payment = require("../models/payment_model");
const Transaction = require("../models/transaction_model");
const User = require("../models/user_model");
const Warehouse = require("../models/warehouse_model");

// Mengambil Seluruh riwayat transaksi
const getAllHistory = async (req, res) => {
  try {
    const barang = await Barang.find({})
      .populate("user_id", "user_id name email")
      .populate(
        "id_transaction",
        "barang_id jumlah_barang deskripsi_barang nomor_riwayat"
      )
      .exec();

    if (!barang || barang.length === 0) {
      return res.status(404).json({ message: "Tidak ada Transaksi" });
    }

    res.status(200).json(barang);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAllHistory }; // Pastikan ini ada
