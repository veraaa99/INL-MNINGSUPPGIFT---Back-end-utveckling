// Create and start a server

import mongoose from 'mongoose'
import app from './app.js'

// Use the port stored in the PORT environment variable. If the port is already in use, use port 9999 instead
const PORT =  process.env.PORT || 9999
// Use a connection string (stored in the MONGO_URI environment variable) to connect to MongoDB
const MONGO_URI = process.env.MONGO_URI

// Connect to the MongoDB database
// If the connection is succesful, display a success message with the host name
// If an error occurs, display the error message
const dbConnect = async () => {
    try {
        const mongo = await mongoose.connect(MONGO_URI)
        console.log(`MongoDB connected: ${mongo.connection.host}`)
    } catch (err) {
        console.log(`MongoDB Connection Error: ${err.message}`)
        process.exit(1)
    }
}

// Start a server
// After succesfully connecting to the database, display a message with the localhost url
// If an error occurs, display the error message
const startServer = async () => {
    try {
        await dbConnect()
        app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))
    } catch (err) {
        console.log('Failed to start server', err.message)
        process.exit(1)
    }
}

// Call the function to start the server
startServer()