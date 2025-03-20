import mongoose from "mongoose"
import Product from "../models/product.model.js"
import asyncHandler from 'express-async-handler'
import Order from "../models/order.model.js"
import User from "../models/user.model.js"

export const createOrder = asyncHandler(async (req, res) => {
    const { products } = req.body
    const user = req.user._id

    if(!products) {
        return res.status(400).json({ message: 'Please enter at least one product and its quantity'})
    }

    let productIds = []

    await products.forEach(product => {
        productIds.push(product.productId)
    })

    let sum = 0

    try {
        const orderedProducts = await Product.find().where('_id').in(productIds).exec()

        let orderQuantity = []
        let sums = []

        products.forEach(product => {
            orderQuantity.push(product.quantity)
        })

        orderedProducts.forEach(product => {
            sums.push(product.price)
        })

        for(let i=0; i< orderQuantity.length; i++) {
            sum += orderQuantity[i] * sums[i];
        }

    } catch (error) {
        return res.status(404).json({ message: 'An error occurred: One or several products could not be found'})
    }

    const order = await Order.create({ user, products, totalPrice: sum })

    res.status(201).json(order)
})

export const getOrders = asyncHandler(async (req, res) => {
    const id  = req.user._id

    const user = await User.findById(id).exec()
    if(!user) {
        return res.status(404).json({ message: 'User not found' })
    }

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid id"})
    }

    const orders = await Order.find( { user: id })
    .populate({ 
        path: 'products.productId', model:'Product' })
    .exec()

    res.status(200).json(orders)
})