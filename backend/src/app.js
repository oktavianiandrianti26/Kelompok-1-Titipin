const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Rute untuk API
const riwayatUserRoutes = require("./routes_user/riwayatPenitipanUser_routes.js"); 
const ulasanAdminRoutes = require("./routes_admin/ulasanPengguna_routes.js");
const notificationRoutes = require("./routes_admin/pengaturanNotifikasi_routes");
const notifikasiRoutesUser = require('./routes_user/notifikasi_routes.js');

// Menambahkan rute ke aplikasi
app.use("/api/user", riwayatUserRoutes);
app.use("/api/admin", ulasanAdminRoutes);
app.use("/api/notifications", notificationRoutes);
app.use('/api/user/notifications', notifikasiRoutesUser);

// Koneksi ke MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
