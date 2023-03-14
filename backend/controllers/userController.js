const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const register = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
        // throw new Error('Please add all fields')
        res.status(400).json({
            error: true,
            message: 'All fields are required'
        })
    }

    //checking if username or email exists
    const usernameExists = await User.findOne({'username': username})
    const emailExists = await User.findOne({'email': email})
    // const emailExists = await User.findOne({email})

    if (usernameExists) {
        res.status(400).json({
            error: true,
            message: 'Username already exists'
        })
    }
    if (emailExists) {
        res.status(400).json({
            error: true,
            message: 'Email already exists'
        })
    }

    //hash password
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)

    //creating user
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user.id)
        })
    }



    res.status(201).json({
        email: email,
        password: password
    })
})

const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        res.status(400).json({
            error: true,
            message: 'All fields are required'
        })
    }

    const user = await User.findOne({username})
    if (user) {
        //comparing password
        const status = await bcrypt.compare(password, user.password)
        if (status) {
            res.status(200).json({
                _id: user.id,
                username: user.username,
                token: generateToken(user.id)

            })
        } else {
            res.status(400).json({
                error: true,
                message: 'Invalid Credientials'
            })
        }
    } else {
        res.status(400).json({
            error: true,
            message: 'User not Found'
        })
    }
})

const session = asyncHandler( async (req, res) => {
    const user = req.user

    res.status(200).json({
        _id: user.id,
        username: user.username,
        email: user.email
    })
})

const getAllUsers = asyncHandler( async (req, res) => {
    const users = await User.find().lean().exec()
    res.status(200).json({data: users})
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    register,
    login,
    session,
    getAllUsers
}