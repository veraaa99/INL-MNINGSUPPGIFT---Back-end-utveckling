// Product router

import express from 'express'
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../controllers/product.controller.js'
import { verifyToken } from '../middleware/verify.middleware.js'

// Create router
const router = express.Router()

// (POST request):
// Create new product
router.post('/', createProduct) // CREATE

// (GET request):
// Get all products
// Get one product
router.get('/', getProducts) // READ
router.get('/:id', getProduct) // READ

// (PUT or PATCH request):
// Update a product
router.put('/:id', updateProduct) // UPDATE
router.patch('/:id', updateProduct) // UPDATE

// (DELETE request):
// Delete a product
router.delete('/:id', deleteProduct) // DELETE

export default router