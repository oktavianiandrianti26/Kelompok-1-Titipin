// routes/barangRoutes.js
const express = require("express");
const router = express.Router();
const barangController = require("../controllers_user/barangController");
const authenticate = require("../middleware/auth");

router.post("/", authenticate, barangController.createBarang); // Membuat Barang
router.get("/", authenticate, barangController.getAllBarang); // Mendapatkan Semua Barang
router.get("/:id", authenticate, barangController.getBarangById); // Mendapatkan Barang Berdasarkan ID
router.put("/:id", authenticate, barangController.updateBarangById); // Memperbarui Barang
router.delete("/:id", authenticate, barangController.deleteBarangById); // Menghapus Barang
module.exports = router;
