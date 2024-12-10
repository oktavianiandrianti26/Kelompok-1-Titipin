const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  user_id: { type: String, required: true, unique: true },
  nama: { type: String, required: true, trim: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: [/.+\@.+\..+/, 'Email tidak valid'] 
  },
  nomor_kontak: { 
    type: String, 
    match: [/^\d{10,15}$/, 'Nomor kontak harus berupa angka dan antara 10-15 digit'] 
  },
  social_media: { type: String, trim: true },
  password: { type: String, required: true, minlength: 6 }
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

module.exports = mongoose.model('User', UserSchema);
