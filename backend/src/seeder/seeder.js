const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const connectDB = require("../config/db");

// Import models
const Admin = require("../models/admin_model");
const User = require("../models/user_model");
const Barang = require("../models/barang_model");
const Feedback = require("../models/feedback_model");
const NotificationInternal = require("../models/notification_internal_model");
const Notification = require("../models/notification_model");
const Payment = require("../models/payment_model");
const Transaction = require("../models/transaction_model");

connectDB(); // Ensure correct DB connection

// Seed data function
const generateRandomData = async () => {
  try {
    console.log("Menghapus data lama...");
    await User.deleteMany({});
    await Admin.deleteMany({});
    await Barang.deleteMany({});
    await Feedback.deleteMany({});
    await NotificationInternal.deleteMany({});
    await Notification.deleteMany({});
    await Payment.deleteMany({});
    await Transaction.deleteMany({});
    console.log("Data lama berhasil dihapus.");

    // Create users
    console.log("Membuat data User...");
    const users = [];
    for (let i = 0; i < 10; i++) {
      const plainPassword = `password${i + 1}`;
      console.log(
        `User${i + 1} -> Email: user${
          i + 1
        }@example.com, Password: ${plainPassword}`
      );

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(plainPassword, salt);

      const user = new User({
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        phone: `080${100000000 + i}`,
        password: hashedPassword,
        role: "user",
      });
      users.push(await user.save());

      // Create related data for each user

      // Create Barang
      const barang = new Barang({
        user_id: user._id,
        jumlah_barang: 5,
        deskripsi_barang: `Barang ${i + 1}`,
      });
      await barang.save();

      // Create Feedback
      const feedback = new Feedback({
        user_id: user._id,
        isi_feedback: `Feedback dari user ${i + 1}`,
      });
      await feedback.save();

      // Create NotificationInternal
      const notificationInternal = new NotificationInternal({
        user_id: user._id,
        ulasan: `Ulasan dari user ${i + 1}`,
        balasan: `Balasan admin untuk user ${i + 1}`,
      });
      await notificationInternal.save();

      // Create Notification
      const notification = new Notification({
        userId: user._id,
        senderEmail: `admin${i + 1}@example.com`,
        recipients: user.email,
        message: `Pesan untuk user ${i + 1}`,
      });
      await notification.save();

      // Create Transaction
      const transaction = new Transaction({
        user_id: user._id,
        nama: `Nama Transaksi ${i + 1}`,
        kontak: 123456789,
        duration: { startDate: new Date(), endDate: new Date() },
        alamatPenjemputan: `Alamat ${i + 1}`,
        jarak_jemput: 10,
        total_biaya_jemput: 50000,
      });
      await transaction.save();

      // Create Payment
      const payment = new Payment({
        user_id: user._id,
        payment_id: `payment${i + 1}`,
        transaction_id: transaction._id,
        jumlah_bayar: 50000,
        tanggal_pembayaran: new Date(),
        status_pembayaran: "completed",
      });
      await payment.save();
    }
    console.log("Data User berhasil dibuat.");

    // Create Admin
    console.log("Membuat data Admin...");
    const adminPassword = "admin123";
    console.log(
      `Admin -> Email: admintitipin@gmail.com, Password: ${adminPassword}`
    );

    const saltAdmin = await bcrypt.genSalt(10);
    const hashedAdminPassword = await bcrypt.hash(adminPassword, saltAdmin);

    const admin = new Admin({
      email: "admintitipin@gmail.com",
      password: hashedAdminPassword,
      transaction_id: new mongoose.Types.ObjectId(),
      role: "admin",
    });
    await admin.save();
    console.log("Data Admin berhasil dibuat.");

    console.log("Seeder data berhasil dimasukkan!");
  } catch (err) {
    console.error("Error saat memasukkan data:", err);
  } finally {
    // Close the DB connection
    mongoose.connection.close();
  }
};

// Run the seeder
generateRandomData();
