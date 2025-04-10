// Mongoose User Schema

import mongoose from "mongoose";

// User Schema (email, password)
const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
}, { timestamps: true })

// Create and export Mongoose Model
const User = mongoose.model('User', userSchema)

export default User