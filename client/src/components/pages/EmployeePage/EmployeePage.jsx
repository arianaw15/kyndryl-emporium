import React, { useEffect, useState } from 'react'
import {Box, Button, Employee} from '../../index'
import axios from 'axios'
import './EmployeeInfoModal'

const EmployeePage = () => {
    const [employee, setEmployee] = useState([]);
    const [employeeInfoModal, setEmployeeInfoModal] = useState(false)

    useEffect(() => {
       getEmployee()
    }, [])

    async function getEmployee(){
        axios.get(`/api/employees/:${employee.id}`)
        .then(res => setEmployee(res.data))
        .catch(err => console.log(err))
    }

    return (
        <Box>
        <h1>Kyndryl Emporium Employee Database</h1>
                <Box>
                <Employee email={employee.email} employmentStatus={employee.employmentStatus} fullName={employee.fullName} key={employee.id} salary={employee.hourlyRate}/>
                    <Button>Update Employee's Information</Button>
                    {!employeeInfoModal ? '' : (<EmployeeInfoModal employeeId={employee.id}/>)}
                </Box>
            
        </Box>
    );
}


export {EmployeePage}