const mongoose = require('mongoose')

const mcqSchema = mongoose.Schema({
    statement: {
        type: String,
        required: [true, 'Statement is required']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    options:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Option'
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model('MCQ', mcqSchema)