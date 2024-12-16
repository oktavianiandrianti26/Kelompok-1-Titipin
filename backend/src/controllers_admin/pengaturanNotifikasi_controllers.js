const nodemailer = require("nodemailer");
const Notification = require("../models/notification_model");
const ResponseAPI = require("../utils/response");
const User = require("../models/user_model");

// Fungsi untuk mengirim notifikasi
const sendNotification = async (req, res) => {
  const { senderEmail, senderPassword, recipients, message } = req.body;

  try {
    const user = await User.findOne({ email: recipients });

    if (!user) {
      throw new Error("error find user");
    }
    // Menggunakan nodemailer untuk mengirim email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: senderEmail, // Ganti dengan senderEmail yang diterima
        pass: senderPassword, // Ganti dengan senderPassword yang diterima
      },
    });

    const mailOptions = {
      from: senderEmail,
      to: recipients,
      subject: "Notifikasi Baru",
      text: message,
    };

    const newNotification = new Notification({
      senderEmail,
      recipients,
      message,
      userId: user.user_id, // Menyimpan user_id
    });
    await newNotification.save();

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.log(error);
      } else {
        // Simpan notifikasi ke database dengan user_id
        console.log("Email sent:", info?.response);
      }
    });

    return ResponseAPI.success(res, "Notifikasi berhasil dikirim");
  } catch (error) {
    console.error("Error sending notification:", error);
    return ResponseAPI.error(res, "Terjadi kesalahan saat mengirim notifikasi");
  }
};

module.exports = { sendNotification };
