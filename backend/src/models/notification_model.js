const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  senderEmail: { type: String, required: true },
  recipients: { type: String, required: true },
  message: { type: String, required: true },
  tanggal: { type: Date, default: Date.now },
}, {
  timestamps: true
});

module.exports = mongoose.model("Notification", NotificationSchema);
