import express from 'express'
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../controllers/product.controller.js'
import { verifyToken } from '../middleware/verify.middleware.js'

const router = express.Router()

router.post('/', verifyToken, createProduct) // CREATE

router.get('/', getProducts) // READ
router.get('/:id', getProduct) // READ

router.put('/:id', verifyToken, updateProduct) // UPDATE
router.patch('/:id', verifyToken, updateProduct) // UPDATE

router.delete('/:id', verifyToken, deleteProduct) // DELETE

export default router