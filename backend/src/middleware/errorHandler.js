const ResponseAPI = require('../utils/response');

const errorHandler = (err, req, res, next) => {
    console.error(err);

    if (err.name === 'ValidationError') {
        return ResponseAPI.error(res, 'Validation Error', 400, err.errors);
    }

    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0]; 
        return ResponseAPI.error(res, `Duplicate field value for ${field}`, 400);
    }

    // Handling unauthorized errors
    if (err.name === 'UnauthorizedError') {
        return ResponseAPI.error(res, 'Unauthorized access', 401);
    }

    if (err.name === 'JsonWebTokenError') {
        return ResponseAPI.error(res, 'Invalid token', 401);
    }

    return ResponseAPI.serverError(res, 'Internal Server Error', 500);
};

module.exports = errorHandler;
