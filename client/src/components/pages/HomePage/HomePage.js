import React, { useState, useEffect } from 'react'
import {Box} from '../../index'
import axios from 'axios'

const HomePage = () => {
    const [employees, setEmployees] = useState([]);

    axios.get("/api/employees")
    .then(res => setEmployees(res.data))
    .catch(err => console.log(err))

    return (
        <Box>
        <h1>Kyndryl Emporium Employee Database</h1>
        {JSON.stringify(employees)}
        </Box>
    );
}


export {HomePage}