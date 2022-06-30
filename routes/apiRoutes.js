const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Employee = require('../models/employee')
const Shift = require('../models/shift')

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

// Pulls single employee data
router.get('/employees/:_id', async (req,res) => {
    try {
        const employee = await Employee.find(req.params.id)
        res.json(employee)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
    })

// Adds new employee to data
router.post('/addemployee',async(req, res) => {
    const employee = new Employee({
        fullName: req.body.fullName,
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

// Gets all shifts in data

router.get('/shifts', async (req,res) => {
    try {
        const shifts = await Shift.find()
        res.json(shifts)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
    })

// Adds new shift to data

router.post('/addshift', async(req,res) => {
    const shift = new Shift({
        fullName: req.body.fullName,
        date: req.body.date,
        startTime: req.body.startTime, 
        endTime: req.body.endTime,
    })
    try {
        const newShift = await shift.save()
        res.status(201).json(newShift)
    } catch(err) {
        res.status(400).json({message: err.message})
    }
})

module.exports = router