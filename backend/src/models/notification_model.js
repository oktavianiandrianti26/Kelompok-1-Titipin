const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  senderEmail: { type: String, required: true },
  recipients: { type: String, required: true },
  message: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Menambahkan userId
  tanggal: { type: Date, default: Date.now },
}, {
  timestamps: true
});

module.exports = mongoose.model("Notification", NotificationSchema);
