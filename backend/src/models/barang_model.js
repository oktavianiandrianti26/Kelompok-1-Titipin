const mongoose = require("mongoose");

const BarangSchema = new mongoose.Schema({
  id_barang: { type: String, required: true, unique: true },
  id_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  jenis_barang: { type: String, required: true, trim: true },
  berat: { type: Number, required: true, min: 0 },
  deskripsi: { type: String, trim: true },
  status_barang: { 
    type: String, 
    enum: ['ready', 'in transit', 'delivered'], 
    required: true 
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Barang', BarangSchema);
