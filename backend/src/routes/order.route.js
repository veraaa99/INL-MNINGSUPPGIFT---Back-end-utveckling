// Order router

import express from 'express'
import { createOrder, getOrders } from '../controllers/order.controller.js'
import { verifyToken } from '../middleware/verify.middleware.js'

// Create router
const router = express.Router()

// (POST request):
// Create new order
router.post('/', verifyToken, createOrder)

// (GET request):
// Get all orders of a certain user 
router.get('/', verifyToken, getOrders)

export default router