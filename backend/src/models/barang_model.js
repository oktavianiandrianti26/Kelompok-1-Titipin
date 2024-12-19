const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose); // Import plugin mongoose-sequence

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
    jumlah_barang: { type: Number, required: true },
    harga: { type: Number, default: 0 },
    ulasan: { type: String, default: null },
    balasan: { type: String, default: "" },
    nomor_riwayat: { type: Number, unique: true },
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

// Plugin auto-increment untuk nomor urut berdasarkan user_id
BarangSchema.plugin(AutoIncrement, {
  inc_field: "nomor_riwayat",
  start_seq: 1, // Start sequence from 1
  id: "user_id", // Reference the user_id for auto-increment
});

module.exports = mongoose.model("Barang", BarangSchema);
