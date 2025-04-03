// Controller for handling orders

import mongoose from "mongoose"
import asyncHandler from 'express-async-handler'

import Product from "../models/product.model.js"
import Order from "../models/order.model.js"
import User from "../models/user.model.js"

// Place an order (POST request)
export const createOrder = asyncHandler(async (req, res) => {
    // Get the ordered products (product + quantity) from the request body
    // Get the id of the user who has placed the order from the request's Bearer token
    const { products } = req.body
    const user = req.user._id

    // If the request body is empty, return an error message
    if(!products) {
        return res.status(400).json({ message: 'Please enter at least one product and its quantity'})
    }

    // Create and fill an array with all productIds from the request body
    let productIds = []
    await products.forEach(product => {
        // If a product is missing a productId, return an error message
        if(product.productId == null){
            return res.status(400).json({ message: "One or several products does not contain a productId"})
        }

        productIds.push(product.productId).exec()
    })

    // Variable to hold the total price sum of all products in the order
    let totalSum = 0

    try {
        // Search through all products on the database, and find the products where the _id matches the ids in the productIds array
        // Save the matching products from the database in an array called orderedProducts
        const orderedProducts = await Product.find().where('_id').in(productIds).exec()

        // Array to fill with the quantity of each product in the prder
        let orderQuantity = []
        // Array to fill with the total price sum of the whole order
        let orderSum = []

        // Fill the orderQuantity array with each ordered product's quantity
        products.forEach(product => {
            orderQuantity.push(product.quantity)
        })

        // Fill the orderSum array with each ordered product's price
        orderedProducts.forEach(product => {
            orderSum.push(product.price)
        })

        // Calculate the total price sum by multiplying each product's price (orderSum) with its quantity (orderQuantity) in the order
        // Save the order's total price sum in the totalSum variable
        for(let i=0; i< orderQuantity.length; i++) {
            totalSum += orderQuantity[i] * orderSum[i];
        }

    } catch (error) {
        // If something goes wrong, return an error message
        return res.status(404).json({ message: 'An error occurred: One or several products could not be found'})
    }

    // Create and save a new order on the database (with the user, the products (id and quantity) and the total price of the order)
    const order = await Order.create({ user, products, totalPrice: totalSum }).exec()
    // Return a status 201 and the created order
    res.status(201).json(order)
})

// Get all orders of a certain user (GET request)
export const getOrders = asyncHandler(async (req, res) => {
    // Get the id of the user from the request's Bearer token
    // Find the user in the database with a matching id
    const id  = req.user._id
    const user = await User.findById(id).exec()

    // If the id is invalid, return an error message
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid id"})
    }

    // If no user with a matching id could be found, return an error message
    if(!user) {
        return res.status(404).json({ message: 'User could not be found' })
    }

    // Get a list with all the user's orders from the database
    // Use the 'populate' method to show information about each product in all orders
    const orders = await Order.find( { user: id })
    .populate({ 
        path: 'products.productId', model:'Product' })
    .exec()

    // If no orders have been placed by the user yet, return a message informing about this
    if(orders.length == 0) {
        return res.status(200).json({ message: "No orders placed yet"})
    }

    // Return a status 200 and the orders
    res.status(200).json(orders)
})