const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    }, 
    employmentStatus: {
        type: Boolean,
        required: true,
    },
    hourlyRate: {
        type: Number,
        required: true
    },

})

module.exports = mongoose.model('Employee', employeeSchema)