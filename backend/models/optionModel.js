const mongoose = require('mongoose')

const optionSchema = mongoose.Schema({
    option: {
        type: String,
        required: [true, 'Option is required']
    },
    correct: {
        type: Boolean,
        required: [true, 'Correct option is required']
    },
    mcq: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MCQ'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Option', optionSchema)