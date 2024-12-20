const express = require("express");
const { getAllUserReviews, replyToReview, deleteReview } = require("../controllers_admin/ulasanPengguna_controllers");

const router = express.Router();

// Rute untuk mendapatkan semua ulasan pengguna
router.get("/ulasan", getAllUserReviews);

// Rute untuk membalas ulasan
router.put("/ulasan/:id", replyToReview);

// Rute untuk menghapus ulasan
router.delete("/ulasan/:id", deleteReview);

module.exports = router;
