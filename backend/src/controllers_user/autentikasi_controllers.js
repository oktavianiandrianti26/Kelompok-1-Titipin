const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user_model');
const ResponseAPI = require('../utils/response');
const { jwtSecret } = require('../config/env');

// Register
// Fungsi untuk registrasi pengguna
const register = async (req, res) => {
  const { name, email, phone, password, konfirmasi_password } = req.body;

  try {
    if (password !== konfirmasi_password) {
      return ResponseAPI.error(res, 'Konfirmasi password tidak sesuai', 400);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return ResponseAPI.error(res, 'Email sudah terdaftar', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    await newUser.save();

    return ResponseAPI.success(
      res,
      {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      },
      'Pendaftaran berhasil'
    );
  } catch (error) {
    console.error('Error saat register:', error.message);
    return ResponseAPI.serverError(res, error);
  }
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return ResponseAPI.error(res, 'Email atau password salah', 400);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return ResponseAPI.error(res, 'Email atau password salah', 400);
    }

    const token = jwt.sign({ user_id: user._id, role: 'user' }, jwtSecret, { expiresIn: '1d' });

    return ResponseAPI.success(
      res,
      {
        token,
        role: 'user',
        user: { id: user._id, name: user.name, email: user.email },
      },
      'Login berhasil'
    );
  } catch (error) {
    console.error('Error saat login:', error.message);
    return ResponseAPI.error(res, error.message, 500);
  }
};

// Get Profile
const getProfile = async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return ResponseAPI.error(res, 'Pengguna tidak ditemukan', 404);
        }

        return ResponseAPI.success(res, {
            id: user._id,
            name: user.name,       // Ganti 'nama' menjadi 'name'
            email: user.email,
            phone: user.phone,     // Ganti 'nomor_kontak' menjadi 'phone'
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }, 'Profil pengguna berhasil diambil');
    } catch (error) {
        console.error('Error saat mengambil profile:', error.message);
        return ResponseAPI.serverError(res, error);
    }
};

// Edit Profile (name, email, phone)
const editProfile = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return ResponseAPI.error(res, 'Pengguna tidak ditemukan', 404);
    }

    // Update fields
    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;

    await user.save();
    return ResponseAPI.success(res, 'Profil berhasil diperbarui', 200);
  } catch (err) {
    return ResponseAPI.error(res, err.message, 500);
  }
};

// Mendapatkan semua pengguna
const getUsers = async (req, res) => {
  try {
    const users = await User.find(); // Mendapatkan semua pengguna
    res.json({ data: users });
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil data pengguna', error: err });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  editProfile,
  getUsers,
};
