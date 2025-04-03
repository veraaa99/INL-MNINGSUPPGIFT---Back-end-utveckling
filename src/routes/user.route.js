// User router

import express from 'express'
import { getUserById, getUserByToken, getUsers, loginUser, registerUser } from '../controllers/user.controller.js'
import { verifyToken } from '../middleware/verify.middleware.js'

// Create router
const router = express.Router()

// (POST request):
// Register a new user
// Login a user
router.post('/register', registerUser)
router.post('/login', loginUser)

// (GET request):
// Get all users
// Get one user
router.get('/', verifyToken, getUsers)
router.get('/profile', verifyToken, getUserByToken)
router.get('/:id', verifyToken, getUserById)

export default router