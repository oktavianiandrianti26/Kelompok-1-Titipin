const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    id_transaction: { type: String, required: true, unique: true },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    warehouse_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Warehouse",
      required: true,
    },
    barang_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Barang",
      required: true,
    },
    titik_alamat: { type: String, required: true, trim: true },
    titik_jemput: { type: String, required: true, trim: true },
    biaya_jemput: { type: Number, required: true, min: 0 },
    jarak_jemput: { type: Number, required: true, min: 0 },
    total_biaya: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["waiting payment", "pickup ongoing", "done"],
      required: true,
    },
    denda: { type: Number, default: 0, min: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transaction", TransactionSchema);
