import React, { useEffect, useState } from 'react'
import {Box, Button, Employee, Input, EmployeeInfoModal} from '../../index'
import axios from 'axios'

const EmployeesPage = () => {
    const [employees, setEmployees] = useState([]);
    const [employeeModalOpen, setEmployeeModalOpen] = useState(false)
    const [employeeUpdate, setEmployeeUpdate] = useState(null)

    const [employeeFullName, setFullName] = useState(null)
    const [employeeEmail, setEmail] = useState(null)
    const [employeeStatus, setEmployeeStatus] = useState(null)

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

    const onSubmit = (e) => {
        e.preventDefault()
        axios.patch('/api/employees/:id')

    }

    return (
        <Box>
        <h1>Kyndryl Emporium Employee Database</h1>
        {employees.map((employee) => {
            let employeeId = employee._id
                return (
                    <Box>
                    <Employee email={employee.email} employmentStatus={employee.employmentStatus} fullName={employee.fullName} key={employee.id} salary={employee.hourlyRate}/>
                    <Button 
                        onClick={() => {
                            setEmployeeModalOpen(true)
                            setEmployeeUpdate(employeeId)
                            console.log(employeeId)
                        }}
                        text='Update Employee Information'
                        />
                    </Box>
                )            
        })}
         <EmployeeInfoModal employeeId={employeeUpdate} isOpen={employeeModalOpen}/>
        </Box>
    );
}


export {EmployeesPage}