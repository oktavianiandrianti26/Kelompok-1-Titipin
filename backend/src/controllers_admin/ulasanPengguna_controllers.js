const Barang = require("../models/barang_model");
const User = require("../models/user_model");

// Fungsi untuk mendapatkan semua ulasan pengguna
const getAllUserReviews = async (req, res) => {
  try {
    const reviews = await Barang.find({ ulasan: { $exists: true, $ne: "" } })
      .populate("user_id", "email name") // Menambahkan nama dan email user
      .select("ulasan balasan");

    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ message: "Tidak ada ulasan pengguna." });
    }

    res.status(200).json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Fungsi untuk membalas ulasan pengguna
const replyToReview = async (req, res) => {
  const { id } = req.params; // Mendapatkan ID transaksi dari parameter
  const { balasan } = req.body; // Mendapatkan balasan dari body request
  console.log(id);
  try {
    const review = await Barang.findById(id);

    if (!review) {
      return res.status(404).json({ message: "Ulasan tidak ditemukan." });
    }

    // Update balasan
    review.balasan = balasan;
    await review.save();

    res.status(200).json({ message: "Balasan berhasil dikirim." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAllUserReviews, replyToReview };
