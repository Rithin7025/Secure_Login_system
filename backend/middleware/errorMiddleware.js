const errorMiddleware = (err,req,res,next) => {
    const errorStatus = err.statusCode || 500;
    const errorMessage = err.message || "Internal server error";

    res.status(errorStatus).json({
        status : errorMessage,
        message : errorMessage
    })
}

export default errorMiddleware; 