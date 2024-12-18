const Admin = require("../models/admin_model");
const Barang = require("../models/barang_model");
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
    const barang = await Barang.find({ user_id: userId })
      .populate("id_transaction", " jumlah_barang deskripsi_barang")

      .exec();
    // jika transaksi tidak ada
    if (!barang || barang.length === 0) {
      return res.status(404).json({ message: "Tidak Ada Transaksi" });
    }
    res.status(200).json(barang);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Fungsi untuk memperbarui ulasan transaksi
const updateUserTransactionReview = async (req, res) => {
  try {
    const { barangId } = req.params;
    const { ulasan } = req.body;

    const barang = await Barang.findById(barangId);
    if (!barang) {
      return res.status(404).json({ message: "Transaksi tidak ditemukan" });
    }

    // Update ulasan
    barang.ulasan = ulasan;
    await barang.save();

    res.status(200).json({ message: "Ulasan berhasil diperbarui", barang });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getUserTransactionHistory, updateUserTransactionReview };
