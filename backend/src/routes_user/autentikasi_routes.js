const express = require('express');
const router = express.Router();
const { register, login, editProfile, getProfile, getUsers, upload, uploadProfileImage  } = require('../controllers_user/autentikasi_controllers');
const auth = require('../middleware/auth');

// Route untuk registrasi user
router.post('/register', register);

// Route untuk login user
router.post('/login', login);

// Route untuk edit profil user (harus login terlebih dahulu)
router.put('/edit-profile', auth, editProfile);

router.get('/profile', auth, getProfile);

router.get('/users', getUsers);

// Upload foto profil (harus login terlebih dahulu)
router.post('/profile/upload', auth, upload.single('profileImage'), uploadProfileImage);
module.exports = router;
