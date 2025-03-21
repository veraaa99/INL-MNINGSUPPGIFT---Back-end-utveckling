import express from 'express'
import { getUser, getUsers, loginUser, registerUser } from '../controllers/user.controller.js'
import { verifyToken } from '../middleware/verify.middleware.js'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)

router.get('/', verifyToken, getUsers)
router.get('/:id', verifyToken, getUser)

export default router