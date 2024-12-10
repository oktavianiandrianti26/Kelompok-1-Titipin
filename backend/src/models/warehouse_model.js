const mongoose = require("mongoose");

const WarehouseSchema = new mongoose.Schema({
  limit_jarak: { type: Number, required: true, min: 0 },
  link_gmap: { type: String, required: true },
  attitude: { type: Number, required: true },
  longitude: { type: Number, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Warehouse', WarehouseSchema);
