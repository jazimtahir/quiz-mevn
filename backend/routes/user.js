const express = require('express')
const { register, login, session, getAllUsers } = require('../controllers/userController.js')
const { protect } = require('../middlewares/authMiddleware')
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/session', protect, session)
router.get('/users', getAllUsers)

module.exports = router