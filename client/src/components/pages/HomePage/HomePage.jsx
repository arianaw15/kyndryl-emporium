import React, { useEffect, useState } from 'react'
import {Box, Employee, ShiftCalendar} from '../../index'
import axios from 'axios'

const HomePage = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
       getEmployees()
    }, [])

    async function getEmployees(){
        axios.get('/api/employees')
        .then(res => setEmployees(res.data))
        .catch(err => console.log(err))
    }

    return (
        <Box>
        <h1>Kyndryl Emporium Employee Database</h1>
        <ShiftCalendar  />
        {employees.map((employee) => {
            return (
                <Employee email={employee.email} employmentStatus={employee.employmentStatus} firstName={employee.firstName} lastName={employee.lastName} key={employee.id} salary={employee.hourlyRate}/>

            )
        })}
        </Box>
    );
}


export {HomePage}