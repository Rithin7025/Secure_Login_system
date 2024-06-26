const errorMiddleware = (err,req,res,next) => {
    const errorStatus = err.statusCode || 500;
    const errorMessage = err.message || "Internal server error";

    res.status(errorStatus).json({
        success : false,
        message : errorMessage
    })
}

export default errorMiddleware; 