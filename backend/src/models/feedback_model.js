const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  review_id: { type: String, required: true, unique: true },
  transaction_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction', required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tanggal: { type: Date, required: true },
  isi_feedback: { type: String, trim: true },
  rating: { type: Number, min: 1, max: 5, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
