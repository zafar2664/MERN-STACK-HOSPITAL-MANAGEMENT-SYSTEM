class ErrorHandler extends Error {  //error naam ki ek class exist karti hai javascript ke andar
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;

    // Handle MongoDB duplicate key error (error code 11000)
    if (err.code === 11000) { 
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400);
    }

    // Handle invalid JWT error
    if (err.name === "JsonWebTokenError") {
        const message = "Json Web Token is invalid, Try Again!";
        err = new ErrorHandler(message, 400);
    }

    if (err.name === "TokenExpiredError") {
        const message = "Json Web Token is Expired, Try Again!";
        err = new ErrorHandler(message, 400);
    }

    if (err.name === "CastError") {
        const message = `Invalid ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    const errorMessage = err.errors? Object.values(err.errors).map((error) => error.message).join(" "): err.message;

    // Send error response
    return res.status(err.statusCode).json({
        success: false,
        message: errorMessage
    });
};

export default ErrorHandler;
