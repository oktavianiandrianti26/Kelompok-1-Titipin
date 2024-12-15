const Admin = require("../models/admin_model");
const Barang = require("../models/barang_model");
const Feedback = require("../models/feedback_model");
const Payment = require("../models/payment_model");
const Transaction = require("../models/transaction_model");
const User = require("../models/user_model");
const Warehouse = require("../models/warehouse_model");

//Mengambil Seluruh riwayat transaksi
const getUserTransactionHistory = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Cek riwayat transaksi by ID
    const transactions = await Transaction.find({ user_id: userId })
      .populate("barang_id", "id_barang berat deskripsi")
      .populate("warehouse_id", "limit_jarak link_gmap")
      .exec();
    // jika transaksi tidak ada
    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ message: "Tidak Ada Transaksi" });
    }
    res.status(200).json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Fungsi untuk memperbarui ulasan transaksi
const updateUserTransactionReview = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const { ulasan } = req.body;

    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      return res.status(404).json({ message: "Transaksi tidak ditemukan" });
    }

    // Update ulasan
    transaction.ulasan = ulasan;
    await transaction.save();

    res
      .status(200)
      .json({ message: "Ulasan berhasil diperbarui", transaction });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getUserTransactionHistory, updateUserTransactionReview };
