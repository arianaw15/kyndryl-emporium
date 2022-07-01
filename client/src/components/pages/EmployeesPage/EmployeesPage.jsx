import React, { useEffect, useState } from 'react'
import {Box, Button, Employee, EmployeeInfoModal, NewEmployeeModal} from '../../index'
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
        <Box>
        <h1>Kyndryl Emporium Employee Database</h1>
        <Button text='Add new employee' onClick={() => setNewEmployeeModalOpen(true)}/>
        <NewEmployeeModal isOpen={newEmployeeModalOpen}/>
        {employees.map((employee) => {
            
                return (
                    <Box className='employeespage__employee-box'>
                    <Employee email={employee.email} employmentStatus={employee.employmentStatus} fullName={employee.fullName} key={employee._id} hourlyRate={employee.hourlyRate}/>
                    <Button 
                        onClick={() => {
                            setEmployeeInfoModalOpen(true)
                            setEmployeeUpdate(employee._id)
                            
                        }}
                        text='Update Employee Information'
                        />
                    </Box>
                )            
        })}
         <EmployeeInfoModal employeeToUpdate={employeeUpdate} isOpen={employeeInfoModalOpen} />
        </Box>
    );
}


export {EmployeesPage}