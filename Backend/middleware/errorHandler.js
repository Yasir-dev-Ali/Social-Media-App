const errorHandler = (err, req, res, next) => {
    console.error("Error occurred:", {
        message: err.message,
        stack: err.stack,
        status: err.status || 500
    });

    res.status(err.status || 500).json({
        message: err.message || "An unexpected error occurred",
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
};

export default errorHandler;
  