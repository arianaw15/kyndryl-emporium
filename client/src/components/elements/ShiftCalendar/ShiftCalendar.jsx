import React, { useCallback, useState, useMemo, useEffect } from 'react'
import axios from 'axios'
import { Box } from '../Box'
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
      <Box>
        {shifts && shifts.map((shift) => {
          return (
            <Box className='shiftcalendar__single-shift'>
              {shift.fullName}
              <Box>Date: {dayjs(shift.date).format('dddd MM/DD/YYYY')}</Box>
              <Box>Start Time: {shift.startTime}</Box>
              <Box>End Time: {shift.endTime}</Box>
            </Box>
          )
        })}
         
      </Box>
  </Box>
    )
}

export {ShiftCalendar}