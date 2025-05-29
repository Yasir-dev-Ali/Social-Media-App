
const errorHandler = (err, req, res, next) => {
    try {
        // Log the error details for debugging
        console.error("Error occurred:", {
            message: err.message,
            stack: err.stack,
            status: err.status || 500
        });
        // Set the response status code
        res.status(err.status || 500).json({
            message: err.message || "An unexpected error occurred",
            stack: process.env.NODE_ENV === 'production' ? null : err.stack // Hide stack trace in production
        });

        // successfully handled the error
    
    
} catch (error) {
    console.error("Error in errorHandler middleware:", error);
    res.status(500).json({
        message: "Internal Server Error",
        error: error.message || "An unexpected error occurred"
    });
  } finally {
    // Ensure that the next middleware is called
    next();
    
}
}