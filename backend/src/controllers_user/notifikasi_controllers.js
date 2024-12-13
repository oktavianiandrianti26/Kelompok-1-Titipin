const Notification = require("../models/notification_model");
const NotificationInternal = require("../models/notification_internal_model");

const getNotifications = async (req, res) => {
  try {
    // Ambil semua notifikasi untuk user
    const notifications = await NotificationInternal.find().sort({tanggal: -1});
    if (notifications.length === 0) {
      return res.status(404).json({message: "Tidak ada notifikasi."});
    }

    return res.status(200).json({notifications});
  } catch (error) {
    console.error("Error saat mengambil notifikasi:", error.message);
    return res.status(500).json({message: "Gagal mengambil notifikasi."});
  }
};

const pushNotifications = async (req, res) => {
  console.log(req.body);
  try {
    // Gunakan model untuk menyisipkan dokumen
    const newNotification = await NotificationInternal.create({
      balasan: req.body.balasan, ulasan: req.body.ulasan, userId: req.body.userId,
    });
    return res.status(200).json(newNotification);
  } catch (error) {
    console.error("Error inserting notification:", error);
    return res.status(500).json({message: "Error inserting notification", error});
  }
};


module.exports = {getNotifications, pushNotifications};
