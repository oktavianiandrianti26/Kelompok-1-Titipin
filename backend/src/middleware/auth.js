const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/env');
const User = require('../models/user_model');
const Admin = require('../models/admin_model');
const ResponseAPI = require('../utils/response');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return ResponseAPI.unauthorized(res, 'Authentication required');
        }

        const decoded = jwt.verify(token, jwtSecret);
        let user;

        // Cek apakah user atau admin
        if (decoded.role === 'admin') {
            user = await Admin.findById(decoded.user_id);
        } else {
            user = await User.findById(decoded.user_id);
        }

        if (!user) {
            return ResponseAPI.unauthorized(res, 'User not found');
        }

        req.user = user; // Menyimpan user ke request
        next(); // Melanjutkan ke middleware atau controller berikutnya
    } catch (error) {
        return ResponseAPI.unauthorized(res, 'Invalid token');
    }
};

module.exports = auth;
