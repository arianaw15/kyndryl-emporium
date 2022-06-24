const express = require('express')
const router = express.Router()
const Employee = require('../models/employee')

// Pulls all employees in data
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find()
        res.json(employees)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
    })

// Adds new employee to data
router.post('/',async(req, res) => {
    const employee = new Employee({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        
    })
    try {
        const newEmployee = await employee.save()
        res.status(201).json(newEmployee)
    } catch(err) {
        res.status(400).json({mesage: err.message})
    }
})

module.exports = router