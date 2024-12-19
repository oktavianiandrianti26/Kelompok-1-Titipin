const express = require("express");

const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");

const errorHandler = require("./middleware/errorHandler");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const path = require('path');

// Middleware
app.use(express.json());
app.use(cors());

app.use(errorHandler);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rute untuk API
const riwayatUserRoutes = require("./routes_user/riwayatPenitipanUser_routes.js");
const riwayatAdminRoutes = require("./routes_admin/riwayatPenitipanAdmin_routes.js");
const paymentUserRoutes = require("./routes_user/paymentUser_routes.js");
const paymentAdminRoutes = require("./routes_admin/paymentAdmin_routes.js");
const ulasanAdminRoutes = require("./routes_admin/ulasanPengguna_routes.js");
const notificationRoutes = require("./routes_admin/pengaturanNotifikasi_routes");
const notifikasiRoutesUser = require("./routes_user/notifikasi_routes.js");
const userRoutes = require("./routes_user/autentikasi_routes");
const adminRoutes = require("./routes_admin/autentikasi_routes");
const transactionRoutes = require("./routes_user/transactionRoutes");
const barangRoutes = require("./routes_user/barangRoutes");
const feedbackRoutes = require('./routes_admin/feedback_routes');

// Menambahkan rute ke aplikasi
app.use("/api/user", riwayatUserRoutes, paymentUserRoutes);
app.use("/api/admin", riwayatAdminRoutes, paymentAdminRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/user/notifications", notifikasiRoutesUser);
app.use("/api/admin", ulasanAdminRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/barang", barangRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use('/api/feedback', feedbackRoutes);

// Menyajikan file statis di folder "uploads"
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Koneksi ke MongoDB
connectDB();

// Port dari .env, fallback ke 5000 jika tidak ada
const PORT = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
