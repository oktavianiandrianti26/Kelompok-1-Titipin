const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

app.use(errorHandler);

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

// Menambahkan rute ke aplikasi
app.use("/api/user", riwayatUserRoutes, paymentUserRoutes);
app.use("/api/admin", riwayatAdminRoutes, paymentAdminRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/user/notifications", notifikasiRoutesUser);

app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

// Koneksi ke MongoDB
connectDB();

// Port dari .env, fallback ke 5000 jika tidak ada
const PORT = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
