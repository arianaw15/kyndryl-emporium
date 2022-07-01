import React, { useCallback, useState, useMemo, useEffect } from 'react'
import axios from 'axios'
import { Box, Button } from '../Box'
import cx from 'classnames'
// import {Calendar, momentLocalizer, Views} from 'react-big-calendar'
// import moment from 'moment'
const dayjs = require('dayjs')

// const localizer = momentLocalizer(moment)


const ShiftCalendar = ({className}) => {
  const classNames = cx('shiftcalendar', className)
    const [shifts, setShifts] = useState()

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

   const regEx = new RegExp('/[A-Z]/g')
    return (
      <Box className={classNames}>
               <table className="employeespage__table">
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
            
            return (
                <tr className='employeespage__employee-box'>
                    <td>{shift.fullName}</td>
                    <td>{dayjs(shift.date).format('dddd MM/DD/YYYY')}</td>
                    <td>{shift.startTime}</td>
                    <td>{shift.endTime}</td>
                    <td>Total Billable Hours($)</td>
                        <br />
                        
                
                </tr>
            )            
    })}
                </tbody>
              </table>
  </Box>
    )
}

export {ShiftCalendar}