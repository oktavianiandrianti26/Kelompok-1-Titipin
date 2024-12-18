const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const connectDB = require("../config/db"); // Path ke file koneksi database Anda

// Import models
const Admin = require("../models/admin_model");
const User = require("../models/user_model");

// Fungsi untuk menghubungkan ke MongoDB
connectDB(); // Pastikan fungsi ini sesuai dengan file db.js Anda

// Fungsi untuk seed data
const generateRandomData = async () => {
  try {
    console.log("Menghapus data lama...");
    await User.deleteMany({});
    await Admin.deleteMany({});
    console.log("Data lama berhasil dihapus.");

    // Membuat data user
    console.log("Membuat data User...");
    const users = [];
    for (let i = 0; i < 10; i++) {
      const plainPassword = `password${i + 1}`; // Plain password
      console.log(
        `User${i + 1} -> Email: user${
          i + 1
        }@example.com, Password: ${plainPassword}`
      ); // Print plain password

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(plainPassword, salt); // Hash password

      const user = new User({
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        phone: `080${100000000 + i}`, // Simulasi nomor telepon unik
        password: hashedPassword, // Simpan hash password
        role: "user", // Set role sebagai "user"
      });
      users.push(await user.save());
    }
    console.log("Data User berhasil dibuat.");

    // Membuat data admin
    console.log("Membuat data Admin...");
    const adminPassword = "admin123"; // Plain password untuk admin
    console.log(
      `Admin -> Email: admintitipin@gmail.com, Password: ${adminPassword}`
    ); // Print plain password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt); // Hash password

    const admin = new Admin({
      email: "admintitipin@gmail.com",
      password: hashedPassword, // Simpan hash password
      transaction_id: new mongoose.Types.ObjectId(), // ID unik
      role: "admin", // Set role sebagai "admin"
    });
    await admin.save();
    console.log("Data Admin berhasil dibuat.");

    console.log("Seeder data berhasil dimasukkan!");
  } catch (err) {
    console.error("Error saat memasukkan data:", err);
  } finally {
    // Tutup koneksi setelah selesai
    mongoose.connection.close();
  }
};

// Jalankan seeder
generateRandomData();
