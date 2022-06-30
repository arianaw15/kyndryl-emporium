import React, { useEffect, useState } from 'react'
import {Box, Button, Input} from '../../index'
import axios from 'axios'
import cx from 'classnames'

const EmployeeInfoModal = ({className, employeeId, isOpen}) => {
    const classNames = cx('employeeModal', {
        'employeeModal--is-open' : isOpen
    }, className)

    const [employee, setEmployee] = useState(null)
    const [fullName, setFullName] = useState(null)
    const [email, setEmail] = useState(null)
    const [employmentStatus, setEmploymentStatus] = useState(null)
    const [employeeData, setEmployeeData] = useState(null)
    const [submitError, setSubmitError] = useState(false)

    // console.log(employeeId)

    useEffect(() => {
       getEmployee()
    }, [])

    async function getEmployee(){
        axios.get(`/api/employees/:${employeeId}`)
        .then(res => setEmployee(res.data))
        .catch(err => console.log(err))
    }

    const validateSubmit = (e) => {
        e.preventDefault()
        if (!fullName || !email || !employmentStatus) {
            setSubmitError(true)
        }
        else {
            onSubmit()
        }
    }
    
    const onSubmit = () => {
        
        console.log('Employee update submitted')
        setEmployeeData({
            fullName: fullName,
            email: email,
            employmentStatus: employmentStatus

        })
    }

    if (!isOpen) {
        return null
    } else {
        return (
                    <Box isOpen={isOpen} className={classNames}>
                        <form onSubmit={validateSubmit}>
                            <Input 
                            label='Employee Name'
                            onChange={(e) => {
                                let newName = e.target.value
                                setFullName(newName)
                            }}
                            // placeholder={employee}
                            type='text'
                            />
                            <Input
                            label='Employee Email'
                            onChange={(e) => {
                                let newEmail = e.target.value
                                setEmail(newEmail)
                            }}
                            // placeholder={employee.email}
                            type='text'
                            />
                            <Input
                            label='Currently Employed With Kyndryl Emporium'
                            name='employmentStatus'
                            onChange={(e) => {
                                let newEmploymentStatus = e.target.value
                                setEmploymentStatus(newEmploymentStatus)
                            }}
                            // placeholder={employee.email}
                            type='radio'
                            value={true}
                            />
                            <Input
                            label='Not Employed With Kyndryl Emporium'
                            name='employmentStatus'
                            onChange={(e) => {
                                let newEmploymentStatus = e.target.value
                                setEmploymentStatus(newEmploymentStatus)
                            }}
                            // placeholder={employee.email}
                            type='radio'
                            value={false}
                            />
                            <Button text="Update Employee's Information" />
                        </form>                    
                    </Box>
                )
        }
        }



export {EmployeeInfoModal}