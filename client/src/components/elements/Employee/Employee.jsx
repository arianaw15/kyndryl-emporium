import React from 'react'
import { Box } from '../Box'
import cx from 'classnames';

import './Employee.scss'

const Employee = ({className, email, employmentStatus, fullName, salary}) => {

const classNames = cx('employee', className)

    return (
        <Box className={classNames}>
            <Box className='employee__is-employeeName'>
                {fullName}
                    <Box>Email: {email}</Box>
                    <Box>Employment Status: {employmentStatus}</Box>
                    <Box>Salary: {salary}</Box>
               
            </Box>
        </Box>
    )
}

export {Employee}