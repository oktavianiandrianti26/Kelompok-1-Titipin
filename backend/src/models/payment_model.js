const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    payment_id: { type: String, required: true, unique: true },
    transaction_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
      required: true,
    },
    jumlah_bayar: { type: Number, required: true, min: 0 },
    tanggal_pembayaran: { type: Date, required: true },
    status_pembayaran: {
      type: String,
      enum: ["pending", "completed", "failed"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Payment", PaymentSchema);
