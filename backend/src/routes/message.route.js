// Message router

import express from 'express'
import { sendMessage } from '../controllers/message.controller.js'

// Create router
const router = express.Router()

// (POST request):
// Create new messsage
router.post('/', sendMessage)

export default router