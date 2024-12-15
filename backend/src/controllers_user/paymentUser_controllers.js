const mongoose = require("mongoose");
const midtransClient = require("midtrans-client");
const Payment = require("../models/payment_model"); // Pastikan model benar

// Inisialisasi Midtrans Snap API
const snap = new midtransClient.Snap({
  isProduction: false, // Ubah ke true di produksi
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

exports.createPayment = async (req, res) => {
  const { amount, email, phone, name, user_id } = req.body;

  // Validasi input
  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Invalid payment amount" });
  }

  try {
    // Membuat detail transaksi Midtrans
    const transactionDetails = {
      transaction_details: {
        order_id: `order-${new Date().getTime()}`, // ID unik transaksi
        gross_amount: amount, // Jumlah pembayaran
      },
      credit_card: {
        secure: true, // Aktifkan secure mode
      },
      customer_details: {
        email: email || "customer@example.com", //example
        nama: name || "Costumer", //example
        phone: phone || "081234567890", //example
      },
    };

    // Kirim request transaksi ke Midtrans
    const transaction = await snap.createTransaction(transactionDetails);

    // Simpan data pembayaran ke database
    const payment = new Payment({
      payment_id: transaction.token, // Snap Token
      transaction_id: new mongoose.Types.ObjectId(), //id transaksi pembayaran
      user_id: user_id, // Menambahkan user_id
      jumlah_bayar: amount, //Jumlah bayar
      tanggal_pembayaran: new Date(), //tanggal
      status_pembayaran: "completed", // Status awal
    });

    await payment.save(); // Simpan data pembayaran ke database

    // Kirim Snap Token ke frontend
    res.json({
      token: transaction.token, // Snap Token untuk pop-up
      message: "Transaction created successfully",
    });
  } catch (error) {
    console.error("Error during payment initiation:", error.message);
    res.status(500).json({
      message: "Payment initiation failed",
      error: error.message,
    });
  }
};
