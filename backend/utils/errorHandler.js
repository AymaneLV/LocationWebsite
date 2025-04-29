class ApiError extends Error {  
    constructor(message, statusCode) {  
      super(message);  
      this.statusCode = statusCode;  
      this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";  
    }  
  }  
  
  const errorHandler = (err, req, res, next) => {  
    let error = { ...err };  
    error.message = err.message;  
  
    // Handle Mongoose validation errors  
    if (err.name === "ValidationError") {  
      const message = Object.values(err.errors).map((val) => val.message);  
      error = new ApiError(message, 400);  
    }  
  
    // Handle Mongoose duplicate key errors (e.g., duplicate email)  
    if (err.code === 11000) {  
      const message = "Duplicate field value entered";  
      error = new ApiError(message, 400);  
    }  
  
    // Handle invalid JWT  
    if (err.name === "JsonWebTokenError") {  
      error = new ApiError("Invalid token. Please log in again.", 401);  
    }  
  
    // Send response  
    res.status(error.statusCode || 500).json({  
      success: false,  
      error: error.message || "Server Error",  
    });  
  };  
  
  module.exports = { ApiError, errorHandler };  