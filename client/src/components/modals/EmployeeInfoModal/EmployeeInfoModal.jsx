import React, { useEffect, useState } from 'react'
import {Box, Button, Input} from '../../index'
import axios from 'axios'
import cx from 'classnames'

const EmployeeInfoModal = ({className, employeeToUpdate, isOpen}) => {
    const classNames = cx('employeeModal', {
        'employeeModal--is-open' : isOpen
    }, className)

    const [employeeId, setEmployeeId] = useState(null)
    const [fullName, setFullName] = useState(null)
    const [email, setEmail] = useState(null)
    const [employmentStatus, setEmploymentStatus] = useState(null)
    const [employeeData, setEmployeeData] = useState(null)
    const [submitError, setSubmitError] = useState(false)
    const [hourlyRate, setHourlyRate] = useState(null)

    console.log(employeeData)

    useEffect(() => {
        getEmployee()
    }, [isOpen])
    
   const getEmployee = async () => {
       const res = await axios.get(`/api/employees/employee/${employeeToUpdate}`)
       let employment = !res.data.employmentStatus ? 'Not Employed' : 'Employed'
        setFullName(res.data.fullName)
        setEmail(res.data.email)
        setEmploymentStatus(employment)
        setHourlyRate(res.data.hourlyRate)
        setEmployeeId(res.data._id)
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
            _id: employeeId,
            fullName: fullName,
            email: email,
            employmentStatus: employmentStatus,
            hourlyRate: hourlyRate
        }
        setSubmitError(false)
        setEmployeeData(submitData)

        axios.patch(`/api/employees/${employeeId}`, {
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