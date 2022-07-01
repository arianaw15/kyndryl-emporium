import React, { useEffect, useState } from 'react'
import {Box, Header, ShiftCalendar} from '../../index'
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
        <Header pageName={"Home - Upcoming Shifts"}/>
        <ShiftCalendar  />
        </Box>
    );
}


export {HomePage}