// Generate a web token

import jwt from 'jsonwebtoken'

// Create a token based on the user param
// (Token contains _id and email, and expires in 2 hours)
export const generateToken = (user) => {
    return jwt.sign({
        userInfo: {
            _id: user._id,
            email: user.email
        }

    }, process.env.ACCESS_TOKEN, { expiresIn: '2h' })
}