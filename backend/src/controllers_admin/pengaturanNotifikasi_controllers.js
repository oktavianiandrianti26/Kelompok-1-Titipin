const nodemailer = require("nodemailer");
const Notification = require("../models/notification_model");

const sendNotification = async (req, res) => {
  const {senderEmail, senderPassword, recipients, message} = req.body;

  if (!senderEmail || !senderPassword || !recipients || !message) {
    return res.status(400).json({message: "Data tidak lengkap."});
  }

  try {
    // Konfigurasi nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "titipin.services@gmail.com",
        pass: "cucl oxfi mgsn rsaq",
      },
    });

    // Kirim email
    await transporter.sendMail({
      from: senderEmail,
      to: recipients,
      subject: "Notifikasi dari Titipin",
      text: message,
    });

    // Simpan notifikasi di database
    const notification = new Notification({senderEmail, recipients, message});
    await notification.save();

    return res.status(200).json({message: "Notifikasi berhasil dikirim dan disimpan!"});
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({message: "Gagal mengirim atau menyimpan notifikasi."});
  }
};

module.exports = {sendNotification};
