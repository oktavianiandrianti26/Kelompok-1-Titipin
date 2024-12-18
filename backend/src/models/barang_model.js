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
      default: () => new mongoose.Types.ObjectId(),
      unique: true,
    },
    id_transaction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
    },
    deskripsi_barang: { type: String, trim: true },
    jumlah_barang: { type: Number, required: true }, // Ubah ke Number
    harga: { type: Number, default: 0 }, // Harga akan dihitung
    ulasan: {
      type: String,
      default: null, // Default ulasan menjadi null
    },
    balasan: {
      type: String, // Field untuk menyimpan balasan
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook untuk menghitung harga otomatis
BarangSchema.pre("save", function (next) {
  this.harga = this.jumlah_barang * 5000;
  next();
});

module.exports = mongoose.model("Barang", BarangSchema);
