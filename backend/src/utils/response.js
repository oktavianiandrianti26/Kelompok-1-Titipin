class ResponseAPI {
    static success(res, data, message = 'Request successful') {
      return res.status(200).json({
        status: 'success',
        message,
        data,
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
  
    static created(res, data, message = 'Resource created successfully') {
      return res.status(201).json({
        status: 'success',
        message,
        data,
      });
    }
  
    static badRequest(res, message = 'Bad Request') {
      return res.status(400).json({
        status: 'error',
        message,
      });
    }
  
    static unauthorized(res, message = 'Unauthorized') {
      return res.status(401).json({
        status: 'error',
        message,
      });
    }
  
    static notFound(res, message = 'Not Found') {
      return res.status(404).json({
        status: 'error',
        message,
      });
    }
  
    static internalServerError(res, error) {
      return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
        error,
      });
    }
  }
  
  module.exports = ResponseAPI;
  
