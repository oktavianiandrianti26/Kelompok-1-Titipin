const express = require('express');
const router = express.Router();
const notifikasiController = require('../controllers_user/notifikasi_controllers');

// Route untuk GET notifikasi
router.get('/get-notifications', notifikasiController.getNotifications);
router.post('/push-notifications', notifikasiController.pushNotifications);
module.exports = router;
