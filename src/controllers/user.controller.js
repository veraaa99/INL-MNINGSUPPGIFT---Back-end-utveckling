import asyncHandler from 'express-async-handler'
import bcrypt from "bcryptjs";
import { generateToken } from "../token/generateWebToken.js";

import User from "../models/user.model.js";

export const registerUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if(!email || !password) {
        return res.status(400).json({ message: 'Please enter an email address and a password to register a new user'})
    }

    const salt = await bcrypt.genSalt(15)
    const newHashedPassword = await bcrypt.hash(password, salt)

    console.log({password, newHashedPassword})

    const user = await User.create({ email, password: newHashedPassword })

    const token = generateToken(user)

    res.status(201).json({ message: `User successfully created: \n _id: ${user._id}, \n email: ${user.email}, \n token: ${token}`})
})

export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if(!email || !password) {
        return res.status(400).json({ message: 'Please enter an email address and a password to login' })
    }

    const user = await User.findOne({ email }).exec()

    if(!user) {
        return res.status(401).json({ message: 'Invalid credentials' })
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match) {
        return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = generateToken(user)
    res.status(200).json({ message: `User successfully logged in: _id: ${user._id}, email: ${user.email}, token: ${token}` })

})

export const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).select("-password").exec()

    if(!users) {
        return res.status(404).json({ message: 'No users found' })
    }

    res.status(200).json(users)
})

export const getUser = asyncHandler(async (req, res) => {
    const { id } = req.params

    const user = await User.findById(id).
    select("-password").exec()

    if(!user) {
        return res.status(404).json({ message: 'User could not be found' })
    }

    res.status(200).json(user)
})