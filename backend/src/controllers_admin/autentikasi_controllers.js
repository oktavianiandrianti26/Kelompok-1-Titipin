const Admin = require('../models/admin_model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Fungsi untuk registrasi admin
const registerAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Semua field harus diisi' });
  }

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Email sudah digunakan' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      email,
      password: hashedPassword,
    });

    await newAdmin.save();

    res.status(201).json({
      message: 'Admin berhasil didaftarkan',
      admin: { id: newAdmin._id, email: newAdmin.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan, coba lagi nanti' });
  }
};

// Fungsi untuk login admin
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email dan Password harus diisi' });
  }

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Admin tidak ditemukan' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Password salah' });
    }

    const token = jwt.sign({ adminId: admin._id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({
      success: true,
      message: 'Login berhasil',
      data: {
        token,
        role: 'admin',
        admin: { id: admin._id, email: admin.email, transaction_id: admin.transaction_id },
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan, coba lagi nanti' });
  }
};

module.exports = { registerAdmin, loginAdmin };
