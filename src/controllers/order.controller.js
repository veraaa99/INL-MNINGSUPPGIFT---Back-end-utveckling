import mongoose from "mongoose"
import Product from "../models/product.model.js"
import asyncHandler from 'express-async-handler'
import Order from "../models/order.model.js"

// Använd bearer token för att spara användarens id på ordern
// FORTSÄTT HÄRS
export const placeOrder = asyncHandler(async (req, res) => {
    // const { product, quantity } = req.body
    // const user = req.user._id

})

export const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find()
    .populate("user", "name")
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