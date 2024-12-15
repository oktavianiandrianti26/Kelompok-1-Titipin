class ResponseAPI {
    // Method untuk response sukses
    static success(res, data = null, message = 'Success', statusCode = 200) {
        return res.status(statusCode).json({
            success: true,
            message,
            data
        });
    }

    // Method untuk response error
    static error(res, message = 'Error', statusCode = 400, errors = null) {
        return res.status(statusCode).json({
            success: false,
            message,
            errors
        });
    }

    // Method untuk response unauthorized
    static unauthorized(res, message = 'Unauthorized') {
        return this.error(res, message, 401);
    }

    // Method untuk response forbidden
    static forbidden(res, message = 'Forbidden') {
        return this.error(res, message, 403);
    }

    // Method untuk response not found
    static notFound(res, message = 'Not Found') {
        return this.error(res, message, 404);
    }

    // Method untuk response internal server error
    static serverError(res, error = null) {
        console.error(error);  // Log error ke console
        return this.error(
            res,
            'Internal Server Error',
            500,
            process.env.NODE_ENV === 'development' ? error?.message : 'Something went wrong'
        );
    }
}

module.exports = ResponseAPI;
