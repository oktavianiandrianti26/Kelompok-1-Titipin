const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin } = require('../controllers_admin/autentikasi_controllers')

// Rute untuk register admin
router.post('/register', registerAdmin);

// Rute untuk login admin
router.post('/login', loginAdmin);

module.exports = router;
