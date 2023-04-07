const express = require('express')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db.js')
const port = process.env.PORT
const { protect } = require('./middlewares/authMiddleware')

connectDB()

const app = express()

// app.use(express.urlencoded({extended: false}))

app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json({message: 'Server is up'})
})

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', '*')
    if (req.method === 'OPTIONS') {
        res.sendStatus(200)
    }
    next()
})

app.use('/api', require('./routes/user'))
app.use('/api/mcqs', protect, require('./routes/mcq'))

app.listen(port, () => console.log(`Server is listening on port ${port}`))