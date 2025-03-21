import express from 'express'
import { sendMessage } from '../controllers/message.controller.js'
import { verifyToken } from '../middleware/verify.middleware.js'

const router = express.Router()

router.post('/', verifyToken, sendMessage) // CREATE

export default router