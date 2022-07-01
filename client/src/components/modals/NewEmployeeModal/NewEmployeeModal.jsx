import React, { useEffect, useState } from 'react'
import {Box, Button, Input} from '../../index'
import axios from 'axios'
import cx from 'classnames'

const NewEmployeeModal = ({className, isOpen, onClick}) => {
    const classNames = cx('newEmployeeModal', {
        'newEmployeeModal--is-open' : isOpen
    }, className)

    const [fullName, setFullName] = useState(null)
    const [email, setEmail] = useState(null)
    const [employmentStatus, setEmploymentStatus] = useState(null)
    const [employeeData, setEmployeeData] = useState(null)
    const [submitError, setSubmitError] = useState(false)
    const [hourlyRate, setHourlyRate] = useState(null)


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

        axios.post('/api/addemployee', {
            fullName: `${fullName}`,
            email: `${email}`,
            employmentStatus: employmentStatus === 'Employed' ? true : false,
            hourlyRate: `${hourlyRate}`

        }).then((res) => {
            console.log(res)
           })
           .catch(err => console.log(err))
    }
    // console.log(employeeData)

    if (!isOpen) {
        return null
    } else {
        return (
                    <Box isOpen={isOpen} className={classNames}>
                        <form onSubmit={validateSubmit}>
                            <Input 
                            label="Employee's Full Name "
                            onChange={(e) => {
                                let newName = e.target.value
                                setFullName(newName)
                            }}
                            placeholder=""
                            type='text'
                            value={fullName}
                            />
                            <Input
                            label="Employee's Email "
                            onChange={(e) => {
                                let newEmail = e.target.value
                                setEmail(newEmail)
                            }}
                            placeholder=""
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
                            placeholder=""
                            type='text'
                            value={hourlyRate}
                            />
                            <Button text="Add new Employee" />
                        </form>       
                        {!submitError ? '' : <Box isError>Please ensure that all fields are filled out before submitting</Box>}          
                    </Box>
                )
        }
        }



export {NewEmployeeModal}