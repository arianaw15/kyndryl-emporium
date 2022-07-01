import React, { useEffect, useState } from 'react'
import {Box, Button, Header, EmployeeInfoModal, NewEmployeeModal} from '../../index'
import axios from 'axios'
import cx from 'classnames'

const EmployeesPage = ({className}) => {
    const classNames = cx('employeespage', className)

    const [employees, setEmployees] = useState([]);
    const [employeeInfoModalOpen, setEmployeeInfoModalOpen] = useState(false)
    const [employeeUpdate, setEmployeeUpdate] = useState(null)
    const [newEmployeeModalOpen, setNewEmployeeModalOpen] = useState(false)

    useEffect(() => {
       getEmployees()
    }, [])

    async function getEmployees(){
        axios.get('/api/employees')
        .then((res) => {
            setEmployees(res.data)
        })
        .catch(err => console.log(err))
    }
    return (
        <Box className={classNames}>
        <Header pageName={'Employee Table'}/>
        <table className="employeespage__table">
                <thead >
                  <tr className='employeespage__table-head'>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Employment Status</th>
                    <th>Hourly Rate</th>
                    <th>Total Billable Hours</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                {employees.map((employee) => {
                const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(employee.hourlyRate);
            
            return (
                <tr className='employeespage__employee-box'>
                    <td>{employee.fullName}</td>
                    <td>{employee.email}</td>
                    <td>{employee.employmentStatus ? 'Currently Employed' : 'Not Currently Employed'}</td>
                    <td>{currency}</td>
                    <td>Total Billable Hours($)</td>
                    <td><Button text='Update Employee Information' onClick={() => {
                            setEmployeeInfoModalOpen(true)
                            setEmployeeUpdate(employee._id)
                            
                        }}/></td>
                        <br />
                        
                
                </tr>
            )            
    })}
                </tbody>
              </table>
        
        <Button text='Add new employee' onClick={() => setNewEmployeeModalOpen(true)}/>
        <NewEmployeeModal isOpen={newEmployeeModalOpen}/>
        {newEmployeeModalOpen ? <Button onClick={() => setNewEmployeeModalOpen(false)} text="Close New Employee Modal"/> : ''}
         <EmployeeInfoModal employeeToUpdate={employeeUpdate} isOpen={employeeInfoModalOpen} />
         {employeeInfoModalOpen ? <Button onClick={() => setEmployeeInfoModalOpen(false)} text="Close Update Employee Modal"/> : ''}
        </Box>
    );
}


export {EmployeesPage}