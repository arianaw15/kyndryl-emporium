import React, { useEffect, useState } from 'react'
import {Box, Button, Input} from '../../index'
import axios from 'axios'
import cx from 'classnames'

const EmployeeInfoModal = ({className, employeeToUpdate, isOpen}) => {
    const classNames = cx('employeeModal', {
        'employeeModal--is-open' : isOpen
    }, className)

    const [employee, setEmployee] = useState(null)
    const [fullName, setFullName] = useState(null)
    const [email, setEmail] = useState(null)
    const [employmentStatus, setEmploymentStatus] = useState(null)
    const [employeeData, setEmployeeData] = useState(null)
    const [submitError, setSubmitError] = useState(false)
    const [hourlyRate, setHourlyRate] = useState(null)


    useEffect(() => {
        getEmployee()
     },[employeeToUpdate])
 
    
   const getEmployee = async () => {
       const response = await axios.get(`/api/employees/${employeeToUpdate}`)
       setEmployee(response.data)
     }
 

    const validateSubmit = (e) => {
        e.preventDefault()
        if (!employmentStatus || !fullName || !email || !hourlyRate) {
            setSubmitError(true)   
        }
        else {
            onSubmit()
        }
    }
    
    const onSubmit = () => {
        let submitData = {
            fullName: fullName,
            email: email,
            employmentStatus: employmentStatus,
            hourlyRate: hourlyRate
        }
        setSubmitError(false)
        setEmployeeData(submitData)

        axios.patch(`/api/employees/:${employeeToUpdate}`, {
            fullName: `${fullName}`,
            email: `${email}`,
            employmentStatus: employmentStatus === 'Employed' ? true : false,
            hourlyRate: `${hourlyRate}`

        }).then((res) => {
            console.log(res)
           })
           .catch(err => console.log(err))
    }

    if (!isOpen) {
        return null
    } else {
        return (
                    <Box isOpen={isOpen} className={classNames}>
                        <form onSubmit={validateSubmit}>
                            <Input 
                            label='Employee Name '
                            onChange={(e) => {
                                let newName = e.target.value
                                setFullName(newName)
                            }}
                            placeholder="Employee's full name"
                            type='text'
                            value={fullName}
                            />
                            <Input
                            label='Employee Email '
                            onChange={(e) => {
                                let newEmail = e.target.value
                                setEmail(newEmail)
                            }}
                            placeholder="Employee's email"
                            type='text'
                            value={email}
                            />
                            <Input
                            label='Currently Employed With Kyndryl Emporium '
                            name='employmentStatus'
                            onChange={(e) => {
                                let newEmploymentStatus = e.target.value
                                setEmploymentStatus(newEmploymentStatus)
                            }}
                            type='radio'
                            value={'Employed'}
                            />
                            <Input
                            label='Not Employed With Kyndryl Emporium '
                            name='employmentStatus'
                            onChange={(e) => {
                                let newEmploymentStatus = e.target.value
                                setEmploymentStatus(newEmploymentStatus)
                            }}
                            type='radio'
                            value={'Not Employed'}
                            />
                            <Input
                            label='Hourly Pay '
                            onChange={(e) => {
                                let newHourlyRate = e.target.value
                                setHourlyRate(newHourlyRate)
                            }}
                            type='text'
                            value={hourlyRate}
                            />
                            <Button text="Update Employee's Information" />
                        </form>       
                        {!submitError ? '' : <Box isError>Please ensure that all fields are filled out before submitting</Box>}         
                    </Box>
                )
        }
        }



export {EmployeeInfoModal}