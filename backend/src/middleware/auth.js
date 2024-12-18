const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/env');
const User = require('../models/user_model');
const Admin = require('../models/admin_model');
const ResponseAPI = require('../utils/response');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return ResponseAPI.unauthorized(res, 'Token tidak ditemukan. Silakan login.');
        }

        const decoded = jwt.verify(token, jwtSecret);
        console.log('Decoded Token:', decoded);

        let user;
        if (decoded.role === 'admin') {
            user = await Admin.findById(decoded.adminId);
        } else {
            user = await User.findById(decoded.user_id);
        }

        if (!user) {
            return ResponseAPI.unauthorized(res, 'User tidak ditemukan.');
        }

        req.user = { user_id: user._id, role: decoded.role };
        next();
    } catch (error) {
        console.error('Auth Middleware Error:', error);
        if (error.name === 'TokenExpiredError') {
            return ResponseAPI.unauthorized(res, 'Token telah kedaluwarsa. Silakan login ulang.');
        }
        return ResponseAPI.unauthorized(res, 'Token tidak valid.');
    }
};

module.exports = auth;
