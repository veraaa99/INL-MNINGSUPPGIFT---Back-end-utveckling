// Express application 

import express from 'express'

import productRoutes from './routes/product.route.js'
import messageRoutes from './routes/message.route.js'
import userRoutes from './routes/user.route.js'
import orderRoutes from './routes/order.route.js'

import { errorHandler, notFound } from './middleware/error.middleware.mjs'

import cors from 'cors'

// Create new Express application
const app = express()

app.use(cors())
// Parse URL-encoded data with querystring library
app.use(express.json({ limit: '16MB', extended: false }));

// Use product router, message router, user router and order router
app.use('/api/products', productRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

// Use NotFound and ErrorHandler middleware
app.use(notFound)
app.use(errorHandler)

export default app