const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
  transaction_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Transaction', 
    default: () => new mongoose.Types.ObjectId() 
  },
  role: { 
    type: String, 
    enum: ['admin'], // Admin hanya memiliki satu role
    default: 'admin' 
  } // Menambahkan role dengan nilai default admin
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
