const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  payment_id: { type: String, required: true, unique: true },
  transaction_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction', required: true },
  jumlah_bayar: { type: Number, required: true, min: 0 },
  tanggal_pembayaran: { type: Date, required: true },
  metode_pembayaran: { 
    type: String, 
    enum: ['cash', 'credit'], 
    required: true 
  },
  status_pembayaran: { 
    type: String, 
    enum: ['pending', 'completed', 'failed'], 
    required: true 
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Payment', PaymentSchema);
