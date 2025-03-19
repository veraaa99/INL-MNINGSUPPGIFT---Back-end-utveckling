import express from 'express'
import { verifyToken } from '../middleware/verify.middleware.js'
import { createOrder, getOrder, getOrders } from '../controllers/order.controller.js'

const router = express.Router()

router.post('/', verifyToken, createOrder)

router.get('/', verifyToken, getOrders)
router.get('/:id', verifyToken, getOrder)

export default router