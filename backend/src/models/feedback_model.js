const mongoose = require('mongoose');

// Membuat feedbackSchema dengan review_id yang unik
const feedbackSchema = new mongoose.Schema({
  review_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    default: () => new mongoose.Types.ObjectId(),  // Menambahkan review_id unik secara otomatis
    unique: true, // Memastikan review_id unik
  },
  user_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  isi_feedback: { 
    type: String, 
    required: true 
  },
  tanggal: { 
    type: Date, 
    default: Date.now 
  },
  admin_reply: { 
    type: String 
  },
});

// Membuat model Feedback berdasarkan schema
module.exports = mongoose.model('Feedback', feedbackSchema);
