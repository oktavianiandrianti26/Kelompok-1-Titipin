const express = require("express");
const { getAllUserReviews, replyToReview } = require("../controllers_admin/ulasanPengguna_controllers");

const router = express.Router();

// Rute untuk mendapatkan semua ulasan pengguna
router.get("/ulasan", getAllUserReviews);

// Rute untuk membalas ulasan
router.put("/ulasan/:id", replyToReview);

module.exports = router;
