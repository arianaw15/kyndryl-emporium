import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Box, Select} from '../../index'
import cx from 'classnames'
const dayjs = require('dayjs')


const ShiftUpdatePage = (value) => {
    const classNames = cx('shiftupdatepage')
const [employeeList, setEmployeeList] = useState([])
const [weekDay, setWeekDay] = useState([])
const [time, setTime] = useState([])
const [fullName, setFullName] = useState(null)
const [date, setDate] = useState(null)
const [startTime, setStartTime] = useState(null)
const [endTime, setEndTime] = useState(null)
const [data, setData] = useState(null)
const [submitError, setSubmitError] = useState(false)
const timeArray = [8,9,10,11,12,13,14,15,16,17,18,19]

useEffect(() => {
    getEmployees()
    updateWeek()
    updateTime()
 }, [])

 // Get employee list

 async function getEmployees(){
    axios.get('/api/employees')
    .then((res) => {
       let employeeArray = []
       res.data.map((employee) => {
           employeeArray.push({fullName: employee.fullName})
       })
       setEmployeeList(employeeArray)
    })
    .catch(err => console.log(err))
}

// Get weekDay list

 function updateWeek() {
    let dateJump = [1,2,3,4,5,6,7]
    let dateArray = []
    for (var i= 0; i < dateJump.length; i++){
        let newDate = new Date(Date.now() + dateJump[i] * 24 * 60 * 60 * 1000)
        dateArray.push(dayjs(newDate).format('dddd MM/DD/YYYY'))
        setWeekDay(dateArray)
    }

 }

 // Get time list

 function updateTime() {
    let newTimeArray = []
    timeArray.map((time) => {
        let suffix = time >= 12 ? 'PM':'AM'
        let newTime = ((time + 11) % 12 + 1) + suffix
        newTimeArray.push(newTime)
        setTime(newTimeArray)
    })
 }

 const validateSubmit = (e) => {
    e.preventDefault()
    if (!fullName || !date || !startTime || !endTime) {
        setSubmitError(true)
    } else {
        setSubmitError(false)
        onSubmit()
    }
 }

 const onSubmit = () => {
    let submitData = {
        fullName: fullName,
        date: date,
        startTime: startTime,
        endTime: endTime,
    }
    setData(submitData)
   axios.post('/api/addshift', {
    fullName: `${fullName}`,
    date: `${date}`,
    startTime: `${startTime}`,
    endTime: `${endTime}`,
})
   .then((res) => {
    console.log(res)
   })
   .catch(err => console.log(err))
 }

 const updateName = (value) => {
    setFullName(value)
 }

 const updateDate = (value) => {
    setDate(value)
 }

 const updateStartTime = (value) => {
    setStartTime(value)
 }
 const updateEndTime = (value) => {
    setEndTime(value)
 }

    return (
        <Box className={classNames}>
            <form onSubmit={validateSubmit}>
                <label>Employee</label>
                    <Select 
                    onChange={(event) => {
                        let value = event
                        updateName(value)
                    }}
                    name='Employee Name'
                    key={employeeList.map((employee) => {
                        return employee.id
                    })}
                    options={employeeList.map((employee) => {
                        return `${employee.fullName}`
                    })}
                    placeholder={'Select employee'}
                    value={fullName || value}
                    />
                <label>Date</label>
                    <Select 
                    onChange={(event) => {
                        let value = event
                        updateDate(value)
                    }} 
                    options={weekDay.map((day) => {
                        return day
                    })}
                    placeholder='Select shift date'
                    value={date || value}
                    />
                <label>Shift Start Time</label>
                    <Select
                    onChange={(event) => {
                        let value = event
                        updateStartTime(value)
                    }}  
                    options={time.map((time) => {
                        return time
                    })}
                    placeholder='Select shift start time'
                    value={startTime || value}
                    />
                <label>Shift End Time</label>
                <Select
                    onChange={(event) => {
                        let value = event
                        updateEndTime(value)
                    }}  
                    options={time.map((time) => {
                        return time
                    })}
                    placeholder='Select shift end time'
                    value={endTime || value}
                    />
            <button>Submit Shift</button>
            </form>
            {!submitError ? (data ? JSON.stringify(data) : ' ') : <Box isError>Please ensure that all fields are filled out before submitting</Box>}
        </Box>
    )
}

export {ShiftUpdatePage}