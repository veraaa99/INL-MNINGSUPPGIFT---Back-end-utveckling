// Controller for handling products

import mongoose from "mongoose"
import asyncHandler from 'express-async-handler'

import Product from "../models/product.model.js"

// Create a new product (POST request)
export const createProduct = asyncHandler(async (req, res, next) => {
    // Get the product details (name, price, description, category and images) from the request body
    let { name, price, description, category, images } = req.body

    // If no name or price is included, return an error message
    if(!name || !price) {
        return res.status(400).json({ message: "Please enter a product name and a price" })
    }

    if(description == '' || description == "") {
        description = undefined
    }
    if(category == '' || category == "") {
        category = undefined
    }
    if(images == '' || images == "") {
        images = undefined
    }

    // Create and save a new product on the database
    const product = await Product.create({ name, price, description, category, images })
    // Return a status 201 and the created product
    res.status(201).json(product)
})

// Get all products (GET request)
export const getProducts = asyncHandler(async (req, res) => {
    // Get all products from the database
    const products = await Product.find().exec()

    // If no products have been created yet, return a message informing about this
    if(!products) {
        return res.status(404).json({ message: 'No products could be found' })
    }

    // Return a status 200 and the products
    res.status(200).json(products)
})

// Get a product (GET request)
export const getProduct = asyncHandler(async (req, res) => {
    // Get the id of the product from the request parameter
    const { id } = req.params

     // If the id is invalid, return an error message
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid id"})
    }

    // Find the product in the database with a matching id
    const product = await Product.findById(id).exec()

    // If no product with a matching id could be found, return an error message
    if(!product) {
        return res.status(404).json({ message: 'Product could not be found'})
    }

    // Return a status 200 and the product
    res.status(200).json(product)
})

// Update a product (PUT request or PATCH request)
export const updateProduct = asyncHandler(async (req, res) => {
    // Get the id of the product from the request parameter
    // Get the product details (name, price, description, category and images) from the request body
    const { id } = req.params
    const { name, price, description, category, images } = req.body 

    // If the id is invalid, return an error message
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid id"})
    }

    // Object to fill with key-value pairs that will be updated in the product
    const valuesToUpdate = {}

    // If the request body contains name, price, description, category and/or images, put these into the valuesToUpdate object
    if(name) {
        valuesToUpdate.name = name
    }
    if(price) {
        valuesToUpdate.price = price
    }
    if(description) {
        valuesToUpdate.description = description
    }
    if(category) {
        valuesToUpdate.category = category
    }
    if(images) {
        valuesToUpdate.images = images
    }

    // If no key-value pairs were included in the request body and put into the valuesToUpdate object, return an error message
    if(Object.keys(valuesToUpdate).length === 0){
        res.status(400).json({ message: "No changes were made to the product" })
    }

    // Find the product in the database with a matching id
    // Then, replace the key-value pairs with the new/updated ones from the valuesToUpdate object
    const updatedProduct = await Product.findByIdAndUpdate(id, valuesToUpdate, { new: true }).exec()
    // If no product with a matching id could be found, return an error message
    if(!updatedProduct) {
        return res.status(404).json({ message: 'Product could not be found' })
    }

    // Return a status 200 and the updated product
    res.status(200).json(updatedProduct)
})

// Delete a product (DELETE request)
export const deleteProduct = asyncHandler(async (req, res) => {
    // Get the id of the product from the request parameter
    const { id } = req.params

    // If the id is invalid, return an error message
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid id"})
    }

    // Find the product in the database with a matching id, and delete the product
    const product = await Product.findByIdAndDelete(id).exec()

    // If no product with a matching id could be found, return an error message
    if(!product) {
        return res.status(404).json({ message: 'Product could not be found' })
    }

    // Return a status 204 to confirm the delete request but not return any content
    res.sendStatus(204)
})