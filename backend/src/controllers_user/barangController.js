const Barang = require("../models/barang_model");
const multer = require("multer"); // Pastikan ini diimpor
const path = require("path"); // Import path untuk mengatur ekstensi file

// Konfigurasi penyimpanan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Memastikan path menuju folder uploads yang baru di root
    cb(null, path.join(__dirname, "../uploads")); // Folder uploads sekarang ada di direktori root
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

exports.upload = multer({ storage: storage });

// CREATE BARANG
exports.createBarang = async (req, res) => {
  try {
    // Mendapatkan user_id dari JWT (req.user.id diatur oleh middleware autentikasi)
    const user_id = req.user?.id;
    if (!user_id) {
      return res.status(403).json({ message: "User tidak diautentikasi" });
    }

    const { deskripsi_barang, jumlah_barang, harga } = req.body;
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
    const files = req.file.filename;

    // Validasi input
    if (!jumlah_barang) {
      return res.status(400).json({ message: "Jumlah barang wajib diisi" });
    }
    if (harga <= 0) {
      // Validasi harga
      return res
        .status(400)
        .json({ message: "Harga barang harus lebih dari 0" });
    }

    // Membuat data barang baru
    const barang = new Barang({
      user_id,
      deskripsi_barang,
      jumlah_barang,
      harga,
      fileBarang: files,
    });

    // Simpan ke database
    const savedBarang = await barang.save();
    res
      .status(201)
      .json({ message: "Barang berhasil dibuat", data: savedBarang });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Terjadi kesalahan saat membuat barang",
        error: error.message,
      });
  }
};

// GET ALL BARANG
exports.getAllBarang = async (req, res) => {
  try {
    const barangList = await Barang.find({ user_id: req.user.id }).populate(
      "user_id",
      "nama email",
    ); // Hanya barang milik user
    res
      .status(200)
      .json({ message: "Data barang berhasil diambil", data: barangList });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Terjadi kesalahan saat mengambil data barang",
        error: error.message,
      });
  }
};

// GET BARANG BY ID
exports.getBarangById = async (req, res) => {
  try {
    const { id } = req.params;

    const barang = await Barang.findOne({
      _id: id,
      user_id: req.user.id,
    }).populate("user_id", "nama email"); // Pastikan barang milik user
    if (!barang) {
      return res
        .status(404)
        .json({ message: "Barang tidak ditemukan atau tidak memiliki akses" });
    }

    res
      .status(200)
      .json({ message: "Barang berhasil ditemukan", data: barang });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Terjadi kesalahan saat mengambil barang",
        error: error.message,
      });
  }
};

// UPDATE BARANG BY ID
exports.updateBarangById = async (req, res) => {
  try {
    const { id } = req.params;
    const { deskripsi_barang, jumlah_barang } = req.body;

    const barang = await Barang.findOneAndUpdate(
      { _id: id, user_id: req.user.id }, // Pastikan barang milik user
      { deskripsi_barang, jumlah_barang },
      { new: true, runValidators: true }
    );

    if (!barang) {
      return res
        .status(404)
        .json({ message: "Barang tidak ditemukan atau tidak memiliki akses" });
    }

    res
      .status(200)
      .json({ message: "Barang berhasil diperbarui", data: barang });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Terjadi kesalahan saat memperbarui barang",
        error: error.message,
      });
  }
};

// DELETE BARANG BY ID
exports.deleteBarangById = async (req, res) => {
  try {
    const { id } = req.params;

    const barang = await Barang.findOneAndDelete({
      _id: id,
      user_id: req.user.id,
    }); // Pastikan barang milik user
    if (!barang) {
      return res
        .status(404)
        .json({ message: "Barang tidak ditemukan atau tidak memiliki akses" });
    }

    res.status(200).json({ message: "Barang berhasil dihapus" });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Terjadi kesalahan saat menghapus barang",
        error: error.message,
      });
  }
};
