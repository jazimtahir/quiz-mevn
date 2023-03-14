const express = require('express')
const { getMcqs, getMcq, setMcq, updateMcq, deleteMcq } = require('../controllers/mcqController')

const router = express.Router()

router.route('/').get(getMcqs).post(setMcq)
router.route('/:id').get(getMcq).put(updateMcq).delete(deleteMcq)

module.exports = router