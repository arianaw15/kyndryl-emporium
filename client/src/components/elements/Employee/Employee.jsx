import React from 'react'
import { Box } from '../Box'
import cx from 'classnames';

import './Employee.scss'

const Employee = ({className, email, employmentStatus, fullName, hourlyRate}) => {

const classNames = cx('employee', className)

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(hourlyRate);

    return (
        <Box className={classNames}>
            <Box className='employee__is-employeeName'>
                {fullName}
                    <Box>Email: {email}</Box>
                    <Box>Employment Status: {employmentStatus ? 'Currently Employed' : 'Not Currently Employed'}</Box>
                    <Box>Hourly Rate: {currency}</Box>
               
            </Box>
        </Box>
    )
}

export {Employee}