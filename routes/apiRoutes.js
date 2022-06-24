const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Employee = require('../models/employee')

mongoose.connect(process.env.DATABASE_URL || "mongodb://localhost/kyndryl-emporium");

// Pulls all employees in data
router.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find()
        res.json(employees)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
    })

// Adds new employee to data
router.post('/addemployee',async(req, res) => {
    const employee = new Employee({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        employmentStatus: req.body.employmentStatus,
        hourlyRate: req.body.hourlyRate
        
    })
    try {
        const newEmployee = await employee.save()
        res.status(201).json(newEmployee)
    } catch(err) {
        res.status(400).json({mesage: err.message})
    }
})

module.exports = router