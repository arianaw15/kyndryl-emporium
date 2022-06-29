import React from 'react'
import { Box } from '../Box'
import cx from 'classnames';

import './Employee.scss'

const Employee = ({className, email, employmentStatus, firstName, lastName, salary}) => {

const classNames = cx('employee', className)

    return (
        <Box className={classNames}>
            <Box className='employee__is-employeeName'>
                {firstName} {lastName}
                <li>
                    <ul>Email: {email}</ul>
                    <ul>Employment Status: {employmentStatus}</ul>
                    <ul>Salary: {salary}</ul>
                
                </li>
               
            </Box>
        </Box>
    )
}

export {Employee}