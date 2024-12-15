const Admin = require("../models/admin_model");
const Barang = require("../models/barang_model");
const Feedback = require("../models/feedback_model");
const Payment = require("../models/payment_model");
const Transaction = require("../models/transaction_model");
const User = require("../models/user_model");
const Warehouse = require("../models/warehouse_model");

//Mengambil Seluruh riwayat transaksi
const getAllTransactions = async (req, res) => {
  try {
    //Cek riwayat pembayaran
    const transactions = await Transaction.find({})
      .populate("user_id", "user_id nama email")
      .populate("barang_id", "id_barang berat deskripsi")
      .populate("warehouse_id", "limit_jarak link_gmap")
      .exec();
    if (!transactions || transactions.length === 0) {
      // jika transaksi tidak ada
      return res.status(404).json({ message: "Tidak ada Transaksi" });
    }
    res.status(200).json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAllTransactions };
