// Verification middleware

import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    try {
        const authorizationHandler = req.headers.authorization || req.headers.Authorization
        if(!authorizationHandler.includes('Bearer ')){
            return res.status(401).json({ message: 'You are not authenticated. No token was provided' })
        }

        const token = authorizationHandler.split(' ')[1]
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN)

        req.user = decoded.userInfo

        next()

    } catch (error) {
        return res.status(401).json({ message: 'You are not authenticated' })
    }
}