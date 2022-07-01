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
        const employee = await Employee.findById(req.params)
        res.json(employee)
    }
    catch(err) {
        res.status(400).json({message: err.message})
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
        employee.id = new mongoose.Types.ObjectId()
        const newEmployee = await employee.save()
        res.status(201).json(newEmployee)
    } catch(err) {
        res.status(400).json({mesage: err.message})
    }
})

// Updates employee data
router.patch('/employees/:_id', async (req, res) => {
    try {
        const employee = await Employee.findOneAndUpdate({'id': req.params.id})
        if (req.body.fullName !== null) {
            employee.fullName = req.body.fullName
        }
        if (req.body.email !== null) {
            employee.email = req.body.email
        }
        if (req.body.employmentStatus !== null) {
            employee.employmentStatus = req.body.employmentStatus
        }
        if (req.body.hourlyRate !== null) {
            employee.hourlyRate = req.body.hourlyRate
        }
        const updatedEmployee = await employee.save()
        res.json(updatedEmployee)
    } catch(err) {
        res.status(400).json({ message: err.message })
    }
    
})

// Gets all shifts in data

router.get('/shifts', async (req, res) => {
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
        shift.id = new mongoose.Types.ObjectId()
        const newShift = await shift.save()
        res.status(201).json(newShift)
    } catch(err) {
        res.status(400).json({message: err.message})
    }
})

// async function getEmployee(req,res,next) {
//     let employee
// try {
//     employee = await Employee.findById(req.params.id)
//     if (employee == null){
//         return res.status(404).json({message: 'Cannot find an employee'})
//     }

// } catch(err) {
//     res.status(400).json({message: err.message})
// }
// res.employee = employee
// next()
// }

module.exports = router

