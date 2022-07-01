import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from "react-router-dom";
import './App.css';
import {HomePage, ShiftUpdatePage, EmployeesPage, NavLink} from './components/index'

function App() {
  const [employees, setEmployees] = useState([]);

    useEffect(() => {
       getEmployees()
    }, [])

  async function getEmployees(){
    axios.get('/api/employees')
    .then((res) => setEmployees(res.data))
    .catch(err => console.log(err))
}

const linkObject = [{
  to: "/",
  linkLabel: "Home"
},
{
  to: "/shift-updates",
  linkLabel: "Shift Changes"
},
{
  to: "/employeeList",
  linkLabel: "Employees"
},
]

  return (
      <Router>
        <div>
          <nav>
              <NavLink to="/" linkLabel="Home" />
              <NavLink to="/shift-updates" linkLabel="Shift Updates"/>
              <NavLink to="/employeeList" linkLabel="Employee Table"/>
          </nav>
          <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/shift-updates" element={<ShiftUpdatePage />}/>
        <Route path="/employeeList" element={<EmployeesPage />}/>
      </Routes>
      <Outlet />
        </div>
      </Router>
    )
}

export default App;
