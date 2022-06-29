const mongoose = require('mongoose')

const shiftSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    }, 
    endTime: {
        type: String,
        required: true,
    },

})

module.exports = mongoose.model('Shift', shiftSchema)