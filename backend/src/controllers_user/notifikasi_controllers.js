const Notification = require("../models/notification_model");
const NotificationInternal = require("../models/notification_internal_model");

const getNotifications = async (req, res) => {
  try {
    console.log("User Info:", req.user); // Cek apakah user sudah ada di req.user

    const userId = req.user._id; // Mengambil _id dari user yang sudah terverifikasi

    const notifications = await Notification.find({
      user_id: userId,
    }).sort({ tanggal: -1 });
    console.log("Filtered notifications:", notifications);

    if (notifications.length === 0) {
      return res.status(404).json({ message: "Tidak ada notifikasi." });
    }

    return res.status(200).json({ notifications });
  } catch (error) {
    console.error("Error saat mengambil notifikasi:", error.message);
    return res.status(500).json({ message: "Gagal mengambil notifikasi." });
  }
};

const deleteNotification = async (req, res) => {
  try {
    const userId = req.user._id; // Ambil ID pengguna yang sudah terverifikasi
    const notificationId = req.params.id; // Ambil ID notifikasi yang ingin dihapus

    // Cari notifikasi berdasarkan ID dan pastikan notifikasi milik pengguna yang sedang login
    const notification = await Notification.findOne({
      _id: notificationId,
      user_id: userId,
    });

    if (!notification) {
      return res
        .status(404)
        .json({
          message: "Notifikasi tidak ditemukan atau tidak milik pengguna ini.",
        });
    }

    // Hapus notifikasi dari database
    await Notification.deleteOne({ _id: notificationId });

    return res.status(200).json({ message: "Notifikasi berhasil dihapus." });
  } catch (error) {
    console.error("Error saat menghapus notifikasi:", error.message);
    return res.status(500).json({ message: "Gagal menghapus notifikasi." });
  }
};

const pushNotifications = async (req, res) => {
  console.log(req.body);
  try {
    // Gunakan model untuk menyisipkan dokumen
    const newNotification = await NotificationInternal.create({
      balasan: req.body.balasan,
      ulasan: req.body.ulasan,
      user_id: req.body.user_id,
    });
    return res.status(200).json(newNotification);
  } catch (error) {
    console.error("Error inserting notification:", error);
    return res
      .status(500)
      .json({ message: "Error inserting notification", error });
  }
};

module.exports = { getNotifications, pushNotifications, deleteNotification };
