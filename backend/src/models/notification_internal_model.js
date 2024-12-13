const mongoose = require("mongoose");

const NotificationInternalSchema = new mongoose.Schema(
  {
    balasan: {type: String, required: true},
    userId: {type: String, required: true},
    ulasan: {type: String, required: true},
    senderEmail: {type: String, required: false},
    recipients: {type: String, required: false},
    message: {type: String, required: false},
    tanggal: {type: Date, default: Date.now},
  },
  {
    timestamps: true,
  }
);

// Tentukan nama koleksi sebagai "notifications"
module.exports = mongoose.model("NotificationsInternal", NotificationInternalSchema, "notifications");
