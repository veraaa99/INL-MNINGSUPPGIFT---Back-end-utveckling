// Error middleware

// Throw new 404 Not Found Error
export const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}

// Handle errors
export const errorHandler = (err, req, res, error) => {
    // Display error message in console log
    console.log(`Error: ${err.message}`)

    // If the response's statuscode is 200, set variable statusCode to 500. 
    // If not, set statusCode to the response's statuscode
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode

    // Return the error message and the stack
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : null
    })
}