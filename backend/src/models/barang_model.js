const mongoose = require("mongoose");

const BarangSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    id_barang: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(), // Menambahkan id barang unik secara otomatis
      unique: true, // Memastikan id barang unik
    },
    deskripsi_barang: { type: String, trim: true },
    jumlah_barang: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Barang", BarangSchema);
