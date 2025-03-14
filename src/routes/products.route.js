import express from 'express'
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct, sendMessage } from '../controllers/products.controller.js'

const router = express.Router()

/// CRUD 

router.post('/', createProduct) // CREATE
router.post('/messages', sendMessage) // CREATE

router.get('/', getProducts) // READ
router.get('/:id', getProduct) // READ

router.put('/:id', updateProduct) // UPDATE
router.patch('/:id', updateProduct) // UPDATE

router.delete('/:id', deleteProduct) // DELETE

export default router