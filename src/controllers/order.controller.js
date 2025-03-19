import mongoose from "mongoose"
import Product from "../models/product.model.js"
import asyncHandler from 'express-async-handler'
import Order from "../models/order.model.js"

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

    let sum
    let orderedProducts
    let orderQuantity

    try {
        orderedProducts = await Product.find().where('_id').in(productIds).exec()

        orderQuantity = products.reduce((previousValue, currentValue) => {
            return previousValue + currentValue.quantity;
        }, 0);

        sum = await orderedProducts.reduce((previousValue, currentValue) => {
            return previousValue + currentValue.price * orderQuantity;
        }, 0);

    } catch (error) {
        return res.status(404).json({ message: 'An error occurred: One or several products could not be found'})
    }

    const order = await Order.create({ user, products, totalPrice: sum })
    console.log(order)

    res.status(201).json(order)
})

// FORTSÄTT HÄR
export const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find()
    .populate("user", "_id")
    .populate({
        path: "products",
        populate: {
            path: "product",
            select: "ObjectId",
            path: "quantity",
            select: "Number"
        }
    })
    .populate("totalPrice")

    res.status(200).json(orders)
})

export const getOrder = asyncHandler(async (req, res) => {

})