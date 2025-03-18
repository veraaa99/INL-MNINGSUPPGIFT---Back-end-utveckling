import express from 'express'
import { verifyToken } from '../middleware/verify.middleware.js'
import { getOrder, getOrders, placeOrder } from '../controllers/order.controller.js'

const router = express.Router()

router.post('/', placeOrder)

router.get('/', verifyToken, getOrders)
router.get('/:id', verifyToken, getOrder)

export default router