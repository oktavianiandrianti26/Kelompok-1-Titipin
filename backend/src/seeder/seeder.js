const mongoose = require("mongoose");
const connectDB = require("../config/db"); // Update path to config/db

// Import models
const Admin = require("../models/admin_model");
const Barang = require("../models/barang_model");
const Feedback = require("../models/feedback_model");
const Payment = require("../models/payment_model");
const Transaction = require("../models/transaction_model");
const User = require("../models/user_model");
const Warehouse = require("../models/warehouse_model");

// Koneksi ke MongoDB
connectDB(); // Memanggil fungsi untuk menghubungkan ke MongoDB

// Fungsi untuk menghasilkan data acak tanpa faker
const generateRandomData = async () => {
  try {
    // Clear existing data to avoid duplicates
    await User.deleteMany({});
    await Admin.deleteMany({});
    await Warehouse.deleteMany({});
    await Barang.deleteMany({});
    await Transaction.deleteMany({});
    await Payment.deleteMany({});
    await Feedback.deleteMany({});

    // Create Users
    const users = [];
    for (let i = 0; i < 10; i++) {
      const user = new User({
        user_id: `user${i + 1}`, // Ensure unique user_id
        nama: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        nomor_kontak: `080${100000000 + i}`,
        social_media: `https://socialmedia.com/user${i + 1}`,
        password: `password${i + 1}`,
      });
      users.push(await user.save());
    }

    // Create Admins
    const admin = new Admin({
      username: "admin1",
      password: "admin123",
      transaction_id: new mongoose.Types.ObjectId(), // Ensure 'new' is used here for ObjectId
    });
    await admin.save();

    // Create Warehouses
    const warehouse = new Warehouse({
      limit_jarak: 50,
      link_gmap: "https://maps.google.com",
      attitude: -6.2088,
      longitude: 106.8456,
    });
    await warehouse.save();

    // Create Barang (Items)
    const barang = [];
    for (let i = 0; i < 5; i++) {
      const item = new Barang({
        id_barang: `barang${i + 1}`,
        id_user: users[i]._id, // Use user ID from previously created users
        jenis_barang: `Barang Type ${i + 1}`,
        berat: Math.floor(Math.random() * 100) + 1, // Random weight between 1 and 100
        deskripsi: `Deskripsi barang ${i + 1}`,
        status_barang: i % 2 === 0 ? "ready" : "in transit",
      });
      barang.push(await item.save());
    }

    // Create Transactions
    const transactions = [];
    for (let i = 0; i < 3; i++) {
      const transaction = new Transaction({
        id_transaction: `transaction${i + 1}`, // Ensure 'new' is used here for ObjectId
        user_id: users[i]._id, // User from the created users
        warehouse_id: warehouse._id, // Warehouse from the created warehouse
        barang_id: barang[i]._id, // Barang from the created barang
        titik_alamat: `Alamat ${i + 1}`,
        titik_jemput: `Jemput ${i + 1}`,
        biaya_jemput: Math.floor(Math.random() * 100) + 1, // Random cost between 1 and 100
        jarak_jemput: Math.floor(Math.random() * 50) + 1, // Random distance between 1 and 50
        total_biaya: Math.floor(Math.random() * 200) + 50, // Random total cost between 50 and 250
        status: "waiting payment",
      });
      transactions.push(await transaction.save());
    }

    // Create Payments
    const payments = [];
    for (let i = 0; i < 3; i++) {
      const payment = new Payment({
        user_id: users[i]._id, // Link to user
        payment_id: `payment${i + 1}`,
        transaction_id: transactions[i]._id, // Use transaction ID from the created transactions
        jumlah_bayar: Math.floor(Math.random() * 200) + 50, // Random payment amount
        tanggal_pembayaran: new Date(),
        metode_pembayaran: i % 2 === 0 ? "cash" : "credit",
        status_pembayaran: "completed",
      });
      payments.push(await payment.save());
    }

    // Create Feedbacks
    const feedbacks = [];
    for (let i = 0; i < 3; i++) {
      const feedback = new Feedback({
        review_id: `review${i + 1}`,
        transaction_id: transactions[i]._id, // Link to transaction
        user_id: users[i]._id, // Link to user
        tanggal: new Date(),
        isi_feedback: `Feedback for transaction ${i + 1}`,
        rating: Math.floor(Math.random() * 5) + 1, // Random rating between 1 and 5
      });
      feedbacks.push(await feedback.save());
    }

    console.log("Seeder data berhasil dimasukkan!");
  } catch (err) {
    console.error("Error saat memasukkan data:", err);
  } finally {
    // Menutup koneksi setelah seeding selesai
    mongoose.connection.close();
  }
};

// Jalankan fungsi seed
generateRandomData();
