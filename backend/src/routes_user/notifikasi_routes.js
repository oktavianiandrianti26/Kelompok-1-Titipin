const express = require('express');
const router = express.Router();
const notifikasiController = require('../controllers_user/notifikasi_controllers');

const auth = require('../middleware/auth');

// Route untuk GET notifikasi dengan autentikasi
router.get('/get-notifications', auth, notifikasiController.getNotifications);
router.post('/push-notifications', notifikasiController.pushNotifications);
module.exports = router;
