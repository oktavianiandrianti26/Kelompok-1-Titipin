const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
      default: () => new mongoose.Types.ObjectId(), // Pastikan user_id dihasilkan otomatis
    },
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+\@.+\..+/, "Email tidak valid"],
    },
    phone: {
      type: String,
      match: [
        /^\d{10,15}$/,
        "Nomor kontak harus berupa angka dan antara 10-15 digit",
      ],
    },
    password: { type: String, required: true, minlength: 6 },
    role: {
      type: String,
      enum: ["user"], // User hanya memiliki role user
      default: "user",
    }, // Menambahkan role dengan nilai default user
    token: { type: String },
    profileImageUrl: { type: String, default: "" }, // Menambahkan field profileImageUrl
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.password; // Menghapus password dari respon
        delete ret.__v; // Menghapus versi dokument Mongoose
      },
    },
    toObject: {
      transform(doc, ret) {
        delete ret.password; // Sama seperti `toJSON`, jika digunakan
        delete ret.__v;
      },
    },
  }
);

module.exports = mongoose.model("User", UserSchema);
