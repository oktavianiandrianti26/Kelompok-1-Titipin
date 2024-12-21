// controllers/transactionController.js
const Transaction = require("../models/transaction_model");
const Barang = require("../models/barang_model");
const User = require("../models/user_model");

// Fungsi untuk membuat transaksi
const createTransaction = async (req, res) => {
  try {
    const {
      nama,
      kontak,
      duration,
      alamatPenjemputan,
      jarak_jemput,
      total_biaya_jemput,
      denda,
      ulasan,
      balasan,
      kota_asal,
      kota_tujuan,
    } = req.body;

    const user_id = req.user.id; // Ambil user_id dari req.user.id

    // Validasi data yang diterima
    if (
      !nama ||
      !kontak ||
      !duration ||
      !alamatPenjemputan ||
      !jarak_jemput ||
      !total_biaya_jemput ||
      !kota_asal ||
      !kota_tujuan
    ) {
      return res.status(400).json({ message: "Data tidak lengkap!" });
    }

    // Membuat transaksi baru
    const transaction = new Transaction({
      user_id,
      nama,
      kontak, // Menyimpan kontak
      duration,
      alamatPenjemputan, // Menyimpan alamatPenjemputan
      jarak_jemput,
      total_biaya_jemput,
      denda,
      ulasan,
      balasan,
      kota_asal,
      kota_tujuan
    });

    // Simpan transaksi ke database
    await transaction.save();
    res.status(201).json(transaction); // Return transaksi yang telah dibuat
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan saat membuat transaksi" });
  }
};

// Fungsi untuk mengambil semua transaksi
const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user_id: req.user.id }) // Filter berdasarkan user_id
      .populate("user_id", "nama") // populate data user
      .select(
        "nama kontak alamatPenjemputan duration jarak_jemput total_biaya_jemput denda ulasan balasan createdAt status"
      ); // Menampilkan field tertentu

    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan saat mengambil transaksi" });
  }
};

// Fungsi untuk mengambil transaksi berdasarkan ID
const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id)
      .populate("user_id", "nama")
      .select(
        "nama kontak alamatPenjemputan duration jarak_jemput total_biaya_jemput denda ulasan balasan createdAt"
      );

    if (!transaction) {
      return res.status(404).json({ message: "Transaksi tidak ditemukan" });
    }

    // Pastikan transaksi milik user yang sedang login
    if (transaction.user_id.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Anda tidak memiliki akses ke transaksi ini" });
    }

    res.status(200).json(transaction);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan saat mengambil transaksi" });
  }
};

// Fungsi untuk memperbarui transaksi berdasarkan ID
const updateTransactionById = async (req, res) => {
  try {
    const { ulasan, balasan, denda, kontak, alamatPenjemputan, status } = req.body;

    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaksi tidak ditemukan" });
    }

    // Pastikan transaksi milik user yang sedang login
    if (transaction.user_id.toString() !== req.user.id) {
      return res
        .status(403)
        .json({
          message: "Anda tidak memiliki akses untuk memperbarui transaksi ini",
        });
    }

    // Update transaksi
    transaction.ulasan = ulasan || transaction.ulasan;
    transaction.balasan = balasan || transaction.balasan;
    transaction.denda = denda || transaction.denda;
    transaction.kontak = kontak || transaction.kontak;
    transaction.alamatPenjemputan = alamatPenjemputan || transaction.alamatPenjemputan;
    transaction.status = status || transaction.status;

    await transaction.save();

    res.status(200).json(transaction);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan saat memperbarui transaksi" });
  }
};

// Fungsi untuk memperbarui transaksi berdasarkan ID
const updateTransactionByBarangId = async (req, res) => {
  try {
    const { status } = req.body;

    const transaction = await Transaction.findOne({ id_barang: req.params.id });

    if (!transaction) {
      return res.status(404).json({ message: "Transaksi tidak ditemukan" });
    }

    // Pastikan transaksi milik user yang sedang login
    if (transaction.user_id.toString() !== req.user.id) {
      return res
        .status(403)
        .json({
          message: "Anda tidak memiliki akses untuk memperbarui transaksi ini",
        });
    }

    // Update transaksi
    transaction.status = status || transaction.status;

    await transaction.save();

    res.status(200).json(transaction);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan saat memperbarui transaksi" });
  }
};

// Fungsi untuk menghapus transaksi berdasarkan ID
const deleteTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaksi tidak ditemukan" });
    }

    // Pastikan transaksi milik user yang sedang login
    if (transaction.user_id.toString() !== req.user.id) {
      return res
        .status(403)
        .json({
          message: "Anda tidak memiliki akses untuk menghapus transaksi ini",
        });
    }

    await transaction.remove();
    res.status(200).json({ message: "Transaksi berhasil dihapus" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan saat menghapus transaksi" });
  }
};

// Export controller functions
module.exports = {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransactionById,
  deleteTransactionById,
  updateTransactionByBarangId
};
