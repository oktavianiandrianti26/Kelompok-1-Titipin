const Barang = require("../models/barang_model");

// Fungsi untuk mendapatkan semua ulasan pengguna
const getAllUserReviews = async (req, res) => {
  try {
    const reviews = await Barang.find({ ulasan: { $exists: true, $ne: "" } })
      .populate("user_id", "email name") // Menampilkan nama dan email user
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
  const { id } = req.params; // Mendapatkan ID ulasan
  const { balasan } = req.body; // Mendapatkan balasan dari body request

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

// Fungsi untuk menghapus ulasan (hanya kolom ulasan)
const deleteReview = async (req, res) => {
  const { id } = req.params;

  try {
    // Cari barang berdasarkan ID
    const barang = await Barang.findById(id);

    if (!barang) {
      return res.status(404).json({ message: "Barang tidak ditemukan." });
    }

    // Kosongkan kolom ulasan dan balasan
    barang.ulasan = "";
    barang.balasan = "";
    await barang.save();

    res.status(200).json({ message: "Ulasan berhasil dihapus." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAllUserReviews, replyToReview, deleteReview };
