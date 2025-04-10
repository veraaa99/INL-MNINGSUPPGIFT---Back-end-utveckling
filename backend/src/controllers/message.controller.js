// Controller for handling messages

import asyncHandler from 'express-async-handler'

// Create and submit a message (POST request)
export const sendMessage = asyncHandler(async (req, res, next) => {
    // Get the message submission (name, email and message) from the request body
    const { name, email, message } = req.body

    // If no name, email or message is included in the request, return an error message
    if(!name || !email || !message) {
        return res.status(400).json({ message: "Please enter a name, an email address and a message to submit" })
    }
   
    // If the request was successfull, return a message confirming the submission
    res.status(200).json({ message: "Message succesfully submitted!" })
})