const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler( async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try{
            //get token from header
            token = req.headers.authorization.split(' ').pop();

            //verify token
            const decoded = await jwt.verify(token, process.env.JWT_SECRET)

            //get user from decoded token
            req.user = await User.findById(decoded.id).select('-password')

            //move to next hop
            next()
        } catch (err) {
            console.log(err)
            res.status(400).json({
                error: true,
                message: 'Not Authorized'
            })
        }
    }

    if (!token) {
        res.status(401).json({
            error: true,
            message: 'Not Authorized, No Token'
        })
    }
})

module.exports = {
    protect
}