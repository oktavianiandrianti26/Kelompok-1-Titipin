const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    id_barang: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
      unique: true,
    },
    nama: { type: String, required: true },
    kontak: { type: Number, required: true },
    duration: { type: Object, required: true }, // { startDate, endDate }
    alamatPenjemputan: { type: String, required: true },
    jarak_jemput: { type: Number, required: true },
    total_biaya_jemput: { type: Number, required: true },
    denda: { type: Number, default: 0, min: 0 },
    ulasan: {
      type: String,
      default: null, // Default ulasan menjadi null
    },
    balasan: {
      type: String, // Field untuk menyimpan balasan
      default: "",
    },
    kota_asal: { type: String, required: true },
    kota_tujuan: { type: String, required: true },
    status: {
      type: String,
      enum: ["Dijemput", "Proses", "Selesai"],
      default: "Dijemput",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transaction", TransactionSchema);
