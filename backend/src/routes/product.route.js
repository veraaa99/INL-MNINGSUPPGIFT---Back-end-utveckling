// Product router

import express from 'express'
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../controllers/product.controller.js'
import { verifyToken } from '../middleware/verify.middleware.js'

// Create router
const router = express.Router()

// (POST request):
// Create new product
router.post('/', 
    verifyToken, 
    createProduct) // CREATE

// (GET request):
// Get all products
// Get one product
router.get('/', getProducts) // READ
router.get('/:id', getProduct) // READ

// (PUT or PATCH request):
// Update a product
router.put('/:id', verifyToken, updateProduct) // UPDATE
router.patch('/:id', verifyToken, updateProduct) // UPDATE

// (DELETE request):
// Delete a product
router.delete('/:id', verifyToken, deleteProduct) // DELETE

export default router