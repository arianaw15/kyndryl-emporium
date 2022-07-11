import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Box, Button } from '../../index'
import cx from 'classnames'
import jsPDF from "jspdf";
const dayjs = require('dayjs')


const ShiftCalendar = ({className}) => {
  const classNames = cx('shiftcalendar', className)
    const [shifts, setShifts] = useState()

    const print = async () => {
      const today = new Date()
      const pdf = new jsPDF("l", "pt", "a4");
      const data = await document.querySelector("#pdf");
      pdf.html(data).then(() => {
        pdf.save(`Kyndryl-Shifts-${dayjs(today).format("MM/DD/YYYY")}.pdf`);
      });
    };

    useEffect(() => {
      getShifts()
   }, [])

   async function getShifts(){
       axios.get('/api/shifts')
       .then((res) => {
           setShifts(res.data)
       })
       .catch(err => console.log(err))
   }

   const isBefore = (today, shiftDate) => {
    return today < shiftDate;
   }

   const regEx = /\s?([AaPp][Mm]?)$/

   const getShiftTime = (startTime, endTime) => {
    let [startingTime, startingModifier] = startTime.split(regEx)

    if (startingModifier === 'PM') {
      if (startingTime === '12' ){
        startingTime = '00'
      }
        startingTime = parseInt(startingTime, 10) + 12
    }

    let [endingTime, endingModifier] = endTime.split(regEx)
    if (endingModifier === 'PM') {
      if (endingTime === '12' ){
        endingTime = '00'
      }
        endingTime = parseInt(endingTime, 10) + 12
    }

    let shiftTime = (endingTime-startingTime)
    console.log(shiftTime)
    return shiftTime

  }

    return (
      <Box className={classNames} >
               <table className="employeespage__table" id="pdf">
                <thead >
                  <tr className='employeespage__table-head'>
                    <th>Full Name</th>
                    <th>Date</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Total Billable Hours</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                {shifts && shifts.map((shift) => {
                  const today = new Date()
                  const shiftDate = new Date(shift.date)
                  const shiftTime = getShiftTime(shift.startTime, shift.endTime)
                  if (isBefore(today, shiftDate)) {
              return (
                <tr className='employeespage__employee-box'>
                    <td>{shift.fullName}</td>
                    <td>{dayjs(shift.date).format('dddd MM/DD/YYYY')}</td>
                    <td>{shift.startTime}</td>
                    <td>{shift.endTime}</td>
                    <td>{shiftTime}</td>                       
                
                </tr>
            )
          }            
    })}
                </tbody>
              </table>
              <Button text="Print Upcoming Shifts" onClick={print} />
  </Box>
    )
}

export {ShiftCalendar}