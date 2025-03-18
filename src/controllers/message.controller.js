import asyncHandler from 'express-async-handler'

export const sendMessage = asyncHandler(async (req, res, next) => {
    const { name, email, message } = req.body

    if(!name) {
        return res.status(400).json({ message: "Please enter a name" })
    }
    if(!email) {
        return res.status(400).json({ message: "Please enter a valid email adress" })
    }
    if(!message) {
        return res.status(400).json({ message: "Please enter a message" })
    }
   
    res.status(200).json({ message: "Message succesfully submitted!" })
})