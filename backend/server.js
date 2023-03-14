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

app.use('/api', require('./routes/user'))
app.use('/api/mcq', protect, require('./routes/mcq'))

app.listen(port, () => console.log(`Server is listening on port ${port}`))