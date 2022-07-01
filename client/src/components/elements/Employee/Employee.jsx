import React from 'react'
import { Box, Button } from '../../index'
import cx from 'classnames';

import './Employee.scss'

const Employee = ({className, email, employmentStatus, fullName, hourlyRate, onClick}) => {

const classNames = cx('employee', className)

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(hourlyRate);

    return (
        <Box>
            <td>{fullName}</td>
            <td>{email}</td>
            <td>{employmentStatus ? 'Currently Employed' : 'Not Currently Employed'}</td>
            <td>{currency}</td>
            <td>Total Billable Hours($)</td>
            <td><Button text='Update Employee Information' onClick={onClick}></Button></td>
        </Box>
    )
}

export {Employee}


