import User from "../models/user.model.js";
import asyncHandler from 'express-async-handler'

export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    if(!name || !email || !password) {
        return res.status(400).json({ message: 'Please enter all fields to register a new user'})
    }

    const user = await User.create({ name, email, password })

    res.status(201).json({ message: `User successfully created: _id: (${user._id}), name: (${user.name})`})
})