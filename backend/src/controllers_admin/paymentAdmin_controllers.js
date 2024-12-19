const Admin = require("../models/admin_model");
const Barang = require("../models/barang_model");
const Feedback = require("../models/feedback_model");
const Payment = require("../models/payment_model");
const Transaction = require("../models/transaction_model");
const User = require("../models/user_model");
const Warehouse = require("../models/warehouse_model");

const getAllPayments = async (req, res) => {
  try {
    // Mengambil semua data pembayaran dari database
    const payments = await Payment.find({})
      .populate(
        "user_id", // Mengambil informasi pengguna terkait
        "name email" // Hanya mengambil nama dan email
      )
      .populate(
        "transaction_id", // Mengambil informasi transaksi terkait
        "tanggal_pembayaran status_pembayaran jumlah_bayar" // Kolom yang ingin ditampilkan
      )
      .exec();

    if (!payments || payments.length === 0) {
      // Jika tidak ada data pembayaran
      return res.status(404).json({ message: "Tidak ada Pembayaran" });
    }

    // Format data untuk memasukkan nomor transaksi menggunakan nomor urut
    const formattedPayments = payments.map((payment) => ({
      ...payment._doc, // Menyalin seluruh properti dari objek payment
      no_transaksi: `TITIPIN-${payment.nomor_urut.toString().padStart(2, "0")}`, // Menambahkan nomor transaksi dengan format
    }));

    // Mengirimkan data pembayaran yang diformat ke frontend
    res.status(200).json(formattedPayments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err });
  }
};

module.exports = {
  getAllPayments,
};
