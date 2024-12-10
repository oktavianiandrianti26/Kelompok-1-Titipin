const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
  transaction_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction', required: true }
}, {
  timestamps: true,
  toJSON: {
    transform(doc, ret) {
      delete ret.password;
      delete ret.__v;
    }
  },
  toObject: { 
    transform(doc, ret) {
      delete ret.password;
      delete ret.__v;
    }
  }
});

module.exports = mongoose.model('Admin', AdminSchema);
