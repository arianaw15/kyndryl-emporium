import React, { useEffect, useState } from 'react'
import {Box, Button, Header, EmployeeInfoModal, NewEmployeeModal} from '../../index'
import axios from 'axios'
import cx from 'classnames'
import jsPDF from "jspdf";
const dayjs = require('dayjs')


const EmployeesPage = ({className}) => {
    const classNames = cx('employeespage', className)

    const [employees, setEmployees] = useState([]);
    const [employeeInfoModalOpen, setEmployeeInfoModalOpen] = useState(false)
    const [employeeUpdate, setEmployeeUpdate] = useState(null)
    const [newEmployeeModalOpen, setNewEmployeeModalOpen] = useState(false)
    const [employeeShifts, setEmployeeShifts] = useState(null)

    const print = async () => {
        const today = new Date()
        const pdf = new jsPDF("l", "pt", "a4");
        const data = await document.querySelector("#pdf");
        pdf.html(data).then(() => {
          pdf.save(`Kyndryl-Employees-${dayjs(today).format("MM/DD/YYYY")}.pdf`);
        });
      };

    useEffect(() => {
       getEmployees()
       getShifts()
    }, [])

    async function getEmployees(){
        axios.get('/api/employees')
        .then((res) => {
            setEmployees(res.data)
        })
        .catch(err => console.log(err))
    }

    async function getShifts(){
        axios.get('/api/shifts')
        .then((res) => {
            setEmployeeShifts(res.data)
        })
        .catch(err => console.log(err))
    }

    // const getShiftTime = (startTime, endTime) => {

    //     const [startingTime, startingModifier] = startTime.split(' ')
    //     let shiftTime

    //     if (startingModifier === 'PM') {
    //         startingTime = parseInt(hours, 10) + 12
    //         return startingTime
    //     }
    //     const [endingTime, endingModifier] = endTime.split(' ')
    //     if (endingModifier === 'PM') {
    //         endingTime = parseInt(hours, 10) + 12
    //     }

    // shiftTime = endingTime - startingTime
    // return shiftTime

    // }

    
    return (
        <Box className={classNames}>
        <Header pageName={'Employee Table'}/>
        <table className="employeespage__table" id='pdf'>
                <thead >
                  <tr className='employeespage__table-head'>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Employment Status</th>
                    <th>Hourly Rate</th>
                    <th>Total Billable Hours ({dayjs(new Date()).format("MMMM")})</th>
                    <th>Shifts</th>
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
                    <td>Total Billable Hours</td>
                    <td>Shifts</td>
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
              <Button text={"Print Employee List"} onClick={print}/>
    
        <Button text='Add new employee' onClick={() => setNewEmployeeModalOpen(true)}/>
        <NewEmployeeModal isOpen={newEmployeeModalOpen}/>
        {newEmployeeModalOpen ? <Button onClick={() => setNewEmployeeModalOpen(false)} text="Close New Employee Modal"/> : ''}
         <EmployeeInfoModal employeeToUpdate={employeeUpdate} isOpen={employeeInfoModalOpen} />
         {employeeInfoModalOpen ? <Button onClick={() => setEmployeeInfoModalOpen(false)} text="Close Update Employee Modal"/> : ''}
        </Box>
    );
}


export {EmployeesPage}