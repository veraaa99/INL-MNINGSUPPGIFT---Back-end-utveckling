// Controller for handling users

import asyncHandler from 'express-async-handler'
import bcrypt from "bcryptjs";
import { generateToken } from "../token/generateWebToken.js";

import User from "../models/user.model.js";

// Register a new user (POST request)
export const registerUser = asyncHandler(async (req, res) => {
    // Get the user details (email + password) from the request body
    const { email, password } = req.body

    // If no email or password is included, return an error message
    if(!email || !password) {
        return res.status(400).json({ message: 'Please enter an email address and a password to register a new user'})
    }

    // Generate a new salt and hashed password
    const salt = await bcrypt.genSalt(15)
    const newHashedPassword = await bcrypt.hash(password, salt)

    // Create and save a new user on the database
    const user = await User.create({ email, password: newHashedPassword })

    // Generate a new token for the user (to use for authorization)
    const userToken = generateToken(user)
    // Return a status 201 and the created user
    res.status(201).json({message: "User succesfully registered: " + user.email, userToken})
})

// Login a user (POST request)
export const loginUser = asyncHandler(async (req, res) => {
    // Get the user details (email + password) from the request body
    const { email, password } = req.body

    // If no email or password is included, return an error message
    if(!email || !password) {
        return res.status(400).json({ message: 'Please enter an email address and a password to login' })
    }

    // Find the user in the database with a matching email address
    const user = await User.findOne({ email }).exec()

    // If no user with a matching email address could be found, return an error message
    if(!user) {
        return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Check and compare the request body's password with the password on the database
    const match = await bcrypt.compare(password, user.password)

    // If the passwords do not match, return an error message
    if(!match) {
        return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Generate a new token for the user (to use for authorization)
    const userToken = generateToken(user)
    // Return a status 200 and the user
    res.status(200).json({message: "User succesfully logged in: " + user.email, userToken})

})

// Get all users (GET request)
export const getUsers = asyncHandler(async (req, res) => {
    // Get all products from the database (excluding the passwords)
    const users = await User.find({}).select("-password").exec()

    // If no users have been registered yet, return a message informing about this
    if(!users) {
        return res.status(404).json({ message: 'No users found' })
    }

    // Return a status 200 and the users
    res.status(200).json(users)
})

// Get one user (GET request)
export const getUser = asyncHandler(async (req, res) => {
    // Get the id of the product from the request parameter
    const { id } = req.params

    // Find the user in the database with a matching id (excluding the password)
    const user = await User.findById(id).select("-password").exec()

    // If no user with a matching id could be found, return an error message
    if(!user) {
        return res.status(404).json({ message: 'User could not be found' })
    }

    // Return a status 200 and the user
    res.status(200).json(user)
})