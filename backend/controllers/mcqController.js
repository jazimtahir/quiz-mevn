const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const MCQ = require('../models/mcqModel')
const Option = require('../models/optionModel')

const getMcqs = asyncHandler( async (req, res) => {
    const mcqs = await MCQ.find().populate('options').select('statement').lean().exec()
    
    //using loop to fetch mcq options bcz ppopulate() not working
    for (mcq of mcqs) {
        mcq.options = await Option.find({mcq}).select('option correct')
    }

    res.status(200).json(mcqs)
})

const getMcq = asyncHandler( async (req, res) => {

    const mcq = await MCQ.findById(req.params.id).select('statement').populate('options')

    if (!mcq) {
        res.status(400).json({
            error: true,
            message: 'MCQ not found'
        })
    }

    //using to fetch mcq options bcz ppopulate() not working
    mcq.options = await Option.find({mcq: req.params.id}).select('option correct')
    
    res.status(200).json(mcq)
})

const setMcq = asyncHandler( async (req, res) => {
    const { statement, options } = req.body

    if (!statement || !options) {
        res.status(400).json({
            error: true,
            message: 'All fields are required'
        })
    }
    const mcq = await MCQ.create({
        statement,
        user: req.user._id
    })

    for (const option of options) {
        await Option.create({
            option: option.option,
            correct: option.correct,
            mcq: mcq._id
        })
    }

    //using to fetch mcq options bcz ppopulate() not working
    mcq.options = await Option.find({mcq: mcq._id}).select('option correct')

    res.status(201).json(mcq)
})

const updateMcq = asyncHandler( async (req, res) => {
    
})

const deleteMcq = asyncHandler( async (req, res) => {
    
})

module.exports = {
    getMcqs,
    getMcq,
    setMcq,
    updateMcq,
    deleteMcq
}