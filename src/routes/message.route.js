// Message router

import express from 'express'
import { sendMessage } from '../controllers/message.controller.js'
import { verifyToken } from '../middleware/verify.middleware.js'

// Create router
const router = express.Router()

// (POST request):
// Create new messsage
router.post('/', 
    // verifyToken, 
    sendMessage)

export default router